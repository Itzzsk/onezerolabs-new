'use client'

import { useRef, Suspense, useEffect, useState, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useGLTF, Html, useProgress } from '@react-three/drei'
import * as THREE from 'three'

// Preload GLB model eagerly
useGLTF.preload('/earth.glb')

// Loader UI during suspense fallback
function Loader() {
  const { progress } = useProgress()
  return (
    <Html center>
      <div style={{ color: '#00ffff', fontWeight: 'bold', fontSize: 16 }}>
        Loading {progress.toFixed(0)}%
      </div>
    </Html>
  )
}

function EarthModel() {
  const earthRef = useRef()
  const { scene } = useGLTF('/earth.glb')
  const { viewport } = useThree()

  // Neon glowing material memoization
  const neonMaterial = useMemo(() => {
    const mat = new THREE.MeshStandardMaterial({
      emissive: new THREE.Color('#00ffff'),
      emissiveIntensity: 2.8,
      metalness: 0.5,
      roughness: 0.25,
      transparent: true,
      opacity: 1,
      side: THREE.DoubleSide,
    })

    mat.onBeforeCompile = (shader) => {
      shader.fragmentShader = shader.fragmentShader.replace(
        '#include <emissivemap_fragment>',
        `
          #include <emissivemap_fragment>
          float intensity = pow(1.0 - dot(normal, vec3(0.0, 0.0, 1.0)), 3.0);
          gl_FragColor.rgb += intensity * vec3(0.0, 1.0, 1.0) * 1.6;
        `
      )
    }
    return mat
  }, [])

  // Apply neon material to all meshes on load
  useEffect(() => {
    if (!scene) return
    scene.traverse((child) => {
      if (child.isMesh) child.material = neonMaterial
    })
  }, [scene, neonMaterial])

  const scale = Math.min(viewport.width / 4.2, 2.8)
  const rotationTarget = useRef(0)
  const rotationSpeed = 0.15

  // Smooth continuous rotation with lerp for damping
  useFrame((_, delta) => {
    if (!earthRef.current) return
    rotationTarget.current += delta * rotationSpeed
    earthRef.current.rotation.y = THREE.MathUtils.lerp(
      earthRef.current.rotation.y,
      rotationTarget.current,
      0.08
    )
  })

  return (
    <primitive
      ref={earthRef}
      object={scene}
      scale={scale}
      position={[0, 0, 0]}
      dispose={null} // Proper disposal to avoid memory leaks
    />
  )
}

export default function Earth3D() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', handleResize)
    handleResize()
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <Canvas
      camera={{
        position: [0, 0, isMobile ? 6 : 6.5],
        fov: isMobile ? 60 : 50,
      }}
      className="w-full h-full"
      gl={{
        antialias: true,
        powerPreference: 'high-performance',
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.3,
      }}
      dpr={[1, isMobile ? 1.25 : 1.5]}
      frameloop="always"
    >
      <Suspense fallback={<Loader />}>
        <ambientLight intensity={1.2} />
        <pointLight position={[10, 10, 10]} intensity={1.4} color="#00ffff" />
        <pointLight position={[-10, -10, -8]} intensity={0.7} color="#00bcd4" />
        <directionalLight position={[5, 5, 5]} intensity={1.3} color="#ffffff" />
        <EarthModel />
      </Suspense>
    </Canvas>
  )
}
