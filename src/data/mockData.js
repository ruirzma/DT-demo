export const batchInfo = {
  experimentBatchId: 'EXP-ARU-2026-04-30-A1',
  microbialBatchId: 'MICRO-BATCH-ALPHA-09',
  microbialSpecies: 'Mixed Aerobic Consortium M-12',
  operator: 'Process Automation Team'
}

export const sensorStatus = {
  oxygen: true,
  temperature: true,
  humidity: true,
  ph: true
}

export const latestTelemetry = {
  timestamp: '2026-04-30T14:30:00Z',
  oxygen: 18.4,
  temperature: 39.8,
  humidity: 67,
  ph: 7.1,
  blowerFrequency: 35,
  operationMode: 'Auto Control'
}

export const alerts = [
  {
    level: 'Medium',
    timestamp: '2026-04-30 13:52:00 UTC',
    device: 'O2 Sensor Node',
    cause: 'Transient oxygen dip to 15.8%',
    result: 'Blower frequency increased to 45 Hz'
  },
  {
    level: 'High',
    timestamp: '2026-04-30 12:40:00 UTC',
    device: 'Temperature Sensor Node',
    cause: 'Temperature peak at 45.7°C',
    result: 'System switched to Safety Mode for cooldown'
  }
]

export const historicalSeries = Array.from({ length: 24 }).map((_, hour) => {
  const oxygen = 17 + Math.sin(hour / 3) * 1.8 + (hour % 4 === 0 ? 0.5 : 0)
  const temperature = 38 + Math.cos(hour / 5) * 3.5 + (hour === 13 ? 4.2 : 0)
  const humidity = 66 + Math.sin(hour / 4) * 6
  const ph = 7 + Math.cos(hour / 7) * 0.3

  return {
    hour: `${String(hour).padStart(2, '0')}:00`,
    oxygen: Number(oxygen.toFixed(2)),
    temperature: Number(temperature.toFixed(2)),
    humidity: Number(humidity.toFixed(2)),
    ph: Number(ph.toFixed(2))
  }
})

export const deviceDetails = {
  tank: {
    name: 'Aerobic Reactor Tank',
    type: 'Reactor Unit',
    status: 'Running',
    description: 'Semi-transparent process vessel for aerobic reaction simulation.'
  },
  blower: {
    name: 'Aeration Blower',
    type: 'Actuator',
    status: 'Running',
    description: 'Provides adjustable airflow according to oxygen control strategy.'
  },
  cabinet: {
    name: 'Control Cabinet',
    type: 'Control Unit',
    status: 'Online',
    description: 'Hosts PLC logic simulation and data acquisition gateway mock.'
  },
  oxygen: {
    name: 'O2 Sensor',
    type: 'Sensor',
    status: 'Online',
    description: 'Measures dissolved oxygen concentration in the reactor headspace.'
  },
  temperature: {
    name: 'Temperature Sensor',
    type: 'Sensor',
    status: 'Online',
    description: 'Tracks process temperature for biological safety control.'
  },
  humidity: {
    name: 'Humidity Sensor',
    type: 'Sensor',
    status: 'Online',
    description: 'Monitors ambient humidity around the reactor zone.'
  },
  ph: {
    name: 'pH Sensor',
    type: 'Sensor',
    status: 'Online',
    description: 'Monitors acidity and alkalinity for microbial suitability analysis.'
  }
}
