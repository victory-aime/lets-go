import { CommonColorScheme } from '_components/base-button/interface/button';
import { ReactNode } from 'react';
import { DialogProps } from 'react-native-paper';

export interface BaseDialogProps extends DialogProps {
  title?: string;
  content?: string;
  onClose: (value: boolean) => void;
  cancelTitle?: string;
  validateTitle?: string;
  onValidate?: () => void;
  type: CommonColorScheme;
  children: ReactNode;
}
