
import streamlit as st
import time
import random
import datetime
import csv

# Sensor data simulation
def generate_sensor_data():
    return {
        "temperature": round(random.uniform(30, 45), 2),
        "oxygen": round(random.uniform(5, 20), 2),
        "humidity": round(random.uniform(40, 80), 2),
        "pH": round(random.uniform(5.5, 8.5), 2)
    }

# Simple control logic
def control_logic(sensor_data):
    if sensor_data["oxygen"] < 10 and sensor_data["temperature"] > 40 and sensor_data["humidity"] < 50:
        return "ON"
    else:
        return "OFF"

# Data logging
def log_data(sensor_data, status):
    with open("demo_log.csv", "a", newline="") as f:
        writer = csv.writer(f)
        writer.writerow([
            datetime.datetime.now(),
            sensor_data["temperature"],
            sensor_data["oxygen"],
            sensor_data["humidity"],
            sensor_data["pH"],
            status
        ])

# Streamlit UI
st.set_page_config(layout="wide")
st.title("填埋場好氧修復 AI 控制系統 DEMO")

placeholder = st.empty()

while True:
    sensor_data = generate_sensor_data()
    status = control_logic(sensor_data)
    log_data(sensor_data, status)

    with placeholder.container():
        st.subheader("實時監測數據")
        st.metric("溫度 (°C)", sensor_data["temperature"])
        st.metric("氧氣 (%)", sensor_data["oxygen"])
        st.metric("濕度 (%)", sensor_data["humidity"])
        st.metric("pH", sensor_data["pH"])
        st.metric("曝氣狀態", status)
        st.caption(f"更新時間：{datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    time.sleep(2)
