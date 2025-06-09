import React from 'react';

export interface BaseIconProps {
  icon: React.ReactNode;
  size?: number;
  colorsScheme?:
    | 'primary'
    | 'secondary'
    | 'success'
    | 'warning'
    | 'danger'
    | 'none';
  variant?: 'circle' | 'square' | 'rounded';
  background?: boolean;
  onPress?: () => void;
}
