import * as THREE from 'three'
import Experience from '../Experience'

export default class Particles {
  constructor() {
    this.experience = new Experience()
    this.scene = this.experience.scene
    this.resources = this.experience.resources
    this.debug = this.experience.debug

    // Debug
    if (this.debug.active) {
      this.debugFolder = this.debug.ui.addFolder('particles')
    }

    this.setInstance()
  }

  setInstance() {
    this.geometry = new THREE.BufferGeometry()
    this.material = new THREE.PointsMaterial({
      size: 0.01,
      sizeAttenuation: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexColors: true
    })

    const count = 1000
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)

    for (let i = 0; i < count * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 100
      colors[i] = Math.random()
    }

    this.geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    this.geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

    this.instance = new THREE.Points(this.geometry, this.material)
    this.scene.add(this.instance)

    // Debug
    if (this.debug.active) {
      this.debugFolder
        .add(this.material, 'size')
        .name('size')
        .step(0.001)
        .min(0)
        .max(0.1)
    }
  }

  update() {
    if (this.instance) {
      this.instance.rotation.y += 0.001
    }
  }
}