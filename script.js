// Three.js Scene Setup
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x00101a); // Deep space color

const camera = new THREE.PerspectiveCamera(80, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 3; // Bring camera even closer to the stars

const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create Stars
function createStar() {
  const geometry = new THREE.SphereGeometry(Math.random() * 0.2 + 0.1, 24, 24); // Larger stars
  const material = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: Math.random() * 0.7 + 0.3, // Random opacity for twinkling
  });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(10)); // Very compact spread
  star.position.set(x, y, z);
  scene.add(star);

  return star;
}

// Add many stars
const stars = Array(2000).fill().map(createStar); // Increased star density

// Twinkling Effect
function twinkleStars() {
  stars.forEach((star) => {
    star.material.opacity = Math.random() * 0.7 + 0.3; // Dynamic flicker
  });
  setTimeout(twinkleStars, 100); // Faster interval for noticeable twinkle
}
twinkleStars();

// Add Ambient Light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // Slight glow
scene.add(ambientLight);

// Animation Loop
function animate() {
  scene.rotation.y += 0.0008; // Smooth rotation for depth
  scene.rotation.x += 0.0003;

  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

// Handle Window Resize
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Start Animation
animate();
