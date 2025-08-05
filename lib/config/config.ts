import { NovaConfig } from '../types';

export function createNovaConfig(config: Partial<NovaConfig>): NovaConfig {
  return {
    auth: {
      secret: process.env.BETTER_AUTH_SECRET || '',
      adminRoles: ['ADMIN'],
      baseUrl: process.env.BETTER_AUTH_URL || 'http://localhost:3000',
      requireEmailVerification: false,
      sessionDuration: 24 * 60 * 60 * 1000, // 24 horas
      ...config.auth
    },
    database: {
      url: process.env.DATABASE_URL || '',
      provider: 'postgresql',
      ...config.database
    },
    ui: {
      theme: 'light',
      title: 'CMS Nova',
      primaryColor: '#10b981',
      ...config.ui
    },
    features: {
      users: true,
      plans: true,
      analytics: false,
      fileManager: false,
      backup: false,
      contentTypes: true,
      ...config.features
    },
    permissions: config.permissions
  };
}

export const defaultConfig: NovaConfig = createNovaConfig({});

export function validateConfig(config: NovaConfig): boolean {
  if (!config.auth.secret) {
    console.error('CMS Nova: auth.secret is required');
    return false;
  }
  
  if (!config.database.url) {
    console.error('CMS Nova: database.url is required');
    return false;
  }
  
  return true;
}
