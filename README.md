# Toolva Mobile App

A modern mobile application built with Expo and React Native.

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)
- iOS Simulator (for Mac users) or Android Studio (for Android development)

## Getting Started

1. Clone the repository:
```bash
git clone [your-repository-url]
cd toolva-mobile
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
```

4. Run on your device:
   - Install the Expo Go app on your mobile device
   - Scan the QR code that appears in the terminal
   - Or press 'i' for iOS simulator or 'a' for Android emulator

## Project Structure

```
toolva-mobile/
├── app/                 # Main application code
├── assets/             # Static assets (images, fonts, etc.)
├── hooks/              # Custom React hooks
├── components/         # Reusable components
└── ...
```

## Required Assets

The following assets are required for the app to function properly. Please ensure they are present in the `assets/images` directory:

- `icon.png` (1024x1024) - App icon
- `splash.png` (1242x2436) - Splash screen image
- `adaptive-icon.png` (1024x1024) - Android adaptive icon
- `favicon.png` (32x32) - Web favicon

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build:web` - Build the web version
- `npm run lint` - Run linting

## Features

- Modern UI with Expo Router
- TypeScript support
- Responsive design
- Cross-platform compatibility

## Contributing

Please read our [Contributing Guidelines](CONTRIBUTING.md) before submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, please open an issue in the repository or contact the development team. 