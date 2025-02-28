import { useMemo } from 'react';
import type { OrbConfig } from '../types';

export const useFloatingOrbs = () => {
  const orbs: OrbConfig[] = useMemo(() => [
    {
      size: 'orb-xl',
      color: 'orb-blue',
      blur: 'blur-lg',
      float: 'float-1',
      position: { top: '0%', right: '0%' }
    },
    {
      size: 'orb-lg',
      color: 'orb-purple',
      blur: 'blur-md',
      float: 'float-2',
      position: { bottom: '10%', left: '0%' }
    },
    {
      size: 'orb-md',
      color: 'orb-rose',
      blur: 'blur-sm',
      float: 'float-3',
      position: { top: '40%', right: '20%' }
    }
  ], []);

  return { orbs };
};