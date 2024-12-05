// Three.js Scene Setup
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x00101a); // Deep, dark space background

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 3; // Close to stars

const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Star Field Creation with ShaderMaterial
function createStarField() {
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

  const starMaterial = new THREE.ShaderMaterial({
    uniforms: {
      uColor: { value: new THREE.Color(0xffffff) }, // Star color
    },
    vertexShader: `
      varying vec3 vPosition;
      void main() {
        vPosition = position;
        gl_PointSize = 200.0 / -mvPosition.z; // Size of stars based on distance
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform vec3 uColor;
      void main() {
        vec2 coord = gl_PointCoord - vec2(0.5); // Center the coordinates
        float dist = length(coord); // Distance from the center
        float glow = exp(-10.0 * dist); // Create the glowing center
        float rays = sin(6.0 * atan(coord.y, coord.x)) * (1.0 - dist); // Add radial rays
        float intensity = glow + rays * 0.3; // Combine glow and rays
        gl_FragColor = vec4(uColor, intensity * 0.8); // Final star color and brightness
      }
    `,
    transparent: true,
    blending: THREE.AdditiveBlending, // Make stars glow
    depthWrite: false, // Prevent stars from blocking each other
  });

  return new THREE.Points(starGeometry, starMaterial);
}

// Initialize Star Field
const starField = createStarField();
scene.add(starField);

// Animation Loop
function animate() {
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
