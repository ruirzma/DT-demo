import { Canvas, useFrame } from '@react-three/fiber'
import { Html, OrbitControls, Line } from '@react-three/drei'
import { useMemo, useRef } from 'react'

function PulseNode({ sensor, onSelect, emphasize }) {
  const ref = useRef()
  useFrame(({ clock }) => {
    const s = 1 + Math.sin(clock.elapsedTime * 3 + sensor.x) * 0.15
    ref.current.scale.set(s, s, s)
  })
  const color = sensor.status === 'offline' ? '#64748b' : sensor.status === 'warning' ? '#FFB020' : emphasize ? '#00F5C8' : '#00D9FF'
  return <mesh ref={ref} position={[sensor.x, sensor.y, sensor.z]} onClick={() => onSelect(sensor.zone)}><sphereGeometry args={[0.11, 14, 14]} /><meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.6} /></mesh>
}

function Zone({ name, position, selected, onSelect }) {
  return <group position={position} onClick={() => onSelect(name)}>
    <mesh rotation={[-Math.PI / 2, 0, 0]}><circleGeometry args={[2.2, 48]} /><meshStandardMaterial color={selected ? '#00D9FF' : '#233547'} emissive={selected ? '#00D9FF' : '#000'} transparent opacity={0.65} /></mesh>
    <Line points={[[-1.6, 0.02, -1.6], [1.6, 0.02, -1.6], [1.6, 0.02, 1.6], [-1.6, 0.02, 1.6], [-1.6, 0.02, -1.6]]} color="#00D9FF" />
    <Html position={[0, 0.2, 0]}><div className='zone-label'>{name}</div></Html>
  </group>
}

export default function DigitalTwinScene({ activeLayer, selectedZone, onSelectZone, sensors }) {
  const layerColor = useMemo(() => ({ 'O₂ Layer': '#00D9FF', Temperature: '#ff6432', Humidity: '#3ba7ff', Pollutant: '#b45cff', Microbial: '#35FF90', 'Sensor Layout': '#00F5C8' }[activeLayer] || '#00D9FF'), [activeLayer])
  return <Canvas camera={{ position: [16, 13, 16], fov: 42 }}>
    <color attach="background" args={['#040b18']} />
    <ambientLight intensity={0.7} />
    <directionalLight position={[6, 12, 6]} intensity={1.2} />
    <mesh position={[0, -0.2, 0]} rotation={[-Math.PI/2,0,0]}><planeGeometry args={[30, 22]} /><meshStandardMaterial color="#0e1a2b" /></mesh>
    <mesh position={[0, -2.8, 0]}><boxGeometry args={[20, 6, 14]} /><meshStandardMaterial color={layerColor} transparent opacity={0.22} /></mesh>
    {[-1,-2,-3,-4,-5].map((d,idx)=><mesh key={d} position={[0,d,0]}><boxGeometry args={[20,0.04,14]} /><meshStandardMaterial color={[ '#24303b','#213746','#26455a','#2f3851','#243a33'][idx]} transparent opacity={0.45} /></mesh>)}

    <Zone name='Zone A' position={[-5,0.1,-3]} selected={selectedZone==='Zone A'} onSelect={onSelectZone} />
    <Zone name='Zone B' position={[2,0.1,-3]} selected={selectedZone==='Zone B'} onSelect={onSelectZone} />
    <Zone name='Zone C' position={[-5,0.1,4]} selected={selectedZone==='Zone C'} onSelect={onSelectZone} />
    <Zone name='Zone D' position={[2,0.1,4]} selected={selectedZone==='Zone D'} onSelect={onSelectZone} />

    <mesh position={[8, 0.9, -5]} onClick={() => onSelectZone('AI Control')}><boxGeometry args={[2.2,1.8,2.2]} /><meshStandardMaterial color="#1f3048" emissive="#00D9FF" emissiveIntensity={0.2} /></mesh>
    <Html position={[8,2,-5]}><div className='zone-label'>AI Command Center</div></Html>
    <mesh position={[8, 0.6, 1]} onClick={() => onSelectZone('Equipment')}><boxGeometry args={[2.8,1.2,2]} /><meshStandardMaterial color="#2a3c4f" /></mesh>

    {Array.from({length: 11}).map((_,i)=><mesh key={i} position={[-8 + i*1.4,-2.4,-5]}><cylinderGeometry args={[0.08,0.08,4.6]} /><meshStandardMaterial color="#15b8ff" emissive="#15b8ff" emissiveIntensity={0.3} /></mesh>)}
    {sensors.map((s)=><PulseNode key={s.id} sensor={s} onSelect={onSelectZone} emphasize={activeLayer==='Sensor Layout'} />)}
    <Line points={[[-6,1,-3],[8,1.2,-5]]} color="#00D9FF" dashed dashSize={0.25} gapSize={0.2} />
    <Line points={[[8,1,-5],[8,1,1],[2,0.4,-3]]} color="#1E88FF" />

    <OrbitControls minDistance={12} maxDistance={30} maxPolarAngle={1.4} />
  </Canvas>
}
