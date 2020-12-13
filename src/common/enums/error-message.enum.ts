export enum ErrorMessage {
  // HTTP
  BAD_REQUEST = 'Bad Request',
  UNAUTHORIZED = 'Unauthorized',
  FORBIDDEN = 'Forbidden resource',
  NOT_FOUND = 'Resource not found',
  CONFLICTED = 'Conflicted',
  INTERNAL_SERVER_ERROR = 'Internal Server Error',
  DUPLICATE = 'Duplicated entry',
  // JWT
  NO_TOKEN_PROVIDED = 'No token provided',
  TOKEN_EXPIRED = 'Token expired',
  INVALID_TOKEN = 'Invalid token',
  INVALID_USER = 'Invalid User',
  USER_NOT_FOUND = 'User not found',
}