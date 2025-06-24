import React, { useState } from 'react';
import { YStack, Text, Button, Sheet, XStack } from 'tamagui';

const themes = [
  { id: 'light' as const, name: 'Светлая' },
  { id: 'dark' as const, name: 'Темная' },
  { id: 'system' as const, name: 'Системная' },
];

export const ThemeSelector: React.FC<{
  value: string;
  onChange: (theme: string) => void;
}> = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <YStack marginVertical='$3'>
      <Button theme='gray' onPress={() => setIsOpen(true)} borderRadius='$4'>
        <Text fontSize='$4'>
          {themes.find((t) => t.id === value)?.name || 'Выбрать тему'}
        </Text>
      </Button>
      <Sheet
        modal
        open={isOpen}
        onOpenChange={setIsOpen}
        snapPoints={[40]}
        position={0}
        dismissOnSnapToBottom
      >
        <Sheet.Overlay />
        <Sheet.Frame padding='$4' alignItems='stretch'>
          <Sheet.Handle />
          <YStack space='$2'>
            {themes.map((t) => (
              <Button
                key={t.id}
                theme={t.id === value ? 'blue' : 'gray'}
                variant={t.id === value ? undefined : 'outlined'}
                borderRadius='$4'
                onPress={() => {
                  onChange(t.id);
                  setIsOpen(false);
                }}
              >
                <Text fontSize='$4' fontWeight={t.id === value ? '600' : '400'}>
                  {t.name}
                </Text>
              </Button>
            ))}
          </YStack>
        </Sheet.Frame>
      </Sheet>
    </YStack>
  );
};
