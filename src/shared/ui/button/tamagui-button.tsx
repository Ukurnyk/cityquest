import React from 'react';
import { Button as TamaguiButton } from 'tamagui';

interface CustomButtonProps {
  title: string;
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'small' | 'medium' | 'large';
  onPress?: () => void;
  disabled?: boolean;
  style?: any;
}

export const Button: React.FC<CustomButtonProps> = ({
  title,
  variant = 'primary',
  size = 'medium',
  onPress,
  disabled,
  style,
}) => {
  const getSize = () => {
    switch (size) {
      case 'small':
        return '$3';
      case 'large':
        return '$5';
      default:
        return '$4';
    }
  };

  const getTheme = () => {
    switch (variant) {
      case 'secondary':
        return 'gray';
      case 'danger':
        return 'red';
      default:
        return 'blue';
    }
  };

  return (
    <TamaguiButton
      theme={getTheme()}
      size={getSize()}
      borderRadius='$4'
      onPress={onPress}
      disabled={disabled}
      style={style}
    >
      {title}
    </TamaguiButton>
  );
};
