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
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useGetAssetsWithMarketDataQuery } from "@/features/coin-gecko/services/coinGeckoApi";
import { LinearGradient } from "expo-linear-gradient";
import { AppColors, Colors } from "@/constants/Colors";
import { Link } from "expo-router";
import intlNumberFormat from "@/utils/lib/intlNumberFormat";

export default function HomeScreen() {
  const { apiKeyValue } = useSelector((state: RootState) => state.coinGecko);
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

  useEffect(() => {
    refetch();
  }, [apiKeyValue]);

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
          {isLoading && <ActivityIndicator size="large" />}

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

          <ThemedView
            style={{
              marginVertical: isLoading || isError ? 20 : 0,
              alignItems: "center",
            }}
          >
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
          style={{
            width: 25,
            height: 25,
          }}
        />
      </ThemedView>
    </ThemedView>
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
