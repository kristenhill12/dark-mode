// Scene setup
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x00101a); // Deep dark background for space

// Camera setup for extreme zoom-in
const camera = new THREE.PerspectiveCamera(
    50, // Narrower FOV to zoom in on stars
    window.innerWidth / window.innerHeight,
    0.01,
    10 // Tightly clipped for close stars
);

camera.position.z = 0.1; // Camera zoomed extremely close

const renderer = new THREE.WebGLRenderer({
    alpha: false,
    antialias: true,
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Function to create stars
function createStar() {
    const geometry = new THREE.SphereGeometry(
        Math.random() * 20 + 10, // Enormous stars for full immersion
        24,
        24
    );

    const material = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: Math.random() * 0.5 + 0.5, // Bright and glowing stars
    });

    const star = new THREE.Mesh(geometry, material);

    const [x, y, z] = Array(3)
        .fill()
        .map(() => THREE.MathUtils.randFloatSpread(0.5)); // Extremely tight spread for closeness
    star.position.set(x, y, z);
    scene.add(star);

    twinkle(star); // Add twinkling effect
}

// Add twinkling effect
function twinkle(star) {
    const duration = Math.random() * 100 + 50; // Rapid twinkling for magical movement
    const targetOpacity = Math.random() * 0.8 + 0.2; // Bright dynamic twinkles

    new TWEEN.Tween({ opacity: star.material.opacity })
        .to({ opacity: targetOpacity }, duration)
        .easing(TWEEN.Easing.Quadratic.InOut)
        .onUpdate((obj) => {
            star.material.opacity = obj.opacity; // Update star's opacity
        })
        .onComplete(() => twinkle(star)) // Loop the twinkle
        .start();
}

// Create an overwhelming star field
Array(100000).fill().forEach(createStar); // Extreme star count for magical density

// Add bright ambient lighting for glowing stars
const ambientLight = new THREE.AmbientLight(0xffffff, 1.5); // Very bright for glowing stars
scene.add(ambientLight);

// Very fast rotation for magical motion
const rotationSpeed = 2.0; // Rapid rotation for noticeable dynamics

// Animation loop
function animate() {
    scene.rotation.y += rotationSpeed; // Rotate dynamically to create motion
    TWEEN.update(); // Update twinkling animations
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}

animate();

// Resize handler for responsiveness
window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
