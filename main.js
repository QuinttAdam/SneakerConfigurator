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
renderer.shadowMap.enabled = true;
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
const geometry = new THREE.CylinderGeometry( 3.5, 3.5, 0.3, 32 );
const textureLoader = new THREE.TextureLoader();
const texture2 = textureLoader.load('/textures/wood_cabinet_worn_long_rough_4k.jpg');
const material = new THREE.MeshStandardMaterial( {map:texture2, metalness: 0.2, roughness: 0.5} );
const cylinder = new THREE.Mesh( geometry, material );
cylinder.position.set(0, -1, 0);
cylinder.castShadow = true;
cylinder.receiveShadow = true;


scene.add( cylinder );





// Orbit controls
const controls = new OrbitControls( camera, renderer.domElement );


// DRACOLoader
const gltfLoader = new GLTFLoader();
// const dracoLoader = new DRACOLoader();
// dracoLoader.setDecoderPath('/examples/jsm/libs/draco/');
// gltfLoader.setDRACOLoader(dracoLoader);
gltfLoader.setDRACOLoader(draco);



let sneaker;

//load shoe model
gltfLoader.load('/models/Shoe_compressed.glb', (gltf) => {
  gltf.scene.scale.set(10, 10, 10);
  gltf.scene.position.set(0, 0, 0);
  scene.add(gltf.scene);

  
  sneaker = gltf.scene.children[0];
  gltf.scene.rotateY(Math.PI / 2); // Math.PI represents 180 degrees





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
  

  sneaker.traverse((child) => {
    child.castShadow = true;
  });

  
  function updateShoeColor(color, partName) {
    sneaker.traverse((child) => {
      console.log(child.name);
      // child.castShadow = true;
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


  //add light to shoe
  const ambientLight = new THREE.AmbientLight(0xffffff, 1);
  ambientLight.position.set(0, 2, 0).normalize();
  scene.add(ambientLight);



  //add directional light to shoe
  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.scale.set(0.5, 0.5, 0.5);
  directionalLight.position.set(0, 0.6, 0);
  const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight);
  directionalLight.castShadow = true;


  

  scene.add(directionalLightHelper);
  scene.add(directionalLight);


camera.position.z = 5;
camera.position.y = 0.5;

// add clock
const clock = new THREE.Clock();

function animate() {
	requestAnimationFrame( animate );


  // sneaker.position.y = Math.sin(Date.now() * 0.0001) * 0.1;
  const elapsedTime = clock.getElapsedTime();
  sneaker.position.y = Math.sin(elapsedTime) * 0.03;
  

  
  
  
  // let sneaker animate up and down with cin


	// cube.rotation.x += 0.01;
	// cube.rotation.y += 0.01;

	renderer.render( scene, camera );
}

animate();