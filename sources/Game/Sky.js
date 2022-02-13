import * as THREE from 'three'

import Game from './Game.js'
import SkyMaterial from './Materials/SkyMaterial'

export default class Sky
{
    constructor()
    {
        this.game = new Game()
        this.scene = this.game.scene
        this.debug = this.game.debug

        this.radius = 1000

        this.geometry = new THREE.SphereGeometry(this.radius, 128, 64)
        this.material = new SkyMaterial()
        
        this.material.uniforms.uColorDayLow.value.set('#f0fff9')
        this.material.uniforms.uColorDayHigh.value.set('#2e89ff')
        this.material.uniforms.uColorNightLow.value.set('#004794')
        this.material.uniforms.uColorNightHigh.value.set('#001624')
        this.material.uniforms.uColorSun.value.set('#ff4000')
        this.material.uniforms.uColorDawn.value.set('#ff1900')
        this.material.uniforms.uDayProgress.value = 0
        this.material.side = THREE.BackSide
        // this.material.wireframe = true
        this.mesh = new THREE.Mesh(this.geometry, this.material)
        this.scene.add(this.mesh)

        this.setSun()
        this.setDebug()
    }

    setSun()
    {
        this.sun = {}
        this.sun.distance = this.radius - 10
        
        const geometry = new THREE.CircleGeometry(0.02 * this.sun.distance, 32)
        const material = new THREE.MeshBasicMaterial({ color: 0xffffff })
        this.sun.mesh = new THREE.Mesh(geometry, material)
        this.scene.add(this.sun.mesh)
    }

    update()
    {
        const sun = this.game.world.sun
        const player = this.game.world.player

        this.mesh.position.set(
            player.position.current.x,
            player.position.current.y,
            player.position.current.z
        )
        this.material.uniforms.uSunPosition.value.set(sun.position.x, sun.position.y, sun.position.z)
        this.material.uniforms.uDayProgress.value = sun.dayProgress
        
        this.sun.mesh.position.set(
            player.position.current.x + sun.position.x * this.sun.distance,
            player.position.current.y + sun.position.y * this.sun.distance,
            player.position.current.z + sun.position.z * this.sun.distance
        )
        this.sun.mesh.lookAt(
            player.position.current.x,
            player.position.current.y,
            player.position.current.z
        )
    }

    setDebug()
    {
        if(!this.debug.active)
            return

        const debugFolder = this.debug.ui.addFolder('sky')

        debugFolder.addColor(this.material.uniforms.uColorDayLow, 'value').name('uColorDayLow')
        debugFolder.addColor(this.material.uniforms.uColorDayHigh, 'value').name('uColorDayHigh')
        debugFolder.addColor(this.material.uniforms.uColorNightLow, 'value').name('uColorNightLow')
        debugFolder.addColor(this.material.uniforms.uColorNightHigh, 'value').name('uColorNightHigh')
        debugFolder.addColor(this.material.uniforms.uColorSun, 'value').name('uColorSun')
        debugFolder.addColor(this.material.uniforms.uColorDawn, 'value').name('uColorDawn')
    }
}