import React, { useEffect } from "react";
import {
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { LinearGradient } from "expo-linear-gradient";
import { AppColors, Colors } from "@/constants/Colors";
import { Link } from "expo-router";
import intlNumberFormat from "@/utils/lib/intlNumberFormat";
import { useGetAssetsWithMarketDataQuery } from "@/features/coin-gecko/services/coinGeckoApi";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import "@walletconnect/react-native-compat";
import {
  createWeb3Modal,
  defaultConfig,
  useWeb3Modal,
  useWeb3ModalAccount,
  Web3Modal,
} from "@web3modal/ethers-react-native";
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

const mainnet = {
  chainId: 1,
  name: "Ethereum",
  currency: "ETH",
  explorerUrl: "https://etherscan.io",
  rpcUrl: "https://cloudflare-eth.com",
};

createWeb3Modal({
  projectId,
  chains: [mainnet],
  config,
  enableAnalytics: true,
  clipboardClient: {
    setString: async (value: string) => {
      await Clipboard.setStringAsync(value);
    },
  },
});

export default function WatchlistScreen() {
  const { apiKeyValue } = useSelector((state: RootState) => state.coinGecko);
  const { watchlist } = useSelector((state: RootState) => state.myAssets);

  const { open, close } = useWeb3Modal();
  const { address, chainId, isConnected } = useWeb3ModalAccount();

  const {
    data: assets,
    isLoading,
    isError,
    refetch,
  } = useGetAssetsWithMarketDataQuery({});

  const watchListAssets = assets?.filter((asset) =>
    watchlist.includes(asset.id)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
    }, 60000);

    return () => clearInterval(interval);
  }, [refetch]);

  useEffect(() => {
    refetch();
  }, [apiKeyValue]);

  return (
    <>
      <Web3Modal />

      <ThemedView style={styles.layout}>
        <LinearGradient
          colors={[AppColors.primary.dark, Colors.dark.background]}
          style={styles.background}
        />

        <ThemedText style={styles.appTitle}>Coin Watchlist 🔍</ThemedText>

        <ThemedView
          style={{
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
            paddingHorizontal: 20,
          }}
        >
          <TouchableOpacity
            style={styles.walletConnectButton}
            onPress={() => open()}
          >
            <ThemedText style={styles.walletConnectText}>
              {isConnected
                ? `My Wallet: ${address!
                    .split("")
                    .slice(0, 6)
                    .join("")}...${address!.split("").slice(-4).join("")}`
                : "Wallet Connect 🔑"}
            </ThemedText>
          </TouchableOpacity>
        </ThemedView>

        <ThemedView style={styles.assetRowHeader}>
          <ThemedText style={styles.assetNameHeaderText}>Coin</ThemedText>
          <ThemedText style={styles.assetMCapHeaderText}>Market Cap</ThemedText>
          <ThemedText style={styles.assetPriceHeaderText}>Price</ThemedText>
        </ThemedView>

        <ScrollView
          style={styles.assetScrollView}
          refreshControl={
            <RefreshControl refreshing={isLoading} onRefresh={refetch} />
          }
        >
          <ThemedView style={styles.assetsContainer}>
            {watchListAssets?.map((asset) => (
              <Link
                key={asset.id}
                href={{
                  pathname: "charts",
                  params: {
                    id: asset.id,
                    name: asset.name,
                    symbol: asset.symbol,
                    mcap: asset.market_cap,
                    price: asset.current_price,
                    change: asset.price_change_percentage_24h,
                    image: asset.image,
                  },
                }}
                asChild
              >
                <TouchableOpacity key={asset.id} style={styles.assetRow}>
                  <ThemedView style={styles.assetName}>
                    <Image
                      source={{ uri: asset.image }}
                      style={{ width: 25, height: 25 }}
                    />
                    <ThemedText>{asset.name}</ThemedText>
                  </ThemedView>
                  <ThemedText style={styles.assetMcap}>
                    {intlNumberFormat(asset.market_cap)}
                  </ThemedText>
                  <ThemedText style={styles.assetPrice}>
                    ${asset.current_price}
                  </ThemedText>
                </TouchableOpacity>
              </Link>
            ))}

            <ThemedView
              style={{
                marginVertical: isLoading || isError ? 20 : 0,
                alignItems: "center",
              }}
            >
              {isLoading ? (
                <ActivityIndicator
                  size="large"
                  color={AppColors.primary.light}
                />
              ) : null}
              {isError ? (
                <ThemedText style={{ color: AppColors.error.light }}>
                  An error occurred while fetching data.
                </ThemedText>
              ) : null}
            </ThemedView>
          </ThemedView>
        </ScrollView>
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  layout: {
    backgroundColor: "transparent",
    padding: 20,
    paddingTop: 40,
    flex: 1,
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  appTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 20,
    textAlign: "center",
  },
  walletConnectButton: {
    marginVertical: 10,
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
    backgroundColor: AppColors.primary.light,
    borderRadius: 10,
    height: 40,
  },
  walletConnectText: {
    fontSize: 16,
    fontWeight: "bold",
    paddingHorizontal: 10,
  },
  poweredBy: {
    marginVertical: 10,
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    gap: 5,
  },
  poweredByText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  assetsContainer: {
    marginVertical: 0,
    paddingHorizontal: 0,
  },
  assetScrollView: {
    width: "100%",
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  assetsTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  assetRowHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    marginHorizontal: 20,
    borderBottomColor: AppColors.secondary.light,
    borderBottomWidth: 1,
  },
  assetRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomColor: AppColors.secondary.light,
    borderBottomWidth: 0.5,
  },
  assetNameHeaderText: {
    flex: 2,
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "left",
  },
  assetMCapHeaderText: {
    flex: 3,
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
  },
  assetPriceHeaderText: {
    flex: 2,
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "right",
  },
  assetName: {
    flex: 2,
    fontSize: 18,
    textAlign: "left",
    flexDirection: "row",
    gap: 5,
  },
  assetMcap: {
    flex: 3,
    fontSize: 18,
    textAlign: "center",
  },
  assetPrice: {
    flex: 2,
    fontSize: 18,
    textAlign: "right",
  },
});
