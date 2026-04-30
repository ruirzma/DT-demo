import { Canvas } from '@react-three/fiber'
import { OrbitControls, Html, Line } from '@react-three/drei'

function SensorNode({ position, color, label, onClick }) {
  return (
    <mesh position={position} onClick={onClick}>
      <sphereGeometry args={[0.12, 24, 24]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.4} />
      <Html distanceFactor={10}>
        <div className="sensor-label">{label}</div>
      </Html>
    </mesh>
  )
}

function AirflowArrow({ x }) {
  return (
    <group position={[x, 0.8, -0.2]}>
      <mesh>
        <coneGeometry args={[0.08, 0.2, 20]} />
        <meshStandardMaterial color="#4fc3f7" emissive="#4fc3f7" emissiveIntensity={0.5} />
      </mesh>
    </group>
  )
}

export default function DigitalTwinScene({ onSelect }) {
  return (
    <Canvas camera={{ position: [4, 3.5, 6], fov: 50 }}>
      <ambientLight intensity={0.8} />
      <directionalLight position={[5, 5, 2]} intensity={1.2} />

      <mesh position={[0, 0.9, 0]} onClick={() => onSelect('tank')}>
        <cylinderGeometry args={[1.2, 1.2, 2, 40]} />
        <meshStandardMaterial color="#6ec6ff" transparent opacity={0.4} />
      </mesh>

      <mesh position={[-2.8, 0.5, 0]} onClick={() => onSelect('blower')}>
        <boxGeometry args={[1, 1, 1.2]} />
        <meshStandardMaterial color="#90a4ae" />
      </mesh>

      <mesh position={[2.8, 0.8, 0]} onClick={() => onSelect('cabinet')}>
        <boxGeometry args={[1.1, 1.6, 0.9]} />
        <meshStandardMaterial color="#b0bec5" />
      </mesh>

      <Line points={[[-2.3, 0.6, 0], [-1.4, 0.6, 0], [-1.2, 0.6, 0]]} color="#26c6da" lineWidth={4} />
      <Line points={[[1.2, 0.6, 0], [2.2, 0.6, 0]]} color="#26c6da" lineWidth={4} />

      <AirflowArrow x={-1.8} />
      <AirflowArrow x={-1.2} />
      <AirflowArrow x={-0.6} />

      <SensorNode position={[0, 1.9, 0.3]} color="#29b6f6" label="O2" onClick={() => onSelect('oxygen')} />
      <SensorNode position={[0.8, 1.2, 0.8]} color="#ff8a65" label="Temp" onClick={() => onSelect('temperature')} />
      <SensorNode position={[-0.8, 1.2, 0.8]} color="#81c784" label="Humidity" onClick={() => onSelect('humidity')} />
      <SensorNode position={[0, 0.4, 1.1]} color="#ba68c8" label="pH" onClick={() => onSelect('ph')} />

      <gridHelper args={[14, 14, '#26465c', '#1f3242']} position={[0, -0.15, 0]} />
      <OrbitControls enablePan={false} maxDistance={12} minDistance={4} />
    </Canvas>
  )
}
