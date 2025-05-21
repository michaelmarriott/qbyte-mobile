# QByte Mobile

A React Native mobile application built with Expo that connects to the QByte API for quantum data processing and visualization.

## Features

- User authentication
- Real-time QByte data processing
- Live visualization of quantum data
- Continuous data streaming
- Customizable QByte process parameters

## Screenshots

(Screenshots will be added after the first build)

## Prerequisites

- Node.js (v14 or later)
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)
- Android Studio (for Android development) or Xcode (for iOS development)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd qbyte-mobile
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
expo start
```

4. Run on a device or emulator:
   - Scan the QR code with the Expo Go app on your device
   - Press 'a' to run on an Android emulator
   - Press 'i' to run on an iOS simulator

## API Connection

The app connects to the QByte API at `qbyteapi.cloud` to fetch and visualize data. The main endpoint used is:

```
https://qbyteapi.cloud/api/run_qbyte_headless?mode=static&remarks=CustomRun&continuous=true
```

This endpoint streams QByte data continuously until the connection is closed.

## Project Structure

```
qbyte-mobile/
├── App.js                 # Main application entry point
├── app.json               # Expo configuration
├── package.json           # Dependencies and scripts
├── babel.config.js        # Babel configuration
├── assets/                # Images and assets
└── screens/               # Application screens
    ├── LoginScreen.js     # Authentication screen
    ├── HomeScreen.js      # Main dashboard
    ├── QByteScreen.js     # QByte process configuration
    └── QByteVisualizationScreen.js # Data visualization
```

## Technologies Used

- React Native
- Expo
- React Navigation
- Expo Secure Store (for authentication)
- React Native Chart Kit (for data visualization)
- Server-Sent Events (SSE) for real-time data streaming

## Development

To modify the API connection, update the endpoint in `QByteScreen.js`. The visualization logic is contained in `QByteVisualizationScreen.js`.




