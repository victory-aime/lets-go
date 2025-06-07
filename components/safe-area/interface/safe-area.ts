import { ReactNode } from 'react';
import { ViewStyle } from 'react-native';

export interface SafeAreaWrapperProps {
  children: ReactNode;
  edges?: {
    top?: boolean;
    bottom?: boolean;
    left?: boolean;
    right?: boolean;
  };
  style?: ViewStyle;
}
