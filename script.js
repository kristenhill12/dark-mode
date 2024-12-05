// Three.js Scene Setup
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x00101a); // Deep, dark background

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 2; // Closer to stars for a more immersive feel

const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Star Field Creation with Variety
function createStarField() {
  const starGeometry = new THREE.BufferGeometry();
  const starCount = 2000; // Number of stars
  const positions = new Float32Array(starCount * 3);
  const sizes = new Float32Array(starCount);

  for (let i = 0; i < starCount; i++) {
    const x = (Math.random() - 0.5) * 5; // Pack stars tightly
    const y = (Math.random() - 0.5) * 5;
    const z = (Math.random() - 0.5) * 5;
    positions[i * 3] = x;
    positions[i * 3 + 1] = y;
    positions[i * 3 + 2] = z;

    sizes[i] = Math.random() * 2 + 1; // Random star sizes
  }

  starGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  starGeometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

  const starMaterial = new THREE.ShaderMaterial({
    uniforms: {
      uColor: { value: new THREE.Color(0xffffff) }, // Star color
      uTime: { value: 0 }, // Time for animation
    },
    vertexShader: `
      attribute float size;
      varying float vSize;
      void main() {
        vSize = size;
        gl_PointSize = size * 100.0 / -mvPosition.z; // Size scales with distance
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform vec3 uColor;
      varying float vSize;

      void main() {
        vec2 coord = gl_PointCoord - vec2(0.5); // Center the coordinates
        float dist = length(coord); // Distance from the center
        float glow = exp(-5.0 * dist * dist); // Bright glowing core
        float rays = sin(8.0 * atan(coord.y, coord.x)) * (1.0 - dist); // Radial spikes
        float intensity = glow + rays * 0.5; // Combine glow and rays
        gl_FragColor = vec4(uColor, intensity * 0.8); // Final star color
      }
    `,
    transparent: true,
    blending: THREE.AdditiveBlending, // Enhance glow effect
    depthWrite: false, // Ensure stars overlap nicely
  });

  return new THREE.Points(starGeometry, starMaterial);
}

// Initialize Star Field
const starField = createStarField();
scene.add(starField);

// Animation Loop
function animate() {
  starField.material.uniforms.uTime.value += 0.05; // Update time for dynamic effects
  starField.rotation.y += 0.001; // Smooth Y-axis rotation
  starField.rotation.x += 0.0005; // Subtle X-axis tilt
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
