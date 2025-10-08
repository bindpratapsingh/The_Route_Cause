"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// --- Define the shape of our data ---
// This should exactly match the JSON payload from the Python backend
/*interface MainDashboardData {
  signal_state: { [key: string]: any };
  vehicle_counters: { [key: string]: number };
  total_vehicles: number;
}

interface PerformanceMetric {
  title: string;
  value: string;
  status: string;
  details: string;
}

interface EmergencyModeData {
  priority_direction: string;
  delayed_vehicles: number;
  total_vehicles: number;
}

export interface TrafficData {
  main_dashboard: MainDashboardData | null;
  performance_metrics: PerformanceMetric[];
  emergency_mode: EmergencyModeData | null;
}
*/
// Define the shape of our Context
//interface TrafficDataContextType {
  //data: TrafficData | null;
  //isConnected: boolean;
//}
interface TrafficDataContextType {
  data: BackendTrafficData | null;
  isConnected: boolean;
}

// --- Define the shape of our data ---
// This matches what backend /status or WebSocket sends
export interface BackendTrafficData {
  current_phase: number;
  last_update_time: number;
  last_decision_reason: string;
  lane_counts: { [key: string]: number };
  pedestrian_count: number;
  ai_status: string;
}

// --- Create the Context ---
const TrafficDataContext = createContext<TrafficDataContextType | undefined>(undefined);

// Define the WebSocket URL
//const WEBSOCKET_URL = "ws://127.0.0.1:8000/ws/dashboard";
//const WEBSOCKET_URL = "wss://backend-production-039d.up.railway.app/ws/dashboard";
// Latest : const WEBSOCKET_URL = "wss://backend-production-039d.up.railway.app/ws/ai";
//const WEBSOCKET_URL = "wss://backend-production-039d.up.railway.app/ws/dashboard";
//const WEBSOCKET_URL = "wss://backend-production-039d.up.railway.app/ws/dashboard";
const WEBSOCKET_URL = "wss://uvicorn-main-production-0b01.up.railway.app/ws/dashboard";

export const TrafficDataProvider = ({ children }: { children: ReactNode }) => {
//  const [data, setData] = useState<TrafficData | null>(null);
  const [data, setData] = useState<BackendTrafficData | null>(null);

  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const socket = new WebSocket(WEBSOCKET_URL);

   /* socket.onopen = () => {
      console.log("✅ WebSocket connection established.");
      setIsConnected(true);
    };

    socket.onmessage = (event) => {
      try {
        const receivedData: TrafficData = JSON.parse(event.data);
        setData(receivedData);
      } catch (error) {
        console.error("❌ Error parsing WebSocket message:", error);
      }
    };
*/
    socket.onmessage = (event) => {
  try {
    const receivedData = JSON.parse(event.data);
    console.log("✅ Received data:", receivedData);  // Debug log
    setData(receivedData);
  } catch (error) {
    console.error("❌ Error parsing data:", error);
    console.log("Raw data:", event.data);
  }
};

socket.onopen = () => {
  console.log("✅ WebSocket connected to:", WEBSOCKET_URL);
  setIsConnected(true);
};
    socket.onclose = () => {
      console.log("🔌 WebSocket connection closed.");
      setIsConnected(false);
      // In a production app, you might want a more robust reconnection strategy
    };

    socket.onerror = (error) => {
      console.error("❌ WebSocket error:", error);
      setIsConnected(false);
    };

    // Cleanup function: close the connection when the component is unmounted
    return () => {
      socket.close();
    };
  }, []); // The empty dependency array ensures this effect runs only once

  const value = { data, isConnected };

  return (
    <TrafficDataContext.Provider value={value}>
      {children}
    </TrafficDataContext.Provider>
  );
};

// --- Create a Custom Hook ---
// This makes it easy for any component to get the live data.
export const useTrafficData = () => {
  const context = useContext(TrafficDataContext);
  if (context === undefined) {
    throw new Error('useTrafficData must be used within a TrafficDataProvider');
  }
  return context;
};
