// Scene Setup
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x00101a); // Deep, dark space background

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 0.5; // Place the camera very close to the star field

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create Star Field
function createStarField() {
  const starGeometry = new THREE.BufferGeometry();
  const starCount = 15000; // Adjust star density as needed
  const positions = new Float32Array(starCount * 3);

  for (let i = 0; i < starCount; i++) {
    const x = (Math.random() - 0.5) * 2; // Compact X
    const y = (Math.random() - 0.5) * 2; // Compact Y
    const z = (Math.random() - 0.5) * 2; // Compact Z
    positions[i * 3] = x;
    positions[i * 3 + 1] = y;
    positions[i * 3 + 2] = z;
  }

  starGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  const starMaterial = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 0.1, // Larger stars for close-up effect
    transparent: true,
    opacity: 1, // Ensure stars are bright
  });

  return new THREE.Points(starGeometry, starMaterial);
}

// Twinkling Effect
function addTwinkling(starField) {
  function twinkle() {
    starField.material.opacity = Math.random() * 0.7 + 0.3; // Random opacity for twinkle effect
    setTimeout(twinkle, 100); // Faster flicker for a magical effect
  }
  twinkle();
}

// Initialize Stars
const starField = createStarField();
scene.add(starField);
addTwinkling(starField);

// Subtle Rotation for Depth
function animate() {
  requestAnimationFrame(animate);

  starField.rotation.y += 0.0005; // Subtle rotation
  starField.rotation.x += 0.0002; // Tilt for added depth

  renderer.render(scene, camera);
}

// Handle Resizing
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Start Animation
animate();
