import * as THREE from 'three'
import Experience from '../Experience'
import vertexShader from '../shaders/cube/vertex_cube.glsl'
import fragmentShader from '../shaders/cube/fragment_cube.glsl'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'

export default class TextThree {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.fontLoader = new FontLoader();

    this.loadFont()
    this.setMaterial()
    this.setMesh()
    this.update()
  }

  loadFont() {
    this.fontLoader.load( 'fonts/helvetiker_regular.typeface.json', (font) => {
      this.geometry = new TextGeometry('6', {
        font: font,
        size: 12,
        depth: 2,
        curveSegments: 42,
        bevelEnabled: false,
        bevelThickness: 0.03,
        bevelSize: 0.02,
        bevelOffset: 0,
        bevelSegments: 5
      });
      this.geometry.center();
      this.mesh.geometry = this.geometry;
    });
  }

  setMaterial() {
    this.material = new THREE.MeshStandardMaterial();
    this.material.metalness = 1
    this.material.roughness = 0
  }

  setMesh() {
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.position.set(0, -7, 0);
    this.mesh.rotation.set(0, 0, 0);

    this.meshPosition = this.mesh.position;
    this.meshQuaternion = this.mesh.quaternion;
    this.scene.add(this.mesh);
  }

  update() {    
    this.mesh.rotation.y -= 0.01;
  }
}