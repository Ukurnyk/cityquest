import React from 'react';
import {
  TextInput,
  TextInputProps,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { useTheme } from '@/theme/ThemeContext';

interface CustomTextInputProps extends TextInputProps {
  error?: boolean;
  containerStyle?: ViewStyle;
}

export const CustomTextInput: React.FC<CustomTextInputProps> = ({
  error = false,
  containerStyle,
  style,
  ...props
}) => {
  const { theme } = useTheme();

  const inputStyle: TextStyle = {
    backgroundColor: theme.colors.card,
    color: theme.colors.text,
    borderColor: error ? theme.colors.error : theme.colors.border,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    ...(style as TextStyle),
  };

  return (
    <TextInput
      style={inputStyle}
      placeholderTextColor={theme.colors.muted}
      {...props}
    />
  );
};
