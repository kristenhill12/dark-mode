// Scene setup
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x00101a); // Deep dark background for space

const camera = new THREE.PerspectiveCamera(
    80, // Wider FOV for an encompassing star field
    window.innerWidth / window.innerHeight,
    0.1,
    50 // Tighter clipping plane to focus stars near the camera
);

camera.position.z = 0.5; // Extremely close for full immersion

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
        Math.random() * 2 + 1.5, // Bigger stars for proximity
        24,
        24
    );

    const material = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: Math.random() * 0.5 + 0.5, // Bright and vivid stars
    });

    const star = new THREE.Mesh(geometry, material);

    const [x, y, z] = Array(3)
        .fill()
        .map(() => THREE.MathUtils.randFloatSpread(2)); // Extremely tight spread for proximity
    star.position.set(x, y, z);
    scene.add(star);

    twinkle(star); // Add twinkling effect
}

// Add twinkling effect
function twinkle(star) {
    const duration = Math.random() * 800 + 500; // Faster twinkling for dynamic effect
    const targetOpacity = Math.random() * 0.6 + 0.4; // Subtle yet noticeable twinkle

    new TWEEN.Tween({ opacity: star.material.opacity })
        .to({ opacity: targetOpacity }, duration)
        .easing(TWEEN.Easing.Quadratic.InOut)
        .onUpdate((obj) => {
            star.material.opacity = obj.opacity; // Update star's opacity
        })
        .onComplete(() => twinkle(star)) // Loop the twinkle
        .start();
}

// Create a hyper-dense star field
Array(20000).fill().forEach(createStar); // Maximum star count for total immersion

// Ambient light to illuminate stars subtly
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6); // Bright ambient light for vivid stars
scene.add(ambientLight);

// Very fast rotation for noticeable movement
const rotationSpeed = 0.3; // Fast and engaging rotation

// Animation loop
function animate() {
    scene.rotation.y += rotationSpeed; // Rotate the scene for immersion
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
