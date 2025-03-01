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
          className={`floating-orb ${orb.size} ${orb.color} ${orb.blur} ${orb.float}`}
          style={orb.position}
        />
      ))}
    </div>
  );
};

export default FloatingOrbs;