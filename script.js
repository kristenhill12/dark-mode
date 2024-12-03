// Scene setup
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x00101a); // Deep dark background for space

const camera = new THREE.PerspectiveCamera(
    75, // Wider FOV for a more encompassing star field
    window.innerWidth / window.innerHeight,
    0.1,
    50 // Tighter clipping plane for proximity
);

camera.position.z = 0.8; // Bring the camera into the star field for immersion

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
        Math.random() * 2 + 1, // Larger stars for presence
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
    const duration = Math.random() * 1000 + 800; // Faster twinkling for dynamic effect
    const targetOpacity = Math.random() * 0.6 + 0.4; // Subtle but visible twinkle

    new TWEEN.Tween({ opacity: star.material.opacity })
        .to({ opacity: targetOpacity }, duration)
        .easing(TWEEN.Easing.Quadratic.InOut)
        .onUpdate((obj) => {
            star.material.opacity = obj.opacity; // Update star's opacity
        })
        .onComplete(() => twinkle(star)) // Loop the twinkle
        .start();
}

// Create a star field that surrounds the user
Array(15000).fill().forEach(createStar); // Extreme density for full immersion

// Ambient light to illuminate stars subtly
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // Bright stars without glare
scene.add(ambientLight);

// Faster but smooth rotation
const rotationSpeed = 0.2; // Fast enough to notice but not distracting

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
