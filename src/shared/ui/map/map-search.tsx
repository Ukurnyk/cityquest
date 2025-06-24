import React, { useState } from 'react';
import { YStack, XStack, Input, Button, Text } from 'tamagui';
import { Ionicons } from '@expo/vector-icons';

interface MapSearchProps {
  onClose: () => void;
  onSearch: (query: string) => void;
}

export const MapSearch: React.FC<MapSearchProps> = ({ onClose, onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    if (query.trim()) {
      onSearch(query.trim());
      onClose();
    }
  };

  return (
    <YStack
      position='absolute'
      top='$4'
      left='$4'
      right='$4'
      backgroundColor='$background'
      borderRadius='$4'
      padding='$4'
      shadowColor='$shadowColor'
      shadowOffset={{ width: 0, height: 2 }}
      shadowOpacity={0.1}
      shadowRadius={4}
      elevation={5}
      zIndex={1000}
    >
      <XStack space='$2' alignItems='center'>
        <Input
          flex={1}
          placeholder='Поиск мест...'
          value={query}
          onChangeText={setQuery}
          onSubmitEditing={handleSearch}
          returnKeyType='search'
        />
        <Button
          size='$3'
          circular
          theme='blue'
          onPress={handleSearch}
          icon={<Ionicons name='search' size={16} />}
        />
        <Button
          size='$3'
          circular
          theme='gray'
          onPress={onClose}
          icon={<Ionicons name='close' size={16} />}
        />
      </XStack>
    </YStack>
  );
};
