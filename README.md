# AiroApp 🚀

Welcome to **AiroApp**, a state-of-the-art React Native starter project. Jumpstart your mobile app development with a codebase that's not just powerful but also a breeze to work with.

## Architecture 🏛️

AiroApp adopts **Domain-Driven Design (DDD)** principles, ensuring a modular, scalable, and maintainable codebase. This approach focuses on the core business logic and promotes a deep understanding of the project's domain, leading to more effective and efficient development practices.

## Features ✨

- 📱 **Latest React Native (0.73.2)**: Utilize the most current features of React Native for cross-platform apps.
- 🗺️ **Navigation Support**: Seamlessly integrated with `@react-navigation/native` v6.
- 🌐 **Networking & Offline Data Syncing**: Easy API calls with `axios` and `@tanstack/react-query`.
- 🌍 **i18n**: Make your app globally accessible with `i18n-js` with ability to switch between locales.
- 🚦 **Permissions Management**: Simplified with `react-native-permissions`.
- 🔒 **State Management**: Efficiently managed with `@reduxjs/toolkit`.
- 🎨 **Styling & Icons**: Enhanced with `react-native-easy-icons`, `react-native-svg` and integration of theme switch.
- 🚧 **Developer Tools**: Comprehensive suite of linting, testing, typing tools and debugging with Reactotron.

## Getting Started 🚀

```bash
yarn install:app
yarn start
yarn ios/android
```

- **`yarn link-fonts`** - Links the fonts inside /assets/fonts folder
- **`yarn rename-app`** - Renames application. Follow terminal instructions
- **`yarn generate-bootsplash`** - Generates bootsplash with /assets/images/logo.svg middle logo
- **`yarn generate-icons`** - Generates icons for Android and iOS from /assets/images/app_icon.jpeg

Set `USE_SINGLE_LOCALE = false` inside `src/i18n/i18n.ts` if you want to use different locales. Defaults to FR  
Set default theme inside `src/context/ThemeContext.tsx`. Add colors inside `Colors.ts`. Defaults to `'light'`
