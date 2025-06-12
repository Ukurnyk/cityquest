import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface CompleteButtonProps {
  onPress: () => void;
  completing: boolean;
}

export const CompleteButton: React.FC<CompleteButtonProps> = ({
  onPress,
  completing,
}) => {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={onPress}
      disabled={completing}
    >
      <Text style={styles.buttonText}>
        {completing ? 'Выполняется...' : 'Выполнить'}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#4B6CFF',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
