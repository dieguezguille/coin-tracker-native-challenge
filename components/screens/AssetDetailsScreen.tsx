import {
  ActivityIndicator,
  Button,
  RefreshControl,
  ScrollView,
  StyleSheet,
} from "react-native";

import { ThemedView } from "@/components/ThemedView";
import { LinearGradient } from "expo-linear-gradient";
import { AppColors, Colors } from "@/constants/Colors";
import { useLocalSearchParams } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import AssetChart from "../AssetChart";
import { Image } from "react-native";
import intlNumberFormat from "@/utils/lib/intlNumberFormat";
import { useGetAssetDataByIdQuery } from "@/features/coin-gecko/services/coinGeckoApi";
import { useState } from "react";

const now = Math.floor(Date.now() / 1000);

const thirtyDaysAgo = now - 30 * 24 * 60 * 60;
const sixtyDaysAgo = now - 60 * 24 * 60 * 60;
const ninetyDaysAgo = now - 90 * 24 * 60 * 60;

enum Interval {
  THIRTY_DAYS = thirtyDaysAgo,
  SIXTY_DAYS = sixtyDaysAgo,
  NINETY_DAYS = ninetyDaysAgo,
}

export default function AssetChartScreen() {
  const router = useLocalSearchParams();
  const { id, name, symbol, mcap, price, change, image } = router;

  const [interval, setInterval] = useState<Interval>(Interval.THIRTY_DAYS);

  const assetId = id as string;
  const assetName = name as string;

  const { data, isLoading, isError, refetch } = useGetAssetDataByIdQuery({
    id: assetId ?? "bitcoin",
    currency: "usd",
    startAt: interval,
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
        style={{
          flex: 1,
          gap: 20,
          marginTop: 20,
        }}
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

        <ThemedView>
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
            <ThemedView
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 10,
              }}
            >
              <ThemedText
                style={{
                  fontSize: 16,
                  fontWeight: "bold",
                  textAlign: "left",
                }}
              >
                Interval:
              </ThemedText>

              <Button
                title="30 days"
                onPress={() => setInterval(Interval.THIRTY_DAYS)}
                color={
                  interval === Interval.THIRTY_DAYS
                    ? AppColors.primary.light
                    : AppColors.secondary.light
                }
              />
              <Button
                title="60 days"
                onPress={() => setInterval(Interval.SIXTY_DAYS)}
                color={
                  interval === Interval.SIXTY_DAYS
                    ? AppColors.primary.light
                    : AppColors.secondary.light
                }
              />
              <Button
                title="90 days"
                onPress={() => setInterval(Interval.NINETY_DAYS)}
                color={
                  interval === Interval.NINETY_DAYS
                    ? AppColors.primary.light
                    : AppColors.secondary.light
                }
              />
            </ThemedView>

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
