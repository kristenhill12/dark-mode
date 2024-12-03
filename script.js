// Scene Setup
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x00101a); // Deep space color

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 0.5; // Start very close to stars

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create Star Field
function createStarField() {
  const starGeometry = new THREE.BufferGeometry();
  const starCount = 50000; // Very dense field
  const positions = new Float32Array(starCount * 3);

  for (let i = 0; i < starCount; i++) {
    const x = (Math.random() - 0.5) * 3; // Compact X
    const y = (Math.random() - 0.5) * 3; // Compact Y
    const z = (Math.random() - 0.5) * 3; // Compact Z
    positions[i * 3] = x;
    positions[i * 3 + 1] = y;
    positions[i * 3 + 2] = z;
  }

  starGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  const starMaterial = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 0.05, // Larger stars
    transparent: true,
    opacity: 1,
  });

  return new THREE.Points(starGeometry, starMaterial);
}

// Add Twinkling Effect
function addTwinkling(starField) {
  const positions = starField.geometry.attributes.position.array;

  function twinkle() {
    for (let i = 0; i < positions.length; i += 3) {
      positions[i + 2] += (Math.random() - 0.5) * 0.01; // Flicker Z-axis
    }
    starField.geometry.attributes.position.needsUpdate = true;
    setTimeout(twinkle, 100); // Faster twinkle
  }

  twinkle();
}

// Initialize Star Field
const starField = createStarField();
scene.add(starField);
addTwinkling(starField);

// Subtle Rotation
function animate() {
  requestAnimationFrame(animate);

  starField.rotation.y += 0.001; // Slow Y-axis rotation
  starField.rotation.x += 0.0005; // Subtle X-axis tilt

  renderer.render(scene, camera);
}

animate();

// Handle Resizing
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

