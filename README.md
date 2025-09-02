# 🚀 React Native Expo Boilerplate

> **Production-ready React Native Expo boilerplate** with modern architecture, TypeScript, and latest best practices. Built with clean code principles and optimized for scalability.

[![React Native](https://img.shields.io/badge/React%20Native-0.79.5-blue.svg)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-53.0.22-black.svg)](https://expo.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue.svg)](https://www.typescriptlang.org/)
[![NativeWind](https://img.shields.io/badge/NativeWind-4.1.23-38bdf8.svg)](https://www.nativewind.dev/)

## ✨ Key Features

### 🔐 Complete Authentication System
- ✅ **Complete Auth Flow**: Sign In, Sign Up, Forgot Password with form validation
- ✅ **Protected Routes**: Automatic redirection based on authentication status
- ✅ **Persistent Authentication**: Using MMKV for optimal performance
- ✅ **Custom Hooks**: `useAuth`, `useProtectedRoute` for reusable logic
- ✅ **Error Handling**: Comprehensive error states and loading indicators
- ✅ **Session Management**: Auto-logout and refresh token handling

### 🎨 Modern UI/UX System
- ✅ **Design System**: Consistent UI components with variant system
- ✅ **NativeWind Integration**: Tailwind CSS for React Native with dark mode
- ✅ **Icon System**: Lucide React Native with optimized tree-shaking
- ✅ **Smooth Animations**: React Native Reanimated for high performance
- ✅ **Responsive Design**: Adaptive layout for all screen sizes
- ✅ **Haptic Feedback**: Enhanced user experience for iOS

### 🏗️ Clean Architecture
- ✅ **TypeScript Strict Mode**: Type safety with strict configuration
- ✅ **Barrel Exports**: Organized imports with index files
- ✅ **Custom Hooks**: Reusable logic for form, auth, storage, and theme
- ✅ **State Management**: Zustand for global state with selectors
- ✅ **Error Boundaries**: Global error handling with recovery options
- ✅ **Constants Management**: Centralized configuration and constants

### 📱 Screens & Navigation
- ✅ **File-based Routing**: Expo Router with typed routes
- ✅ **Tab Navigation**: Smooth transitions with custom animations
- ✅ **Home Dashboard**: Statistics, quick actions, and task management
- ✅ **Account Management**: User profile and settings with theme toggle
- ✅ **Authentication Screens**: Modern UI with form validation
- ✅ **Deep Linking**: Support for external navigation

## 🛠️ Tech Stack

### Core Framework
- **React Native**: `0.79.5` - Latest stable version
- **Expo**: `53.0.22` - Managed workflow with custom dev client
- **TypeScript**: `5.8.3` - Strict mode for type safety
- **Expo Router**: `5.1.5` - File-based routing with typed navigation

### UI & Styling
- **NativeWind**: `4.1.23` - Tailwind CSS for React Native
- **Tailwind CSS**: `3.4.15` - Utility-first CSS framework
- **Lucide React Native**: `0.542.0` - Modern icon library
- **React Native Reanimated**: `3.17.4` - High-performance animations
- **React Native SVG**: `15.12.1` - SVG support with transformer

### State Management & Storage
- **Zustand**: `5.0.8` - Lightweight state management
- **React Native MMKV**: `3.3.0` - Fast key-value storage
- **AsyncStorage Alternative**: MMKV for superior performance

### Development Tools
- **ESLint**: `8.57.0` - Code linting with Expo config
- **Jest**: `29.2.1` - Testing framework with Expo preset
- **Metro**: Custom configuration for SVG and asset handling

## 🚀 Quick Start

### Prerequisites
```bash
# Required versions
Node.js >= 18.0.0
npm >= 8.0.0 or yarn >= 1.22.0
Expo CLI >= 6.0.0

# Development tools
iOS Simulator (for iOS development)
Android Studio (for Android development)
```

### Installation

1. **Clone repository**
   ```bash
   git clone https://github.com/your-username/rn-expo-boilerplate.git
   cd rn-expo-boilerplate
   ```

2. **Install dependencies**
   ```bash
   npm install
   # atau
   yarn install
   ```

3. **Setup environment**
   ```bash
   cp .env.example .env
   # Edit .env file according to your needs
   ```

4. **Start development server**
   ```bash
   npx expo start
   # atau
   npm start
   ```

5. **Run on device/simulator**
   ```bash
   # iOS Simulator
   npm run ios
   
   # Android Emulator
   npm run android
   
   # Web browser
   npm run web
   
   # Physical device - scan QR code with Expo Go
   ```

### Default Test Credentials
```
Username: admin
Password: password
```

## 📁 Project Structure

```
rn-expo-boilerplate/
├── app/                          # Expo Router screens
│   ├── (auth)/                  # Authentication flow
│   │   ├── signin.tsx           # Sign in screen
│   │   ├── signup.tsx           # Sign up screen
│   │   └── forgot-password.tsx  # Password recovery
│   ├── (tabs)/                  # Tab navigation
│   │   ├── _layout.tsx          # Tab layout configuration
│   │   ├── index.tsx            # Home dashboard
│   │   └── account.tsx          # User account & settings
│   ├── _layout.tsx              # Root layout with providers
│   └── notification.tsx         # Notification screen
├── components/                   # Reusable UI components
│   ├── ui/                      # Base UI components
│   │   ├── button.tsx           # Button with variants
│   │   ├── input.tsx            # Input with validation
│   │   ├── card.tsx             # Card components
│   │   ├── text.tsx             # Typography system
│   │   ├── label.tsx            # Form labels
│   │   └── icons/               # Icon components
│   └── index.ts                 # Barrel exports
├── hooks/                        # Custom React hooks
│   ├── useAuth.ts               # Authentication logic
│   ├── useForm.ts               # Form handling with validation
│   ├── useProtectedRoute.ts     # Route protection
│   ├── useStorage.ts            # MMKV storage hooks
│   ├── useTheme.ts              # Theme management
│   └── index.ts                 # Barrel exports
├── stores/                       # Zustand state management
│   ├── authStore.ts             # Authentication state
│   ├── themeStore.ts            # Theme state with persistence
│   └── index.ts                 # Store exports with selectors
├── types/                        # TypeScript definitions
│   ├── auth.ts                  # Authentication types
│   ├── forms.ts                 # Form and validation types
│   ├── navigation.ts            # Navigation types
│   ├── common.ts                # Common utility types
│   ├── theme.ts                 # Theme system types
│   └── index.ts                 # Type exports
├── utils/                        # Utility functions
│   ├── validation.ts            # Form validation utilities
│   ├── helpers.ts               # General helper functions
│   ├── storage.ts               # Storage utilities
│   └── index.ts                 # Utility exports
├── lib/                          # Third-party configurations
│   ├── mmkv.ts                  # MMKV storage setup
│   ├── theme.ts                 # Theme configuration
│   └── utils.ts                 # Utility functions (cn, etc.)
├── constants/                    # App constants
│   ├── app.ts                   # App configuration and constants
│   └── index.ts                 # Constants exports
├── contexts/                     # React contexts
│   ├── ThemeProvider.tsx        # Theme context provider
│   └── index.ts                 # Context exports
├── assets/                       # Static assets
│   ├── images/                  # Image assets
│   ├── fonts/                   # Custom fonts
│   └── svg/                     # SVG illustrations
└── config/                       # Configuration files
    ├── env.ts                   # Environment configuration
    └── index.ts                 # Config exports
```

## 🎯 Implemented Features

### Authentication System
- ✅ **Sign In**: Username/password with validation
- ✅ **Sign Up**: Registration with form validation
- ✅ **Forgot Password**: Password recovery flow
- ✅ **Protected Routes**: Automatic redirection
- ✅ **Session Persistence**: MMKV storage integration
- ✅ **Auto-logout**: Session timeout handling
- ✅ **Error States**: Comprehensive error handling

### UI Component Library
- ✅ **Button**: Multiple variants (default, destructive, outline, secondary, ghost)
- ✅ **Input**: Validation states, error handling, password toggle
- ✅ **Card**: Flexible card components with header/content/footer
- ✅ **Text**: Typography system with semantic variants
- ✅ **Label**: Form labels with accessibility
- ✅ **Icons**: Optimized icon system with Lucide

### Navigation & Routing
- ✅ **File-based Routing**: Expo Router with typed routes
- ✅ **Tab Navigation**: Smooth animations with custom styling
- ✅ **Stack Navigation**: Authentication flow navigation
- ✅ **Deep Linking**: External navigation support
- ✅ **Route Protection**: Conditional access based on auth state

### State Management
- ✅ **Zustand Stores**: Lightweight global state
- ✅ **Auth Store**: User authentication state
- ✅ **Theme Store**: Dark/light mode with persistence
- ✅ **Selectors**: Optimized state subscriptions
- ✅ **Persistence**: MMKV integration for performance

### Developer Experience
- ✅ **TypeScript Strict**: Complete type safety
- ✅ **ESLint Configuration**: Code quality enforcement
- ✅ **Barrel Exports**: Clean import statements
- ✅ **Error Boundaries**: Global error handling
- ✅ **Hot Reload**: Fast development cycle

## 🔧 Configuration

### Environment Variables

Create `.env` file based on `.env.example`:

```bash
# API Configuration
API_BASE_URL=https://api.example.com
API_TIMEOUT=10000

# App Environment
APP_ENV=development
DEBUG_MODE=true

# External Services
SENTRY_DSN=your_sentry_dsn
ANALYTICS_KEY=your_analytics_key
```

### App Configuration

Modify `constants/app.ts` for app-specific settings:

```typescript
export const APP_CONFIG = {
  NAME: "Your App Name",
  VERSION: "1.0.0",
  BUNDLE_ID: "com.yourcompany.yourapp",
} as const;

export const API_CONFIG = {
  BASE_URL: "https://your-api.com",
  TIMEOUT: 30000,
} as const;
```

### Theme Customization

Customize theme in `tailwind.config.js`:

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        // Add your custom colors
      },
    },
  },
};
```

## 📝 Development Guidelines

### Code Style
- ✅ **TypeScript Strict Mode**: Always use strict type checking
- ✅ **Functional Components**: Use hooks for state management
- ✅ **Error Boundaries**: Implement proper error handling
- ✅ **JSDoc Comments**: Function documentation in English
- ✅ **Consistent Naming**: camelCase for variables, PascalCase for components
- ✅ **Barrel Exports**: Use index.ts for clean imports

### Best Practices
- ✅ **Custom Hooks**: Extract reusable logic to custom hooks
- ✅ **Type Safety**: Always define interfaces for data structures
- ✅ **Error Handling**: Implement try-catch and error states
- ✅ **Performance**: Use React.memo and useMemo for optimization
- ✅ **Accessibility**: Implement proper accessibility props
- ✅ **Testing**: Write unit tests for critical functions

### Folder Structure Rules
- ✅ **Barrel Exports**: Every folder has index.ts
- ✅ **Single Responsibility**: One file, one purpose
- ✅ **Consistent Naming**: Use kebab-case for files, PascalCase for components
- ✅ **Type Definitions**: Separate types to dedicated folder

## 🧪 Testing

```bash
# Type checking
npx tsc --noEmit --skipLibCheck

