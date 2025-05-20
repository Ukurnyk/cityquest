import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useTheme } from '@/theme/ThemeContext';
import { themes } from '@/theme/themes';

export const SettingsScreen = () => {
  const { theme, themeName, setTheme } = useTheme();

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
          Тема оформления
        </Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 8 }}>
          {Object.entries(themes).map(([key, t]) => (
            <TouchableOpacity
              key={key}
              style={{
                backgroundColor:
                  themeName === key ? theme.colors.primary : theme.colors.card,
                padding: 12,
                marginRight: 12,
                marginBottom: 12,
                borderRadius: 8,
                minWidth: 120,
                alignItems: 'center',
              }}
              onPress={() => setTheme(key as any)}
            >
              <Text
                style={{
                  color: themeName === key ? '#fff' : theme.colors.text,
                }}
              >
                {t.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});

export default SettingsScreen;
