import * as THREE from 'three';

export default class ThreeController {

  container!: HTMLDivElement
  scene!: THREE.Scene;
  camera!: THREE.PerspectiveCamera
  renderer!: THREE.WebGLRenderer;


  constructor(_container: HTMLDivElement){
    this.container = _container

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera( 75, this.container.clientWidth / this.container.clientHeight, 0.1, 1000 );
    this.camera.position.z=5;
    this.renderer = new THREE.WebGLRenderer({antialias: true});
    this.renderer.setSize( this.container.clientWidth, this.container.clientHeight );
    this.renderer.setAnimationLoop(() => { this.animate() })
    this.container.appendChild( this.renderer.domElement );

    //prueba con un cubo
    const geometry = new THREE.BoxGeometry( 1, 1, 1 );
    const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    const cube = new THREE.Mesh( geometry, material );
    this.scene.add( cube );
  }

  animate(){
    this.renderer.render(this.scene, this.camera)
  }

}
