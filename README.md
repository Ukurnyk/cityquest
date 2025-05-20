# CityQuest

Геймифицированная платформа ачивок для города (MVP)

## Описание

CityQuest — мобильное приложение, где пользователи исследуют город, выполняют задания (ачивки), получают баллы, бейджи и соревнуются в лидерборде. Поддержка карт, геолокации, авторизации, рейтингов и профиля.

## Стек

- React Native (Expo)
- TypeScript
- React Navigation
- @expo/vector-icons
- react-native-maps (Expo-совместимая версия)
- Expo Location
- Tailwind/styled-components (по желанию)

## Структура

- `src/screens/` — экраны (карта, профиль, лидерборд, детали ачивки, авторизация)
- `src/components/` — переиспользуемые компоненты
- `src/types/` — типы данных (User, Achievement, Badge, LeaderboardEntry)
- `src/navigation/` — навигация (stack + tabs)
- `assets/` — иконки, splash, картинки

## Быстрый старт

```sh
npm install
npx expo start -c
```

Сканируй QR-код через Expo Go (телефон и ПК должны быть в одной Wi-Fi сети).

## Важно

- Для работы карт используй только Expo-совместимую версию `react-native-maps` (`expo install react-native-maps`).
- Если нужны кастомные нативные модули — используй EAS Build (<https://docs.expo.dev/eas/>), Expo Go их не поддерживает.
- Если не отображается splash — проверь наличие файла в `assets/` и путь в `app.json`.

## Алиасы

Используются алиасы для удобного импорта:

- `@/types`, `@screens`, `@components`, `@navigation`, и т.д. (см. `tsconfig.json`, `babel.config.js`)

## Советы

- Для иконок табов используется Ionicons (`@expo/vector-icons`).
- Для геолокации — `expo-location` (установлен и прописан в `app.json`).
- Для кастомных сборок (например, если нужны карты с Google API) — только через EAS Build.

## TODO

- Реализовать реальную авторизацию (OAuth через VK/Google)
- Подключить бэкенд (например, Firebase, Supabase или свой API)
- Добавить хранение прогресса пользователя
- Улучшить UI/UX, добавить анимации

---

**Автор:** клиентской части Андрей Ёлкин

Если есть вопросы — пиши issue или в Telegram!
<https://t.me/tutaAndrey>
