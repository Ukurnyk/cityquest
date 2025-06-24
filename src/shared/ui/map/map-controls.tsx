import React from 'react';
import { YStack, Button, XStack } from 'tamagui';
import { Ionicons } from '@expo/vector-icons';

interface MapControlsProps {
  onSearchPress: () => void;
  onMyLocationPress: () => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
}

export const MapControls: React.FC<MapControlsProps> = ({
  onSearchPress,
  onMyLocationPress,
  onZoomIn,
  onZoomOut,
}) => {
  return (
    <YStack position='absolute' right='$4' bottom='$4' space='$2' zIndex={1000}>
      <Button
        size='$4'
        circular
        theme='blue'
        onPress={onSearchPress}
        icon={<Ionicons name='search' size={20} />}
      />
      <Button
        size='$4'
        circular
        theme='gray'
        onPress={onMyLocationPress}
        icon={<Ionicons name='navigate' size={20} />}
      />
      <XStack space='$1'>
        <Button
          size='$3'
          circular
          theme='gray'
          onPress={onZoomIn}
          icon={<Ionicons name='add' size={16} />}
        />
        <Button
          size='$3'
          circular
          theme='gray'
          onPress={onZoomOut}
          icon={<Ionicons name='remove' size={16} />}
        />
      </XStack>
    </YStack>
  );
};
