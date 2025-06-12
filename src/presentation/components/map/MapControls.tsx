import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '@/theme/ThemeContext';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useSafeArea } from '@/theme/SafeAreaContext';

interface MapControlsProps {
  onMyLocationPress: () => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onSearchPress: () => void;
}

export const MapControls: React.FC<MapControlsProps> = ({
  onMyLocationPress,
  onZoomIn,
  onZoomOut,
  onSearchPress,
}) => {
  const { theme: currentTheme } = useTheme();
  const { topPadding } = useSafeArea();

  return (
    <View style={[styles.container, { top: topPadding + 16 }]}>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: currentTheme.colors.card }]}
        onPress={onSearchPress}
      >
        <Icon name='search' size={24} color={currentTheme.colors.text} />
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: currentTheme.colors.card }]}
        onPress={onMyLocationPress}
      >
        <Icon name='my-location' size={24} color={currentTheme.colors.text} />
      </TouchableOpacity>
      <View style={styles.zoomControls}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: currentTheme.colors.card }]}
          onPress={onZoomIn}
        >
          <Icon name='add' size={24} color={currentTheme.colors.text} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: currentTheme.colors.card }]}
          onPress={onZoomOut}
        >
          <Icon name='remove' size={24} color={currentTheme.colors.text} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    right: 16,
    gap: 8,
  },
  zoomControls: {
    gap: 8,
  },
  button: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
