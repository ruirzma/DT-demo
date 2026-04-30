import { useMemo, useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import TwinScene from './components/TwinScene';
import { systemInfo, realtimeSeed, deviceInfo, microbialBatch } from './data/systemData';
import { trendData } from './data/trendData';

const metrics = {
  o2: { label: 'O2 Concentration (%)', color: '#5ad0ff' },
  temperature: { label: 'Temperature (°C)', color: '#ff9b5a' },
  humidity: { label: 'Humidity (%)', color: '#86ff8a' },
  ph: { label: 'pH', color: '#df95ff' }
};

const randomize = (v, min, max, drift = 0.4) => Math.min(max, Math.max(min, Number((v + (Math.random() - 0.5) * drift).toFixed(2))));

export default function App() {
  const [selectedDevice, setSelectedDevice] = useState('tank');
  const [chartKey, setChartKey] = useState('o2');
  const [realtime, setRealtime] = useState(realtimeSeed);
  const [controlLog, setControlLog] = useState([]);

  useEffect(() => {
    const timer = setInterval(() => {
      setRealtime((prev) => ({
        ...prev,
        o2: randomize(prev.o2, 14.5, 23.5),
        temperature: randomize(prev.temperature, 31, 49, 0.8),
        humidity: randomize(prev.humidity, 55, 80, 1.2),
        ph: randomize(prev.ph, 6.4, 8.2, 0.1)
      }));
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const status = useMemo(() => {
    const offline = Object.values(realtime.sensorStatus).some((s) => s !== 'online');
    if (offline || realtime.temperature > 45) return { mode: 'Safety Mode', hz: 15, reason: offline ? 'Critical sensor offline' : 'Temperature above safety threshold' };
    if (realtime.o2 < 16) return { mode: 'Automatic', hz: 45, reason: 'O2 below 16%' };
    if (realtime.o2 < 19) return { mode: 'Automatic', hz: 35, reason: 'O2 in 16%-19% range' };
    if (realtime.o2 <= 21) return { mode: 'Automatic', hz: 25, reason: 'O2 in target range 19%-21%' };
    if (realtime.o2 > 22) return { mode: 'Automatic', hz: 15, reason: 'O2 above 22%' };
    return { mode: 'Automatic', hz: 25, reason: 'Stable transition zone' };
  }, [realtime]);

  useEffect(() => {
    setRealtime((prev) => ({ ...prev, blowerFrequency: status.hz }));
    setControlLog((prev) => [
      {
        ts: new Date().toISOString().replace('T', ' ').slice(0, 19) + ' UTC',
        action: `Set blower frequency to ${status.hz} Hz`,
        reason: status.reason,
        mode: status.mode
      },
      ...prev
    ].slice(0, 12));
  }, [status]);

  const score = Math.max(0, Math.min(100,
    100 - Math.abs(realtime.o2 - 20) * 8 - Math.abs(realtime.temperature - 37) * 2.5 - Math.abs(realtime.humidity - 68) * 1.2 - Math.abs(realtime.ph - 7) * 18
  )).toFixed(1);

  const alarms = [
    { level: status.mode === 'Safety Mode' ? 'Critical' : 'Info', device: 'Aeration Blower B-01', cause: status.reason, result: `Controller output ${status.hz} Hz` }
  ];

  const selected = deviceInfo.find((d) => d.id === selectedDevice);

  return (
    <div className="page">
      <header className="topbar">
        <h1>{systemInfo.title}</h1>
        <div className="header-stats">
          <span>Operation Mode: <b>{status.mode}</b></span>
          <span>Batch ID: <b>{systemInfo.batchId}</b></span>
          <span>Microbial Suitability Score: <b>{score}</b></span>
        </div>
      </header>
      <main className="grid">
        <section className="scene card"><TwinScene onSelect={setSelectedDevice} /></section>
        <section className="right-column">
          <div className="card monitor-grid">
            {Object.entries({ o2: realtime.o2, temperature: realtime.temperature, humidity: realtime.humidity, ph: realtime.ph, blowerFrequency: realtime.blowerFrequency }).map(([k,v]) => (
              <div key={k} className="metric-card"><label>{k === 'blowerFrequency' ? 'Blower Frequency (Hz)' : metrics[k].label}</label><strong>{v}</strong></div>
            ))}
            <div className="metric-card"><label>Current Experiment Batch ID</label><strong>{microbialBatch.batchId}</strong></div>
          </div>
          <div className="card">
            <h3>Aeration Control Panel</h3>
            <p>Control Rule Result: {status.reason}</p>
            <p>Commanded Blower Frequency: {status.hz} Hz</p>
            <p>Operation Mode: {status.mode}</p>
            {selected && <p>Selected Asset: <b>{selected.name}</b> ({selected.status})</p>}
            {selected && <p>{selected.detail}</p>}
          </div>
          <div className="card split">
            <div>
              <h3>Alarm List</h3>
              {alarms.map((a, i) => <div key={i} className="log-row"><b>{a.level}</b> | {a.device} | {a.cause} | {a.result}</div>)}
            </div>
            <div>
              <h3>Control Action Log</h3>
              {controlLog.slice(0,5).map((l, i) => <div key={i} className="log-row">{l.ts} | {l.action} | {l.reason}</div>)}
            </div>
          </div>
        </section>
      </main>
      <section className="card chart-card">
        <div className="chart-head">
          <h3>24-Hour Sensor Trend Chart</h3>
          <div className="tabs">{Object.keys(metrics).map((key) => <button key={key} onClick={() => setChartKey(key)} className={chartKey === key ? 'active' : ''}>{metrics[key].label}</button>)}</div>
        </div>
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={trendData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#27425c" />
            <XAxis dataKey="time" stroke="#9db7d1" />
            <YAxis stroke="#9db7d1" />
            <Tooltip />
            <Line type="monotone" dataKey={chartKey} stroke={metrics[chartKey].color} strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </section>
    </div>
  );
}
