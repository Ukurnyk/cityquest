# Архитектура CityQuest (Evolution Design + Tamagui + Apollo)

Проект использует архитектуру **Evolution Design (ED)** для организации кода по слоям и модулям, **Tamagui** как UI-библиотеку для универсальных компонентов, и **Apollo Client** с GraphQL codegen для типизированного API.

## Структура проекта

```
src/
├── app/                    # Слой приложения (точка входа)
│   ├── index.tsx          # Главный компонент приложения
│   ├── providers/         # Глобальные провайдеры
│   │   ├── app-providers.tsx # Основные провайдеры
│   │   └── apollo-provider.tsx # Apollo Provider
│   └── navigation/        # Навигация приложения
├── features/              # Основные фичи приложения
│   ├── auth/             # Аутентификация
│   │   ├── ui/           # UI компоненты
│   │   ├── model/        # Бизнес-логика (Apollo хуки)
│   │   └── index.ts      # Публичное API фичи
│   ├── map/              # Карта с маркерами
│   │   ├── ui/
│   │   ├── model/
│   │   └── index.ts
│   ├── achievements/     # Достижения
│   │   ├── ui/
│   │   ├── model/
│   │   └── index.ts
│   ├── profile/          # Профиль пользователя
│   │   ├── ui/
│   │   ├── model/
│   │   └── index.ts
│   ├── settings/         # Настройки
│   │   ├── ui/
│   │   ├── model/
│   │   └── index.ts
│   └── leaderboard/      # Таблица лидеров
│       ├── ui/
│       └── index.ts
├── services/             # Внешние сервисы
│   ├── apollo/          # GraphQL Apollo клиент
│   │   ├── client.ts    # Apollo клиент с настройками
│   │   ├── gql/         # GraphQL файлы и сгенерированный код
│   │   │   ├── schema.graphql # GraphQL схема
│   │   │   ├── queries.graphql # GraphQL запросы
│   │   │   ├── types.ts # Сгенерированные типы
│   │   │   └── operations.ts # Сгенерированные операции и хуки
│   │   ├── operations.ts # Реэкспорт сгенерированных операций
│   │   ├── types.ts     # Типы для GraphQL
│   │   └── index.ts     # Экспорты Apollo
│   ├── maps.ts          # Сервис карт
│   └── index.ts         # Экспорты services
├── data/                # Слой данных
│   ├── models/          # Модели данных
│   └── repositories/    # Репозитории (используют Apollo хуки)
├── domain/              # Доменный слой
│   ├── entities/        # Доменные сущности
│   ├── repositories/    # Интерфейсы репозиториев
│   └── usecases/        # Сценарии использования
└── shared/              # Общие компоненты и утилиты
    ├── config/          # Конфигурация приложения
    │   └── env.ts       # Переменные окружения
    ├── errors/          # Обработка ошибок
    │   └── AppError.ts  # Классы ошибок приложения
    ├── ui/              # Переиспользуемые UI компоненты (Tamagui)
    │   ├── actions/     # Действия (кнопки профиля)
    │   ├── achievements/ # Компоненты достижений
    │   ├── button/      # Кнопки (Tamagui Button)
    │   ├── card/        # Карточки (достижения, квесты)
    │   ├── error/       # Компоненты ошибок (Tamagui)
    │   ├── form/        # Компоненты форм
    │   ├── header/      # Заголовки (профиль)
    │   ├── input/       # Поля ввода (Tamagui Input)
    │   ├── loading/     # Компоненты загрузки (Tamagui Spinner)
    │   ├── map/         # Компоненты карты
    │   ├── modal/       # Модальные окна
    │   ├── stats/       # Статистика (профиль)
    │   └── theme/       # Выбор темы
    ├── types/           # Общие типы
    └── utils/           # Утилиты
        ├── date.ts      # Работа с датами
        └── validation.ts # Валидация
```

## Технологии

### UI-библиотека: Tamagui

- **Универсальность**: Поддержка React Native и Web
- **Производительность**: Tree-shaking, atomic styles
- **Темизация**: Гибкая система тем и токенов
- **Компоненты**: Богатый набор готовых компонентов

### GraphQL: Apollo Client + Codegen

