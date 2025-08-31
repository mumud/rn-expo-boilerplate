/**
 * Environment Variables Configuration
 * Konfigurasi environment variables untuk aplikasi
 */

import Constants from 'expo-constants';

// Interface untuk environment variables
interface EnvConfig {
  API_BASE_URL: string;
  API_TIMEOUT: number;
  APP_ENV: 'development' | 'staging' | 'production';
  DEBUG_MODE: boolean;
  SENTRY_DSN?: string;
  ANALYTICS_KEY?: string;
}

// Default configuration
const defaultConfig: EnvConfig = {
  API_BASE_URL: 'https://api.example.com',
  API_TIMEOUT: 10000,
  APP_ENV: 'development',
  DEBUG_MODE: __DEV__,
};

// Get environment variables dari Expo Constants
const getEnvConfig = (): EnvConfig => {
  const extra = Constants.expoConfig?.extra || {};
  
  return {
    API_BASE_URL: extra.API_BASE_URL || defaultConfig.API_BASE_URL,
    API_TIMEOUT: extra.API_TIMEOUT || defaultConfig.API_TIMEOUT,
    APP_ENV: extra.APP_ENV || defaultConfig.APP_ENV,
    DEBUG_MODE: extra.DEBUG_MODE !== undefined ? extra.DEBUG_MODE : defaultConfig.DEBUG_MODE,
    SENTRY_DSN: extra.SENTRY_DSN,
    ANALYTICS_KEY: extra.ANALYTICS_KEY,
  };
};

// Export environment configuration
export const ENV = getEnvConfig();

// Helper functions
export const isDevelopment = () => ENV.APP_ENV === 'development';
export const isProduction = () => ENV.APP_ENV === 'production';
export const isStaging = () => ENV.APP_ENV === 'staging';

// Log configuration in development
if (ENV.DEBUG_MODE) {
  console.log('Environment Configuration:', ENV);
}