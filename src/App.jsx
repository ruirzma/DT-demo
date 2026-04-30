import { useMemo, useState } from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts'
import DigitalTwinScene from './components/DigitalTwinScene'
import { alerts, batchInfo, deviceDetails, historicalSeries, latestTelemetry, sensorStatus } from './data/mockData'

function evaluateControl(oxygen, temperature, status) {
  if (!status.oxygen || !status.temperature || !status.humidity || !status.ph) {
    return { mode: 'Safety Mode', blowerFrequency: 15, reason: 'Critical sensor offline' }
  }
  if (temperature > 45) {
    return { mode: 'Safety Mode', blowerFrequency: 15, reason: 'Temperature exceeded 45°C' }
  }
  if (oxygen < 16) return { mode: 'Auto Control', blowerFrequency: 45, reason: 'O2 below 16%' }
  if (oxygen < 19) return { mode: 'Auto Control', blowerFrequency: 35, reason: 'O2 between 16% and 19%' }
  if (oxygen <= 21) return { mode: 'Auto Control', blowerFrequency: 25, reason: 'O2 between 19% and 21%' }
  if (oxygen > 22) return { mode: 'Auto Control', blowerFrequency: 15, reason: 'O2 above 22%' }
  return { mode: 'Auto Control', blowerFrequency: 25, reason: 'Stable operating range' }
}

function suitabilityScore({ oxygen, temperature, humidity, ph }) {
  const oxygenScore = Math.max(0, 100 - Math.abs(19 - oxygen) * 18)
  const tempScore = Math.max(0, 100 - Math.abs(38 - temperature) * 6)
  const humidityScore = Math.max(0, 100 - Math.abs(68 - humidity) * 3)
  const phScore = Math.max(0, 100 - Math.abs(7 - ph) * 50)
  return Math.round((oxygenScore + tempScore + humidityScore + phScore) / 4)
}

export default function App() {
  const [selectedKey, setSelectedKey] = useState('tank')
  const [trendVar, setTrendVar] = useState('oxygen')

  const control = evaluateControl(latestTelemetry.oxygen, latestTelemetry.temperature, sensorStatus)
  const score = suitabilityScore(latestTelemetry)

  const controlLogs = useMemo(
    () => [
      {
        timestamp: '2026-04-30 14:30:00 UTC',
        action: `Set blower frequency to ${control.blowerFrequency} Hz`,
        result: `${control.mode} activated (${control.reason})`
      },
      {
        timestamp: '2026-04-30 13:52:00 UTC',
        action: 'Increase blower frequency to 45 Hz',
        result: 'O2 recovered above threshold'
      }
    ],
    [control.blowerFrequency, control.mode, control.reason]
  )

  const selected = deviceDetails[selectedKey]

  return (
    <div className="app">
      <header className="top-bar card">
        <h1>Digital Twin Monitoring and Aeration Control Demo for a Single Aerobic Reactor Unit</h1>
        <div className="top-meta">
          <span>Mode: {control.mode}</span>
          <span>Batch: {batchInfo.experimentBatchId}</span>
          <span>Microbial Suitability Score: {score}/100</span>
        </div>
      </header>

      <main className="main-grid">
        <section className="scene-wrap card">
          <h2>3D Digital Twin Scene</h2>
          <div className="scene"><DigitalTwinScene onSelect={setSelectedKey} /></div>
          <div className="device-popup">
            <h3>{selected.name}</h3>
            <p>Type: {selected.type}</p>
            <p>Status: {selected.status}</p>
            <p>{selected.description}</p>
          </div>
        </section>

        <section className="side-wrap">
          <div className="card monitor-panel">
            <h2>Real-Time Monitoring Panel</h2>
            <div className="metrics-grid">
              <div className="metric"><label>O2 Concentration</label><strong>{latestTelemetry.oxygen}%</strong></div>
              <div className="metric"><label>Temperature</label><strong>{latestTelemetry.temperature}°C</strong></div>
              <div className="metric"><label>Humidity</label><strong>{latestTelemetry.humidity}%</strong></div>
              <div className="metric"><label>pH</label><strong>{latestTelemetry.ph}</strong></div>
              <div className="metric"><label>Blower Frequency</label><strong>{control.blowerFrequency} Hz</strong></div>
              <div className="metric"><label>Operation Mode</label><strong>{control.mode}</strong></div>
              <div className="metric"><label>Current Experiment Batch ID</label><strong>{batchInfo.experimentBatchId}</strong></div>
            </div>
          </div>

          <div className="card control-panel">
            <h2>Aeration Control Logic</h2>
            <p>Current decision: {control.reason}</p>
            <ul>
              <li>If O2 &lt; 16%, set blower to 45 Hz.</li>
              <li>If 16% ≤ O2 &lt; 19%, hold at 35 Hz.</li>
              <li>If 19% ≤ O2 ≤ 21%, hold at 25 Hz.</li>
              <li>If O2 &gt; 22%, reduce to 15 Hz.</li>
              <li>If temperature &gt; 45°C or critical sensor offline, switch to Safety Mode.</li>
            </ul>
            <p>Microbial batch: {batchInfo.microbialBatchId} ({batchInfo.microbialSpecies})</p>
          </div>

          <div className="card logs-panel">
            <h2>Alarm and Control Log</h2>
            <h3>Alarms</h3>
            {alerts.map((a, idx) => <div key={idx} className="log-row"><span>{a.timestamp}</span><span>{a.level}</span><span>{a.device}</span><span>{a.cause}</span><span>{a.result}</span></div>)}
            <h3>Control Actions</h3>
            {controlLogs.map((c, idx) => <div key={idx} className="log-row"><span>{c.timestamp}</span><span>{c.action}</span><span>{c.result}</span></div>)}
          </div>
        </section>
      </main>

      <section className="card chart-wrap">
        <h2>24-Hour Sensor Trend Charts</h2>
        <div className="chart-controls">
          {['oxygen', 'temperature', 'humidity', 'ph'].map((key) => (
            <button key={key} onClick={() => setTrendVar(key)} className={trendVar === key ? 'active' : ''}>{key.toUpperCase()}</button>
          ))}
        </div>
        <div className="chart-container">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={historicalSeries}>
              <CartesianGrid strokeDasharray="3 3" stroke="#35536d" />
              <XAxis dataKey="hour" stroke="#9bb2c5" />
              <YAxis stroke="#9bb2c5" />
              <Tooltip />
              <Line type="monotone" dataKey={trendVar} stroke="#4dd0e1" strokeWidth={3} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </section>
    </div>
  )
}
