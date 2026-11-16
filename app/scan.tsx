/**
 * Экран сканирования QR-кода
 */
import { MaterialIcons } from '@expo/vector-icons';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useRouter } from 'expo-router';
import React, { useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Vibration,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useColorScheme } from '@/components/useColorScheme';
import Colors, { type ThemeColors } from '@/constants/Colors';
import { performCheckin } from '@/services/checkinService';

export default function ScanScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const styles = useMemo(() => createStyles(colors), [colors]);
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [loading, setLoading] = useState(false);
  const [manualInputVisible, setManualInputVisible] = useState(false);
  const [manualCode, setManualCode] = useState('');
  const [resultModal, setResultModal] = useState<{
    visible: boolean;
    success: boolean;
    title: string;
    message: string;
    points?: number;
  }>({ visible: false, success: false, title: '', message: '' });

  const handleBarCodeScanned = async ({ data }: { data: string }) => {
    if (scanned || loading) return;

    setScanned(true);
    setLoading(true);
    Vibration.vibrate(100);

    await processQRCode(data);
  };

  const processQRCode = async (code: string) => {
    try {
      const result = await performCheckin(code);

      if (result.success) {
        setResultModal({
          visible: true,
          success: true,
          title: 'Успешный чекин! 🎉',
          message: `Вы посетили ${result.place?.name}`,
          points: result.pointsEarned,
        });
      } else {
        setResultModal({
          visible: true,
          success: false,
          title: 'Ошибка',
          message: result.error || 'Неизвестная ошибка',
        });
      }
    } catch {
      setResultModal({
        visible: true,
        success: false,
        title: 'Ошибка',
        message: 'Произошла ошибка при обработке QR-кода',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleManualSubmit = async () => {
    if (!manualCode.trim()) {
      Alert.alert('Ошибка', 'Введите код');
      return;
    }

    setManualInputVisible(false);
    setLoading(true);
    await processQRCode(manualCode.trim());
    setManualCode('');
  };

  const closeResultModal = () => {
    setResultModal({ ...resultModal, visible: false });
    setScanned(false);
  };

  if (!permission) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size='large' color={colors.tint} />
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.permissionContainer}>
        <MaterialIcons name='camera-alt' size={64} color={colors.tint} />
        <Text style={styles.permissionTitle}>Нужен доступ к камере</Text>
        <Text style={styles.permissionText}>
          Для сканирования QR-кодов нужно разрешить доступ к камере
        </Text>
        <TouchableOpacity
          style={styles.permissionButton}
          onPress={requestPermission}
        >
          <Text style={styles.permissionButtonText}>Разрешить</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.manualButton}
          onPress={() => setManualInputVisible(true)}
        >
          <Text style={styles.manualButtonText}>Ввести код вручную</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView
        style={styles.camera}
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
        barcodeScannerSettings={{
          barcodeTypes: ['qr'],
        }}
      >
        <View style={styles.overlay}>
          {/* Верхняя панель */}
          <View style={[styles.header, { paddingTop: insets.top + 12 }]}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => router.back()}
            >
              <MaterialIcons name='arrow-back' size={24} color='#fff' />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Сканировать QR</Text>
            <View style={{ width: 40 }} />
          </View>

          {/* Рамка сканирования */}
          <View style={styles.scanFrame}>
            <View style={[styles.corner, styles.topLeft]} />
            <View style={[styles.corner, styles.topRight]} />
            <View style={[styles.corner, styles.bottomLeft]} />
            <View style={[styles.corner, styles.bottomRight]} />
          </View>

          {/* Инструкция */}
          <View style={styles.instructions}>
            <Text style={styles.instructionText}>
              Наведите камеру на QR-код места
            </Text>
            {loading && (
              <ActivityIndicator
                size='small'
                color='#fff'
                style={{ marginTop: 10 }}
              />
            )}
          </View>

          {/* Кнопка ручного ввода */}
          <TouchableOpacity
            style={styles.manualInputButton}
            onPress={() => setManualInputVisible(true)}
          >
            <MaterialIcons name='keyboard' size={20} color='#fff' />
            <Text style={styles.manualInputText}>Ввести код вручную</Text>
          </TouchableOpacity>
        </View>
      </CameraView>

      {/* Модальное окно ручного ввода */}
      <Modal
        visible={manualInputVisible}
        transparent
        animationType='slide'
        onRequestClose={() => setManualInputVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Введите код</Text>
            <TextInput
              style={styles.codeInput}
              placeholder='QUESTCITY-1-XXXXX'
              placeholderTextColor={colors.tabIconDefault}
              value={manualCode}
              onChangeText={setManualCode}
              autoCapitalize='characters'
              autoCorrect={false}
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => {
                  setManualInputVisible(false);
                  setManualCode('');
                }}
              >
                <Text style={styles.cancelButtonText}>Отмена</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.submitButton]}
                onPress={handleManualSubmit}
              >
                <Text style={styles.submitButtonText}>Проверить</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Модальное окно результата */}
      <Modal
        visible={resultModal.visible}
        transparent
        animationType='fade'
        onRequestClose={closeResultModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.resultContent}>
            <MaterialIcons
              name={resultModal.success ? 'check-circle' : 'error'}
              size={64}
              color={resultModal.success ? colors.success : colors.error}
            />
            <Text style={styles.resultTitle}>{resultModal.title}</Text>
            <Text style={styles.resultMessage}>{resultModal.message}</Text>
            {(resultModal.points ?? 0) > 0 && (
              <View style={styles.pointsBadge}>
                <Text style={styles.pointsText}>+{resultModal.points} ✨</Text>
              </View>
            )}
            <TouchableOpacity
              style={styles.resultButton}
              onPress={closeResultModal}
            >
              <Text style={styles.resultButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#000',
    },
    centered: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.background,
    },
    camera: {
      flex: 1,
    },
    overlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'space-between',
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 16,
    },
    backButton: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      alignItems: 'center',
      justifyContent: 'center',
    },
    headerTitle: {
      color: '#fff',
      fontSize: 18,
      fontWeight: '600',
    },
    scanFrame: {
      width: 250,
      height: 250,
      alignSelf: 'center',
      position: 'relative',
    },
    corner: {
      position: 'absolute',
      width: 40,
      height: 40,
      borderColor: colors.tint,
    },
    topLeft: {
      top: 0,
      left: 0,
      borderTopWidth: 4,
      borderLeftWidth: 4,
      borderTopLeftRadius: 16,
    },
    topRight: {
      top: 0,
      right: 0,
      borderTopWidth: 4,
      borderRightWidth: 4,
      borderTopRightRadius: 16,
    },
    bottomLeft: {
      bottom: 0,
      left: 0,
      borderBottomWidth: 4,
      borderLeftWidth: 4,
      borderBottomLeftRadius: 16,
    },
    bottomRight: {
      bottom: 0,
      right: 0,
      borderBottomWidth: 4,
      borderRightWidth: 4,
      borderBottomRightRadius: 16,
    },
    instructions: {
      alignItems: 'center',
      paddingVertical: 20,
    },
    instructionText: {
      color: '#fff',
      fontSize: 16,
      textAlign: 'center',
    },
    manualInputButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      marginHorizontal: 40,
      marginBottom: 50,
      paddingVertical: 14,
      borderRadius: 12,
      gap: 8,
    },
    manualInputText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: '500',
    },
    permissionContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.background,
      padding: 32,
    },
    permissionTitle: {
      fontSize: 24,
      fontWeight: '700',
      color: colors.text,
      marginTop: 20,
      marginBottom: 8,
    },
    permissionText: {
      fontSize: 16,
      color: colors.textSecondary,
      textAlign: 'center',
      marginBottom: 24,
    },
    permissionButton: {
      backgroundColor: colors.tint,
      paddingVertical: 14,
      paddingHorizontal: 32,
      borderRadius: 12,
    },
    permissionButtonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: '600',
    },
    manualButton: {
      marginTop: 16,
    },
    manualButtonText: {
      color: colors.tint,
      fontSize: 16,
    },
    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContent: {
      backgroundColor: colors.surface,
      borderRadius: 20,
      padding: 24,
      width: '85%',
    },
    modalTitle: {
      fontSize: 20,
      fontWeight: '700',
      color: colors.text,
      marginBottom: 16,
      textAlign: 'center',
    },
    codeInput: {
      backgroundColor: colors.card,
      borderRadius: 12,
      paddingHorizontal: 16,
      paddingVertical: 14,
      fontSize: 16,
      color: colors.text,
      marginBottom: 20,
      fontFamily: 'monospace',
    },
    modalButtons: {
      flexDirection: 'row',
      gap: 12,
    },
    modalButton: {
      flex: 1,
      paddingVertical: 14,
      borderRadius: 12,
      alignItems: 'center',
    },
    cancelButton: {
      backgroundColor: colors.card,
    },
    cancelButtonText: {
      color: colors.text,
      fontSize: 16,
      fontWeight: '500',
    },
    submitButton: {
      backgroundColor: colors.tint,
    },
    submitButtonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: '600',
    },
    resultContent: {
      backgroundColor: colors.surface,
      borderRadius: 24,
      padding: 32,
      alignItems: 'center',
      width: '85%',
    },
    resultTitle: {
      fontSize: 22,
      fontWeight: '700',
      color: colors.text,
      marginTop: 16,
      marginBottom: 8,
    },
    resultMessage: {
      fontSize: 16,
      color: colors.textSecondary,
      textAlign: 'center',
      marginBottom: 16,
    },
    pointsBadge: {
      backgroundColor: colors.tint,
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderRadius: 20,
      marginBottom: 20,
    },
    pointsText: {
      color: '#fff',
      fontSize: 18,
      fontWeight: '700',
    },
    resultButton: {
      backgroundColor: colors.tint,
      paddingVertical: 14,
      paddingHorizontal: 48,
      borderRadius: 12,
    },
    resultButtonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: '600',
    },
  });
