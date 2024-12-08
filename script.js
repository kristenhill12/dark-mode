// Scene Setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1500);
const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create Stars with THREE.PointsMaterial
function createStar() {
  const starGeometry = new THREE.BufferGeometry();

  // Set star position
  const vertices = new Float32Array([
    Math.random() * 400 - 200, // x position
    Math.random() * 400 - 200, // y position
    Math.random() * 400 - 200, // z position
  ]);
  starGeometry.setAttribute("position", new THREE.BufferAttribute(vertices, 3));

  // Star material with glow
  const starMaterial = new THREE.PointsMaterial({
    color: 0xffffff, // Star color
    size: 1.5, // Star size (adjust for bigger stars)
    transparent: true,
    opacity: 0.9,
    sizeAttenuation: true, // Makes stars appear smaller at a distance
  });

  const star = new THREE.Points(starGeometry, starMaterial);
  scene.add(star);
}

// Add Multiple Stars
const numStars = 2000; // Number of stars
for (let i = 0; i < numStars; i++) {
  createStar();
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate);
  scene.rotation.y += 0.0005; // Slight rotation
  renderer.render(scene, camera);
}
animate();

// Handle Window Resize
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
