// Three.js Scene Setup
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x00101a); // Deep, dark space

const camera = new THREE.PerspectiveCamera(80, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 3; // Close to stars

const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create Star Shape with ShaderMaterial
function createStarShape() {
  const starGeometry = new THREE.BufferGeometry();
  const starCount = 1000; // Number of stars
  const positions = new Float32Array(starCount * 3);

  for (let i = 0; i < starCount; i++) {
    const x = (Math.random() - 0.5) * 10; // Compact spread
    const y = (Math.random() - 0.5) * 10;
    const z = (Math.random() - 0.5) * 10;
    positions[i * 3] = x;
    positions[i * 3 + 1] = y;
    positions[i * 3 + 2] = z;
  }

  starGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

  // Star Shader Material
  const starMaterial = new THREE.ShaderMaterial({
    uniforms: {
      uColor: { value: new THREE.Color(0xffffff) },
      uTime: { value: 0 },
    },
    vertexShader: `
      varying vec3 vPosition;
      void main() {
        vPosition = position;
        gl_PointSize = 50.0 / -mvPosition.z; // Size of stars based on distance
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform vec3 uColor;
      varying vec3 vPosition;
      void main() {
        float dist = length(gl_PointCoord - vec2(0.5)); // Calculate distance from center
        float intensity = 1.0 - smoothstep(0.3, 0.5, dist); // Glow effect
        gl_FragColor = vec4(uColor, intensity); // Add glow
      }
    `,
    transparent: true,
    depthWrite: false, // Ensure stars don't block each other
    blending: THREE.AdditiveBlending, // Glow blending
  });

  return new THREE.Points(starGeometry, starMaterial);
}

// Initialize Star Field
const starField = createStarShape();
scene.add(starField);

// Animation Loop
function animate() {
  starField.material.uniforms.uTime.value += 0.05; // Update time for dynamic effects
  starField.rotation.y += 0.0008; // Smooth rotation
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
