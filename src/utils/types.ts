// types.ts

export interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  createdAt: Date;
  updatedAt: Date;
  roles: Role[];
  // Add more user-related fields as needed.
}

export interface Role {
  id: string;
  name: string;
  description?: string;
  permissions: Permission[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Permission {
  id: string;
  name: string;
  description?: string;
  resource: string;
  action: string; // e.g., "read", "write", "delete", "update"
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthTokenPayload {
  sub: string; // Subject (User ID)
  email: string;
  roles: string[]; // Role names
  permissions: string[]; // Permission names
  iat: number; // Issued At (timestamp)
  exp: number; // Expiration Time (timestamp)
}

export interface AuthConfig {
  jwtSecret: string;
  jwtExpiration: string; // e.g., "1h", "1d", "7d"
  refreshTokenSecret: string;
  refreshTokenExpiration: string; // e.g., "30d"
}

export interface RequestContext {
  userId?: string;
  email?: string;
  roles?: string[];
  permissions?: string[];
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string; // Optional error message
  statusCode: number; // HTTP status code
}

export enum AuthProvider {
  LOCAL = 'local',
  GOOGLE = 'google',
  FACEBOOK = 'facebook',
  // Add more providers as needed
}

export interface ExternalAuthProviderConfig {
  clientId: string;
  clientSecret: string;
  callbackURL: string;
}

export interface AuthGatewayConfig {
  port: number;
  authServiceUrl: string;
  userServiceUrl: string;
  roleServiceUrl: string;
  permissionServiceUrl: string;
  jwtSecret: string;
  jwtExpiration: string;
  refreshTokenSecret: string;
  refreshTokenExpiration: string;
  google?: ExternalAuthProviderConfig;
  facebook?: ExternalAuthProviderConfig;
}

export interface ServiceHealth {
  status: 'healthy' | 'unhealthy';
  details?: any;
}

export interface HealthCheckResponse {
  authService: ServiceHealth;
  userService: ServiceHealth;
  roleService: ServiceHealth;
  permissionService: ServiceHealth;
  gateway: ServiceHealth;
}