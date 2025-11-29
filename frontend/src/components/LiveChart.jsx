// src/components/LiveChart.jsx
import React, { useState, useEffect } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const LiveChart = () => {
  // 1. Initial Data (Empty to start)
  const [data, setData] = useState([]);

  // 2. Function to generate random "Traffic" data
  const generateDataPoint = (index) => ({
    name: index,
    uv: Math.floor(Math.random() * 50) + 50, // Random value between 50-100
    pv: Math.floor(Math.random() * 30) + 20, // Random value between 20-50
  });

  // 3. The "Heartbeat" Effect
  useEffect(() => {
    // Fill initial buffer so chart isn't empty
    const initialData = Array.from({ length: 20 }, (_, i) => generateDataPoint(i));
    setData(initialData);

    const interval = setInterval(() => {
      setData((currentData) => {
        const nextIndex = currentData.length > 0 ? currentData[currentData.length - 1].name + 1 : 0;
        const newPoint = generateDataPoint(nextIndex);
        
        // Remove first item, add new item (Scroll Effect)
        return [...currentData.slice(1), newPoint];
      });
    }, 1000); // Update every 1 second

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="chart-container" style={{ height: '350px' }}>
      <div className="chart-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <h3>Live Server Traffic</h3>
          {/* Pulsing Dot Animation */}
          <span className="live-indicator"></span>
        </div>
        <span style={{ fontSize: '0.8rem', color: '#10b981' }}>Updates every 1s</span>
      </div>

      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#5C7C89" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#5C7C89" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
          <XAxis dataKey="name" hide />
          <YAxis hide domain={[0, 150]} />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#0b253a', 
              border: '1px solid #1e3a52', 
              borderRadius: '8px',
              color: '#fff'
            }} 
          />
          <Area 
            type="monotone" 
            dataKey="uv" 
            stroke="#5C7C89" 
            fillOpacity={1} 
            fill="url(#colorUv)" 
            strokeWidth={3}
            isAnimationActive={false} /* Disable internal animation for smoother scrolling */
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LiveChart;