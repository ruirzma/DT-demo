import { useEffect, useMemo, useState } from 'react'
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts'
import DigitalTwinScene from './components/three/DigitalTwinScene'
import { NAV_ITEMS, VIEW_MODES, LAYERS, PHASES, zones as baseZones, sensors, alerts, timeSeries } from './data/mockData'
import './styles/globals.css'

const jitter = (v, s = 0.2) => Number((v + (Math.random() - 0.5) * s).toFixed(2))

export default function App() {
  const [tab, setTab] = useState('Home')
  const [viewMode, setViewMode] = useState('3D View')
  const [layer, setLayer] = useState('O₂ Layer')
  const [mode, setMode] = useState('AI Auto Mode')
  const [phase, setPhase] = useState('Phase 2 Active Remediation')
  const [playing, setPlaying] = useState(true)
  const [timeline, setTimeline] = useState(10.4)
  const [zones, setZones] = useState(baseZones)
  const [selectedZone, setSelectedZone] = useState('Zone B')
  const [toast, setToast] = useState('')

  useEffect(() => { const t = setInterval(() => { if (playing) { setTimeline(v => (v + 0.03) % 24); setZones(z => Object.fromEntries(Object.entries(z).map(([k, val]) => [k, { ...val, oxygen: jitter(val.oxygen, 0.18), temperature: jitter(val.temperature, 0.28), humidity: jitter(val.humidity, 0.22) }])))} }, 1500); return () => clearInterval(t) }, [playing])

  const kpis = useMemo(() => [{ t: 'Sensor Online Rate', v: '98.6%', s: '187 / 190 Online' }, { t: 'Remediation Progress', v: '64.2%', s: '+3.6% vs last week' }, { t: 'Average O₂', v: '12.4%', s: 'Target: 10–18%' }, { t: 'Average Temperature', v: '38.7 °C', s: 'Target: < 60 °C' }, { t: 'Average Humidity', v: '42.1%', s: 'Target: 30–60%' }, { t: 'Risk Score', v: 'Low', s: '2.3 / 10' }], [])
  const z = zones[selectedZone] || zones['Zone B']

  const applyRecommendation = () => { setZones(prev => ({ ...prev, 'Zone B': { ...prev['Zone B'], oxygen: Number((prev['Zone B'].oxygen + 0.5).toFixed(2)), status: 'Aerating' } })); setToast('AI recommendation applied successfully.'); setTimeout(() => setToast(''), 2400) }

  return <div className='app-shell'>
    <header className='topbar glass'><div><h1>AI-Driven Digital Twin for Aerobic Landfill Remediation and Rapid Stabilization</h1></div><nav>{NAV_ITEMS.map(i => <button key={i} className={tab===i?'active':''} onClick={()=>setTab(i)}>{i}</button>)}</nav><div className='user'>Engineer ▾</div></header>
    <section className='kpi-row'>{kpis.map(k => <article key={k.t} className='glass kpi'><h4>{k.t}</h4><strong>{k.v}</strong><span>{k.s}</span></article>)}</section>
    <main className='main-grid'>
      <aside className='glass side-left'><h3>View Mode</h3>{VIEW_MODES.map(v => <button key={v} onClick={()=>setViewMode(v)} className={viewMode===v?'active':''}>{v}</button>)}<h3>Layers</h3>{LAYERS.map(l => <button key={l} onClick={()=>setLayer(l)} className={layer===l?'active':''}>{l}</button>)}<div className='weather'>24 °C · Cloudy<br/>Wind: 6.2 m/s NE<br/>Last Update: 10:23:45</div></aside>
      <section className='center glass'>
        <DigitalTwinScene activeLayer={layer} selectedZone={selectedZone} onSelectZone={(v)=> setTab(NAV_ITEMS.includes(v)?v:tab) || setSelectedZone(v)} sensors={sensors} />
        <div className='floating'>
          <h4>{selectedZone}</h4><p>Status: {z.status}</p><p>Avg O₂: {z.oxygen}%</p><p>Temperature: {z.temperature} °C</p><p>Humidity: {z.humidity}%</p><p>Degradation Rate: {z.degradationRate} 1/day</p><p>Stabilization Index: {z.stabilization}</p>
        </div>
      </section>
      <aside className='glass side-right'>
        <h3>System Status</h3><p className='ok'>All Systems Operational</p><p>Sensors: 187 / 190</p><p>Equipment: 32 / 32</p><p>Wells: 124 / 128</p><p>Network: 100%</p>
        <h3>AI Recommendation</h3><p>Increase aeration in Zone B by 12%</p><small>AI model predicts O₂ below optimal range within 6 hours</small><div className='btns'><button onClick={applyRecommendation}>Apply Recommendation</button><button>View Analysis</button></div>
        <h3>Alerts (3 Active)</h3>{alerts.map(a => <div key={a.id} className={`alert ${a.severity}`} onClick={() => setSelectedZone(a.target.includes('Zone') ? a.target : 'Zone B')}><strong>{a.title}</strong><small>{a.detail} · {a.time}</small></div>)}
        <div className='mini'><ResponsiveContainer width='100%' height={180}><LineChart data={timeSeries}><XAxis dataKey='time' stroke='#8ea4b8' /><YAxis stroke='#8ea4b8' /><Tooltip /><Line dataKey='oxygen' stroke='#00D9FF' /><Line dataKey='temperature' stroke='#FFB020' /></LineChart></ResponsiveContainer></div>
      </aside>
    </main>
    <footer className='bottom glass'>
      <div><button>◀</button><button onClick={()=>setPlaying(p=>!p)}>{playing?'Pause':'Play'}</button><button>▶</button><span>1x</span></div>
      <div className='timeline'><span>May 20, 2025 10:23:45</span><em>LIVE</em><input type='range' min='0' max='24' step='0.01' value={timeline} onChange={e=>setTimeline(Number(e.target.value))} /></div>
      <div className='phases'>{PHASES.map(p => <button key={p} className={phase===p?'active':''} onClick={()=>setPhase(p)}>{p}</button>)}</div>
      <div className='mode'><button className={mode==='Manual Mode'?'active':''} onClick={()=>setMode('Manual Mode')}>Manual Mode</button><button className={mode==='AI Auto Mode'?'active pulse':''} onClick={()=>setMode('AI Auto Mode')}>AI Auto Mode</button></div>
    </footer>
    {mode==='Manual Mode' && <div className='manual glass'>Aeration Intensity <input type='range'/> Moisture Injection <input type='range'/> Monitoring Frequency <input type='range'/></div>}
    {tab==='Simulation' && <div className='overlay glass'>Baseline · Manual Control · AI-Assisted · AI-Optimized · Fault Scenario</div>}
    {tab==='Reports' && <div className='overlay glass'>Remediation Progress: 64.2% · Pollutant Reduction: 48.5% · Average Stabilization Index: 0.62 · Energy Consumption: 1,284 kWh · System Uptime: 99.1% · Predicted Completion: 142 days <div><button onClick={()=>setToast('Daily report exported.')}>Export Daily Report</button><button onClick={()=>setToast('Weekly report exported.')}>Export Weekly Report</button><button onClick={()=>setToast('Technical summary generated.')}>Generate Technical Summary</button></div></div>}
    {toast && <div className='toast'>{toast}</div>}
  </div>
}
