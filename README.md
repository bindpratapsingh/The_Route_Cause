
# The Route Cause - AI-Powered Traffic Management System  
**Submission for Smart India Hackathon 2025**  


---

## The Problem We Solve  
Static, pre-programmed traffic signals are fundamentally inefficient. They cannot adapt to:

- Sudden traffic surges during peak hours or events.

- The urgent need of an ambulance or fire truck.

- Uneven traffic flow, where one lane is congested while another is empty.

- Pedestrian crossing needs.

This leads to increased congestion, higher pollution, and lost productivity. Our solution tackles this problem head-on
---

## Our Multi-Layered AI Solution  

### Real-Time Perception (The Eyes)  
A YOLOv8 computer vision model provides real-time situational awareness, detecting and counting every vehicle and pedestrian.  

### Intelligent Decisions (The Brain)  
A trained Q-Learning Reinforcement Learning agent analyzes the live data to make strategic decisions on signal timing to minimize congestion.  

### Optimization & Safety (The Supervisor)  
A rule-based Optimization Engine supervises the AI's decisions, enforcing critical safety and fairness rules like emergency overrides and starvation prevention.  

This data is then streamed via a FastAPI backend to a live React dashboard for visualization.  

---

## Key Features & Innovations  

- **Adaptive AI Control**: Dynamically allocates green lights based on live traffic density.  
- **Emergency Vehicle Preemption**: Executes a professional-grade clearing sequence (yellow -> all-red -> dedicated green) for emergency vehicles.  
- **Dynamic Queue Management**: Intelligently overrides the cycle to service excessively long queues and prevent gridlock.  
- **Fairness Guarantee**: A "starvation" timer prevents any vehicle from waiting indefinitely.  
- **Real-Time Data & Transparency**: All perceptions and decisions are streamed via WebSockets to a live dashboard for complete system transparency.  

---

## Tech Stack  

- **AI & Computer Vision**: Python, OpenCV, PyTorch, YOLOv8, Q-Learning  
- **Backend & Data Pipeline**: Python, FastAPI, WebSockets  
- **Frontend & Visualization**: React.js, TypeScript, Vite, TailwindCSS, Recharts  
- **Deployment**: Vercel (Frontend), Railway (Backend)  

---

## How to Run This Project  

### Prerequisites  
- Python 3.10+  
- Node.js and npm/yarn  
- A video file (`my_video.mp4`) of traffic for the AI to process  

### Backend & AI Agent Setup  
```bash
cd backend
python -m venv venv
source venv/bin/activate (for MacOS) || venv\Scripts\activate (for Windows)
pip install -r requirements.txt
uvicorn main:app --reload
python run_live_agent.py
```

### Frontend Setup  
```bash
cd frontend
npm install
npm run dev
```

---