- **Типизация**: Полная типизация GraphQL операций через codegen
- **Автогенерация**: Автоматическая генерация хуков и типов
- **Кэширование**: Автоматическое кэширование данных
- **Обработка ошибок**: Централизованная обработка ошибок
- **Аутентификация**: Автоматическое добавление токенов

### Конфигурация

- `tamagui.config.ts` - конфигурация Tamagui
- `babel.config.js` - настройка babel-плагина для оптимизации
- `codegen.ts` - конфигурация GraphQL codegen
- `src/app/providers/app-providers.tsx` - TamaguiProvider + ApolloProvider
- `src/services/apollo/client.ts` - Apollo клиент с настройками
- `src/shared/config/env.ts` - переменные окружения

## Принципы ED

### 1. Разделение по слоям

- **app** - точка входа, провайдеры, навигация
- **features** - основные фичи приложения
- **services** - внешние сервисы (Apollo, Maps)
- **data** - слой данных (репозитории)
- **domain** - доменный слой (сущности, интерфейсы)
- **shared** - общие компоненты, утилиты, конфигурация и ошибки

### 2. Структура фичи

Каждая фича содержит:

- `ui/` - компоненты интерфейса
- `model/` - бизнес-логика (хуки Apollo)
- `index.ts` - публичное API фичи

### 3. Принципы

- **Изоляция** - фичи независимы друг от друга
- **Композиция** - фичи объединяются в app слое
- **Переиспользование** - общий код в shared
- **Эволюция** - структура растет с проектом

## Миграция

Проект находится в процессе миграции на ED архитектуру + Tamagui + Apollo:

✅ **Завершено:**

- Создана базовая структура слоев
- Перенесена фича `map` с разделением UI/модели
- Перенесена фича `achievements` с mock данными
- Перенесена фича `profile` с логикой в хуке
- Перенесена фича `settings` с настройками
- Перенесена фича `auth` (Login/Register) с формами
- Перенесена фича `leaderboard` с таблицей лидеров
- Обновлен app слой (провайдеры, навигация)
- Интегрирован Tamagui UI-кит
- **Созданы общие UI компоненты на основе Tamagui:**
  - Button (Tamagui Button)
  - TextInput (Tamagui Input)
  - LoadingScreen (Tamagui Spinner)
  - ErrorScreen (Tamagui компоненты)
  - AchievementCard (карточки достижений)
  - ProfileHeader (заголовки профиля)
  - LocationModal (модальные окна локаций)
  - MapControls (элементы управления картой)
  - ThemeSelector (выбор темы)
  - QuestCard (карточки квестов)
- **Перенесены все компоненты из presentation/components в shared/ui:**
  - Компоненты карты (MapMarker, MapControls, MapSearch)
  - Компоненты достижений (AchievementHeader, AchievementInfo, CompleteButton)
  - Компоненты профиля (ProfileActions, ProfileStats)
  - Удалены старые файлы и папки
- **Перенесены все экраны из screens/ в features/:**
  - MapScreen → features/map/ui/map-screen.tsx
  - ProfileScreen → features/profile/ui/profile-screen.tsx
  - SettingsScreen → features/settings/ui/settings-screen.tsx
  - AchievementsScreen → features/achievements/ui/achievements-screen.tsx
  - AchievementDetailsScreen → features/achievements/ui/achievement-details-screen.tsx
  - LeaderboardScreen → features/leaderboard/ui/leaderboard-screen.tsx
  - LoginScreen/RegisterScreen → features/auth/ui/
  - Удалена папка screens/
- Обновлена навигация для использования экранов из features/
- Добавлены утилиты (даты, валидация)
- **Мигрирован Apollo клиент в services слой:**
  - Apollo клиент перенесен в `src/services/apollo/`
  - GraphQL схема и запросы в `src/services/apollo/gql/`
  - Настроен codegen для автогенерации типов и хуков
  - Сгенерированы типизированные Apollo хуки
  - Обновлены репозитории для использования Apollo хуков
  - Обновлена фича auth для использования Apollo
  - Удалены старые файлы из `src/gql/` и `src/api/`
- **Перенесена конфигурация в shared слой:**
  - Конфигурация окружения перенесена в `src/shared/config/env.ts`
  - Обновлены импорты в Apollo клиенте и сервисах
  - Удалена папка `src/config/`
