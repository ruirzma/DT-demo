# Digital Twin Monitoring and Aeration Control Demo for a Single Aerobic Reactor Unit

This project is a fully runnable front-end demonstration of a digital twin system for a single aerobic reactor unit. It uses **mock data only** and does not connect to real equipment, databases, or industrial protocols.

## Tech Stack

- React + Vite
- React Three Fiber (Three.js) for a simplified 3D digital twin scene
- Recharts for 24-hour sensor trends

## Features

- **3D Digital Twin Scene**
  - Semi-transparent aerobic reactor tank
  - Aeration blower
  - Control cabinet
  - Aeration pipelines
  - Sensor points for O2, temperature, humidity, and pH
  - Animated airflow direction indicators
  - Clickable devices and sensors with information popup cards

- **Real-Time Monitoring Panel**
  - O2 concentration
  - Temperature
  - Humidity
  - pH
  - Blower frequency
  - Operation mode
  - Current experiment batch ID

- **Aeration Control Logic**
  - O2 < 16% → 45 Hz
  - 16% ≤ O2 < 19% → 35 Hz
  - 19% ≤ O2 ≤ 21% → 25 Hz
  - O2 > 22% → 15 Hz
  - Temperature > 45°C → Safety Mode
  - Any critical sensor offline → Safety Mode
  - Control action logs are generated and displayed

- **Historical Trend Charts**
  - 24-hour trends for O2, temperature, humidity, and pH
  - Variable switch controls for presentation use

- **Alarm and Control Log**
  - Alarm level, timestamp, device, cause, handling result
  - Control action logs

- **Microbial Suitability Assessment**
  - Suitability score from 0 to 100 based on O2, temperature, humidity, and pH
  - Current microbial batch information display

## Mock Data Location

All mock data files are in:

- `src/data/mockData.js`

## Run Locally

```bash
npm install
npm run dev
```

Open the URL shown by Vite in your browser (typically `http://localhost:5173`).

## Production Build Check

```bash
npm run build
```

If successful, the static files are generated in the `dist/` directory.

## Notes

- This is a front-end demonstration project for presentation and concept verification.
- No real hardware communication is implemented.
- No real database connection is implemented.
