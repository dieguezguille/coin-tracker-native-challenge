import React, { useEffect } from "react";
import {
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { useGetAssetsWithMarketDataQuery } from "@/features/coin-gecko/services/coinGeckoApi";
import { LinearGradient } from "expo-linear-gradient";
import { AppColors, Colors } from "@/constants/Colors";
import { Link } from "expo-router";
import intlNumberFormat from "@/utils/intlNumberFormat";
import styles from "@/styles/HomeScreenStyles";

export default function HomeScreen() {
  const {
    data: assets,
    isLoading,
    isError,
    refetch,
  } = useGetAssetsWithMarketDataQuery({});

  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
    }, 60000);

    return () => clearInterval(interval);
  }, [refetch]);

  return (
    <ThemedView style={styles.layout}>
      <LinearGradient
        colors={[AppColors.primary.dark, Colors.dark.background]}
        style={styles.background}
      />
      <ThemedText style={styles.appTitle}>Top 10 Coins 🏆</ThemedText>
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
          {assets?.map((asset) => (
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
          <ThemedView style={styles.loadingErrorContainer}>
            {isLoading ? (
              <ActivityIndicator size="large" color={AppColors.primary.light} />
            ) : null}
            {isError ? (
              <ThemedText style={{ color: AppColors.error.light }}>
                An error occurred while fetching data.
              </ThemedText>
            ) : null}
          </ThemedView>
        </ThemedView>
      </ScrollView>
      <ThemedView style={styles.poweredBy}>
        <ThemedText style={styles.poweredByText}>Powered by </ThemedText>
        <Image
          source={require("../../assets/images/cg_logo_color.png")}
          style={styles.cgLogo}
        />
      </ThemedView>
    </ThemedView>
  );
}
