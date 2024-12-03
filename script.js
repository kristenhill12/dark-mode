// Set up the scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create star field
function createStarField() {
  const starGeometry = new THREE.BufferGeometry();
  const starCount = 10000; // Dense star field
  const starPositions = new Float32Array(starCount * 3); // Each star has x, y, z

  for (let i = 0; i < starCount * 3; i++) {
    starPositions[i] = (Math.random() - 0.5) * 100; // Spread stars across a cube
  }

  starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));

  const starMaterial = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 0.7, // Star size
  });

  const starField = new THREE.Points(starGeometry, starMaterial);
  scene.add(starField);

  return starField;
}

// Initialize the star field
const starField = createStarField();

camera.position.z = 30; // Zoom the camera closer for immersion

// Animation loop
function animate() {
  requestAnimationFrame(animate);

  // Rotate the star field
  starField.rotation.y += 0.001; // Subtle rotation
  starField.rotation.x += 0.0005; // Add slight X-axis rotation for depth

  renderer.render(scene, camera);
}

animate();

// Resize handler for responsiveness
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
