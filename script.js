// Scene setup
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x00101a); // Deep dark background for space

const camera = new THREE.PerspectiveCamera(
    90, // Very wide FOV for total star immersion
    window.innerWidth / window.innerHeight,
    0.1,
    20 // Tighter clipping for close rendering
);

camera.position.z = 0.1; // Place the camera directly inside the stars

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
        Math.random() * 5 + 3, // Huge stars for maximum visibility
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
        .map(() => THREE.MathUtils.randFloatSpread(0.5)); // Very tight spread
    star.position.set(x, y, z);
    scene.add(star);

    twinkle(star); // Add twinkling effect
}

// Add twinkling effect
function twinkle(star) {
    const duration = Math.random() * 200 + 100; // Very fast twinkling for magical movement
    const targetOpacity = Math.random() * 0.8 + 0.4; // Bright and dynamic twinkles

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
Array(50000).fill().forEach(createStar); // Maximum star count for extreme density

// Add bright ambient lighting for glowing stars
const ambientLight = new THREE.AmbientLight(0xffffff, 1); // Very bright for glowing stars
scene.add(ambientLight);

// Very fast rotation for dynamic immersion
const rotationSpeed = 1.0; // Rapid and noticeable rotation

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
