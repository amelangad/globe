import * as THREE from '../node_modules/three/build/three.module.js';
import { OrbitControls } from '../node_modules/three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/ window.innerHeight, .2,1000);
const canvas = document.querySelector('#canvas');
const renderer = new THREE.WebGLRenderer({canvas,antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);


const colorYellow = new THREE.Color('hsl(64, 95%, 62%)');
const colorRed= new THREE.Color('hsl(0, 88%, 53%)');

const sphereGeometry = new THREE.SphereGeometry(15,32,32);

const texture = new THREE.TextureLoader().load('../images/earth2.jpg');
const bumpTexture = new THREE.TextureLoader().load('../images/earth.jpg');
const sphereMaterial = new THREE.MeshPhongMaterial( {bumpMap: bumpTexture, map: texture, specularMap: texture});
sphereMaterial.bumpScale = .5;
sphereMaterial.specular  = new THREE.Color('white');

const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);


scene.add(sphere);
camera.position.z = 30;
camera.lookAt(0, 0,0);
const controls = new OrbitControls (camera, renderer.domElement);
//koniec

sphere.rotation.z = 5;
sphere.rotation.x = -6;
sphere.rotation.y = -1;

const light = new THREE.PointLight(colorYellow, 1, 1000);
const light2 = new THREE.PointLight(colorRed,1, 1000);


light.position.z = 500;
light2.position.z = 500;
light.position.x = 0;

scene.add(light);
scene.add(light2);


function animate() {
    requestAnimationFrame(animate);
    sphere.rotation.x += 0.0005;
    sphere.rotation.z -= 0.001;
    sphere.rotation.y -= 0.002;
    renderer.render(scene, camera);
  controls.update();

}
animate();