// API ключ Яндекс MapKit (мобильный SDK). Ключ от JavaScript API здесь не подходит.
// Локально задаётся в .env.local, для EAS Build — через переменные окружения EAS.
const YANDEX_MAPKIT_API_KEY = process.env.YANDEX_MAPKIT_API_KEY;

if (!YANDEX_MAPKIT_API_KEY) {
  console.warn(
    '[app.config] YANDEX_MAPKIT_API_KEY не задан — карта не загрузится',
  );
}

export default ({ config }: { config: Record<string, unknown> }) => ({
  ...config,
  extra: {
    ...(config.extra as Record<string, unknown>),
    mapKitApiKey: YANDEX_MAPKIT_API_KEY,
    eas: {
      projectId: '9928cc6e-e97a-4c7d-821e-962a23f03f70',
    },
  },
});
