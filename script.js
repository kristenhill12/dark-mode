// Scene setup
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x00101a); // Dark background for space

const camera = new THREE.PerspectiveCamera(
    70, // Slightly wider FOV to encompass more stars
    window.innerWidth / window.innerHeight,
    0.1,
    100 // Clipping plane for focused rendering
);

camera.position.z = 1.5; // Bring the camera very close to enhance the immersive effect

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
        Math.random() * 0.9 + 0.8, // Larger stars for proximity
        24,
        24
    );

    const material = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: true, // Enable opacity changes for twinkling
        opacity: Math.random() * 0.4 + 0.6, // Bright and vivid stars
    });

    const star = new THREE.Mesh(geometry, material);

    const [x, y, z] = Array(3)
        .fill()
        .map(() => THREE.MathUtils.randFloatSpread(3)); // Extremely tight spread
    star.position.set(x, y, z);
    scene.add(star);

    twinkle(star); // Add twinkling effect
}

// Add twinkling effect
function twinkle(star) {
    const duration = Math.random() * 1500 + 1000; // Faster twinkling
    const targetOpacity = Math.random() * 0.6 + 0.4; // Subtle twinkles

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
Array(10000).fill().forEach(createStar); // Maximum star count for ultra-density

// Add subtle ambient lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // Bright ambient light for vivid stars
scene.add(ambientLight);

// Fast rotation speed
const rotationSpeed = 0.1; // Faster rotation for dynamic space effect

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
