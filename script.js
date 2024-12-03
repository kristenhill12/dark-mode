// Scene, Camera, and Renderer Setup
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x00101a); // Deep, dark space background

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 0.1; // Very close for immersive stars

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create Star Field
function createStarField() {
  const starGeometry = new THREE.BufferGeometry();
  const starCount = 50000; // Very dense star field
  const positions = new Float32Array(starCount * 3);

  for (let i = 0; i < starCount * 3; i += 3) {
    positions[i] = (Math.random() - 0.5) * 2; // X position (tight)
    positions[i + 1] = (Math.random() - 0.5) * 2; // Y position
    positions[i + 2] = (Math.random() - 0.5) * 2; // Z position
  }

  starGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  const starMaterial = new THREE.PointsMaterial({
    color: 0xffffff,
    size: Math.random() * 0.03 + 0.05, // Stars vary in size for depth
    transparent: true,
    opacity: 1, // Bright and vibrant
  });

  return new THREE.Points(starGeometry, starMaterial);
}

// Add Twinkling Effect
function twinkle(starField) {
  function animateTwinkle() {
    const twinklePositions = starField.geometry.attributes.position.array;

    for (let i = 0; i < twinklePositions.length; i += 3) {
      twinklePositions[i + 2] += (Math.random() - 0.5) * 0.01; // Z-axis flicker
    }

    starField.geometry.attributes.position.needsUpdate = true;

    setTimeout(animateTwinkle, 80); // Faster twinkle
  }

  animateTwinkle();
}

// Initialize Star Field
const starField = createStarField();
scene.add(starField);
twinkle(starField);

// Add Subtle Rotation for Depth
function animate() {
  requestAnimationFrame(animate);

  starField.rotation.y += 0.0005; // Very slow rotation for immersion
  starField.rotation.x += 0.0003;

  renderer.render(scene, camera);
}

// Handle Window Resizing
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Start Animation
animate();
