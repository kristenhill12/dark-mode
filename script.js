// Scene setup
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x00101a); // Dark background for space

const camera = new THREE.PerspectiveCamera(
    60, // Narrower FOV for a closer view
    window.innerWidth / window.innerHeight,
    0.1,
    500 // Reduced far clipping plane for a tighter view
);

camera.position.z = 10; // Move the camera closer to the stars

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
        Math.random() * 0.2 + 0.1, // Bigger stars for enhanced visibility
        24,
        24
    );

    const material = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: true, // Enable opacity changes for twinkling
        opacity: Math.random() * 0.5 + 0.5, // Twinkling opacity range
    });

    const star = new THREE.Mesh(geometry, material);

    const [x, y, z] = Array(3)
        .fill()
        .map(() => THREE.MathUtils.randFloatSpread(15)); // Tightly packed stars
    star.position.set(x, y, z);
    scene.add(star);

    twinkle(star); // Add twinkling effect
}

// Add twinkling effect
function twinkle(star) {
    const duration = Math.random() * 2000 + 1000; // Random twinkling duration
    const targetOpacity = Math.random() * 0.8 + 0.2; // Brighter and more noticeable twinkles

    new TWEEN.Tween({ opacity: star.material.opacity })
        .to({ opacity: targetOpacity }, duration)
        .easing(TWEEN.Easing.Quadratic.InOut)
        .onUpdate((obj) => {
            star.material.opacity = obj.opacity; // Update star's opacity
        })
        .onComplete(() => twinkle(star)) // Loop the twinkle
        .start();
}

// Create more stars for density
Array(1000).fill().forEach(createStar); // Doubled the number of stars

// Add subtle ambient lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.1); // Slightly brighter ambient light
scene.add(ambientLight);

// Increased rotation speed
const rotationSpeed = 0.003; // Faster rotation for dynamic effect

// Animation loop
function animate() {
    scene.rotation.y += rotationSpeed; // Rotate the scene faster
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
