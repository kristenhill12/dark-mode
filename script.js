// Scene setup
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x00101a); // Deep dark background for space

const camera = new THREE.PerspectiveCamera(
    85, // Wider FOV for a surrounding star field
    window.innerWidth / window.innerHeight,
    0.1,
    20 // Clipping plane for close and focused rendering
);

camera.position.z = 0.2; // Extremely close for full immersion

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
        Math.random() * 4 + 2.5, // Enormous stars for breathtaking impact
        24,
        24
    );

    const material = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: Math.random() * 0.6 + 0.4, // Bright, glowing stars
    });

    const star = new THREE.Mesh(geometry, material);

    const [x, y, z] = Array(3)
        .fill()
        .map(() => THREE.MathUtils.randFloatSpread(1)); // Extremely tight spread for immersive proximity
    star.position.set(x, y, z);
    scene.add(star);

    twinkle(star); // Add twinkling effect
}

// Add twinkling effect
function twinkle(star) {
    const duration = Math.random() * 300 + 200; // Super fast twinkling for magic-like effect
    const targetOpacity = Math.random() * 0.8 + 0.2; // Bright and dynamic twinkles

    new TWEEN.Tween({ opacity: star.material.opacity })
        .to({ opacity: targetOpacity }, duration)
        .easing(TWEEN.Easing.Quadratic.InOut)
        .onUpdate((obj) => {
            star.material.opacity = obj.opacity; // Update star's opacity
        })
        .onComplete(() => twinkle(star)) // Loop the twinkle
        .start();
}

// Create an overwhelming star field
Array(30000).fill().forEach(createStar); // Extreme density for total immersion

// Add bright ambient lighting for vibrant stars
const ambientLight = new THREE.AmbientLight(0xffffff, 0.9); // Very bright for a glowing effect
scene.add(ambientLight);

// Rotation speed for magical movement
const rotationSpeed = 0.6; // Very noticeable rotation speed

// Animation loop
function animate() {
    scene.rotation.y += rotationSpeed; // Rotate dynamically for impact
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
