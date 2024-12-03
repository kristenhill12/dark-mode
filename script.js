// Scene setup
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x00101a); // Deep dark background for space

// Camera setup for extreme zoom-in
const camera = new THREE.PerspectiveCamera(
    75, // Wide FOV for immersive coverage
    window.innerWidth / window.innerHeight,
    0.01,
    20 // Tight clipping for close stars
);

camera.position.z = 0.1; // Zoomed extremely close to stars

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
        Math.random() * 2 + 1, // Stars range from medium to large
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
        .map(() => THREE.MathUtils.randFloatSpread(5)); // Spread for immersive density
    star.position.set(x, y, z);
    scene.add(star);

    twinkle(star); // Add magical twinkling effect
}

// Add twinkling effect for dynamic stars
function twinkle(star) {
    const duration = Math.random() * 1000 + 500; // Smooth but noticeable twinkles
    const targetOpacity = Math.random() * 0.8 + 0.4; // Bright dynamic twinkles

    new TWEEN.Tween({ opacity: star.material.opacity })
        .to({ opacity: targetOpacity }, duration)
        .easing(TWEEN.Easing.Quadratic.InOut)
        .onUpdate((obj) => {
            star.material.opacity = obj.opacity; // Update star's opacity
        })
        .onComplete(() => twinkle(star)) // Loop the twinkle
        .start();
}

// Create a dense star field
Array(2000).fill().forEach(createStar); // Balanced star count for immersive density

// Bright ambient lighting for glowing stars
const ambientLight = new THREE.AmbientLight(0xffffff, 0.8); // Bright enough for glowing stars
scene.add(ambientLight);

// Smooth rotation for magical motion
const rotationSpeed = 0.3; // Noticeable but calming rotation

// Animation loop
function animate() {
    scene.rotation.y += rotationSpeed; // Rotate dynamically for immersive effect
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
