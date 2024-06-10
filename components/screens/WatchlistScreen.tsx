import React, { useEffect } from "react";
import {
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  RefreshControl,
  Alert,
} from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { LinearGradient } from "expo-linear-gradient";
import { AppColors, Colors } from "@/constants/Colors";
import { Link } from "expo-router";
import intlNumberFormat from "@/utils/intlNumberFormat";
import { useGetAssetsWithMarketDataQuery } from "@/features/coin-gecko/services/coinGeckoApi";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import "@walletconnect/react-native-compat";
import {
  createWeb3Modal,
  useWeb3Modal,
  useWeb3ModalAccount,
  Web3Modal,
} from "@web3modal/ethers-react-native";
import { BrowserProvider } from "ethers";
import { useWeb3ModalProvider } from "@web3modal/ethers-react-native";
import styles from "@/styles/WatchlistScreenStyles";
import {
  ethMainnet,
  wcConfig,
  wcProjectId,
} from "@/utils/lib/walletConnectConfig";
import * as Clipboard from "expo-clipboard";

createWeb3Modal({
  projectId: wcProjectId,
  chains: [ethMainnet],
  config: wcConfig,
  enableAnalytics: true,
  clipboardClient: {
    setString: async (value: string) => {
      await Clipboard.setStringAsync(value);
    },
  },
});

const messageSignedAlert = (signature: string) =>
  Alert.alert(
    "Let's go!",
    `You signed my welcome message :). Here's your signature: ${signature}`,
    [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      { text: "OK", onPress: () => console.log("OK Pressed") },
    ]
  );

export default function WatchlistScreen() {
  const { watchlist } = useSelector((state: RootState) => state.myAssets);

  const { open } = useWeb3Modal();
  const { address, isConnected } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();

  const {
    data: assets,
    isLoading,
    isError,
    refetch,
  } = useGetAssetsWithMarketDataQuery({});

  const watchListAssets = assets?.filter((asset) =>
    watchlist.includes(asset.id)
  );

  const toTheMoon = async () => {
    if (isConnected && walletProvider) {
      const ethersProvider = new BrowserProvider(walletProvider);
      const signer = await ethersProvider.getSigner();
      const signature = await signer.signMessage("To the moon! 🚀🌕");
      messageSignedAlert(signature);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
    }, 60000);

    return () => clearInterval(interval);
  }, [refetch]);

  return (
    <>
      <Web3Modal />

      <ThemedView style={styles.layout}>
        <LinearGradient
          colors={[AppColors.primary.dark, Colors.dark.background]}
          style={styles.background}
        />

        <ThemedText style={styles.appTitle}>Coin Watchlist 🔍</ThemedText>

        <ThemedView style={styles.walletConnectContainer}>
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

        {isConnected && (
          <ThemedView style={styles.walletConnectContainer}>
            <TouchableOpacity
              style={styles.walletConnectButton}
              onPress={toTheMoon}
            >
              <ThemedText style={styles.walletConnectText}>
                Sign Sample Message
              </ThemedText>
            </TouchableOpacity>
          </ThemedView>
        )}

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
                      style={styles.assetImage}
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
              style={[
                styles.loadingErrorContainer,
                { marginVertical: isLoading || isError ? 20 : 0 },
              ]}
            >
              {isLoading ? (
                <ActivityIndicator
                  size="large"
                  color={AppColors.primary.light}
                />
              ) : null}
              {isError ? (
                <ThemedText style={styles.errorText}>
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
