import { createWeb3Modal, defaultConfig } from "@web3modal/ethers-react-native";
import * as Clipboard from "expo-clipboard";

const projectId = process.env.EXPO_PUBLIC_WALLET_CONNECT_PID ?? "";

const providerMetadata = {
  name: process.env.EXPO_PUBLIC_WALLET_CONNECT_PNAME ?? "",
  description: process.env.EXPO_PUBLIC_WALLET_CONNECT_PDESC ?? "",
  url: process.env.EXPO_PUBLIC_WALLET_CONNECT_PURL ?? "",
  icons: [
    process.env.EXPO_PUBLIC_WALLET_CONNECT_PICON ??
      "https://avatars.githubusercontent.com/u/37784886",
  ],
  redirect: {
    native: "YOUR_APP_SCHEME://",
  },
};

const config = defaultConfig({
  metadata: providerMetadata,
  extraConnectors: [],
});

const ethMainnet = {
  chainId: 1,
  name: "Ethereum",
  currency: "ETH",
  explorerUrl: "https://etherscan.io",
  rpcUrl: "https://cloudflare-eth.com",
};

createWeb3Modal({
  projectId,
  chains: [ethMainnet],
  config,
  enableAnalytics: true,
  clipboardClient: {
    setString: async (value: string) => {
      await Clipboard.setStringAsync(value);
    },
  },
});
