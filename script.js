// Scene setup
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x00101a); // Dark mode friendly and consistent shade

const camera = new THREE.PerspectiveCamera(
    75, // Slightly smaller FOV for a subtle zoom
    window.innerWidth / window.innerHeight,
    0.1,
    1500
);

camera.position.z = 45; // Slightly closer for a subtle zoom

const renderer = new THREE.WebGLRenderer({
    alpha: false, // Disable transparency to avoid blending artifacts
    antialias: true,
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create rotating stars
function createStar() {
    const geometry = new THREE.SphereGeometry(
        Math.random() * 0.03 + 0.02, // Smaller size for stars
        24,
        24
    );
    const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const star = new THREE.Mesh(geometry, material);

    const [x, y, z] = Array(3)
        .fill()
        .map(() => THREE.MathUtils.randFloatSpread(120)); // Slightly closer spread
    star.position.set(x, y, z);
    scene.add(star);
}
Array(500).fill().forEach(createStar);

// Reduce ambient light further
const ambientLight = new THREE.AmbientLight(0xffffff, 0.05); // Subtle glow without light spill
scene.add(ambientLight);

// Rotation speed
const rotationSpeed = 0.0001; // Slightly faster for noticeable but smooth rotation

// Animation loop
function animate() {
    scene.rotation.y += rotationSpeed; // Ensure consistent rotation
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}
animate();

// Resize handler
window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
