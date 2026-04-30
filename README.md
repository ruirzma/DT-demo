# AI-Driven Digital Twin for Aerobic Landfill Remediation and Rapid Stabilization

## Overview
This project is a presentation-ready, English-only web demo of an AI-driven digital twin platform for aerobic landfill remediation.

It simulates a full closed-loop workflow:
1. Site monitoring
2. Sensor acquisition
3. AI prediction and optimization
4. Aeration/moisture control
5. Equipment execution
6. Subsurface remediation response
7. Progress evaluation
8. Alerts, replay simulation, and reports

## Tech Stack
- React + Vite
- React Three Fiber / Three.js (`@react-three/fiber`, `@react-three/drei`)
- Recharts
- Pure front-end mock data (no backend/API required)

## Features
- Multi-page command center states:
  - Home
  - Site Twin
  - Subsurface
  - AI Control
  - Equipment
  - Simulation
  - Reports
- Interactive view and layer controls:
  - 3D View / Split View / Dashboard View
  - O₂ / Temperature / Humidity / Pollutant / Microbial / Sensor Layout
- Procedural 3D scene:
  - landfill terrain + zone overlays
  - subsurface layered cutaway + depth labels
  - wells, sensor network, control room, equipment fans
  - animated particle/flow effects by active layer
- Timeline replay and mode controls:
  - play/pause, speed (1x/2x/5x), phase switching
  - Manual Mode vs AI Auto Mode
- Scenario simulation:
  - Baseline, Manual Control, AI-Assisted, AI-Optimized, Fault Scenario
- Reporting actions with toast feedback.

## Mock Data
Primary mock data is in:
- `src/data/mockData.js`

It includes:
- zones
- sensors
- equipment
- alerts
- AI recommendations
- scenario profiles
- chart base series

## Installation
```bash
npm install
```

## Run
```bash
npm run dev
```

## Build
```bash
npm run build
```

## Future Extensions
- MQTT / OPC-UA ingestion for real telemetry
- Time-series database integration
- AI model inference API integration
- PLC/control cabinet command channel integration
- PDF/Excel report export pipeline
