export const pages = ['Home', 'Site Twin', 'Subsurface', 'AI Control', 'Equipment', 'Simulation', 'Reports']
export const viewModes = ['3D View', 'Split View', 'Dashboard View']
export const layers = ['O₂ Layer', 'Temperature', 'Humidity', 'Pollutant', 'Microbial', 'Sensor Layout']
export const phases = ['Phase 1 Initial Assessment', 'Phase 2 Active Remediation', 'Phase 3 Stabilization', 'Phase 4 Post-Closure']
export const scenarios = ['Baseline', 'Manual Control', 'AI-Assisted', 'AI-Optimized', 'Fault Scenario']

export const zones = {
  'Zone A': { oxygen: 13.4, temperature: 37.8, humidity: 43.2, ph: 7.2, degradationRate: 0.72, stabilizationIndex: 0.66, pollutantConcentration: 38, microbialActivity: 0.71, risk: 'Low', status: 'Normal', activeWells: '11 / 12' },
  'Zone B': { oxygen: 8.7, temperature: 45.2, humidity: 41.3, ph: 6.8, degradationRate: 0.68, stabilizationIndex: 0.62, pollutantConcentration: 52, microbialActivity: 0.66, risk: 'Medium', status: 'Aerating', activeWells: '12 / 14' },
  'Zone C': { oxygen: 11.5, temperature: 63.2, humidity: 38.1, ph: 7.5, degradationRate: 0.54, stabilizationIndex: 0.51, pollutantConcentration: 67, microbialActivity: 0.49, risk: 'High', status: 'Warning', activeWells: '9 / 14' },
  'Zone D': { oxygen: 15.1, temperature: 35.9, humidity: 46.7, ph: 7.1, degradationRate: 0.75, stabilizationIndex: 0.71, pollutantConcentration: 33, microbialActivity: 0.75, risk: 'Low', status: 'Normal', activeWells: '14 / 14' }
}

export const sensors = Array.from({ length: 22 }).map((_, i) => ({
  id: `S-${String(i + 1).padStart(3, '0')}`,
  type: ['oxygen', 'temperature', 'humidity', 'pH', 'gas', 'leachate'][i % 6],
  zone: ['Zone A', 'Zone B', 'Zone C', 'Zone D'][i % 4],
  status: i % 11 === 0 ? 'warning' : i % 17 === 0 ? 'offline' : 'online',
  value: Number((10 + Math.random() * 55).toFixed(1)),
  unit: ['%', '°C', '%', 'pH', 'ppm', 'm'][i % 6],
  position: [-8 + (i % 11) * 1.6, 0.9 + (i % 3) * 0.25, -4 + Math.floor(i / 11) * 6],
  lastUpdate: '10:23:45'
}))

export const equipment = [
  { id: 'EQ-001', name: 'Control Cabinet', type: 'cabinet', status: 'Online', zone: 'Zone B', power: 92, flowRate: 0, position: [8, 0.7, -4] },
  { id: 'EQ-002', name: 'Fan Unit 01', type: 'fan', status: 'Running', zone: 'Zone B', power: 88, flowRate: 42, position: [8.8, 0.6, -1] },
  { id: 'EQ-003', name: 'Fan Unit 02', type: 'fan', status: 'Standby', zone: 'Zone C', power: 54, flowRate: 30, position: [9.5, 0.6, 1] },
  { id: 'EQ-004', name: 'Valve Group A', type: 'valve', status: 'Open', zone: 'Zone A', power: 75, flowRate: 35, position: [6.4, 0.5, 2] },
  { id: 'EQ-005', name: 'Valve Group B', type: 'valve', status: 'Adjusting', zone: 'Zone C', power: 80, flowRate: 29, position: [7.2, 0.5, 3.5] },
  { id: 'EQ-006', name: 'Gateway', type: 'gateway', status: 'Connected', zone: 'Zone B', power: 97, flowRate: 0, position: [7.4, 1.2, -3] }
]

export const alerts = [
  { id: 1, severity: 'danger', title: 'High Temperature in Zone C', detail: 'Average 63.2 °C exceeds threshold.', target: 'Zone C', time: '10:21 AM' },
  { id: 2, severity: 'warning', title: 'Low O₂ in Zone B', detail: 'Average 8.7% is below target range.', target: 'Zone B', time: '10:20 AM' },
  { id: 3, severity: 'warning', title: 'Leachate Level Rising in MW-12', detail: 'Level increased by 15% in 24h.', target: 'Zone B', time: '10:18 AM' }
]

export const recommendations = ['Increase aeration in Zone B by 12%', 'Inspect MW-12 leachate level', 'Reduce temperature risk in Zone C', 'Maintain current aeration in Zone A']

export const scenarioProfiles = {
  Baseline: { progress: 58.2, risk: 'Medium', oxygenBias: -0.3, tempBias: 1.2 },
  'Manual Control': { progress: 61.3, risk: 'Medium', oxygenBias: 0.0, tempBias: 0.4 },
  'AI-Assisted': { progress: 64.2, risk: 'Low', oxygenBias: 0.4, tempBias: -0.3 },
  'AI-Optimized': { progress: 69.1, risk: 'Low', oxygenBias: 0.8, tempBias: -0.8 },
  'Fault Scenario': { progress: 49.7, risk: 'High', oxygenBias: -0.8, tempBias: 2.1 }
}

export const baseSeries = ['00:00', '06:00', '12:00', '18:00'].map((t, i) => ({ time: t, oxygen: [11.2, 10.4, 9.6, 10.9][i], temperature: [42.1, 44.3, 47.8, 43.6][i], degradation: [0.52, 0.58, 0.64, 0.68][i], stabilization: [0.48, 0.54, 0.58, 0.62][i] }))

// Compatibility aliases for older branch names
export const NAV_ITEMS = pages
export const VIEW_MODES = viewModes
export const LAYERS = layers
export const PHASES = phases
export const timeSeries = baseSeries
