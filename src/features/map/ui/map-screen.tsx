import React from 'react';
import { View, StyleSheet, SafeAreaView, Dimensions } from 'react-native';
import { YStack, Text } from 'tamagui';

const { width, height } = Dimensions.get('window');

export const MapScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <YStack flex={1} justifyContent='center' alignItems='center'>
          <Text fontSize='$6' color='$gray11'>
            Карта загружается...
          </Text>
          <Text fontSize='$4' color='$gray10' marginTop='$2'>
            Функция карты в разработке
          </Text>
        </YStack>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    width: width,
    height: height,
  },
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: '#F5F5F5',
  },
});
