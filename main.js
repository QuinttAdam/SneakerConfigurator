import './style.css';
import * as THREE from 'three';

// import orbit controls
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// import GLTF loader
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

//iport DRACOLoader
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';


const draco = new DRACOLoader();
draco.setDecoderConfig({ type: 'js' });
draco.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.4.1/');

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

//load cubeTextureLoader from /cubemap
const loader = new THREE.CubeTextureLoader();
const texture = loader.load([
  '/cubemap/px.png',
  '/cubemap/nx.png',
  '/cubemap/py.png',
  '/cubemap/ny.png',
  '/cubemap/pz.png',
  '/cubemap/nz.png',
]);

//add environment map to scene
scene.background = texture;


// make new cylinder geometry
const geometry = new THREE.CylinderGeometry( 3.5, 1.7, 1, 32 );
const material = new THREE.MeshBasicMaterial( {color: 0xffffff} );
const cylinder = new THREE.Mesh( geometry, material );
cylinder.position.set(0, -2, 0);

scene.add( cylinder );



// Orbit controls
const controls = new OrbitControls( camera, renderer.domElement );


// DRACOLoader
const gltfLoader = new GLTFLoader();
// const dracoLoader = new DRACOLoader();
// dracoLoader.setDecoderPath('/examples/jsm/libs/draco/');
// gltfLoader.setDRACOLoader(dracoLoader);
gltfLoader.setDRACOLoader(draco);





//load shoe model
gltfLoader.load('/models/Shoe_compressed.glb', (gltf) => {
  gltf.scene.scale.set(10, 10, 10);
  gltf.scene.position.set(0, 0, 0);
  scene.add(gltf.scene);

  let sneaker = gltf.scene.children[0];
  gltf.scene.rotateY(Math.PI / 2); // Math.PI represents 180 degrees

  //add light to shoe
  const ambientLight = new THREE.DirectionalLight(0xffffff, 1);
  ambientLight.position.set(0, 2, 0).normalize();
  scene.add(ambientLight);

  const colorPicker = document.getElementById('colorPicker');
  const colorPicker2 = document.getElementById('colorPicker2');
  const colorPicker3 = document.getElementById('colorPicker3');
  const colorPicker4 = document.getElementById('colorPicker4');
  const colorPicker5 = document.getElementById('colorPicker5');
  

  colorPicker.addEventListener('input', (event) => {
    const selectedColor = event.target.value;
    updateShoeColor(selectedColor, 'laces');
  });
  colorPicker2.addEventListener('input', (event) => {
    const selectedColor = event.target.value;
    updateShoeColor(selectedColor, 'outside_1');
  });
  colorPicker3.addEventListener('input', (event) => {
    const selectedColor = event.target.value;
    updateShoeColor(selectedColor, 'outside_2');
  });
  colorPicker4.addEventListener('input', (event) => {
    const selectedColor = event.target.value;
    updateShoeColor(selectedColor, 'sole_bottom');
  });
  colorPicker5.addEventListener('input', (event) => {
    const selectedColor = event.target.value;
    updateShoeColor(selectedColor, 'sole_top');
  });
  
  
  function updateShoeColor(color, partName) {
    sneaker.traverse((child) => {
      console.log(child.name);
      if (child.isMesh && child.name === partName) {
        console.log(child.name);
        if (child.name === 'laces') {
          const newColor = new THREE.Color(color);
          child.material.color.copy(newColor);
        }  
        if (child.name ==='outside_1') {
          const newColor = new THREE.Color(color);
          child.material.color.copy(newColor);
        }
        if (child.name ==='outside_2') {
          const newColor = new THREE.Color(color);
          child.material.color.copy(newColor);
          
        }
        if (child.name ==='sole_bottom') {
          console.log(child.name);
          const newColor = new THREE.Color(color);
          child.material.color.copy(newColor);
        }
        if (child.name ==='sole_top') {
          console.log(child.name);
          const newColor = new THREE.Color(color);
          child.material.color.copy(newColor);
        }
      }

    });
  }


});







camera.position.z = 3;
camera.position.y = 0;


function animate() {
	requestAnimationFrame( animate );

	// cube.rotation.x += 0.01;
	// cube.rotation.y += 0.01;

	renderer.render( scene, camera );
}

animate();