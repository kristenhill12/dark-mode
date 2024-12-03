// Scene, Camera, and Renderer Setup
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x00101a); // Deep, dark space background

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 2; // Bring stars closer for immersion

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create Star Field with Variation in Depth and Size
function createStarField() {
  const starGeometry = new THREE.BufferGeometry();
  const starCount = 10000; // High density
  const positions = new Float32Array(starCount * 3);

  for (let i = 0; i < starCount * 3; i += 3) {
    positions[i] = (Math.random() - 0.5) * 5; // X-axis (tight spread)
    positions[i + 1] = (Math.random() - 0.5) * 5; // Y-axis
    positions[i + 2] = (Math.random() - 0.5) * 5; // Z-axis depth
  }

  starGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  const starMaterial = new THREE.PointsMaterial({
    color: 0xffffff,
    size: Math.random() * 0.15 + 0.05, // Vary star sizes dynamically
    transparent: true,
    opacity: 1, // Make stars bright
  });

  return new THREE.Points(starGeometry, starMaterial);
}

// Add Twinkling Effect
function twinkle(starField) {
  const positions = starField.geometry.attributes.position.array;

  function animateTwinkle() {
    for (let i = 0; i < positions.length; i += 3) {
      positions[i + 2] += (Math.random() - 0.5) * 0.02; // Slight z-axis "flicker"
    }

    starField.geometry.attributes.position.needsUpdate = true;

    setTimeout(animateTwinkle, 100); // Adjust interval for twinkle speed
  }

  animateTwinkle();
}

// Initialize Stars
const starField = createStarField();
scene.add(starField);

// Add Twinkling
twinkle(starField);

// Add Subtle Rotation for Dynamic Depth
const rotationSpeed = 0.001; // Subtle for immersion

function animate() {
  requestAnimationFrame(animate);

  // Rotate the stars
  starField.rotation.y += rotationSpeed;
  starField.rotation.x += rotationSpeed * 0.5;

  renderer.render(scene, camera);
}

animate();

// Resize Handler
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
