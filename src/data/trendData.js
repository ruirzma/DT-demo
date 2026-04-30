const base = Array.from({ length: 24 }, (_, i) => {
  const hour = `${String(i).padStart(2, '0')}:00`;
  return {
    time: hour,
    o2: 17 + Math.sin(i / 3) * 1.8 + (i % 5) * 0.08,
    temperature: 35 + Math.cos(i / 4) * 2.3 + (i % 3) * 0.2,
    humidity: 65 + Math.sin(i / 5) * 4.4,
    ph: 7 + Math.cos(i / 6) * 0.28
  };
});

export const trendData = base.map((row) => ({
  ...row,
  o2: Number(row.o2.toFixed(2)),
  temperature: Number(row.temperature.toFixed(2)),
  humidity: Number(row.humidity.toFixed(2)),
  ph: Number(row.ph.toFixed(2))
}));
