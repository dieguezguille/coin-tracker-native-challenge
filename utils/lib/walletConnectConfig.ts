import { defaultConfig } from "@web3modal/ethers-react-native";

export const wcProjectId = process.env.EXPO_PUBLIC_WALLET_CONNECT_PID ?? "";

export const wcProviderMetadata = {
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

export const wcConfig = defaultConfig({
  metadata: wcProviderMetadata,
  extraConnectors: [],
});

export const ethMainnet = {
  chainId: 1,
  name: "Ethereum",
  currency: "ETH",
  explorerUrl: "https://etherscan.io",
  rpcUrl: "https://cloudflare-eth.com",
};
