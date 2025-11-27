// src/components/Dock.jsx
import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

// --- Dock Item Component ---
const DockItem = ({ mouseX, icon: Icon, label, onClick }) => {
  const ref = useRef(null);

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  // Calculate width based on distance from mouse
  // Range: [-150, 0, 150] -> [40, 80, 40] (Base size 40, Scale to 80)
  const widthSync = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
  
  // Add spring physics for smoothness
  const width = useSpring(widthSync, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  return (
    <motion.div
      ref={ref}
      style={{ width }}
      className="dock-item"
      onClick={onClick}
    >
      <Icon className="dock-icon" />
      {/* Tooltip */}
      <span className="dock-label">{label}</span>
    </motion.div>
  );
};

// --- Main Dock Component ---
const Dock = ({ items }) => {
  const mouseX = useMotionValue(Infinity);

  return (
    <div 
      className="dock-container"
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
    >
      <div className="dock-panel">
        {items.map((item, index) => (
          <DockItem
            key={index}
            mouseX={mouseX}
            icon={item.icon}
            label={item.label}
            onClick={item.onClick}
          />
        ))}
      </div>
    </div>
  );
};

export default Dock;