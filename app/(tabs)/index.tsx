import React from "react";
import { Image, StyleSheet, ScrollView } from "react-native";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const assets = [
  { name: "Bitcoin", symbol: "BTC", price: "$35,000", change: "+2.5%" },
  { name: "Ethereum", symbol: "ETH", price: "$2,500", change: "+1.8%" },
  { name: "Cardano", symbol: "ADA", price: "$1.20", change: "-0.5%" },
  { name: "Solana", symbol: "SOL", price: "$150", change: "+3.0%" },
  { name: "Polkadot", symbol: "DOT", price: "$40", change: "+4.2%" },
];

export default function AssetsScreen() {
  const { apiKeyValue } = useSelector((state: RootState) => state.coinGecko);
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/partial-react-logo.png")}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.assetsContainer}>
        <ThemedText style={styles.assetsTitle}>
          {apiKeyValue ? "API Key is set!" : "API Key is not set!"}
        </ThemedText>
        <ThemedText style={styles.assetsTitle}>Top 5 Assets</ThemedText>
        <ScrollView>
          {assets.map((asset, index) => (
            <ThemedView key={index} style={styles.assetRow}>
              <ThemedText style={styles.assetName}>
                {asset.name} ({asset.symbol})
              </ThemedText>
              <ThemedText style={styles.assetPrice}>{asset.price}</ThemedText>
              <ThemedText
                style={[
                  styles.assetChange,
                  asset.change.startsWith("+")
                    ? styles.positiveChange
                    : styles.negativeChange,
                ]}
              >
                {asset.change}
              </ThemedText>
            </ThemedView>
          ))}
        </ScrollView>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
  assetsContainer: {
    marginVertical: 20,
    paddingHorizontal: 20,
  },
  assetsTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  assetRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  assetName: {
    fontSize: 18,
  },
  assetPrice: {
    fontSize: 18,
  },
  assetChange: {
    fontSize: 18,
  },
  positiveChange: {
    color: "green",
  },
  negativeChange: {
    color: "red",
  },
});
