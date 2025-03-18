# Toolva Mobile App

A full-stack mobile application built with React Native (Expo) for the frontend and Go for the backend, featuring a robust database system.

## 🚀 Tech Stack

### Frontend
- **React Native** with Expo
- **TypeScript** for type safety
- **Expo Router** for navigation
- **React Native Reanimated** for smooth animations
- **React Native Gesture Handler** for touch interactions
- **Expo Blur** for modern UI effects
- **Expo Linear Gradient** for beautiful gradients
- **Expo Haptics** for tactile feedback

### Backend
- **Go** (Golang) for high-performance server
- **Gin** web framework
- **GORM** for database ORM
- **PostgreSQL** for primary database
- **Redis** for caching and real-time features
- **JWT** for authentication
- **Swagger** for API documentation

## 📱 Mobile App Features

- Modern, responsive UI design
- Smooth animations and transitions
- Offline-first architecture
- Push notifications
- Deep linking support
- Biometric authentication
- Real-time updates
- Cross-platform compatibility (iOS & Android)

## 🛠️ Project Structure

```
toolva-mobile/
├── mobile/                 # React Native Mobile App
│   ├── app/               # Main application code
│   ├── assets/            # Static assets
│   ├── components/        # Reusable components
│   ├── hooks/             # Custom React hooks
│   └── utils/             # Utility functions
│
├── backend/               # Go Backend
│   ├── cmd/              # Application entry points
│   ├── internal/         # Private application code
│   ├── pkg/              # Public libraries
│   ├── api/              # API definitions
│   └── migrations/       # Database migrations
│
└── docs/                 # Documentation
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- Go (v1.21 or higher)
- PostgreSQL (v15 or higher)
- Redis (v7 or higher)
- Expo CLI (`npm install -g expo-cli`)
- iOS Simulator (for Mac users) or Android Studio (for Android development)

### Mobile App Setup

1. Navigate to the mobile directory:
```bash
cd mobile
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Run on your device:
   - Install the Expo Go app on your mobile device
   - Scan the QR code that appears in the terminal
   - Or press 'i' for iOS simulator or 'a' for Android emulator

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install Go dependencies:
```bash
go mod download
```

3. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your configuration
```

4. Run database migrations:
```bash
go run cmd/migrate/main.go
```

5. Start the server:
```bash
go run cmd/server/main.go
```

## 📦 Required Assets

The following assets are required for the mobile app to function properly. Please ensure they are present in the `mobile/assets/images` directory:

- `icon.png` (1024x1024) - App icon
- `splash.png` (1242x2436) - Splash screen image
- `adaptive-icon.png` (1024x1024) - Android adaptive icon
- `favicon.png` (32x32) - Web favicon

## 🔒 Security

- JWT-based authentication
- HTTPS encryption
- Rate limiting
- Input validation
- SQL injection prevention
- XSS protection
- CSRF protection

## 📊 Database Schema

The application uses PostgreSQL with the following main tables:

- Users
- Profiles
- Posts
- Comments
- Likes
- Followers
- Notifications

## 🔄 API Endpoints

### Authentication
- POST /api/v1/auth/register
- POST /api/v1/auth/login
- POST /api/v1/auth/refresh-token
- POST /api/v1/auth/logout

### Users
- GET /api/v1/users/me
- PUT /api/v1/users/me
- GET /api/v1/users/:id
- PUT /api/v1/users/:id

### Posts
- GET /api/v1/posts
- POST /api/v1/posts
- GET /api/v1/posts/:id
- PUT /api/v1/posts/:id
- DELETE /api/v1/posts/:id

## 🧪 Testing

### Mobile App Tests
```bash
cd mobile
npm run test
```

### Backend Tests
```bash
cd backend
go test ./...
```

## 📱 Mobile App Screenshots

[Add screenshots of your app here]

## 🤝 Contributing

Please read our [Contributing Guidelines](CONTRIBUTING.md) before submitting pull requests.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔧 Development Tools

- VS Code with recommended extensions
- Postman for API testing
- pgAdmin for database management
- Redis Commander for Redis management

## 📞 Support

For support, please:
1. Check the [documentation](docs/)
2. Open an issue in the repository
3. Contact the development team

## 🔄 CI/CD

- GitHub Actions for automated testing
- Automated deployment to staging and production
- Code quality checks
- Security scanning

## 📈 Performance Monitoring

- Firebase Analytics
- Sentry for error tracking
- Custom performance metrics
- User behavior analytics 