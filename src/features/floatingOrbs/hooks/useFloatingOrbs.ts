import { useMemo } from 'react';
import type { OrbConfig } from '../types';

export const useFloatingOrbs = () => {
  const orbs: OrbConfig[] = useMemo(() => [
    // 右上角的大型流動曲線波浪
    {
      size: 'orb-xl',
      color: 'orb-gradient',
      blur: 'blur-md',
      float: 'float-1',
      shape: 'wave',
      effect: 'glow',
      position: { top: '-15%', right: '-8%' },
      opacity: 0.85,
      rotation: 10
    },
    // 左下角的綠松石流動波浪
    {
      size: 'orb-lg',
      color: 'orb-teal',
      blur: 'blur-sm',
      float: 'float-3',
      shape: 'blob',
      effect: 'pulse',
      position: { bottom: '-8%', left: '-5%' },
      opacity: 0.75,
      rotation: -5
    },
    // 中央偏右的神秘六邊形
    {
      size: 'orb-md',
      color: 'orb-indigo',
      blur: 'blur-md',
      float: 'float-5',
      shape: 'hexagon',
      effect: 'shimmer',
      position: { top: '35%', right: '18%' },
      opacity: 0.65
    },
    // 右側中部的柔和方形元素
    {
      size: 'orb-sm',
      color: 'orb-amber',
      blur: 'blur-sm',
      float: 'float-4',
      shape: 'square',
      effect: 'glow',
      position: { top: '65%', right: '5%' },
      opacity: 0.7,
      rotation: 45
    },
    // 左側上方的紫色三角形元素
    {
      size: 'orb-sm',
      color: 'orb-purple',
      blur: 'blur-sm',
      float: 'float-6',
      shape: 'triangle',
      effect: 'shimmer',
      position: { top: '12%', left: '15%' },
      opacity: 0.65
    },
    // 中央下方的脈動玫瑰圓形
    {
      size: 'orb-xs',
      color: 'orb-rose',
      blur: 'blur-sm',
      float: 'float-3',
      shape: 'circle',
      effect: 'ripple',
      position: { bottom: '15%', left: '42%' },
      opacity: 0.7
    },
    // 右側低位置的藍色波浪
    {
      size: 'orb-md',
      color: 'orb-blue',
      blur: 'blur-md',
      float: 'float-2',
      shape: 'blob',
      effect: 'pulse',
      position: { bottom: '25%', right: '22%' },
      opacity: 0.6,
      rotation: 20
    },
    // 左側中部的小型脈動方形
    {
      size: 'orb-xs',
      color: 'orb-purple',
      blur: 'blur-sm',
      float: 'float-5',
      shape: 'square',
      effect: 'ripple',
      position: { top: '48%', left: '18%' },
      opacity: 0.55,
      rotation: 15
    },
    // 上方中央的微妙六邊形
    {
      size: 'orb-xs',
      color: 'orb-indigo',
      blur: 'blur-lg',
      float: 'float-6',
      shape: 'hexagon',
      position: { top: '10%', left: '45%' },
      opacity: 0.4,
      rotation: 30
    },
    // 右上方小型發光圓形
    {
      size: 'orb-xs',
      color: 'orb-teal',
      blur: 'blur-sm',
      float: 'float-4',
      shape: 'circle',
      effect: 'glow',
      position: { top: '15%', right: '15%' },
      opacity: 0.5
    }
  ], []);

  return { orbs };
};