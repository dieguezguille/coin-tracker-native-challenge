import React, { useEffect } from "react";
import { StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useGetAssetsWithMarketDataQuery } from "@/features/coin-gecko/services/coinGecko";
import { LinearGradient } from "expo-linear-gradient";
import { AppColors, Colors } from "@/constants/Colors";
import { Link } from "expo-router";
import intlNumberFormat from "@/utils/lib/intlNumberFormat";

export default function AssetsScreen() {
  const { apiKeyValue } = useSelector((state: RootState) => state.coinGecko);
  const { data: assets, refetch } = useGetAssetsWithMarketDataQuery({});

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

      <ThemedView style={styles.assetsContainer}>
        <ThemedView style={styles.assetRowHeader}>
          <ThemedText style={styles.assetNameHeaderText}>Coin</ThemedText>
          <ThemedText style={styles.assetMCapHeaderText}>Market Cap</ThemedText>
          <ThemedText style={styles.assetPriceHeaderText}>Price</ThemedText>
        </ThemedView>

        <ScrollView style={styles.assetScrollView}>
          {assets?.map((asset) => (
            <Link
              key={asset.id}
              href={{
                pathname: "charts",
                params: { id: asset.id },
              }}
              asChild
            >
              <TouchableOpacity key={asset.id} style={styles.assetRow}>
                <ThemedText style={styles.assetName}>{asset.name}</ThemedText>
                <ThemedText style={styles.assetMcap}>
                  {intlNumberFormat(asset.market_cap)}
                </ThemedText>
                <ThemedText style={styles.assetPrice}>
                  ${asset.current_price}
                </ThemedText>
              </TouchableOpacity>
            </Link>
          ))}
        </ScrollView>
        {!apiKeyValue && (
          <ThemedText style={styles.apiKeyMissing}>
            API Key is not set!
          </ThemedText>
        )}
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
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  assetsContainer: {
    marginVertical: "5%",
    paddingHorizontal: "5%",
  },
  assetScrollView: {
    width: "100%",
    height: "100%",
  },
  apiKeyMissing: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
    textAlign: "center",
    color: "red",
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
    textAlign: "left",
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
  },
  assetMcap: {
    flex: 3,
    fontSize: 18,
    textAlign: "left",
  },
  assetPrice: {
    flex: 2,
    fontSize: 18,
    textAlign: "right",
  },
});
