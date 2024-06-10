import {
  ActivityIndicator,
  Button,
  RefreshControl,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { LinearGradient } from "expo-linear-gradient";
import { AppColors, Colors } from "@/constants/Colors";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import AssetChart from "../AssetChart";
import { Image } from "react-native";
import { useGetAssetChartDataByIdQuery } from "@/features/coin-gecko/services/coinGeckoApi";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { addAsset, removeAsset } from "@/features/watchlist/watchlistSlice";
import intlNumberFormat from "@/utils/intlNumberFormat";
import { useColorScheme } from "@/hooks/useColorScheme";
import styles from "@/styles/AssetDetailsScreenStyles";

const now = Math.floor(Date.now() / 1000);

const thirtyDaysAgo = now - 30 * 24 * 60 * 60;
const sixtyDaysAgo = now - 60 * 24 * 60 * 60;
const ninetyDaysAgo = now - 90 * 24 * 60 * 60;

export enum ChartInterval {
  THIRTY_DAYS = thirtyDaysAgo,
  SIXTY_DAYS = sixtyDaysAgo,
  NINETY_DAYS = ninetyDaysAgo,
}

export default function AssetDetailsScreen() {
  const dispatch = useDispatch();
  const colorScheme = useColorScheme();
  const router = useRouter();
  const params = useLocalSearchParams();
  const { id, name, symbol, mcap, price, change, image } = params;

  const assetId = id as string;
  const assetName = name as string;
  const mcapValue = mcap as string;
  const priceValue = price as string;
  const changeValue = change as string;

  const [interval, setInterval] = useState<ChartInterval>(
    ChartInterval.THIRTY_DAYS
  );
  const { watchlist } = useSelector((state: RootState) => state.myAssets);

  const isInWatchlist = watchlist.find((storedId) => storedId === assetId);

  const handleAssetPress = () => {
    if (isInWatchlist) {
      dispatch(removeAsset(assetId));
    } else {
      dispatch(addAsset(assetId));
    }
  };

  const { data, isLoading, isError, refetch } = useGetAssetChartDataByIdQuery({
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

      <TouchableOpacity
        style={styles.backButtonContainer}
        onPress={router.back}
      >
        <Ionicons
          size={30}
          style={{ color: Colors[colorScheme ?? "light"].icon }}
          name="arrow-back"
        />
        <ThemedText style={styles.backButtonText}>Back</ThemedText>
      </TouchableOpacity>

      <ScrollView
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={refetch} />
        }
        style={styles.scrollView}
      >
        <ThemedView style={styles.assetTitleRow}>
          <ThemedText style={styles.assetName}>
            {assetName ? assetName : "No asset selected."} (
            {(symbol as string).toUpperCase()})
          </ThemedText>
          <Image source={{ uri: image as string }} style={styles.assetImage} />
        </ThemedView>

        <TouchableOpacity
          style={styles.favoriteButtonContainer}
          onPress={handleAssetPress}
        >
          <ThemedText
            style={[
              styles.favoriteButtonText,
              {
                color: isInWatchlist
                  ? AppColors.primary.light
                  : AppColors.secondary.light,
              },
            ]}
          >
            {isInWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
          </ThemedText>
          <Ionicons
            size={25}
            style={{
              color: isInWatchlist
                ? AppColors.primary.light
                : AppColors.secondary.light,
            }}
            name={isInWatchlist ? "star" : "star-outline"}
          />
        </TouchableOpacity>

        <ThemedView>
          <ThemedText style={styles.marketCapText}>
            Market Cap: {intlNumberFormat(Number(mcapValue))}
          </ThemedText>
          <ThemedText style={styles.priceText}>Price: {priceValue}</ThemedText>

          <ThemedView style={styles.changeRow}>
            <ThemedText style={styles.changeLabelText}>
              Change (24h):{" "}
            </ThemedText>
            <ThemedText
              style={{
                color:
                  Number(changeValue) < 0
                    ? AppColors.error.light
                    : AppColors.success.main,
              }}
            >
              {Number(changeValue) < 0 ? "" : "+"}
              {change}
            </ThemedText>
          </ThemedView>
        </ThemedView>

        {data && (
          <>
            <ThemedView style={styles.intervalRow}>
              <ThemedText style={styles.intervalText}>Interval:</ThemedText>

              <Button
                title="30 days"
                onPress={() => setInterval(ChartInterval.THIRTY_DAYS)}
                color={
                  interval === ChartInterval.THIRTY_DAYS
                    ? AppColors.primary.light
                    : AppColors.secondary.light
                }
              />
              <Button
                title="60 days"
                onPress={() => setInterval(ChartInterval.SIXTY_DAYS)}
                color={
                  interval === ChartInterval.SIXTY_DAYS
                    ? AppColors.primary.light
                    : AppColors.secondary.light
                }
              />
              <Button
                title="90 days"
                onPress={() => setInterval(ChartInterval.NINETY_DAYS)}
                color={
                  interval === ChartInterval.NINETY_DAYS
                    ? AppColors.primary.light
                    : AppColors.secondary.light
                }
              />
            </ThemedView>

            <AssetChart data={data} />
          </>
        )}

        <ThemedView
          style={[
            styles.loadingErrorContainer,
            { marginVertical: isLoading || isError ? 20 : 0 },
          ]}
        >
          {isLoading ? (
            <ActivityIndicator size="large" color={AppColors.primary.light} />
          ) : null}
          {isError ? (
            <ThemedText style={styles.errorText}>
              An error occurred while fetching data.
            </ThemedText>
          ) : null}
        </ThemedView>
      </ScrollView>
    </ThemedView>
  );
}
