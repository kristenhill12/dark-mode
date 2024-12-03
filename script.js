// Scene setup
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x00101a); // Deep dark background for space

const camera = new THREE.PerspectiveCamera(
    90, // Wide FOV to surround the viewer
    window.innerWidth / window.innerHeight,
    0.1,
    20 // Tighter clipping plane for very close stars
);

camera.position.z = 0.3; // Extremely close for noticeable immersion

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
        Math.random() * 3 + 2, // Massive stars for visibility
        24,
        24
    );

    const material = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: Math.random() * 0.6 + 0.6, // Bright and vivid stars
    });

    const star = new THREE.Mesh(geometry, material);

    const [x, y, z] = Array(3)
        .fill()
        .map(() => THREE.MathUtils.randFloatSpread(1.5)); // Extremely tight spread for proximity
    star.position.set(x, y, z);
    scene.add(star);

    twinkle(star); // Add twinkling effect
}

// Add twinkling effect
function twinkle(star) {
    const duration = Math.random() * 500 + 300; // Very fast twinkling for noticeable changes
    const targetOpacity = Math.random() * 0.7 + 0.5; // Bright twinkles for visibility

    new TWEEN.Tween({ opacity: star.material.opacity })
        .to({ opacity: targetOpacity }, duration)
        .easing(TWEEN.Easing.Quadratic.InOut)
        .onUpdate((obj) => {
            star.material.opacity = obj.opacity; // Update star's opacity
        })
        .onComplete(() => twinkle(star)) // Loop the twinkle
        .start();
}

// Create a hyper-immersive star field
Array(25000).fill().forEach(createStar); // Massive star count for full immersion

// Bright ambient lighting for vivid stars
const ambientLight = new THREE.AmbientLight(0xffffff, 0.8); // Bright ambient light for high visibility
scene.add(ambientLight);

// Extremely fast rotation for noticeable movement
const rotationSpeed = 0.5; // Fast and dynamic rotation

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
