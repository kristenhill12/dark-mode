// Scene setup
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x00101a); // Dark background for space

const camera = new THREE.PerspectiveCamera(
    70, // Wider FOV to allow more stars in the field of view
    window.innerWidth / window.innerHeight,
    0.1,
    100 // Clipping plane for focused rendering
);

camera.position.z = 1; // Bring the camera very close for maximum proximity

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
        Math.random() * 1.2 + 0.8, // Much larger stars for visibility
        24,
        24
    );

    const material = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: true, // Enable opacity changes for twinkling
        opacity: Math.random() * 0.5 + 0.5, // Brighter and vivid stars
    });

    const star = new THREE.Mesh(geometry, material);

    const [x, y, z] = Array(3)
        .fill()
        .map(() => THREE.MathUtils.randFloatSpread(3)); // Very tight spread for proximity
    star.position.set(x, y, z);
    scene.add(star);

    twinkle(star); // Add twinkling effect
}

// Add twinkling effect
function twinkle(star) {
    const duration = Math.random() * 1500 + 1000; // Smooth but noticeable twinkles
    const targetOpacity = Math.random() * 0.6 + 0.4; // Bright and dynamic twinkles

    new TWEEN.Tween({ opacity: star.material.opacity })
        .to({ opacity: targetOpacity }, duration)
        .easing(TWEEN.Easing.Quadratic.InOut)
        .onUpdate((obj) => {
            star.material.opacity = obj.opacity; // Update star's opacity
        })
        .onComplete(() => twinkle(star)) // Loop the twinkle
        .start();
}

// Create a highly immersive star field
Array(12000).fill().forEach(createStar); // Extreme star count for density

// Add subtle ambient lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // Bright ambient light for vivid stars
scene.add(ambientLight);

// Increased rotation speed
const rotationSpeed = 0.15; // Noticeable but smooth rotation

// Animation loop
function animate() {
    scene.rotation.y += rotationSpeed; // Rotate the scene for immersion
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
