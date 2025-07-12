
import streamlit as st
import time
import random
import datetime
import csv
import pandas as pd
import os
import plotly.express as px
import pydeck as pdk

LOG_FILE = "demo_log.csv"

# Sensor data simulation
def generate_sensor_data():
    return {
        "temperature": round(random.uniform(30, 45), 2),
        "oxygen": round(random.uniform(5, 20), 2),
        "humidity": round(random.uniform(40, 80), 2),
        "pH": round(random.uniform(5.5, 8.5), 2)
    }

def control_logic(sensor_data):
    if sensor_data["oxygen"] < 10 and sensor_data["temperature"] > 40 and sensor_data["humidity"] < 50:
        return "ON"
    else:
        return "OFF"

def log_data(sensor_data, status):
    with open(LOG_FILE, "a", newline="") as f:
        writer = csv.writer(f)
        writer.writerow([
            datetime.datetime.now(),
            sensor_data["temperature"],
            sensor_data["oxygen"],
            sensor_data["humidity"],
            sensor_data["pH"],
            status
        ])

def load_log_data():
    if not os.path.exists(LOG_FILE):
        return pd.DataFrame(columns=["timestamp", "temperature", "oxygen", "humidity", "pH", "status"])
    return pd.read_csv(LOG_FILE, names=["timestamp", "temperature", "oxygen", "humidity", "pH", "status"])

st.set_page_config(layout="wide")
st.title("填埋場好氧修復 AI 控制系統 DEMO")

tab1, tab2, tab3 = st.tabs(["📊 實時數據", "📈 歷史趨勢分析", "🌍 空間數據視覺化"])

with tab1:
    placeholder = st.empty()
    sensor_data = generate_sensor_data()
    status = control_logic(sensor_data)
    log_data(sensor_data, status)

    with placeholder.container():
        st.subheader("實時監測數據")
        col1, col2, col3, col4, col5 = st.columns(5)
        col1.metric("溫度 (°C)", sensor_data["temperature"])
        col2.metric("氧氣 (%)", sensor_data["oxygen"])
        col3.metric("濕度 (%)", sensor_data["humidity"])
        col4.metric("pH", sensor_data["pH"])
        col5.metric("曝氣狀態", status)
        st.caption(f"更新時間：{datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")

with tab2:
    st.subheader("歷史數據趨勢圖")
    data = load_log_data()
    if not data.empty:
        data["timestamp"] = pd.to_datetime(data["timestamp"])
        fig1 = px.line(data, x="timestamp", y=["temperature", "oxygen", "humidity", "pH"],
                       labels={"value": "讀數", "timestamp": "時間"}, title="傳感器數據變化趨勢")
        st.plotly_chart(fig1, use_container_width=True)

        status_counts = data["status"].value_counts()
        st.bar_chart(status_counts, use_container_width=True)
    else:
        st.info("尚無歷史數據，請啟動實時監控後查看。")

with tab3:
    st.subheader("3D Map (Mapbox + PyDeck)")
    st.markdown("以下是基於模擬地點與氧氣濃度的視覺化示例")

    map_data = pd.DataFrame({
        "lat": [22.3964, 22.3970, 22.3950],
        "lon": [114.1095, 114.1100, 114.1080],
        "oxygen": [12.5, 8.3, 16.0]
    })

    view_state = pdk.ViewState(
        latitude=22.3964,
        longitude=114.1095,
        zoom=13,
        pitch=50,
    )

    scatter_layer = pdk.Layer(
        "ScatterplotLayer",
        data=map_data,
        get_position="[lon, lat]",
        get_color="[255 - oxygen * 10, oxygen * 10, 150]",
        get_radius=200,
        pickable=True,
    )

    pdk.settings.mapbox_api_key = st.secrets["mapbox"]["token"]
    r = pdk.Deck(
        map_style="mapbox://styles/mapbox/light-v9",
        layers=[scatter_layer],
        initial_view_state=view_state,
        tooltip={"text": "Oxygen: {oxygen}%"},
    )

    st.pydeck_chart(r)
