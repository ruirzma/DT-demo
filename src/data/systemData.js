export const systemInfo = {
  title: 'Digital Twin Monitoring and Aeration Control Demo for a Single Aerobic Reactor Unit',
  reactorName: 'Aerobic Reactor Unit A-01',
  batchId: 'MB-2026-APR-042',
  mode: 'Automatic'
};

export const realtimeSeed = {
  o2: 18.4,
  temperature: 36.8,
  humidity: 67.2,
  ph: 7.1,
  blowerFrequency: 25,
  sensorStatus: {
    o2: 'online',
    temperature: 'online',
    humidity: 'online',
    ph: 'online'
  }
};

export const deviceInfo = [
  { id: 'tank', name: 'Aerobic Reactor Tank', status: 'Running', detail: 'Semi-transparent vessel for aerobic fermentation.' },
  { id: 'blower', name: 'Aeration Blower B-01', status: 'Running', detail: 'Supplies oxygen-enriched air through diffuser pipelines.' },
  { id: 'cabinet', name: 'Control Cabinet C-01', status: 'Healthy', detail: 'Hosts PLC simulation and safety interlock logic.' },
  { id: 'sensor-o2', name: 'O2 Sensor S-O2-01', status: 'Online', detail: 'Measures dissolved oxygen equivalent ratio in process gas.' },
  { id: 'sensor-temp', name: 'Temperature Sensor S-T-01', status: 'Online', detail: 'Monitors reactor internal thermal condition.' },
  { id: 'sensor-hum', name: 'Humidity Sensor S-H-01', status: 'Online', detail: 'Monitors internal humidity of the reactor hood.' },
  { id: 'sensor-ph', name: 'pH Sensor S-PH-01', status: 'Online', detail: 'Monitors slurry acidity and alkalinity.' }
];

export const microbialBatch = {
  batchId: 'MB-2026-APR-042',
  strain: 'Bacillus subtilis Test Strain B12',
  experimentTarget: 'Aerobic digestion efficiency verification',
  inoculationTime: '2026-04-30 06:30:00 UTC'
};
