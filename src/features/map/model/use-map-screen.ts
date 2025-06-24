import { useState, useRef, useEffect } from 'react';
import { useGetUserAchievementsQuery } from '@/services/apollo/gql/operations';
import { useStore } from '@/store';
import { mapsService } from '@/services/maps';
import { Achievement } from '@/types';

export const useMapScreen = () => {
  const [selectedLocation, setSelectedLocation] = useState<Achievement | null>(
    null
  );
  const [isMapReady, setIsMapReady] = useState(false);
  const [mapError, setMapError] = useState<string | null>(null);
  const [hasError, setHasError] = useState(false);
  const mapRef = useRef<any>(null);

  const userId = useStore((s) => s.user?.id);
  const { data, loading, error, refetch } = useGetUserAchievementsQuery({
    variables: { userId: userId || '' },
    skip: !userId,
    errorPolicy: 'all',
  });

  useEffect(() => {
    const initMap = async () => {
      try {
        console.log('[MapScreen] Starting map initialization...');
        const initialized = await mapsService.init();
        console.log('[MapScreen] Map initialization result:', initialized);
        setIsMapReady(initialized);
        if (!initialized) {
          setMapError('Не удалось инициализировать карту');
        }
      } catch (error) {
        console.error('[MapScreen] Error initializing map:', error);
        setIsMapReady(false);
        setMapError(
          error instanceof Error ? error.message : 'Ошибка инициализации карты'
        );
      }
    };

    // Добавляем небольшую задержку перед инициализацией
    const timer = setTimeout(() => {
      if (!isMapReady && !mapError && !hasError) {
        initMap();
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [isMapReady, mapError, hasError]);

  const achievements =
    data?.userAchievements?.map(
      (ua: { achievement: Achievement }) => ua.achievement
    ) ?? [];

  console.log('[MapScreen] User ID:', userId);
  console.log('[MapScreen] Achievements:', achievements.length);

  const handleLocationPress = (location: Achievement) => {
    try {
      console.log('[MapScreen] Location pressed:', location);
      setSelectedLocation(location);
    } catch (error) {
      console.error('[MapScreen] Error handling location press:', error);
    }
  };

  const handleCloseModal = () => {
    try {
      setSelectedLocation(null);
    } catch (error) {
      console.error('[MapScreen] Error closing modal:', error);
    }
  };

  const handleRetry = async () => {
    try {
      if (error) {
        await refetch();
      }
      if (mapError) {
        setMapError(null);
        setIsMapReady(false);
      }
      if (hasError) {
        setHasError(false);
      }
    } catch (error) {
      console.error('[MapScreen] Error in retry:', error);
    }
  };

  return {
    selectedLocation,
    isMapReady,
    mapError,
    hasError,
    loading,
    error,
    achievements,
    mapRef,
    handleLocationPress,
    handleCloseModal,
    handleRetry,
  };
};
