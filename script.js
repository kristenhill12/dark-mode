// Three.js Scene Setup
const scene = new THREE.Scene();
scene.background = new THREE.Color("#081f2b"); // Deep, dark space background

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 1); // Bring camera much closer for immersive feel

const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Generate Even Closer, Larger Stars
function createStarField() {
  const starGeometry = new THREE.BufferGeometry();
  const starCount = 3000; // Increase the number of stars for density
  const positions = new Float32Array(starCount * 3);
  const sizes = new Float32Array(starCount);

  for (let i = 0; i < starCount; i++) {
    // Generate stars tightly packed around the viewer
    const x = (Math.random() - 0.5) * 3; // Smaller range for tighter stars
    const y = (Math.random() - 0.5) * 3;
    const z = (Math.random() - 0.5) * 3;
    positions[i * 3] = x;
    positions[i * 3 + 1] = y;
    positions[i * 3 + 2] = z;

    // Increase size range for closer, larger stars
    sizes[i] = Math.random() * 6 + 3;
  }

  starGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  starGeometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

  const starMaterial = new THREE.ShaderMaterial({
    uniforms: {
      uColor: { value: new THREE.Color(0xffffff) }, // Star color
    },
    vertexShader: `
      attribute float size;
      varying float vSize;
      void main() {
        vSize = size;
        gl_PointSize = size * 200.0 / -mvPosition.z; // Scale star size dynamically
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform vec3 uColor;

      void main() {
        vec2 coord = gl_PointCoord - vec2(0.5); // Center coordinates
        float dist = length(coord); // Distance from center
        float glow = exp(-4.0 * dist * dist); // Glowing effect
        gl_FragColor = vec4(uColor, glow); // Final star appearance
      }
    `,
    transparent: true,
    blending: THREE.AdditiveBlending, // Enhance glow and overlap
    depthWrite: false, // Ensure stars blend nicely
  });

  return new THREE.Points(starGeometry, starMaterial);
}

// Initialize Star Field
const starField = createStarField();
scene.add(starField);

// Animation Loop
function animate() {
  starField.rotation.y += 0.001; // Slightly faster rotation
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

// Handle Window Resize
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Start Animation
animate();
