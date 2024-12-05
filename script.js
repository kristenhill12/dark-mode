// Three.js Scene Setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(80, window.innerWidth / window.innerHeight, 0.1, 1500);
const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create Stars
function createStar() {
  const geometry = new THREE.SphereGeometry(Math.random() * 0.1 + 0.1, 24, 24); // Bigger stars
  const material = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: Math.random() * 0.7 + 0.3, // Twinkling effect
  });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(50)); // Very tight spread for closeness
  star.position.set(x, y, z);
  scene.add(star);

  return star;
}

// Add many stars
const stars = Array(1000).fill().map(createStar);

// Twinkling effect
function twinkleStars() {
  stars.forEach((star) => {
    star.material.opacity = Math.random() * 0.7 + 0.3; // Dynamic twinkling
  });
  setTimeout(twinkleStars, 100); // Adjust interval for faster/slower twinkles
}
twinkleStars();

// Add Ambient Light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // Slight glow
scene.add(ambientLight);

// Camera Position
camera.position.z = 5; // Very close to enhance immersion

// Animation Loop
function animate() {
  scene.rotation.y += 0.0008; // Rotate stars for a floating feel
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
animate();

// Handle Window Resize
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
