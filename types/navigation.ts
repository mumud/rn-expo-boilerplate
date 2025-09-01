/**
 * Navigation related types
 * Contains all type definitions for navigation and routing
 */

import { Href } from "expo-router";

// Expo Router Param Lists
export type RootStackParamList = {
  "(tabs)": undefined;
  "(auth)/signin": undefined;
  "(auth)/signup": undefined;
  "(auth)/forgot-password": undefined;
  "(auth)/reset-password": { token: string };
  "(auth)/verify-email": { token: string };
  modal: { title?: string; content?: string };
  profile: { userId: string };
  settings: undefined;
  notifications: undefined;
};

// Tab Navigator
export type TabParamList = {
  index: undefined;
  account: undefined;
  explore: undefined;
};

// Auth Stack Navigator
export type AuthStackParamList = {
  signin: undefined;
  signup: undefined;
  "forgot-password": undefined;
  "reset-password": { token: string };
  "verify-email": { token: string };
};

// Expo Router Screen Props Types
export type RootStackScreenProps<T extends keyof RootStackParamList> = {
  route: { params: RootStackParamList[T] };
  navigation: any;
};

export type TabScreenProps<T extends keyof TabParamList> = {
  route: { params: TabParamList[T] };
  navigation: any;
};

export type AuthStackScreenProps<T extends keyof AuthStackParamList> = {
  route: { params: AuthStackParamList[T] };
  navigation: any;
};

// Expo Router specific types
export type AppHref = Href;
export type RouteParams = Record<string, string | number | boolean | undefined>;

// Navigation State
export interface NavigationState {
  index: number;
  routes: {
    key: string;
    name: string;
    params?: object;
  }[];
}

// Deep Link Types
export interface DeepLinkConfig {
  screens: {
    [key: string]: string | DeepLinkConfig;
  };
}

export interface LinkingOptions {
  prefixes: string[];
  config: DeepLinkConfig;
}
