// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create a star field with depth
function createStarField() {
  const starGeometry = new THREE.BufferGeometry();
  const starCount = 15000; // Very dense star field
  const positions = new Float32Array(starCount * 3);

  for (let i = 0; i < starCount * 3; i += 3) {
    positions[i] = (Math.random() - 0.5) * 100; // X position
    positions[i + 1] = (Math.random() - 0.5) * 100; // Y position
    positions[i + 2] = (Math.random() - 0.5) * 400; // Z position (depth)
  }

  starGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  const starMaterial = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 1.5, // Star size
    transparent: true,
    opacity: 0.8,
  });

  const starField = new THREE.Points(starGeometry, starMaterial);
  scene.add(starField);

  return starField;
}

// Initialize the star field
const starField = createStarField();

camera.position.z = 50; // Start slightly away from the star field

// Scroll interaction
let scrollY = 0;
window.addEventListener('scroll', () => {
  scrollY = window.scrollY / 10; // Adjust this value for sensitivity
});

// Animate the stars and scrolling motion
function animate() {
  requestAnimationFrame(animate);

  // Apply scrolling motion
  camera.position.z -= scrollY * 0.05; // Fly through stars as you scroll

  // Rotate the star field for dynamic effect
  starField.rotation.y += 0.0005;
  starField.rotation.x += 0.0003;

  renderer.render(scene, camera);
}

animate();

// Resize handler for responsiveness
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
