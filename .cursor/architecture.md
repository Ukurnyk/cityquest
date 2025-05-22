# Questly Architecture

## 🏗 Структура проекта

```
src/
├── core/                    # Ядро приложения
│   ├── config/             # Конфигурация приложения
│   ├── constants/          # Константы
│   ├── errors/             # Обработка ошибок
│   └── utils/              # Утилиты
│
├── domain/                 # Бизнес-логика
│   ├── entities/          # Бизнес-сущности
│   ├── repositories/      # Интерфейсы репозиториев
│   ├── usecases/         # Сценарии использования
│   └── value-objects/     # Объекты-значения
│
├── data/                  # Слой данных
│   ├── datasources/      # Источники данных
│   │   ├── local/       # Локальное хранилище
│   │   └── remote/      # Удаленные API
│   ├── repositories/     # Реализации репозиториев
│   └── models/          # Модели данных
│
├── presentation/         # Слой представления
│   ├── screens/         # Экраны
│   ├── components/      # Компоненты
│   ├── navigation/      # Навигация
│   ├── state/          # Управление состоянием
│   └── theme/          # Тема приложения
│
└── di/                  # Внедрение зависимостей
    └── container.ts     # Контейнер DI
```

## 📦 Модули

### 🎯 Квесты

```
quests/
├── domain/
│   ├── entities/
│   │   ├── Quest.ts
│   │   └── QuestProgress.ts
│   ├── repositories/
│   │   └── IQuestRepository.ts
│   └── usecases/
│       ├── GetQuestsUseCase.ts
│       └── UpdateQuestProgressUseCase.ts
├── data/
│   ├── repositories/
│   │   └── QuestRepository.ts
│   └── models/
│       └── QuestModel.ts
└── presentation/
    ├── screens/
    │   ├── QuestListScreen.tsx
    │   └── QuestDetailScreen.tsx
    └── components/
        ├── QuestCard.tsx
        └── QuestProgress.tsx
```

### 🏆 Достижения

```
achievements/
├── domain/
│   ├── entities/
│   │   └── Achievement.ts
│   ├── repositories/
│   │   └── IAchievementRepository.ts
│   └── usecases/
│       └── GetAchievementsUseCase.ts
├── data/
│   ├── repositories/
│   │   └── AchievementRepository.ts
│   └── models/
│       └── AchievementModel.ts
└── presentation/
    ├── screens/
    │   └── AchievementsScreen.tsx
    └── components/
        └── AchievementCard.tsx
```

### 🗺 Карта

```
map/
├── domain/
│   ├── entities/
│   │   └── Location.ts
│   ├── repositories/
│   │   └── ILocationRepository.ts
│   └── usecases/
│       └── GetNearbyLocationsUseCase.ts
├── data/
│   ├── repositories/
│   │   └── LocationRepository.ts
│   └── models/
│       └── LocationModel.ts
└── presentation/
    ├── screens/
    │   └── MapScreen.tsx
    └── components/
        └── LocationMarker.tsx
```

### 👥 Профиль

```
profile/
├── domain/
│   ├── entities/
│   │   └── User.ts
│   ├── repositories/
│   │   └── IUserRepository.ts
│   └── usecases/
│       └── UpdateUserProfileUseCase.ts
├── data/
│   ├── repositories/
│   │   └── UserRepository.ts
│   └── models/
│       └── UserModel.ts
└── presentation/
    ├── screens/
    │   └── ProfileScreen.tsx
    └── components/
        └── ProfileHeader.tsx
```

## 🔄 Правила взаимодействия

1. Внешние слои зависят от внутренних
2. Внутренние слои не знают о внешних
3. Каждый слой имеет свои модели
4. Внедрение зависимостей через DI контейнер
5. Использование интерфейсов для абстракции

## 🚀 Миграция

1. Создать новую структуру
2. Перенести существующий код в новые модули
3. Добавить слои абстракции
4. Обновить зависимости
5. Протестировать функционал
