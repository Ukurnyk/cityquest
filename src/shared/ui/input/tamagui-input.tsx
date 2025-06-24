import React from 'react';
import { Input as TamaguiInput, InputProps } from 'tamagui';

interface CustomInputProps extends Omit<InputProps, 'children'> {
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  error?: boolean;
  secureTextEntry?: boolean;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
}

export const TextInput: React.FC<CustomInputProps> = ({
  placeholder,
  value,
  onChangeText,
  error = false,
  secureTextEntry,
  autoCapitalize,
  keyboardType,
  ...props
}) => {
  return (
    <TamaguiInput
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
      autoCapitalize={autoCapitalize}
      keyboardType={keyboardType}
      borderColor={error ? '$red10' : '$gray8'}
      borderRadius='$4'
      size='$4'
      {...props}
    />
  );
};
