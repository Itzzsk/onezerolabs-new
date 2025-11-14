'use client'

import { useRef, Suspense } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'

// Preload the GLB model immediately once on app start
useGLTF.preload('/earth1.glb')

function Model() {
  const ref = useRef()
  const { scene } = useGLTF('/earth1.glb')
  const { viewport } = useThree()

  // Larger scale for better visibility
  const scale = Math.min(viewport.width / 2, 4)

  // Smooth continuous rotation
  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.2
    }
  })

  return <primitive ref={ref} object={scene} scale={scale} position={[0, 0, 0]} dispose={null} />
}

export default function Earth3D2() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 50 }}
      gl={{
        antialias: false, // Disable antialias for performance boost
        powerPreference: 'high-performance',
        alpha: true,
      }}
      dpr={[1, 1.5]} // Limit DPR to balance quality and performance
      frameloop="always" // Continuous animation frame updates
      style={{ width: '100%', height: '100%' }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} />
        <pointLight position={[-5, -5, -5]} intensity={0.5} />
        <Model />
      </Suspense>
    </Canvas>
  )
}