# Run tests
npm test

# Lint code
npm run lint

# Fix linting issues
npx expo lint --fix
```

## 📦 Build & Deploy

### Development Build
```bash
# Create development build
eas build --profile development

# Install on device
eas build --profile development --platform ios --local
eas build --profile development --platform android --local
```

### Production Build
```bash
# Build for production
eas build --profile production

# Submit to app stores
eas submit --platform ios
eas submit --platform android
```

### Web Deployment
```bash
# Build for web
npx expo export --platform web

# Deploy to Netlify/Vercel
# Upload dist folder
```

## 🔄 Migration Guide

### From Expo SDK 52 to 53
1. Update dependencies in `package.json`
2. Run `npx expo install --fix`
3. Update `app.config.js` if needed
4. Test all functionality

### Adding New Features
1. Create types in `types/` folder
2. Implement hooks in `hooks/` folder
3. Create components in `components/` folder
4. Add screens in `app/` folder
5. Update constants if needed

## 🤝 Contributing

1. **Fork repository**
2. **Create feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit changes**: `git commit -m 'Add amazing feature'`
4. **Push to branch**: `git push origin feature/amazing-feature`
5. **Open Pull Request**

### Contribution Guidelines
- Follow existing code style and patterns
- Add tests for new features
- Update documentation if needed
- Ensure TypeScript strict mode compliance
- Add JSDoc comments for public functions

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

## 🆘 Support & Resources

### Documentation
- 📚 [Expo Documentation](https://docs.expo.dev/)
- 📚 [React Native Documentation](https://reactnative.dev/docs/getting-started)
- 📚 [NativeWind Documentation](https://www.nativewind.dev/)
- 📚 [Zustand Documentation](https://zustand-demo.pmnd.rs/)

### Community
- 💬 [Expo Discord](https://discord.gg/expo)
- 💬 [React Native Community](https://reactnative.dev/community/overview)
- 🐛 [Report Issues](https://github.com/your-username/rn-expo-boilerplate/issues)

### Getting Help
1. Check existing documentation and code comments
2. Search through GitHub issues
3. Ask questions in community forums
4. Create new issue with detailed description

---

**Built with ❤️ by developers, for developers**

*Happy coding! 🎉*
