// Scene setup
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x00101a); // Deep dark space background

// Camera setup for extreme zoom-in
const camera = new THREE.PerspectiveCamera(
    70, // Narrower FOV to emphasize closeness
    window.innerWidth / window.innerHeight,
    0.01,
    5 // Tight clipping for very close stars
);

camera.position.z = 0.005; // Nearly inside the stars for total immersion

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
        Math.random() * 100 + 50, // Massive stars for dramatic foreground presence
        32,
        32
    );

    const material = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: Math.random() * 0.5 + 0.5, // Bright and glowing stars
    });

    const star = new THREE.Mesh(geometry, material);

    const [x, y, z] = Array(3)
        .fill()
        .map(() => THREE.MathUtils.randFloatSpread(0.05)); // Very tight spread for proximity
    star.position.set(x, y, z);
    scene.add(star);

    twinkle(star); // Add magical twinkling effect
}

// Add twinkling effect for dynamic stars
function twinkle(star) {
    const duration = Math.random() * 30 + 20; // Super-fast twinkling for magical sparkle
    const targetOpacity = Math.random() * 0.8 + 0.3; // Bright dynamic twinkles

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
Array(300000).fill().forEach(createStar); // Extreme star count for overwhelming density

// Bright ambient lighting for glowing stars
const ambientLight = new THREE.AmbientLight(0xffffff, 2); // Vibrant and glowing stars
scene.add(ambientLight);

// Very fast rotation for noticeable immersion
const rotationSpeed = 4.5; // Rapid and dynamic rotation

// Animation loop
function animate() {
    scene.rotation.y += rotationSpeed; // Rotate dynamically for noticeable motion
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
