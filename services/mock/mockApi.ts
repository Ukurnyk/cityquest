/**
 * Mock-реализация REST API для разработки без бэкенда.
 * Включается переменной EXPO_PUBLIC_API_MOCK=1 (см. services/api.ts).
 */
import { ApiUser, TokenPair } from '@/types';
import {
  MOCK_ACHIEVEMENTS,
  MOCK_CITY,
  MOCK_USERS,
  mockCompletedAchievements,
} from './fixtures';

export interface MockResponse {
  status: number;
  body: unknown;
}

type Handler = (
  match: RegExpMatchArray,
  body: unknown,
  query: URLSearchParams,
) => MockResponse;

interface Route {
  method: string;
  pattern: RegExp;
  handler: Handler;
}

const MOCK_LATENCY_MS = 300;

// Текущий пользователь mock-сессии: любой логин принимается
let currentUser: ApiUser = MOCK_USERS[0];

const ok = (body: unknown): MockResponse => ({ status: 200, body });
const notFound = (): MockResponse => ({
  status: 404,
  body: { title: 'Не найдено (mock)' },
});

function tokens(): TokenPair {
  return {
    accessToken: 'mock-access-token',
    refreshToken: 'mock-refresh-token',
  };
}

const routes: Route[] = [
  {
    method: 'POST',
    pattern: /^\/api\/Auth\/session-authenticate$/,
    handler: (_m, body) => {
      const { login } = body as { login: string };
      currentUser = MOCK_USERS.find((u) => u.username === login) ?? {
        ...MOCK_USERS[0],
        username: login,
      };
      return ok(tokens());
    },
  },
  {
    method: 'POST',
    pattern: /^\/api\/Auth\/user_create$/,
    handler: (_m, body) => {
      const { username, email } = body as { username: string; email: string };
      currentUser = { ...MOCK_USERS[0], id: 'u-new', username, email };
      return ok(currentUser);
    },
  },
  {
    method: 'POST',
    pattern: /^\/api\/Auth\/token-refresh$/,
    handler: () => ok(tokens()),
  },
  {
    method: 'POST',
    pattern: /^\/api\/Auth\/session-logout$/,
    handler: () => ({ status: 204, body: undefined }),
  },
  {
    method: 'GET',
    pattern: /^\/api\/Users\/me$/,
    handler: () => ok(currentUser),
  },
  {
    method: 'GET',
    pattern: /^\/api\/Users$/,
    handler: () => ok(MOCK_USERS),
  },
  {
    method: 'GET',
    pattern: /^\/api\/Users\/([^/]+)$/,
    handler: (m) => {
      const user = MOCK_USERS.find((u) => u.id === m[1]);
      return user ? ok(user) : notFound();
    },
  },
  {
    method: 'GET',
    pattern: /^\/api\/cities$/,
    handler: () => ok([MOCK_CITY]),
  },
  {
    method: 'GET',
    pattern: /^\/api\/cities\/([^/]+)$/,
    handler: (m) => (m[1] === MOCK_CITY.id ? ok(MOCK_CITY) : notFound()),
  },
  {
    method: 'GET',
    pattern: /^\/api\/achievements\/cities\/([^/]+)$/,
    handler: (_m, _body, query) => {
      const page = Number(query.get('page') ?? 1);
      const pageSize = Number(query.get('pageSize') ?? 50);
      const start = (page - 1) * pageSize;
      return ok({
        items: MOCK_ACHIEVEMENTS.slice(start, start + pageSize),
        totalItems: MOCK_ACHIEVEMENTS.length,
        page,
        pageSize,
      });
    },
  },
  {
    method: 'GET',
    pattern: /^\/api\/achievements\/users\/([^/]+)\/completed$/,
    handler: (m) => ok(mockCompletedAchievements(m[1])),
  },
  {
    method: 'GET',
    pattern: /^\/api\/achievements\/users\/([^/]+)$/,
    handler: (m) => ok(mockCompletedAchievements(m[1])),
  },
  {
    method: 'GET',
    pattern: /^\/api\/achievements\/([^/]+)$/,
    handler: (m) => {
      const ach = MOCK_ACHIEVEMENTS.find((a) => a.id === m[1]);
      return ach ? ok(ach) : notFound();
    },
  },
];

export async function mockRequest(
  method: string,
  path: string,
  body?: unknown,
): Promise<MockResponse> {
  await new Promise((resolve) => setTimeout(resolve, MOCK_LATENCY_MS));

  const [pathname, search = ''] = path.split('?');
  const query = new URLSearchParams(search);

  for (const route of routes) {
    if (route.method !== method) continue;
    const match = pathname.match(route.pattern);
    if (match) return route.handler(match, body, query);
  }

  console.warn(`[mock API] Нет обработчика для ${method} ${path}`);
  return notFound();
}
