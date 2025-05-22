export class AppError extends Error {
  constructor(
    public readonly code: string,
    message: string,
    public readonly originalError?: unknown
  ) {
    super(message);
    this.name = 'AppError';
  }
}

export class NetworkError extends AppError {
  constructor(message: string, originalError?: unknown) {
    super('NETWORK_ERROR', message, originalError);
    this.name = 'NetworkError';
  }
}

export class ValidationError extends AppError {
  constructor(message: string, originalError?: unknown) {
    super('VALIDATION_ERROR', message, originalError);
    this.name = 'ValidationError';
  }
}

export class AuthError extends AppError {
  constructor(message: string, originalError?: unknown) {
    super('AUTH_ERROR', message, originalError);
    this.name = 'AuthError';
  }
}
