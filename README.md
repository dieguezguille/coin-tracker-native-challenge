# Coin Tracker Native Challenge

This project is a React Native Expo application that lists the top assets traded on CoinGecko, sorted by Market Cap in descending order. It also includes a historical price graph for selected assets with the ability to change the asset and the time frame displayed.

## Features

- **Top Assets List**: Displays the top 10 assets by Market Cap in a scrollable view with pull-to-refresh functionality.
- **Asset Price Data**: Shows the historical price of a selected asset with options to view data for 30, 60, and 90 days (limited by CG's Demo API tier)
- **Responsive Design**: Optimized for mobile devices. Fast navigation, no unnecesary animations.

## Technologies Used

- **React Native**: For building the mobile application.
- **Expo**: To streamline the development process.
- **TypeScript**: For static typing and improved developer experience.
- **CoinGecko API**: For fetching asset data and historical prices.
- **Redux Toolkit**: For state management and decoupling
- **Redux Persist**: For persisting asset information and settings.
- **Web3Modal (WalletConnect)** For all web3 related integrations.
- **React Native Chart Kit**: For rendering charts.
- **Vanilla Styles**: For UI components.

## Installation

1. Clone the repository:

   ```bash
    git clone <https://github.com/dieguezguille/coin-tracker-native-challenge.git>
    ```

2. Navigate to the project directory:

   ```bash
    cd coin-tracker-native-challenge
    ```

3. Install dependencies:

    ```bash
    npm install
    ```

4. Start the Expo server:

    ```bash
    npm run start
    ```

## Environment Variables

Make sure to set up your environment variables correctly. Create a \`.env\` file in the root of your project and add the following:

```
EXPO_PUBLIC_COIN_GECKO_API_BASE_URL=https://api.coingecko.com/api/v3
EXPO_PUBLIC_WALLET_CONNECT_PID='Your WalletConnect Project ID'
EXPO_PUBLIC_WALLET_CONNECT_PNAME=Coin Tracker Native
EXPO_PUBLIC_WALLET_CONNECT_PDESC=Track your favorite cryptocurrencies
EXPO_PUBLIC_WALLET_CONNECT_PURL=https://guillermodieguez.com
EXPO_PUBLIC_WALLET_CONNECT_PICON=https://avatars.githubusercontent.com/u/20884382
```

## Commit History and Code Comments

Throughout the project, clear commit messages were used to document the progress and changes made. Additionally, code comments are included to explain the logic and purpose of various functions and components.

## Usage

1. **Configure API Key**: On the Settings Page, make sure to paste your CG API key. It will persist even if you close and reopen the app.
2. **View Top Assets**: On the main screen, you will see a table listing the top 10 assets by market cap in descending order. The list has pull to refresh.
3. **View Historical Prices**: Select an asset from the list to view its historical price graph. Use the interval buttons to switch between different periods.
4. **Add to Watchlist**: Click on the Add to watchlist button to add an asset to favorites. This will persist even when closing and reopening the app.
5. **Connect Wallet**: Click on the Connect Wallet button to open Web3 Modal and connect your favorite Web3 wallet to the app.

## Additional Features

- **Unit Tests (WIP)**
- **Integration Tests (WIP)**
- **Accessibility (WIP)**

## Contact

For any inquiries, please contact:

- **Email**: guillermodieguez (at) outlook (dot) com
