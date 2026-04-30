import { Canvas } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';

function SensorPoint({ position, color, label, onClick }) {
  return (
    <mesh position={position} onClick={onClick}>
      <sphereGeometry args={[0.08, 16, 16]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} />
      <Html distanceFactor={12}><div className="sensor-label">{label}</div></Html>
    </mesh>
  );
}

export default function TwinScene({ onSelect }) {
  return (
    <Canvas camera={{ position: [4.8, 3.5, 5], fov: 52 }}>
      <color attach="background" args={['#091124']} />
      <ambientLight intensity={0.8} />
      <directionalLight position={[4, 6, 5]} intensity={1} />
      <mesh position={[0, 1.2, 0]} onClick={() => onSelect('tank')}>
        <cylinderGeometry args={[1.1, 1.1, 2.2, 32]} />
        <meshStandardMaterial color="#2fa7ff" transparent opacity={0.35} metalness={0.4} roughness={0.3} />
      </mesh>
      <mesh position={[-2.2, 0.45, 0]} onClick={() => onSelect('blower')}>
        <boxGeometry args={[0.8, 0.8, 1.2]} />
        <meshStandardMaterial color="#6f7f95" />
      </mesh>
      <mesh position={[2.2, 0.8, -0.6]} onClick={() => onSelect('cabinet')}>
        <boxGeometry args={[0.9, 1.6, 0.6]} />
        <meshStandardMaterial color="#2b3649" />
      </mesh>

      <mesh rotation={[Math.PI / 2, 0, 0]} position={[-1.3, 0.55, 0]}>
        <cylinderGeometry args={[0.08, 0.08, 2.8, 20]} />
        <meshStandardMaterial color="#c7d3df" />
      </mesh>
      {[ -0.8, -0.3, 0.2, 0.7 ].map((z, idx) => (
        <mesh key={z} position={[-0.2 + idx * 0.3, 0.55, z]}>
          <coneGeometry args={[0.05, 0.16, 12]} />
          <meshStandardMaterial color="#64e8ff" emissive="#64e8ff" emissiveIntensity={0.4} />
        </mesh>
      ))}
      <SensorPoint position={[0, 2.45, 0]} color="#7ce8ff" label="O2" onClick={() => onSelect('sensor-o2')} />
      <SensorPoint position={[-0.9, 2.1, 0.5]} color="#ff9b5a" label="Temp" onClick={() => onSelect('sensor-temp')} />
      <SensorPoint position={[0.9, 1.9, -0.4]} color="#7dff91" label="Humidity" onClick={() => onSelect('sensor-hum')} />
      <SensorPoint position={[0.2, 1.3, 1.0]} color="#d995ff" label="pH" onClick={() => onSelect('sensor-ph')} />
      <OrbitControls enablePan={false} maxPolarAngle={Math.PI / 2.1} />
    </Canvas>
  );
}
