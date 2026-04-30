# AI-Driven Digital Twin for Aerobic Landfill Remediation and Rapid Stabilization

## Project Overview
A high-fidelity React + Vite demo of a futuristic engineering command center for landfill aerobic remediation. The interface presents a closed-loop workflow from site sensing to AI optimization, execution, degradation response, progress evaluation, alerts, replay simulation, and reporting.

## Installation
```bash
npm install
```

## Run Locally
```bash
npm run dev
```

## Main Features
- Multi-page navigation states: Home, Site Twin, Subsurface, AI Control, Equipment, Simulation, Reports.
- 3D digital twin scene using React Three Fiber:
  - Surface zones (A-D), underground cutaway layers, wells/pipes, AI command center, equipment region.
  - Clickable zone selection and dynamic zone info card.
  - Pulsing sensors and animated data-flow lines.
- KPI strip with live-like metrics and dark glassmorphism UI.
- Layer toggles (O₂, Temperature, Humidity, Pollutant, Microbial, Sensor Layout) affecting scene overlays.
- AI recommendation workflow with `Apply Recommendation` feedback toast and zone metric updates.
- Alerts panel with click-to-focus behavior.
- Timeline + play/pause with simulated updates.
- Phase and mode controls (`Manual Mode` / `AI Auto Mode`) with manual sliders.
- Reports panel and export-action toasts.

## Mock Data
Mock data is defined in `src/data/mockData.js` and includes:
- Zone metrics for Zone A/B/C/D.
- 16 sensors with type, zone, status, xyz position, and latest values.
- Alert stream entries.
- AI recommendation entries.
- Time series for dashboard charts.

## Recommended Future Extensions
- MQTT ingestion for live sensor telemetry.
- Time-series database integration (e.g., InfluxDB / TimescaleDB).
- AI model API integration for real prediction + control recommendations.
- Scenario simulation engine with stochastic weather and fault injection.
- Hardware/PLC integration with control cabinet and fan/valve execution loops.
- Report generation pipeline and PDF export.
