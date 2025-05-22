import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '@/theme/ThemeContext';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useSafeArea } from '@/theme/SafeAreaContext';

interface MapSearchProps {
  onClose: () => void;
  onSearch: (query: string) => void;
}

export const MapSearch: React.FC<MapSearchProps> = ({ onClose, onSearch }) => {
  const { theme: currentTheme } = useTheme();
  const { topPadding } = useSafeArea();

  return (
    <View style={[styles.container, { top: topPadding + 16 }]}>
      <View
        style={[
          styles.searchContainer,
          { backgroundColor: currentTheme.colors.card },
        ]}
      >
        <Icon name='search' size={24} color={currentTheme.colors.muted} />
        <TextInput
          style={[styles.input, { color: currentTheme.colors.text }]}
          placeholder='Поиск мест...'
          placeholderTextColor={currentTheme.colors.muted}
          onChangeText={onSearch}
        />
        <TouchableOpacity onPress={onClose}>
          <Icon name='close' size={24} color={currentTheme.colors.muted} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 16,
    right: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  input: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
  },
});
