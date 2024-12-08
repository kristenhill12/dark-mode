// Scene Setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
camera.position.z = 30;

const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.setPixelRatio(window.devicePixelRatio * 1.5); // Increase pixel density
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create Closer Stars
function createStar() {
  const geometry = new THREE.BufferGeometry();
  const vertices = new Float32Array([
    Math.random() * 200 - 100, // x position (reduce spread for closer stars)
    Math.random() * 200 - 100, // y position
    Math.random() * 200 - 100, // z position
  ]);
  geometry.setAttribute("position", new THREE.BufferAttribute(vertices, 3));

  const material = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 1.5, // Smaller stars for sharper rendering
    transparent: true,
    opacity: 0.9,
    sizeAttenuation: true,
  });

  const star = new THREE.Points(geometry, material);
  scene.add(star);
}

// Add Many Stars
const numStars = 3000; // Dense starfield
for (let i = 0; i < numStars; i++) {
  createStar();
}

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
