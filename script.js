// Scene setup
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x00101a); // Dark background for space

const camera = new THREE.PerspectiveCamera(
    55, // Narrower FOV for an even closer view
    window.innerWidth / window.innerHeight,
    0.1,
    300 // Reduced far clipping plane for a tighter view
);

camera.position.z = 8; // Bring the camera much closer to the stars

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
        Math.random() * 0.3 + 0.2, // Bigger stars for enhanced visibility
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
        .map(() => THREE.MathUtils.randFloatSpread(12)); // Very tightly packed stars
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

// Create many stars for dense field
Array(2000).fill().forEach(createStar); // Dramatically increased star count

// Add subtle ambient lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.2); // Slightly brighter ambient light
scene.add(ambientLight);

// Drastically increased rotation speed
const rotationSpeed = 0.01; // Fast rotation for "in-space" feel

// Animation loop
function animate() {
    scene.rotation.y += rotationSpeed; // Rapidly rotate the scene
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
