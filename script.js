// Scene setup
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x00101a); // Dark background for space

const camera = new THREE.PerspectiveCamera(
    65, // Slightly narrower FOV for closer perspective
    window.innerWidth / window.innerHeight,
    0.1,
    200 // Clipping plane ensures tight focus
);

camera.position.z = 4; // Bring the camera closer for proximity

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
        Math.random() * 0.4 + 0.3, // Balanced star size for natural proximity
        24,
        24
    );

    const material = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: true, // Enable opacity changes for twinkling
        opacity: Math.random() * 0.5 + 0.5, // Brighter stars
    });

    const star = new THREE.Mesh(geometry, material);

    const [x, y, z] = Array(3)
        .fill()
        .map(() => THREE.MathUtils.randFloatSpread(6)); // Very tight spread
    star.position.set(x, y, z);
    scene.add(star);

    twinkle(star); // Add twinkling effect
}

// Add twinkling effect
function twinkle(star) {
    const duration = Math.random() * 2000 + 1000; // Random twinkling duration
    const targetOpacity = Math.random() * 0.8 + 0.2; // Bright but subtle twinkles

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
Array(6000).fill().forEach(createStar); // Maximum star count for density

// Add subtle ambient lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.4); // Slightly brighter ambient light
scene.add(ambientLight);

// Keep the fast rotation speed
const rotationSpeed = 0.05; // Balanced for immersive rotation

// Animation loop
function animate() {
    scene.rotation.y += rotationSpeed; // Rotate the scene smoothly
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
