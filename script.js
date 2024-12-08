// Scene Setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 30; // Bring the camera closer
const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Star Parameters
const starCount = 10000; // Increase the number of stars
const starSize = 2.0; // Slightly larger stars
const spread = 100; // Reduce the spread of stars for a denser look

// Create Stars
function createStars() {
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(starCount * 3); // x, y, z for each star

  for (let i = 0; i < starCount; i++) {
    // Generate stars in a confined box
    positions[i * 3] = (Math.random() - 0.5) * spread; // x
    positions[i * 3 + 1] = (Math.random() - 0.5) * spread; // y
    positions[i * 3 + 2] = (Math.random() - 0.5) * 50; // z (reduced depth)
  }

  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

  const material = new THREE.PointsMaterial({
    color: 0xffffff,
    size: starSize,
    sizeAttenuation: true,
    transparent: true,
    opacity: 0.8,
  });

  const stars = new THREE.Points(geometry, material);
  scene.add(stars);
}

// Add Stars to the Scene
createStars();

// Animation Loop
function animate() {
  requestAnimationFrame(animate);
  scene.rotation.y += 0.0005; // Rotate slowly for depth effect
  renderer.render(scene, camera);
}
animate();

// Handle Window Resize
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
