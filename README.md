Emergency Medical Services (EMS) Web Application

A real-time emergency medical platform designed to bridge the communication gap between EMTs in the field and doctors in hospitals. This application enables live patient vitals monitoring, secure medical record management, and real-time chat to support critical, split-second medical decision-making.

## 🚀 Features

* **Real-Time Vitals Monitoring:** Continuous tracking of critical patient vitals with instant alerts for abnormal metrics using GraphQL Subscriptions (`VITAL_SUBSCRIPTION`, `ALERT_SUBSCRIPTION`).
* **Secure Medical Record Access:** Role-based access to patient medical histories with support for confidentiality flags.
* **Amazon S3 Document Management:** Secure pre-signed URL generation for uploading and retrieving medical documents, logs, and images directly and reliably from AWS S3.
* **Live Incident Chat:** Real-time communication channel between paramedics and doctors using `graphql-ws` for instant text dispatching (`MESSAGE_SUBSCRIPTION`).
* **Role-Based Authentication:** Seamless user authentication state management for EMS staff and physicians.

---

## 🛠️ Tech Stack

* **Frontend:** React, Tailwind CSS (for modern, responsive dashboard layouts)
* **State Management & API Client:** Apollo Client (GraphQL)
* **Real-time Protocols:** WebSockets via `graphql-ws`
* **Package Manager:** npm

---

## 📂 Codebase Structure (Frontend Client)

The core frontend structure included in this package focuses on seamless state management and data orchestration:

```text
as/
├── client.js       # Core Apollo Client configuration handling both HTTP links and WebSocket links
├── operations.js   # GraphQL Queries, Mutations, and Subscriptions (Vitals, Chats, S3 Uploads)
├── useAuth.js      # React hook for managing EMS user authentication states
├── globals.css     # Tailored styling including real-time flashing alert states (.vital-alert)
└── package.json    # Frontend dependencies and scripts
