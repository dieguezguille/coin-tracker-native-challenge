import { StyleSheet } from "react-native";

import { ThemedView } from "@/components/ThemedView";
import ApiKeyInput from "@/components/ApiKeyInput";
import { LinearGradient } from "expo-linear-gradient";
import { AppColors, Colors } from "@/constants/Colors";

export default function ConfigScreen() {
  return (
    <ThemedView style={styles.layout}>
      <LinearGradient
        colors={[AppColors.primary.dark, Colors.dark.background]}
        style={styles.background}
      />

      <ApiKeyInput />
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
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  configsContainer: {
    flexDirection: "row",
    gap: 8,
  },
});