- **Удален core слой и перенесены ошибки в shared:**
  - Классы ошибок перенесены в `src/shared/errors/AppError.ts`
  - Обновлены репозитории для использования ошибок из shared
  - Удалена папка `src/core/`

🔄 **В процессе:**

- Исправление ошибок TypeScript
- Оптимизация импортов и зависимостей
- Настройка кастомной темы Tamagui
- Полная интеграция Apollo с остальными фичами

## Использование

### Импорт фичи

```typescript
import { MapScreen } from '@/features/map';
import { AchievementsScreen } from '@/features/achievements';
import { ProfileScreen } from '@/features/profile';
import { SettingsScreen } from '@/features/settings';
import { LoginScreen, RegisterScreen } from '@/features/auth';
import { LeaderboardScreen } from '@/features/leaderboard';
```

### Использование Apollo (сгенерированные хуки)

```typescript
import {
  useGetUserQuery,
  useCreateUserMutation,
  useLoginUserMutation,
} from '@/services/apollo/gql/operations';

// В компоненте
const { data, loading, error } = useGetUserQuery();
const [createUser] = useCreateUserMutation();
const [loginUser] = useLoginUserMutation();

// Использование
const handleLogin = async () => {
  const { data } = await loginUser({
    variables: { login: 'user@example.com', password: 'password' },
  });
};
```

### Использование конфигурации

```typescript
import { ENV } from '@/shared/config/env';

// Использование переменных окружения
const graphqlEndpoint = ENV.GRAPHQL_ENDPOINT;
const mapsApiKey = ENV.YANDEX_MAPS_APIKEY;
```

### Использование ошибок

```typescript
import {
  NetworkError,
  ValidationError,
  AuthError,
} from '@/shared/errors/AppError';

// Обработка ошибок
try {
  // API вызов
} catch (error) {
  if (error instanceof NetworkError) {
    console.error('Network error:', error.message);
  } else if (error instanceof ValidationError) {
    console.error('Validation error:', error.message);
  }
}
```

### Использование общих компонентов (Tamagui)

```typescript
import { Button, LoadingScreen, ErrorScreen } from '@/shared/ui';
import { TextInput } from '@/shared/ui/input';
import { FormField } from '@/shared/ui/form';
import { AchievementCard } from '@/shared/ui/achievements';
import { MapControls } from '@/shared/ui/map';
import { formatDate, isValidEmail } from '@/shared/utils';

// В компоненте
<Button title="Нажми меня" onPress={handlePress} theme="blue" />
<TextInput placeholder="Введите текст" onChangeText={setText} />
<LoadingScreen message="Загрузка..." />
<ErrorScreen title="Ошибка" onRetry={handleRetry} />
<AchievementCard achievement={achievement} onPress={handlePress} />
<MapControls onSearchPress={handleSearch} onMyLocationPress={handleLocation} />
```

### Создание новой фичи

1. Создать папку в `features/`
2. Добавить `ui/` и `model/` подпапки
3. Создать `index.ts` с экспортами
4. Добавить в навигацию

### Добавление в shared

Общие компоненты и утилиты размещать в `shared/`:

```typescript
import { Button } from '@/shared/ui/button';
import { formatDate } from '@/shared/utils/date';
import { ENV } from '@/shared/config/env';
import { NetworkError } from '@/shared/errors/AppError';
```

### Добавление новых GraphQL операций

1. Добавить запрос в `src/services/apollo/gql/queries.graphql`
2. Запустить `npm run codegen`
3. Использовать сгенерированный хук в фиче

## Преимущества новой архитектуры

1. **Четкое разделение ответственности** - UI отделен от логики
2. **Изоляция фич** - каждая фича независима
3. **Типизированный GraphQL** - полная типизация API через codegen
4. **Автогенерация** - автоматическая генерация хуков и типов
5. **Универсальный UI** - Tamagui работает на всех платформах
6. **Масштабируемость** - легко добавлять новые фичи
7. **Переиспользование** - общие компоненты в shared
8. **Централизованная конфигурация** - все настройки в shared/config
9. **Единообразная обработка ошибок** - все ошибки в shared/errors
