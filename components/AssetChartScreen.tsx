import { StyleSheet } from "react-native";

import { ThemedView } from "@/components/ThemedView";
import { LinearGradient } from "expo-linear-gradient";
import { AppColors, Colors } from "@/constants/Colors";
import { useLocalSearchParams } from "expo-router";
import { ThemedText } from "@/components/ThemedText";

export default function AssetChartScreen() {
  const router = useLocalSearchParams();
  const { id } = router;

  console.log("AssetChartScreen", id);

  return (
    <ThemedView style={styles.layout}>
      <LinearGradient
        colors={[AppColors.primary.dark, Colors.dark.background]}
        style={styles.background}
      />
      <ThemedView>
        <ThemedText>Asset chart for {id}</ThemedText>
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
});
