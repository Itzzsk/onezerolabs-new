'use client'

import { useRef, useEffect, useState, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'

// Cache GLB once globally (fastest loading)
const cache = { scene: null }
useGLTF.preload('/earth.glb')

function useFastGLB() {
  if (cache.scene) return cache.scene
  const gltf = useGLTF('/earth.glb')
  cache.scene = gltf.scene
  return gltf.scene
}

function EarthModel() {
  const earthRef = useRef()
  const scene = useFastGLB()
  const { viewport } = useThree()

  // LIGHT neon material (super cheap on GPU)
  const neonMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: '#00faff',
      emissive: '#0088aa',
      emissiveIntensity: 0.3,
      metalness: 0.2,
      roughness: 0.7,
    })
  }, [])

  // Apply material once
  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        child.material = neonMaterial
        child.material.side = THREE.FrontSide
      }
    })
  }, [scene, neonMaterial])

  // Scale
  const scale = Math.min(viewport.width / 4.5, 2.3)

  // Lightweight rotation
  useFrame((_, delta) => {
    if (earthRef.current) {
      earthRef.current.rotation.y += delta * 0.15
    }
  })

  return (
    <primitive
      ref={earthRef}
      object={scene}
      scale={scale}
      position={[0, 0, 0]}
    />
  )
}

export default function Earth3D() {
  const [mobile, setMobile] = useState(false)

  useEffect(() => {
    const check = () => setMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  return (
    <Canvas
      camera={{
        position: [0, 0, mobile ? 6 : 6.5],
        fov: mobile ? 58 : 50,
      }}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
        preserveDrawingBuffer: false,
        toneMapping: THREE.NoToneMapping,
        clearColor: 'black',
      }}
      onCreated={({ gl }) => {
        gl.setClearColor('#000000')
      }}
      dpr={[1, 1]} // MAX performance
      frameloop="always"
    >
      {/* extremely cheap lighting */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={0.6} />

      <EarthModel />
    </Canvas>
  )
}
