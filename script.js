// Scene Setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 500);
camera.position.z = 30; // Adjust to 20 for even closer stars

const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create Stars
function createStar() {
  const geometry = new THREE.BufferGeometry();
  const vertices = new Float32Array([
    Math.random() * 100 - 50, // x position
    Math.random() * 100 - 50, // y position
    Math.random() * 100 - 50, // z position
  ]);
  geometry.setAttribute("position", new THREE.BufferAttribute(vertices, 3));

  const material = new THREE.PointsMaterial({
    color: 0xffffff,
    size: Math.random() * 4 + 2, // Larger stars
    transparent: true,
    opacity: Math.random() * 0.5 + 0.5, // Adds twinkle
    sizeAttenuation: true,
  });
  

  const star = new THREE.Points(geometry, material);
  scene.add(star);
}

// Add Many Stars
const numStars = 10000; // Higher density
for (let i = 0; i < numStars; i++) {
  createStar();
}

// Add Subtle Background Glow
const glowGeometry = new THREE.PlaneGeometry(500, 500);
const glowMaterial = new THREE.MeshBasicMaterial({
  color: 0x000030, // Deep blue
  opacity: 0.9,
  transparent: true,
});
const glowPlane = new THREE.Mesh(glowGeometry, glowMaterial);
glowPlane.position.z = -100; // Place it far in the background
scene.add(glowPlane);

// Animation Loop
function animate() {
  requestAnimationFrame(animate);
  scene.rotation.y += 0.0007; // Slightly faster rotation for more interaction
  renderer.render(scene, camera);
}
animate();

// Handle Window Resize
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
