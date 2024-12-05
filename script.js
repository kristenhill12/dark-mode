// Three.js Scene Setup
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x00101a); // Deep, dark space

const camera = new THREE.PerspectiveCamera(80, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 3; // Close to stars

const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Texture Loader for Star Shape
const textureLoader = new THREE.TextureLoader();
const starTexture = textureLoader.load("star.png"); // Use your star-shaped texture file here

// Create Stars with Texture
function createStarField() {
  const starGeometry = new THREE.BufferGeometry();
  const starCount = 2000; // Increase star density for immersive feel
  const positions = new Float32Array(starCount * 3);

  for (let i = 0; i < starCount; i++) {
    const x = (Math.random() - 0.5) * 10; // Compact spread
    const y = (Math.random() - 0.5) * 10;
    const z = (Math.random() - 0.5) * 10;
    positions[i * 3] = x;
    positions[i * 3 + 1] = y;
    positions[i * 3 + 2] = z;
  }

  starGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  const starMaterial = new THREE.PointsMaterial({
    size: 0.5, // Larger stars
    map: starTexture, // Apply the star texture
    transparent: true,
    depthWrite: false, // Ensures stars are rendered on top of each other
    blending: THREE.AdditiveBlending, // Glow effect
    opacity: 0.8,
  });

  return new THREE.Points(starGeometry, starMaterial);
}

// Initialize Star Field
const starField = createStarField();
scene.add(starField);

// Subtle Rotation
function animate() {
  requestAnimationFrame(animate);

  starField.rotation.y += 0.0008; // Smooth rotation
  starField.rotation.x += 0.0003;

  renderer.render(scene, camera);
}

// Handle Window Resize
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Start Animation
animate();
