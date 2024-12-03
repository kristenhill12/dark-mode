// Scene setup
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x00101a); // Dark background for space
scene.fog = new THREE.FogExp2(0x00101a, 0.01); // Subtle fog for depth perception

const camera = new THREE.PerspectiveCamera(
    60, // Narrower FOV for closer zoom
    window.innerWidth / window.innerHeight,
    0.1,
    1000 // Reduced far clipping plane for better performance
);

camera.position.z = 20; // Bring camera closer to the stars

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
        Math.random() * 0.1 + 0.05, // Slightly larger stars
        24,
        24
    );

    const material = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: Math.random() * 0.5 + 0.5, // Twinkling opacity range
    });

    const star = new THREE.Mesh(geometry, material);

    const [x, y, z] = Array(3)
        .fill()
        .map(() => THREE.MathUtils.randFloatSpread(30)); // Reduced spread for density
    star.position.set(x, y, z);
    scene.add(star);

    twinkle(star); // Add twinkling effect
}

// Add twinkling effect
function twinkle(star) {
    const duration = Math.random() * 2000 + 1000; // Random twinkling duration
    const targetOpacity = Math.random() * 0.6 + 0.6; // Randomized brightness

    new TWEEN.Tween({ opacity: star.material.opacity })
        .to({ opacity: targetOpacity }, duration)
        .easing(TWEEN.Easing.Quadratic.InOut)
        .onUpdate((obj) => {
            star.material.opacity = obj.opacity; // Update star's opacity
        })
        .onComplete(() => twinkle(star)) // Loop the twinkle
        .start();
}

// Create multiple stars
Array(500).fill().forEach(createStar);

// Subtle ambient lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.1); // Increase brightness slightly
scene.add(ambientLight);

// Rotation speed
const rotationSpeed = 0.001; // Faster rotation for dynamic effect

// Animation loop
function animate() {
    scene.rotation.y += rotationSpeed; // Increase rotation speed
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
