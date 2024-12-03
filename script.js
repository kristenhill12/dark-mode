// Scene setup
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x00101a); // Deep dark space background

const camera = new THREE.PerspectiveCamera(
    100, // Extremely wide FOV for total immersion
    window.innerWidth / window.innerHeight,
    0.1,
    10 // Very tight clipping for close rendering
);

camera.position.z = 0.05; // Almost inside the stars for maximum proximity

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
        Math.random() * 10 + 5, // Massive stars for a magical presence
        24,
        24
    );

    const material = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: Math.random() * 0.6 + 0.5, // Bright and glowing stars
    });

    const star = new THREE.Mesh(geometry, material);

    const [x, y, z] = Array(3)
        .fill()
        .map(() => THREE.MathUtils.randFloatSpread(0.5)); // Extremely tight spread for maximum density
    star.position.set(x, y, z);
    scene.add(star);

    twinkle(star); // Add twinkling effect
}

// Add twinkling effect
function twinkle(star) {
    const duration = Math.random() * 150 + 100; // Super-fast twinkling for a magical effect
    const targetOpacity = Math.random() * 0.7 + 0.3; // Bright and dynamic twinkles

    new TWEEN.Tween({ opacity: star.material.opacity })
        .to({ opacity: targetOpacity }, duration)
        .easing(TWEEN.Easing.Quadratic.InOut)
        .onUpdate((obj) => {
            star.material.opacity = obj.opacity; // Update star's opacity
        })
        .onComplete(() => twinkle(star)) // Loop the twinkle
        .start();
}

// Create a star field to surround the viewer
Array(75000).fill().forEach(createStar); // Enormous star count for overwhelming immersion

// Bright ambient lighting for vibrant stars
const ambientLight = new THREE.AmbientLight(0xffffff, 1.2); // Extra bright for glowing stars
scene.add(ambientLight);

// Magical rotation speed
const rotationSpeed = 1.5; // Fast and dynamic for maximum motion

// Animation loop
function animate() {
    scene.rotation.y += rotationSpeed; // Rotate dynamically to create movement
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
