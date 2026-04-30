export const NAV_ITEMS = ['Home', 'Site Twin', 'Subsurface', 'AI Control', 'Equipment', 'Simulation', 'Reports']
export const VIEW_MODES = ['3D View', 'Split View', 'Dashboard View']
export const LAYERS = ['O₂ Layer', 'Temperature', 'Humidity', 'Pollutant', 'Microbial', 'Sensor Layout']
export const PHASES = ['Phase 1 Initial Assessment', 'Phase 2 Active Remediation', 'Phase 3 Stabilization', 'Phase 4 Post-Closure']

export const zones = {
  'Zone A': { oxygen: 13.4, temperature: 37.8, humidity: 43.2, ph: 7.2, degradationRate: 0.72, stabilization: 0.66, risk: 'Low', status: 'Normal' },
  'Zone B': { oxygen: 8.7, temperature: 45.2, humidity: 41.3, ph: 6.8, degradationRate: 0.68, stabilization: 0.62, risk: 'Medium', status: 'Aerating' },
  'Zone C': { oxygen: 11.5, temperature: 63.2, humidity: 38.1, ph: 7.5, degradationRate: 0.54, stabilization: 0.51, risk: 'High', status: 'Warning' },
  'Zone D': { oxygen: 15.1, temperature: 35.9, humidity: 46.7, ph: 7.1, degradationRate: 0.75, stabilization: 0.71, risk: 'Low', status: 'Normal' }
}

export const sensors = Array.from({ length: 16 }).map((_, i) => ({
  id: `SN-${String(i + 1).padStart(2, '0')}`,
  type: ['oxygen', 'temperature', 'humidity', 'pH', 'gas', 'leachate'][i % 6],
  zone: ['Zone A', 'Zone B', 'Zone C', 'Zone D'][i % 4],
  status: i === 11 ? 'warning' : i === 14 ? 'offline' : 'online',
  x: -6 + (i % 8) * 1.6,
  y: i % 2 ? 1.2 : 0.8,
  z: -3 + Math.floor(i / 8) * 3,
  latest: Number((8 + Math.random() * 50).toFixed(1)),
  unit: ['%', '°C', '%', 'pH', 'ppm', 'm'][i % 6]
}))

export const alerts = [
  { id: 1, severity: 'danger', title: 'High Temperature in Zone C', detail: 'Average 63.2 °C exceeds threshold.', time: '10:21 AM', target: 'Zone C' },
  { id: 2, severity: 'warning', title: 'Low O₂ in Zone B', detail: 'Average 8.7% is below target range.', time: '10:20 AM', target: 'Zone B' },
  { id: 3, severity: 'warning', title: 'Leachate Level Rising in MW-12', detail: 'Level increased by 15% in 24h.', time: '10:18 AM', target: 'MW-12' }
]

export const recommendations = [
  'Increase aeration in Zone B by 12%',
  'Reduce moisture injection in Zone C',
  'Inspect MW-12 leachate level',
  'Maintain current aeration in Zone A',
  'Schedule sensor calibration for Sensor O2-B03'
]

export const timeSeries = ['00:00', '06:00', '12:00', '18:00'].map((t, i) => ({
  time: t,
  oxygen: [11.2, 10.4, 9.6, 10.9][i],
  temperature: [42.1, 44.3, 47.8, 43.6][i],
  degradation: [0.52, 0.58, 0.64, 0.68][i],
  stabilization: [0.48, 0.54, 0.58, 0.62][i]
}))
