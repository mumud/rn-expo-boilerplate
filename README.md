# React Native Expo Boilerplate 🚀

A production-ready React Native Expo boilerplate with modern architecture, TypeScript, and best practices. Built with clean code principles and optimized for scalability.

## ✨ Features

### 🔐 Authentication System
- Complete auth flow (Sign In, Sign Up, Forgot Password)
- Protected routes with automatic redirection
- Persistent authentication with AsyncStorage
- Form validation with custom hooks
- Error handling and loading states

### 🎨 UI/UX Components
- Modern UI components with NativeWind (Tailwind CSS)
- Optimized icon system with Lucide React Native
- Smooth tab transitions with React Native Reanimated
- Haptic feedback for iOS
- Dark mode support
- Responsive design for all screen sizes

### 🏗️ Architecture
- Clean folder structure with barrel exports
- TypeScript with strict type checking
- Custom hooks for reusable logic
- Context providers for state management
- Constants and configuration management
- Utility functions and helpers

### 📱 Screens
- **Home**: Dashboard with statistics and quick actions
- **Account**: User profile and settings management
- **Authentication**: Sign in, sign up, and password recovery

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator (for iOS development)
- Android Studio (for Android development)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd rn-expo-boilerplate
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npx expo start
   ```

4. **Run on device/simulator**
   - Press `i` for iOS Simulator
   - Press `a` for Android Emulator
   - Scan QR code with Expo Go app for physical device

### Default Credentials
For testing the authentication system:
- **Username**: `admin`
- **Password**: `password`

## 📁 Project Structure

```
├── app/                    # App screens and layouts
│   ├── (auth)/            # Authentication screens
│   ├── (tabs)/            # Tab navigation screens
│   └── _layout.tsx        # Root layout
├── components/            # Reusable UI components
│   └── ui/               # Base UI components
├── constants/            # App constants and configuration
├── contexts/             # React contexts (Auth, Theme, etc.)
├── hooks/                # Custom React hooks
├── lib/                  # Third-party library configurations
├── types/                # TypeScript type definitions
├── utils/                # Utility functions and helpers
└── assets/               # Images, fonts, and other assets
```

## 🛠️ Tech Stack

- **Framework**: React Native with Expo
- **Language**: TypeScript
- **Styling**: NativeWind (Tailwind CSS for React Native)
- **Navigation**: Expo Router (file-based routing)
- **Animation**: React Native Reanimated
- **Icons**: Lucide React Native
- **Storage**: AsyncStorage
- **State Management**: React Context + useReducer
- **Form Handling**: Custom hooks with validation

## 🎯 Key Features Implemented

### Authentication
- ✅ Sign In with validation
- ✅ Sign Up with form validation
- ✅ Forgot Password flow
- ✅ Protected routes
- ✅ Persistent authentication
- ✅ Auto-redirect based on auth state

### UI Components
- ✅ Button with variants and loading states
- ✅ Input with validation and error states
- ✅ Card components
- ✅ Text components with typography
- ✅ Optimized icon system
- ✅ Label components

### Navigation
- ✅ Tab navigation with smooth transitions
- ✅ Stack navigation for auth flow
- ✅ Protected route handling
- ✅ Deep linking support

### State Management
- ✅ AuthProvider with reducer pattern
- ✅ Form state management
- ✅ Loading and error states
- ✅ Persistent storage integration

## 🔧 Configuration

### Environment Variables
Create a `.env` file based on `.env.example`:
```bash
cp .env.example .env
```

### App Configuration
Modify `constants/app.ts` for app-specific settings:
- App name and version
- API endpoints
- Authentication settings
- UI configuration

## 📝 Development Guidelines

### Code Style
- Follow TypeScript strict mode
- Use functional components with hooks
- Implement proper error boundaries
- Add JSDoc comments for functions
- Use consistent naming conventions

### Best Practices
- Always use TypeScript interfaces
- Implement proper error handling
- Use custom hooks for reusable logic
- Follow the established folder structure
- Add loading states for async operations

## 🧪 Testing

```bash
# Run TypeScript check
npx tsc --noEmit --skipLibCheck

# Run tests (when implemented)
npm test

# Lint code
npm run lint
```

## 📦 Build & Deploy

### Development Build
```bash
# Create development build
eas build --profile development

# Install on device
eas build --profile development --platform ios --local
```

### Production Build
```bash
# Build for production
eas build --profile production

# Submit to app stores
eas submit
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

If you have any questions or need help:
- Check the [Expo documentation](https://docs.expo.dev/)
- Review the code comments and JSDoc
- Open an issue in the repository

---

**Happy coding! 🎉**
