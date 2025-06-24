import { useState } from 'react';

interface Settings {
  theme: 'light' | 'dark' | 'auto';
  notifications: boolean;
  sound: boolean;
}

export const useSettingsScreen = () => {
  const [settings, setSettings] = useState<Settings>({
    theme: 'auto',
    notifications: true,
    sound: true,
  });

  const handleThemeChange = (theme: 'light' | 'dark' | 'auto') => {
    setSettings((prev) => ({ ...prev, theme }));
  };

  const handleNotificationToggle = (enabled: boolean) => {
    setSettings((prev) => ({ ...prev, notifications: enabled }));
  };

  const handleSoundToggle = (enabled: boolean) => {
    setSettings((prev) => ({ ...prev, sound: enabled }));
  };

  return {
    settings,
    handleThemeChange,
    handleNotificationToggle,
    handleSoundToggle,
  };
};
