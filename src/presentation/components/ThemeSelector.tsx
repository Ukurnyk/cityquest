import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { useTheme } from '@/theme/ThemeContext';
import { theme } from '@/presentation/theme';

const themes = [
  { id: 'light' as const, name: 'Светлая' },
  { id: 'dark' as const, name: 'Темная' },
  { id: 'system' as const, name: 'Системная' },
];

export const ThemeSelector: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme: currentTheme, setTheme } = useTheme();

  const handleSelectTheme = (themeId: (typeof themes)[number]['id']) => {
    setTheme(themeId);
    setIsOpen(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.selector, { backgroundColor: currentTheme.colors.card }]}
        onPress={() => setIsOpen(true)}
      >
        <Text
          style={[styles.selectorText, { color: currentTheme.colors.text }]}
        >
          {themes.find((t) => t.id === currentTheme.id)?.name || 'Выбрать тему'}
        </Text>
      </TouchableOpacity>

      <Modal
        visible={isOpen}
        transparent
        animationType='fade'
        onRequestClose={() => setIsOpen(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setIsOpen(false)}
        >
          <View
            style={[
              styles.modalContent,
              { backgroundColor: currentTheme.colors.card },
            ]}
          >
            {themes.map((t) => (
              <TouchableOpacity
                key={t.id}
                style={[
                  styles.option,
                  t.id === currentTheme.id && styles.selectedOption,
                ]}
                onPress={() => handleSelectTheme(t.id)}
              >
                <Text
                  style={[
                    styles.optionText,
                    { color: currentTheme.colors.text },
                    t.id === currentTheme.id && styles.selectedOptionText,
                  ]}
                >
                  {t.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: theme.spacing.md,
  },
  selector: {
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  selectorText: {
    ...theme.typography.body,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  option: {
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
  },
  selectedOption: {
    backgroundColor: theme.colors.primary + '20',
  },
  optionText: {
    ...theme.typography.body,
  },
  selectedOptionText: {
    color: theme.colors.primary,
    fontWeight: '600',
  },
});
