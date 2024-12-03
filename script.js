// Scene setup
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x00101a); // Deep dark background for space

// Camera setup for extreme zoom-in
const camera = new THREE.PerspectiveCamera(
    70, // Slightly wider FOV for more coverage
    window.innerWidth / window.innerHeight,
    0.01,
    10 // Tight clipping for close stars
);

camera.position.z = 0.01; // Camera zoomed almost inside the stars

const renderer = new THREE.WebGLRenderer({
    alpha: false,
    antialias: true,
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Function to create stars with varied sizes
function createStar() {
    const geometry = new THREE.SphereGeometry(
        Math.random() * 30 + 10, // Stars range from medium to massive
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
        .map(() => THREE.MathUtils.randFloatSpread(0.2)); // Extremely tight spread for proximity
    star.position.set(x, y, z);
    scene.add(star);

    twinkle(star); // Add twinkling effect
}

// Add twinkling effect for dynamic stars
function twinkle(star) {
    const duration = Math.random() * 80 + 50; // Super-fast twinkling for magical movement
    const targetOpacity = Math.random() * 0.7 + 0.3; // Bright dynamic twinkles

    new TWEEN.Tween({ opacity: star.material.opacity })
        .to({ opacity: targetOpacity }, duration)
        .easing(TWEEN.Easing.Quadratic.InOut)
        .onUpdate((obj) => {
            star.material.opacity = obj.opacity; // Update star's opacity
        })
        .onComplete(() => twinkle(star)) // Loop the twinkle
        .start();
}

// Create a dense, immersive star field
Array(100000).fill().forEach(createStar); // Maximum star count for magical density

// Bright ambient lighting for glowing stars
const ambientLight = new THREE.AmbientLight(0xffffff, 1.2); // Extra bright for vibrant stars
scene.add(ambientLight);

// Very fast rotation for dynamic immersion
const rotationSpeed = 3.0; // Rapid rotation for noticeable movement

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
