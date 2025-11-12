'use client'

import { useRef, Suspense, useEffect, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'
const EARTH_MODEL_URL =
  process.env.NEXT_PUBLIC_EARTH_MODEL_URL ||
  'https://raw.githubusercontent.com/Itzzsk/onezerolabs-assets/main/earth.glb';

// 🌍 Earth Model with Neon Material
function EarthModel({ scrollRotation, manualRotation, autoRotate }) {
  const earthRef = useRef()
  const autoRotationRef = useRef(0)
  const { scene } = useGLTF(EARTH_MODEL_URL)

  const { viewport } = useThree()

  // Responsive scale (bigger on mobile)
  const scale = Math.min(viewport.width / 4.2, 2.8)

  // Apply a neon-like emissive material
  useEffect(() => {
    if (!scene) return
    scene.traverse((child) => {
      if (child.isMesh && child.material) {
        const mat = child.material.clone()
        mat.emissive = new THREE.Color('#00ffff') // Neon cyan
        mat.emissiveIntensity = 2.5
        mat.metalness = 0.5
        mat.roughness = 0.3
        mat.transparent = true
        mat.opacity = 1
        mat.side = THREE.DoubleSide

        // Add a glowing edge effect using emissive color
        mat.onBeforeCompile = (shader) => {
          shader.fragmentShader = shader.fragmentShader.replace(
            '#include <emissivemap_fragment>',
            `
              #include <emissivemap_fragment>
              float intensity = pow(1.0 - dot(normal, vec3(0.0, 0.0, 1.0)), 3.0);
              gl_FragColor.rgb += intensity * vec3(0.0, 1.0, 1.0) * 1.8;
            `
          )
        }

        child.material = mat
      }
    })
  }, [scene])

  // Rotation animation logic
  useFrame((_, delta) => {
    if (!earthRef.current) return
    if (manualRotation !== 0) {
      earthRef.current.rotation.y = (manualRotation * Math.PI) / 180
      autoRotationRef.current = earthRef.current.rotation.y
    } else if (autoRotate) {
      autoRotationRef.current += delta * 0.25
      earthRef.current.rotation.y = autoRotationRef.current
    } else if (scrollRotation !== undefined) {
      earthRef.current.rotation.y = (scrollRotation * Math.PI) / 180
      autoRotationRef.current = earthRef.current.rotation.y
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

// 🌐 Loader (Spinner)
function Loader() {
  const ref = useRef()
  useFrame(() => {
    if (ref.current) ref.current.rotation.y += 0.03
  })
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshBasicMaterial wireframe color="#00ffff" />
    </mesh>
  )
}

// 🌎 Main Component
export default function Earth3D({
  rotation = 0,
  manualRotation = 0,
  autoRotate = true,
}) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <Canvas
      camera={{
        position: [0, 0, isMobile ? 6 : 6.5], // Closer camera for mobile
        fov: isMobile ? 60 : 50,
      }}
      className="w-full h-full"
      gl={{
        antialias: true,
        powerPreference: 'high-performance',
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.4,
      }}
      dpr={[1, isMobile ? 2 : 2]}
    >
      <Suspense fallback={<Loader />}>
        {/* Deep space background */}
        <color attach="background" args={['#000000']} />

        {/* Lighting setup */}
        <ambientLight intensity={1.2} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#00ffff" />
        <pointLight position={[-10, -10, -8]} intensity={0.8} color="#00bcd4" />
        <directionalLight
          position={[5, 5, 5]}
          intensity={1.5}
          color="#ffffff"
        />

        {/* Earth Model */}
        <EarthModel
          scrollRotation={rotation}
          manualRotation={manualRotation}
          autoRotate={autoRotate}
        />
      </Suspense>
    </Canvas>
  )
}

useGLTF.preload(EARTH_MODEL_URL)
