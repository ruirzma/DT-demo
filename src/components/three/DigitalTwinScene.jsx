import { Canvas, useFrame } from '@react-three/fiber'
import { Html, OrbitControls, Line } from '@react-three/drei'
import { useMemo, useRef } from 'react'

const lc = { 'O₂ Layer': '#00D9FF', Temperature: '#ff6b3d', Humidity: '#33b5ff', Pollutant: '#aa4cff', Microbial: '#42ff8f', 'Sensor Layout': '#00F5C8' }

const ParticleField = ({ color, count = 80, y = -2.8, spread = 9, speed = 0.2 }) => {
  const refs = useRef([])
  const pts = useMemo(() => Array.from({ length: count }).map(() => [ (Math.random() - 0.5) * spread * 2, y + Math.random() * 2.8, (Math.random() - 0.5) * spread * 1.3 ]), [count, spread, y])
  useFrame(({ clock }) => refs.current.forEach((m, i) => { if (!m) return; m.position.y = pts[i][1] + Math.sin(clock.elapsedTime * speed + i) * 0.5 }))
  return pts.map((p, i) => <mesh key={i} ref={el => (refs.current[i] = el)} position={p}><sphereGeometry args={[0.04, 8, 8]} /><meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.8} transparent opacity={0.65} /></mesh>)
}

const Fan = ({ position }) => { const ref = useRef(); useFrame((_,d)=>{ if(ref.current) ref.current.rotation.z += d * 5 }); return <group position={position}><mesh><cylinderGeometry args={[0.18,0.18,0.2,18]} /><meshStandardMaterial color="#6f8190" /></mesh><mesh ref={ref}><boxGeometry args={[0.02,0.55,0.08]} /><meshStandardMaterial color="#9ec1d8" emissive="#1e88ff" emissiveIntensity={0.2} /></mesh></group> }

function SceneCore({ activeLayer, page, selectedZone, setSelectedZone, sensors, controlPulse }) {
  const color = lc[activeLayer] || '#00D9FF'
  const underground = page === 'Subsurface'
  return <>
    <ambientLight intensity={0.65} /><directionalLight position={[8, 12, 6]} intensity={1.2} /><pointLight position={[8,2,-4]} color='#00D9FF' intensity={1.1} />
    <mesh rotation={[-Math.PI/2,0,0]} position={[0,-0.1,0]}><planeGeometry args={[34, 24, 64, 64]} /><meshStandardMaterial color='#132233' /></mesh>
    {[-5,-1,3].map((x,i)=><mesh key={i} position={[x,0.3 + (i*0.1),i*2-3]}><sphereGeometry args={[3.7 + i*.5,26,18]} /><meshStandardMaterial color='#2d342f' roughness={0.9} /></mesh>)}

    {[['Zone A',[-6,0.35,-3]],['Zone B',[1,0.45,-3]],['Zone C',[-5,0.45,4]],['Zone D',[2,0.4,4]]].map(([n,p])=><group key={n} position={p} onClick={()=>setSelectedZone(n)}><mesh rotation={[-Math.PI/2,0,0]}><ringGeometry args={[1.6,2.1,40]} /><meshBasicMaterial color={selectedZone===n?'#00F5C8':'#00D9FF'} /></mesh><Html position={[0,0.1,0]}><div className='zone-label'>{n}</div></Html></group>)}

    <mesh position={[0,-3,0]}><boxGeometry args={[22,6.5,14]} /><meshStandardMaterial color={color} transparent opacity={underground ? 0.35 : 0.22} /></mesh>
    {['#9f7f40','#af7c3a','#8bcf4e','#b44d3f','#5a4c74'].map((c,i)=><mesh key={i} position={[0,-1.2 - i*1.02,0]}><boxGeometry args={[22,0.72,14]} /><meshStandardMaterial color={c} transparent opacity={0.35} emissive={activeLayer==='Temperature' && i>2 ? '#ff5d33':'#000'} emissiveIntensity={0.18} /></mesh>)}
    {['0 m','-10 m','-20 m','-30 m','-40 m','-50 m'].map((t,i)=><Html key={t} position={[-11.8,0.4 - i,6.8]}><div className='depth'>{t}</div></Html>)}

    {Array.from({ length: 16 }).map((_, i) => <group key={i} position={[-9 + (i%8)*2.5,-2.2,-4 + Math.floor(i/8)*6]}><mesh><cylinderGeometry args={[0.08,0.08,4.6]} /><meshStandardMaterial color='#d3e9ff' /></mesh><mesh position={[0,2.3,0]}><sphereGeometry args={[0.12,10,10]} /><meshStandardMaterial color='#00D9FF' emissive='#00D9FF' emissiveIntensity={0.7} /></mesh></group>)}
    <mesh position={[0,-5.2,0]}><torusGeometry args={[10.2,0.08,12,96]} /><meshStandardMaterial color='#1E88FF' emissive='#1E88FF' emissiveIntensity={0.35} /></mesh>

    {sensors.map((s)=><mesh key={s.id} position={s.position} onClick={()=>setSelectedZone(s.zone)}><sphereGeometry args={[0.09,10,10]} /><meshStandardMaterial color={activeLayer==='Sensor Layout'?'#00F5C8':'#00D9FF'} emissive='#00D9FF' emissiveIntensity={0.6} /></mesh>)}
    <Line points={[[-8,1,-3],[8.1,1.3,-4]]} color='#00D9FF' dashed dashSize={0.2} gapSize={0.16} />
    {controlPulse && <Line points={[[8.2,1,-4],[1.2,0.5,-2.8]]} color='#00F5C8' lineWidth={4} />}

    <group position={[8,0.7,-4]}><mesh><boxGeometry args={[2.7,1.3,2.2]} /><meshStandardMaterial color='#202f40' emissive='#00D9FF' emissiveIntensity={0.2} /></mesh><Html position={[0,1.3,0]}><div className='zone-label'>CONTROL ROOM<br/>AI COMMAND CENTER</div></Html></group>
    <Fan position={[9.1,0.65,-1.5]} /><Fan position={[10,0.65,1]} />
    <mesh position={[-1.5,0.45,-0.2]}><boxGeometry args={[1.2,0.35,0.6]} /><meshStandardMaterial color='#7b8c97' /></mesh>
    <mesh position={[-2.3,0.45,-0.5]}><boxGeometry args={[1.1,0.4,0.5]} /><meshStandardMaterial color='#8495a3' /></mesh>

    {activeLayer === 'O₂ Layer' && <ParticleField color='#00D9FF' speed={2} />}
    {activeLayer === 'Microbial' && <ParticleField color='#42ff8f' y={-3.6} speed={0.8} />}
    {activeLayer === 'Pollutant' && <ParticleField color='#aa4cff' y={-2.5} speed={0.5} />}
    {activeLayer === 'Humidity' && <ParticleField color='#33b5ff' y={-2.8} speed={0.4} />}
  </>
}

export default function DigitalTwinScene(props) {
  const cam = props.page === 'Subsurface' ? [14, 9, 11] : props.page === 'Equipment' ? [12, 8, 8] : [15, 11, 15]
  return <Canvas camera={{ position: cam, fov: 45 }}><color attach='background' args={['#04101f']} /><SceneCore {...props} /><OrbitControls minDistance={10} maxDistance={30} maxPolarAngle={1.45} /></Canvas>
}
