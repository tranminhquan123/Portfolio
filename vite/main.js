import * as THREE from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
const canvas = document.getElementById('canvas');

//1. Create the scene
const scene = new THREE.Scene();
scene.background = new THREE.Color('#222831');

//2. Add the camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 4;

//3. Create and add the object
const geometry = new THREE.DodecahedronGeometry(1, 0);
const material = new THREE.MeshLambertMaterial({color:'#F8E8EE', emissive:'#BBFBFF'});
const dodecahedron = new THREE.Mesh(geometry, material);

const boxGeometry = new THREE.BoxGeometry(2, 0.1, 2);
const boxMaterial = new THREE.MeshStandardMaterial({color:'#BBFBFF', emissive:'#BBFBFF'});
const box = new THREE.Mesh(boxGeometry, boxMaterial);
box.position.y = -1.5;

scene.add(dodecahedron);
scene.add(box);

//4. Light
const light = new THREE.SpotLight('#FFF5E4', 100);
light.position.set(1, 1, 1);
scene.add(light);

//5. Renderer
const  renderer = new THREE.WebGLRenderer({canvas});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

//6. Add OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enabledDamping = true;
controls.dampingFactor = 0.05;
controls.enableZoom = true;
controls.enabledPan = true;

// 7. Animate the scene
function animate() {
    requestAnimationFrame(animate);
    dodecahedron.rotation.x += 0.009;
    dodecahedron.rotation.y += 0.009;
    dodecahedron.rotation.z += 0.009;

    box.rotation.y += 0.005;

    controls.update();
    renderer.render(scene, camera)
}

// 8. Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
})
animate();

