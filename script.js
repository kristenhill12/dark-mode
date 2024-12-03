// Scene setup
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x00101a); // Deep dark space background

// Camera setup for extreme zoom-in
const camera = new THREE.PerspectiveCamera(
    75, // Wide FOV to maximize coverage
    window.innerWidth / window.innerHeight,
    0.01,
    5 // Very tight clipping for close stars
);

camera.position.z = 0.001; // Zoomed almost inside the stars

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
        Math.random() * 50 + 20, // Massive stars for a breathtaking effect
        24,
        24
    );

    const material = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: Math.random() * 0.6 + 0.5, // Bright, glowing stars
    });

    const star = new THREE.Mesh(geometry, material);

    const [x, y, z] = Array(3)
        .fill()
        .map(() => THREE.MathUtils.randFloatSpread(0.1)); // Extremely tight spread for maximum density
    star.position.set(x, y, z);
    scene.add(star);

    twinkle(star); // Add magical twinkling effect
}

// Add twinkling effect for dynamic stars
function twinkle(star) {
    const duration = Math.random() * 50 + 30; // Lightning-fast twinkling for magical movement
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

// Create a hyper-dense and immersive star field
Array(150000).fill().forEach(createStar); // Massive star count for overwhelming density

// Bright ambient lighting for glowing stars
const ambientLight = new THREE.AmbientLight(0xffffff, 1.5); // Vibrant and glowing stars
scene.add(ambientLight);

// Dynamic rotation speed for magical motion
const rotationSpeed = 4.0; // Rapid and noticeable rotation

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
