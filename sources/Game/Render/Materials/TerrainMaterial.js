import * as THREE from 'three'

import vertexShader from '../shaders/terrain/vertex.glsl'
import fragmentShader from '../shaders/terrain/fragment.glsl'

export default function()
{
    const material = new THREE.ShaderMaterial({
        uniforms:
        {
            uPlayerPosition: { value: null },
            uGradientTexture: { value: null },
            uLightnessSmoothness: { value: null },
            uLightnessEdgeMin: { value: null },
            uLightnessEdgeMax: { value: null },
            uMaxElevation: { value: null },
            uFresnelOffset: { value: null },
            uFresnelScale: { value: null },
            uFresnelPower: { value: null },
            uSunPosition: { value: null },
            uViewportSize: { value: null },
            uFogTexture: { value: null },
            uGrassDistance: { value: null },
            uTexture: { value: null }
        },
        vertexShader: vertexShader,
        fragmentShader: fragmentShader
    })

    return material
}