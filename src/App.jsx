import { useEffect, useMemo, useState } from 'react'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import DigitalTwinScene from './components/three/DigitalTwinScene'
import { pages, viewModes, layers, phases, scenarios, zones as zoneSeed, sensors, alerts, recommendations, scenarioProfiles, baseSeries, equipment } from './data/mockData'
import './styles/globals.css'

const rand = (v, m) => Number((v + (Math.random() - 0.5) * m).toFixed(2))

export default function App() {
  const [activePage, setActivePage] = useState('Home')
  const [activeLayer, setActiveLayer] = useState('O₂ Layer')
  const [viewMode, setViewMode] = useState('3D View')
  const [selectedZone, setSelectedZone] = useState('Zone B')
  const [selectedSensor] = useState('S-003')
  const [activePhase, setActivePhase] = useState('Phase 2 Active Remediation')
  const [activeScenario, setActiveScenario] = useState('AI-Assisted')
  const [operationMode, setOperationMode] = useState('AI Auto Mode')
  const [isPlaying, setPlaying] = useState(true)
  const [currentTime, setCurrentTime] = useState(10.4)
  const [speed, setSpeed] = useState(1)
  const [appliedRecommendation, setAppliedRecommendation] = useState(false)
  const [toastMessage, setToastMessage] = useState('')
  const [controlPulse, setControlPulse] = useState(false)
  const [zones, setZones] = useState(zoneSeed)

  useEffect(() => { const t = setInterval(() => { if (!isPlaying) return; setCurrentTime(v => (v + 0.02 * speed) % 24); setZones(prev => Object.fromEntries(Object.entries(prev).map(([k, v]) => [k, { ...v, oxygen: rand(v.oxygen + (scenarioProfiles[activeScenario].oxygenBias * 0.04), .18), temperature: rand(v.temperature + scenarioProfiles[activeScenario].tempBias * 0.03, .25), humidity: rand(v.humidity, .16) }]))); }, 1500); return () => clearInterval(t) }, [isPlaying, speed, activeScenario])
  useEffect(() => { if (!toastMessage) return; const t = setTimeout(() => setToastMessage(''), 2200); return () => clearTimeout(t) }, [toastMessage])

  const kpi = useMemo(() => {
    const p = scenarioProfiles[activeScenario]
    return [
      ['Sensor Online Rate', activeScenario === 'Fault Scenario' ? '91.2%' : '98.6%', '187 / 190 Online'],
      ['Remediation Progress', `${p.progress.toFixed(1)}%`, `${activeScenario} profile`],
      ['Average O₂', `${(12.4 + p.oxygenBias).toFixed(1)}%`, 'Target: 10–18%'],
      ['Average Temperature', `${(38.7 + p.tempBias).toFixed(1)} °C`, 'Target: < 60 °C'],
      ['Average Humidity', '42.1%', 'Target: 30–60%'],
      ['Risk Score', p.risk, activeScenario === 'Fault Scenario' ? '5.9 / 10' : '2.3 / 10']
    ]
  }, [activeScenario])

  const series = baseSeries.map((r) => ({ ...r, oxygen: Number((r.oxygen + scenarioProfiles[activeScenario].oxygenBias).toFixed(2)), temperature: Number((r.temperature + scenarioProfiles[activeScenario].tempBias).toFixed(2)) }))
  const zone = zones[selectedZone]

  const applyAI = () => { setAppliedRecommendation(true); setControlPulse(true); setZones(p => ({ ...p, 'Zone B': { ...p['Zone B'], oxygen: Number((p['Zone B'].oxygen + 0.7).toFixed(2)), status: 'Aerating' } })); setToastMessage('AI recommendation applied successfully.'); setTimeout(()=>setControlPulse(false), 1300) }

  const pagePanel = () => {
    if (activePage === 'Site Twin') return <div><h3>Zone Overview</h3>{Object.entries(zones).map(([n,z])=><div key={n} className='panel-row' onClick={()=>setSelectedZone(n)}><b>{n}</b><span>O₂ {z.oxygen}% · Temp {z.temperature}°C · {z.status}</span></div>)}<h4>Sensor Distribution</h4><p>{sensors.length} total sensors, {sensors.filter(s=>s.status==='online').length} online.</p></div>
    if (activePage === 'Subsurface') return <div><h3>{activeLayer} Metrics</h3><p>Depth profile active to -50 m.</p><p>Gradient Summary: active biodegradation at -20 m to -35 m.</p><p>Subsurface Alerts: Zone C thermal accumulation, Zone B O₂ deficit.</p></div>
    if (activePage === 'AI Control') return <div><h3>AI Model Status</h3><p>Confidence: 92%</p><p>Predicted O₂(6h): 8.1%</p><p>Predicted Degradation: 0.71 1/day</p><p>Risk Score: 2.3/10</p><button onClick={applyAI}>Apply Recommendation</button><h4>What-if Analysis</h4><p>+12% aeration yields +0.4 O₂ and -8% thermal risk.</p></div>
    if (activePage === 'Equipment') return <div><h3>Equipment Status</h3>{equipment.map(e=><div key={e.id} className='panel-row'><b>{e.name}</b><span>{e.status}</span></div>)}<p>Communication Health: Gateway Connected (99.8%).</p></div>
    if (activePage === 'Simulation') return <div><h3>Scenario Description</h3><div className='btn-grid'>{scenarios.map(s=><button key={s} className={activeScenario===s?'active':''} onClick={()=>{setActiveScenario(s);setToastMessage(`${s} scenario switched.`)}}>{s}</button>)}</div><p>Before/After Summary: {activeScenario} alters risk and progress.</p></div>
    if (activePage === 'Reports') return <div><h3>Report Dashboard</h3><div className='report-grid'><div>Remediation Progress: 64.2%</div><div>Pollutant Reduction: 48.5%</div><div>Average Stabilization Index: 0.62</div><div>Energy Consumption: 1,284 kWh</div><div>System Uptime: 99.1%</div><div>Predicted Completion: 142 days</div></div><div className='btn-grid'><button onClick={()=>setToastMessage('Export Daily Report completed.')}>Export Daily Report</button><button onClick={()=>setToastMessage('Export Weekly Report completed.')}>Export Weekly Report</button><button onClick={()=>setToastMessage('Technical summary generated.')}>Generate Technical Summary</button></div></div>
    return <div><h3>System Status</h3><p className='ok'>All Systems Operational</p><h3>AI Recommendation</h3><p>Increase aeration in Zone B by 12%</p><small>AI model predicts O₂ below optimal range within 6 hours</small><div className='btn-grid'><button onClick={applyAI}>{appliedRecommendation?'Applied':'Apply Recommendation'}</button><button>View Analysis</button></div><h3>Alerts</h3>{alerts.map(a=><div className={`alert ${a.severity}`} key={a.id} onClick={()=>setSelectedZone(a.target)}><b>{a.title}</b><small>{a.detail}</small></div>)}</div>
  }

  return <div className='app-shell'>
    <header className='topbar glass'><h1>AI-Driven Digital Twin for Aerobic Landfill Remediation and Rapid Stabilization</h1><nav>{pages.map(p=><button key={p} className={activePage===p?'active':''} onClick={()=>setActivePage(p)}>{p}</button>)}</nav><div>Engineer ▾</div></header>
    <section className='kpi-row'>{kpi.map(([a,b,c])=><article key={a} className='glass kpi'><h4>{a}</h4><strong>{b}</strong><span>{c}</span></article>)}</section>
    <main className={`main-grid ${viewMode==='Dashboard View'?'dash':''}`}>
      <aside className='glass side-left'><h3>View Mode</h3>{viewModes.map(v=><button key={v} className={viewMode===v?'active':''} onClick={()=>setViewMode(v)}>{v}</button>)}<h3>Layers</h3>{layers.map(l=><button key={l} className={activeLayer===l?'active':''} onClick={()=>setActiveLayer(l)}>{l}</button>)}<div className='weather'>24 °C · Cloudy<br/>Wind: 6.2 m/s NE<br/>Last Update: 10:23:45</div></aside>
      <section className='center glass'>
        <DigitalTwinScene page={activePage} activeLayer={activeLayer} selectedZone={selectedZone} setSelectedZone={setSelectedZone} sensors={sensors} controlPulse={controlPulse} />
        <div className='floating'><h4>{selectedZone}</h4><p>Status: {zone.status}</p><p>Avg O₂: {zone.oxygen}%</p><p>Temperature: {zone.temperature} °C</p><p>Humidity: {zone.humidity}%</p><p>Degradation Rate: {zone.degradationRate}</p><p>Stabilization Index: {zone.stabilizationIndex}</p><p>Active Wells: {zone.activeWells}</p><p>Sensor: {selectedSensor}</p></div>
        {activePage==='AI Control' && <div className='flow glass'>Sensor Input → Data Processing → AI Prediction → Strategy Generation → Control Execution → Feedback</div>}
      </section>
      <aside className='glass side-right'>{pagePanel()}<div className='mini'><ResponsiveContainer width='100%' height={180}><LineChart data={series}><XAxis dataKey='time' stroke='#87a7bb' /><YAxis stroke='#87a7bb' /><Tooltip /><Line dataKey='oxygen' stroke={activeLayer==='Temperature'?'#ff7a45':'#00D9FF'} /><Line dataKey='temperature' stroke={activeLayer==='Microbial'?'#42ff8f':'#FFB020'} /></LineChart></ResponsiveContainer></div></aside>
    </main>
    <footer className='bottom glass'><div><button onClick={()=>setCurrentTime(t=>Math.max(0,t-0.5))}>◀</button><button onClick={()=>setPlaying(v=>!v)}>{isPlaying?'Pause':'Play'}</button><button onClick={()=>setCurrentTime(t=>Math.min(24,t+0.5))}>▶</button><select value={speed} onChange={e=>setSpeed(Number(e.target.value))}><option value={1}>1x</option><option value={2}>2x</option><option value={5}>5x</option></select></div><div className='timeline'><span>May 20, 2025 {String(Math.floor(currentTime)).padStart(2,'0')}:23:45</span><em>LIVE</em><input type='range' min='0' max='24' step='0.01' value={currentTime} onChange={e=>setCurrentTime(Number(e.target.value))} /></div><div className='phases'>{phases.map(p=><button key={p} className={activePhase===p?'active':''} onClick={()=>{setActivePhase(p);setToastMessage(`${p} selected.`)}}>{p}</button>)}</div><div className='mode'><button className={operationMode==='Manual Mode'?'active':''} onClick={()=>{setOperationMode('Manual Mode');setToastMessage('Manual mode activated.')}}>Manual Mode</button><button className={operationMode==='AI Auto Mode'?'active pulse':''} onClick={()=>{setOperationMode('AI Auto Mode');setToastMessage('AI Auto mode activated.')}}>AI Auto Mode</button></div></footer>
    {operationMode==='Manual Mode' && <div className='manual glass'>Aeration Intensity <input type='range'/> Moisture Injection <input type='range'/> Monitoring Frequency <input type='range'/></div>}
    {toastMessage && <div className='toast'>{toastMessage}</div>}
  </div>
}
