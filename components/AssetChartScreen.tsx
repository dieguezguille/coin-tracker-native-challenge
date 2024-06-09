import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  StyleSheet,
} from "react-native";

import { ThemedView } from "@/components/ThemedView";
import { LinearGradient } from "expo-linear-gradient";
import { AppColors, Colors } from "@/constants/Colors";
import { useLocalSearchParams } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import AssetChart from "./AssetChart";
import { Image } from "react-native";
import intlNumberFormat from "@/utils/lib/intlNumberFormat";
import { useGetAssetDataByIdQuery } from "@/features/coin-gecko/services/coinGeckoApi";

const now = Math.floor(Date.now() / 1000);
const thirtyDaysAgo = now - 30 * 24 * 60 * 60;

export default function AssetChartScreen() {
  const router = useLocalSearchParams();
  const { id, name, symbol, mcap, price, change, image } = router;

  const assetId = id as string;
  const assetName = name as string;

  const { data, isLoading, isError, refetch } = useGetAssetDataByIdQuery({
    id: assetId ?? "bitcoin",
    currency: "usd",
    startAt: thirtyDaysAgo,
    endAt: now,
  });

  return (
    <ThemedView style={styles.layout}>
      <LinearGradient
        colors={[AppColors.primary.dark, Colors.dark.background]}
        style={styles.background}
      />

      <ScrollView
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={refetch} />
        }
      >
        <ThemedView style={styles.assetTitleRow}>
          <ThemedText style={styles.assetName}>
            {assetName ? assetName : "No asset selected."} (
            {(symbol as string).toUpperCase()})
          </ThemedText>
          <Image
            source={{ uri: image as string }}
            style={{ width: 25, height: 25 }}
          />
        </ThemedView>

        <ThemedView
          style={{
            marginBottom: 20,
          }}
        >
          <ThemedText
            style={{
              fontSize: 16,
              fontWeight: "bold",
              marginBottom: 5,
            }}
          >
            Market Cap: {intlNumberFormat(Number(mcap))}
          </ThemedText>
          <ThemedText
            style={{
              fontSize: 16,
              fontWeight: "bold",
              marginBottom: 5,
            }}
          >
            Price: {price}
          </ThemedText>

          <ThemedView
            style={{
              flexDirection: "row",
              gap: 5,
              alignItems: "center",
            }}
          >
            <ThemedText
              style={{
                fontSize: 16,
                fontWeight: "bold",
                marginBottom: 5,
              }}
            >
              Change (24h):{" "}
            </ThemedText>
            <ThemedText
              style={
                Number(change) < 0
                  ? { color: AppColors.error.light }
                  : { color: AppColors.success.main }
              }
            >
              {Number(change) < 0 ? "" : "+"}
              {change}
            </ThemedText>
          </ThemedView>
        </ThemedView>

        {data && (
          <>
            <ThemedText
              style={{
                fontSize: 18,
                fontWeight: "bold",
                marginBottom: 20,
                textAlign: "center",
              }}
            >
              Price Chart
            </ThemedText>

            <AssetChart data={data} />
          </>
        )}

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
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  layout: {
    backgroundColor: "transparent",
    padding: 20,
    flex: 1,
  },
  assetTitleRow: {
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  assetName: {
    fontSize: 20,
    fontWeight: "bold",
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
});
