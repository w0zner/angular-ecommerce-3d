import * as THREE from 'three';
//import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
//import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
//import { OrbitControls } from 'three/addons/controls/OrbitControls';
//import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
//import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

import { OrbitControls } from 'three-stdlib';
import { GLTFLoader } from 'three-stdlib';
//import { RoomEnvironment } from 'three-stdlib/environments/RoomEnvironment'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment';

export default class ThreeController {

  container!: HTMLDivElement
  scene!: THREE.Scene;
  camera!: THREE.PerspectiveCamera
  renderer!: THREE.WebGLRenderer;
  controls!: OrbitControls
  loader!: GLTFLoader

  constructor(_container: HTMLDivElement){
    this.container = _container

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xCCCCCC)
    this.camera = new THREE.PerspectiveCamera( 75, this.container.clientWidth / this.container.clientHeight, 0.1, 1000 );
    this.camera.position.z=3;
    this.renderer = new THREE.WebGLRenderer({antialias: true});
    this.renderer.setSize( this.container.clientWidth, this.container.clientHeight );
    this.renderer.setAnimationLoop(() => { this.animate() })
    this.container.appendChild( this.renderer.domElement );

    let environment = new RoomEnvironment(this.renderer)
    let paramGenerator = new THREE.PMREMGenerator(this.renderer)
    this.scene.environment = paramGenerator.fromScene(environment).texture

    this.controls = new OrbitControls(this.camera, this.renderer.domElement)

    this.loader = new GLTFLoader()

    //prueba con un cubo
    /* const geometry = new THREE.BoxGeometry( 1, 1, 1 );
    const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    const cube = new THREE.Mesh( geometry, material );
    this.scene.add( cube ); */
  }

  loadModel(url: string) {
    this.loader.load(url, (gltf)=> {
      this.scene.add(gltf.scene)
    })
  }

  animate(){
    this.renderer.render(this.scene, this.camera)
  }

}
