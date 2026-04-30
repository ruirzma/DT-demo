# Digital Twin Monitoring and Aeration Control Demo

## System Title
**Digital Twin Monitoring and Aeration Control Demo for a Single Aerobic Reactor Unit**

## Overview
This project is a presentation-ready front-end demo that simulates digital twin monitoring and aeration control logic for one aerobic reactor unit.

It is fully based on mock data and does **not** connect to real hardware, industrial communication protocols, or real databases.

## Tech Stack
- React + Vite
- React Three Fiber / Three.js for 3D twin visualization
- Recharts for 24-hour trend charts

## Features
1. **3D Digital Twin Scene**
   - Semi-transparent aerobic reactor tank
   - Aeration blower and control cabinet
   - Aeration pipeline and animated airflow markers
   - O2, temperature, humidity, and pH sensor points
   - Click selectable assets with device information in the control panel

2. **Real-Time Monitoring Panel**
   - O2 concentration, temperature, humidity, pH
   - Blower frequency
   - Operation mode
   - Current experiment batch ID

3. **Aeration Control Logic**
   - O2 < 16% → 45 Hz
   - 16% ≤ O2 < 19% → 35 Hz
   - 19% ≤ O2 ≤ 21% → 25 Hz
   - O2 > 22% → 15 Hz
   - Temperature > 45°C → Safety Mode
   - Any critical sensor offline → Safety Mode
   - Control action logs generated automatically

4. **Historical Trend Charts**
   - 24-hour trends for O2, temperature, humidity, and pH
   - Variable switching buttons for presentation

5. **Alarm and Control Logs**
   - Alarm level, device, cause, handling result
   - Control action history with timestamps

6. **Microbial Suitability Assessment**
   - Suitability score from 0 to 100
   - Batch metadata and experiment context

## Project Structure
```
src/
  components/
    TwinScene.jsx
  data/
    systemData.js
    trendData.js
  App.jsx
  main.jsx
  styles.css
```

## Mock Data
All mock data files are under `src/data/`:
- `systemData.js`: system information, device metadata, realtime seed values, microbial batch metadata
- `trendData.js`: generated 24-hour historical trend dataset

## Local Run
```bash
npm install
npm run dev
```

## Production Build Check
```bash
npm run build
```

