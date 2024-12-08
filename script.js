// Scene Setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 500);
const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create Closer Stars
function createStar() {
  const geometry = new THREE.BufferGeometry();
  const vertices = new Float32Array([
    Math.random() * 100 - 50, // x position (reduce spread for closer stars)
    Math.random() * 100 - 50, // y position
    Math.random() * 100 - 50, // z position
  ]);
  geometry.setAttribute("position", new THREE.BufferAttribute(vertices, 3));

  const material = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 2.5, // Larger stars
    transparent: true,
    opacity: 0.9,
    sizeAttenuation: true, // Scales star size with distance
  });

  const star = new THREE.Points(geometry, material);
  scene.add(star);
}

// Add Many Stars
const numStars = 3000; // Dense starfield
for (let i = 0; i < numStars; i++) {
  createStar();
}

// Add Subtle Background Glow
const glowGeometry = new THREE.PlaneGeometry(500, 500);
const glowMaterial = new THREE.MeshBasicMaterial({
  color: 0x101010, // Faint glow color
  opacity: 0.5,
  transparent: true,
});
const glowPlane = new THREE.Mesh(glowGeometry, glowMaterial);
glowPlane.position.z = -100; // Place it in the background
scene.add(glowPlane);

// Animation Loop
function animate() {
  requestAnimationFrame(animate);
  scene.rotation.y += 0.0005; // Slight rotation for depth effect
  renderer.render(scene, camera);
}
animate();

// Handle Window Resize
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
