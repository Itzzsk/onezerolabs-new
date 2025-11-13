'use client'

import React, { Suspense, useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { KernelSize } from 'postprocessing'
import * as THREE from 'three'

useGLTF.preload('/shine.glb')

function Earth() {
  const gltf = useGLTF('/shine.glb')
  const earthRef = useRef()

  const scene = useMemo(() => {
    const model = gltf.scene

    model.traverse((child) => {
      if (child.isMesh) {
        if (child.material) {
          child.material.wireframe = false
          child.material.color = new THREE.Color('#003333')
          child.material.emissive = new THREE.Color('#00ffff')
          child.material.emissiveIntensity = 0.8
          child.material.transparent = true
          child.material.opacity = 0.7
          child.material.metalness = 0.2
          child.material.roughness = 0.15
          child.material.toneMapped = false
          child.material.side = THREE.FrontSide
          child.material.needsUpdate = true
        }
        
        if (child.geometry) child.geometry.computeVertexNormals()
      }
    })

    return model
  }, [gltf.scene])

  useFrame((_, delta) => {
    if (earthRef.current) {
      earthRef.current.rotation.y += delta * 0.22
      earthRef.current.rotation.x += delta * 0.10
      earthRef.current.rotation.z += delta * 0.08
    }
  })

  return <primitive ref={earthRef} object={scene} scale={0.7} />
}

export default function EarthModelHero() {
  return (
    <>
      {/* DESKTOP VERSION - Hidden on mobile */}
      <div className="hidden md:block fixed right-[20vw] top-1/2 -translate-y-1/2 translate-x-1/2 w-[100vmin] h-[100vmin] max-w-[70vw] max-h-[70vw] z-50 pointer-events-none">
        <Canvas
          style={{ width: '100%', height: '100%' }}
          camera={{ position: [0, 0, 4], fov: 45 }}
          dpr={[1, 2]}
          gl={{
            antialias: true,
            powerPreference: 'high-performance',
            physicallyCorrectLights: true,
            outputColorSpace: THREE.SRGBColorSpace,
            alpha: true,
            toneMapping: THREE.NoToneMapping
          }}
        >
          <ambientLight intensity={0.15} />
          <pointLight position={[3, 3, 3]} intensity={0.5} color="#00ffff" />
          <pointLight position={[-3, -3, -3]} intensity={0.3} color="#0088ff" />
          <directionalLight position={[0, 5, 5]} intensity={0.3} color="#00ccff" />
          
          <Suspense fallback={null}>
            <Earth />
          </Suspense>

          <EffectComposer>
            <Bloom
              intensity={0.6}
              kernelSize={KernelSize.SMALL}
              luminanceThreshold={0.4}
              luminanceSmoothing={0.6}
              mipmapBlur
              radius={0.4}
            />
          </EffectComposer>
        </Canvas>
      </div>

      {/* MOBILE VERSION - Hidden on desktop */}
      <div className="block md:hidden fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[140vmin] h-[140vmin] max-w-[95vw] max-h-[95vw] z-50 pointer-events-none">
        <Canvas
          style={{ width: '100%', height: '100%' }}
          camera={{ position: [0, 0, 3.5], fov: 50 }}
          dpr={[1, 2]}
          gl={{
            antialias: true,
            powerPreference: 'high-performance',
            physicallyCorrectLights: true,
            outputColorSpace: THREE.SRGBColorSpace,
            alpha: true,
            toneMapping: THREE.NoToneMapping
          }}
        >
          <ambientLight intensity={0.15} />
          <pointLight position={[3, 3, 3]} intensity={0.5} color="#00ffff" />
          <pointLight position={[-3, -3, -3]} intensity={0.3} color="#0088ff" />
          <directionalLight position={[0, 5, 5]} intensity={0.3} color="#00ccff" />
          
          <Suspense fallback={null}>
            <Earth />
          </Suspense>

          <EffectComposer>
            <Bloom
              intensity={0.6}
              kernelSize={KernelSize.SMALL}
              luminanceThreshold={0.4}
              luminanceSmoothing={0.6}
              mipmapBlur
              radius={0.4}
            />
          </EffectComposer>
        </Canvas>
      </div>
    </>
  )
}
