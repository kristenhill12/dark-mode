// Scene setup
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x00101a); // Dark background for space

const camera = new THREE.PerspectiveCamera(
    50, // Narrower FOV for a closer view
    window.innerWidth / window.innerHeight,
    0.1,
    200 // Reduced far clipping plane
);

camera.position.z = 3; // Bring the camera extremely close to the stars

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
        Math.random() * 0.8 + 0.5, // Larger stars for an immersive effect
        24,
        24
    );

    const material = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: true, // Enable opacity changes for twinkling
        opacity: Math.random() * 0.7 + 0.3, // Brighter stars with random opacity
    });

    const star = new THREE.Mesh(geometry, material);

    const [x, y, z] = Array(3)
        .fill()
        .map(() => THREE.MathUtils.randFloatSpread(8)); // Extremely tight spread
    star.position.set(x, y, z);
    scene.add(star);

    twinkle(star); // Add twinkling effect
}

// Add twinkling effect
function twinkle(star) {
    const duration = Math.random() * 2000 + 1000; // Random twinkling duration
    const targetOpacity = Math.random() * 1.0 + 0.5; // Even brighter twinkles

    new TWEEN.Tween({ opacity: star.material.opacity })
        .to({ opacity: targetOpacity }, duration)
        .easing(TWEEN.Easing.Quadratic.InOut)
        .onUpdate((obj) => {
            star.material.opacity = obj.opacity; // Update star's opacity
        })
        .onComplete(() => twinkle(star)) // Loop the twinkle
        .start();
}

// Create an ultra-dense star field
Array(5000).fill().forEach(createStar); // Increased star count

// Add subtle ambient lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.4); // Brighter ambient light for vivid stars
scene.add(ambientLight);

// Super-fast rotation speed
const rotationSpeed = 0.05; // Increased speed for a dynamic "space travel" effect

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
