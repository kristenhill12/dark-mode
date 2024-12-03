// Scene setup
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x00101a); // Dark background for space

const camera = new THREE.PerspectiveCamera(
    75, // Slightly wider FOV to enhance depth perception
    window.innerWidth / window.innerHeight,
    0.1,
    100 // Keep a tight far clipping plane for proximity
);

camera.position.z = 2.5; // Move the camera very close to the stars

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
        Math.random() * 1.2 + 0.8, // Larger stars for closeness
        24,
        24
    );

    const material = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: true, // Enable opacity changes for twinkling
        opacity: Math.random() * 0.6 + 0.4, // Bright, consistent stars
    });

    const star = new THREE.Mesh(geometry, material);

    const [x, y, z] = Array(3)
        .fill()
        .map(() => THREE.MathUtils.randFloatSpread(5)); // Very tight spread for closeness
    star.position.set(x, y, z);
    scene.add(star);

    twinkle(star); // Add twinkling effect
}

// Add twinkling effect
function twinkle(star) {
    const duration = Math.random() * 2000 + 1000; // Random twinkling duration
    const targetOpacity = Math.random() * 0.8 + 0.2; // Bright, lively twinkles

    new TWEEN.Tween({ opacity: star.material.opacity })
        .to({ opacity: targetOpacity }, duration)
        .easing(TWEEN.Easing.Quadratic.InOut)
        .onUpdate((obj) => {
            star.material.opacity = obj.opacity; // Update star's opacity
        })
        .onComplete(() => twinkle(star)) // Loop the twinkle
        .start();
}

// Create an ultra-dense, immersive star field
Array(8000).fill().forEach(createStar); // Extreme star density for full immersion

// Add subtle ambient lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // Bright ambient light for star visibility
scene.add(ambientLight);

// Ultra-fast rotation speed for a space-like feel
const rotationSpeed = 0.07; // Faster rotation for a dynamic effect

// Animation loop
function animate() {
    scene.rotation.y += rotationSpeed; // Rotate the scene rapidly
    TWEEN.update(); // Update TWEEN animations for twinkling
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
