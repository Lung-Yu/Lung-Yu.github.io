export interface OrbConfig {
    size: 'orb-xs' | 'orb-sm' | 'orb-md' | 'orb-lg' | 'orb-xl';
    color: 'orb-blue' | 'orb-purple' | 'orb-rose' | 'orb-amber';
    blur: 'blur-sm' | 'blur-md' | 'blur-lg'; 
    float: 'float-1' | 'float-2' | 'float-3' | 'float-4';
    position: {
      top?: string;
      left?: string;
      right?: string;
      bottom?: string;
    };
  }