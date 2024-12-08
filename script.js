// Scene Setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 500);
camera.position.z = 30; // Adjust camera position if needed
const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create Starry Sky
function createStar() {
  const geometry = new THREE.BufferGeometry();
  const vertices = new Float32Array([
    Math.random() * 200 - 100, // x position
    Math.random() * 200 - 100, // y position
    Math.random() * 200 - 100, // z position
  ]);
  geometry.setAttribute("position", new THREE.BufferAttribute(vertices, 3));

  const material = new THREE.PointsMaterial({
    color: 0xffffff,
    size: Math.random() * 2 + 1, // Varying star sizes for a natural look
    transparent: true,
    opacity: 0.9,
    sizeAttenuation: true,
  });

  const star = new THREE.Points(geometry, material);
  scene.add(star);
}

// Add More Stars for a Dense Field
const numStars = 10000; // Adjust for density
for (let i = 0; i < numStars; i++) {
  createStar();
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate);
  scene.rotation.y += 0.001; // Slightly faster rotation
  renderer.render(scene, camera);
}
animate();

// Handle Window Resize
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
