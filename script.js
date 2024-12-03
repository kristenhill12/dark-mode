// Scene setup
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x00101a); // Deep dark background for space

// Camera setup
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 0.5; // Bring the stars closer for an immersive feel

const renderer = new THREE.WebGLRenderer({ alpha: false, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create star field
function createStarField() {
  const starGeometry = new THREE.BufferGeometry();
  const starCount = 20000; // High-density star field
  const positions = new Float32Array(starCount * 3);

  for (let i = 0; i < starCount * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 2; // Tightly pack stars
  }

  starGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  const starMaterial = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 0.03, // Vary star size dynamically
    transparent: true,
  });

  const starField = new THREE.Points(starGeometry, starMaterial);
  scene.add(starField);

  return starField;
}

// Twinkling effect
function addTwinkleEffect(starField) {
  const twinkleOpacity = Array(starField.geometry.attributes.position.count)
    .fill()
    .map(() => Math.random() * 0.7 + 0.3);

  function twinkle() {
    for (let i = 0; i < twinkleOpacity.length; i++) {
      twinkleOpacity[i] = Math.random() * 0.7 + 0.3;
    }

    new TWEEN.Tween(starField.material)
      .to({}, 1000) // Smooth twinkle over 1 second
      .onUpdate(() => {
        starField.material.opacity = Math.random() * 0.7 + 0.3;
      })
      .onComplete(twinkle) // Loop twinkle
      .start();
  }

  twinkle();
}

// Initialize star field
const starField = createStarField();
addTwinkleEffect(starField);

// Rotation speed
const rotationSpeed = 0.4;

// Animation loop
function animate() {
  requestAnimationFrame(animate);

  // Rotate the star field
  starField.rotation.y += rotationSpeed * 0.001; // Dynamic but smooth
  renderer.render(scene, camera);

  TWEEN.update(); // Update twinkling animations
}

animate();

// Resize handler for responsiveness
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
