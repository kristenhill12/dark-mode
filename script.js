// Scene Setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 500);
camera.position.z = 15; // Closer camera for immersive effect
const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create Closer Stars
function createStar() {
  const geometry = new THREE.BufferGeometry();
  const vertices = new Float32Array([
    Math.random() * 50 - 25, // x position (smaller spread for closer stars)
    Math.random() * 50 - 25, // y position
    Math.random() * 50 - 25, // z position
  ]);
  geometry.setAttribute("position", new THREE.BufferAttribute(vertices, 3));

  const material = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 2.5, // Larger stars for better visibility
    transparent: true,
    opacity: 0.9,
    sizeAttenuation: true, // Scales star size with distance
  });

  const star = new THREE.Points(geometry, material);
  scene.add(star);
}

// Add Many Stars
const numStars = 5000; // Dense starfield
for (let i = 0; i < numStars; i++) {
  createStar();
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate);
  scene.rotation.y += 0.0008; // Slight rotation for depth effect
  renderer.render(scene, camera);
}
animate();

// Handle Window Resize
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
