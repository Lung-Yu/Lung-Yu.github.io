// src/features/floatingOrbs/components/FloatingOrbs.tsx
import React from 'react';
import { useFloatingOrbs } from '../hooks/useFloatingOrbs';
import '../styles/FloatingOrbs.css';

const FloatingOrbs: React.FC = () => {
  const { orbs } = useFloatingOrbs();

  return (
    <div className="floating-orbs-container" aria-hidden="true">
      {orbs.map((orb, index) => (
        <div
          key={index}
          className={`floating-orb ${orb.size} ${orb.color} ${orb.blur} ${orb.float} ${orb.shape} ${orb.effect || 'none'}`}
          style={{
            ...orb.position,
            opacity: orb.opacity,
            transform: orb.rotation ? `rotate(${orb.rotation}deg)` : undefined
          }}
        >
          {orb.shape === 'wave' && (
            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="shape-content">
              <path fill="currentColor" d="M40,-65.5C53.2,-59.5,66.2,-51.4,73.8,-39.4C81.5,-27.4,83.9,-11.8,81.1,2.3C78.2,16.3,70.1,28.7,61.2,39.3C52.3,49.9,42.7,58.7,31.6,64.4C20.4,70.1,7.8,72.8,-4.9,71.3C-17.6,69.9,-35.1,64.3,-46.6,54.1C-58.1,43.9,-63.7,28.9,-68.3,13.3C-72.9,-2.3,-76.4,-18.7,-72.2,-33C-67.9,-47.4,-55.8,-59.8,-41.9,-65.3C-28,-70.8,-12.3,-69.3,1.4,-67.1C15,-64.9,30,-71,40,-65.5Z" transform="translate(100 100)" />
            </svg>
          )}
          {orb.shape === 'blob' && (
            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="shape-content">
              <path fill="currentColor" d="M47.1,-73.2C62.3,-66.8,76.6,-56.2,81.7,-42.1C86.8,-28,82.7,-10.4,79.8,6.3C77,23.1,75.3,39.1,67,51.3C58.7,63.5,43.7,72,28.1,75.9C12.6,79.9,-3.5,79.3,-19.4,76C-35.2,72.8,-50.8,66.8,-60,55.6C-69.3,44.4,-72.2,28,-73.7,12.2C-75.2,-3.7,-75.2,-19,-68.9,-30.7C-62.7,-42.3,-50.1,-50.3,-37.5,-57.8C-24.8,-65.3,-12.4,-72.3,1.5,-74.7C15.5,-77.1,30.9,-75,47.1,-73.2Z" transform="translate(100 100)" />
            </svg>
          )}
          {orb.shape === 'hexagon' && (
            <div className="hexagon-inner"></div>
          )}
          {orb.shape === 'triangle' && (
            <div className="triangle-inner"></div>
          )}
          {(orb.effect === 'glow' || orb.effect === 'pulse') && (
            <div className={`${orb.effect}-effect`}></div>
          )}
        </div>
      ))}
    </div>
  );
};

export default FloatingOrbs;