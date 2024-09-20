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

  private container!: HTMLDivElement
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera
  private renderer!: THREE.WebGLRenderer;
  private controls!: OrbitControls
  private loader!: GLTFLoader
  private model: THREE.Object3D | null = null

  constructor(_container: HTMLDivElement){
    this.container = _container

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xFFFFFF)
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
    this.controls.enablePan = false;

    this.loader = new GLTFLoader()

    //prueba con un cubo
    /* const geometry = new THREE.BoxGeometry( 1, 1, 1 );
    const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    const cube = new THREE.Mesh( geometry, material );
    this.scene.add( cube ); */
  }

  loadModel(url: string) {

    this.clear()

    this.loader.load(url, (gltf)=> {
      this.model = gltf.scene
      var data = this.getSizeObject(this.model)
      this.orbitConfig(data)
      this.scene.add(this.model)
    })
  }

  clear() {
    if(this.model != null){
      this.scene.remove(this.model)
    }
  }

  private orbitConfig(data:any) {
    var maxSide = Math.max(data.width, data.height, data.depth)
    this.camera.position.set(0, data.center.y, (maxSide * 1.3))
    this.controls.target = data.center
  }

  private animate(){
    this.renderer.render(this.scene, this.camera)
  }

  //Helpers
  private getSizeObject(obj: THREE.Object3D) {
    let box = new THREE.Box3().setFromObject(obj)
    var centerPosition = new THREE.Vector3()
    box.getCenter(centerPosition)

    let width = box.max.x - box.min.x
    let height = box.max.y - box.min.y
    let depth = box.max.z - box.min.z

    return {
      width: width,
      height: height,
      depth: depth,
      center: centerPosition
    }
  }

  makeScreenshot():Promise<File> {
    return new Promise((resolve, reject) => {
      this.renderer.render(this.scene, this.camera)
      this.renderer.domElement.toBlob((blob: Blob | null) => {
        if(blob) {
          resolve(new File([blob], "screenshot.png"))
        } else {
          reject("Error al tomar captura de pantalla")
        }
      })
    })
  }

}
