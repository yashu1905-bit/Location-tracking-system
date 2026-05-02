# 📍 Real-Time Location Tracking System

A real-time location tracking system built using **Node.js, Socket.IO, Apache Kafka, and Leaflet.js**.
This project enables multiple users to share and visualize live location updates on an interactive map.

---

## 🚀 Features

* 📡 Real-time location updates using Socket.IO
* 🗺️ Interactive map rendering using Leaflet.js
* ⚡ Scalable event streaming using Apache Kafka
* 🔄 Multi-user tracking with unique socket IDs
* 📍 Dynamic marker updates for each user
* 🧠 Decoupled architecture using Kafka (Producer + Consumer)

---

## 🛠️ Tech Stack

* **Frontend:** HTML, JavaScript, Leaflet.js
* **Backend:** Node.js, Express.js, Socket.IO
* **Message Broker:** Apache Kafka (KafkaJS)
* **Other Tools:** Docker (for Kafka setup)

---

## 📂 Project Structure

```
Location-tracking-system/
│
├── public/
│   └── index.html        # Frontend map UI
│
├── index.js              # Main server (Socket + Kafka Producer)
├── database-processor.js # Kafka Consumer (Data processing)
├── kafka-client.js       # Kafka configuration
├── kafka-admin.js        # Kafka topic setup
├── docker-compose.yml    # Kafka + Zookeeper setup
│
├── package.json
└── README.md
```

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the repository

```
git clone https://github.com/yashu1905-bit/Location-tracking-system.git
cd Location-tracking-system
```

---

### 2️⃣ Install dependencies

```
npm install
```

---

### 3️⃣ Start Kafka using Docker

```
docker-compose up -d
```

---

### 4️⃣ Create Kafka Topic

```
node kafka-admin.js
```

---

### 5️⃣ Start Backend Server

```
node index.js
```

---

### 6️⃣ Start Kafka Consumer

```
node database-processor.js
```

---

### 7️⃣ Open Application

```
http://localhost:1905
```

---

## 🔄 How It Works

1. User location is fetched using browser geolocation API
2. Location is sent to server via Socket.IO
3. Server produces event to Kafka topic
4. Kafka consumer processes location data
5. Server broadcasts updated location to all connected clients
6. Map updates markers in real-time

---

## 📸 Demo

* Multiple users can open the app in different browsers/devices
* Each user appears as a marker on the map
* Markers update automatically as users move

---

## ⚠️ Important Notes

* Make sure Kafka is running on `localhost:9092`
* Enable browser location permissions
* Ensure ports are not blocked

---

## 💡 Future Improvements

* 🗄️ Store location history in database (MongoDB / MySQL)
* 🔐 Add user authentication
* 📱 Mobile responsiveness improvements
* 📊 Analytics dashboard for tracking movement

---


## ⭐ Show Your Support

If you like this project, please ⭐ the repo!



<img width="1898" height="869" alt="image" src="https://github.com/user-attachments/assets/926be5a7-fc53-470d-bf7a-3ebca88747fc" />
