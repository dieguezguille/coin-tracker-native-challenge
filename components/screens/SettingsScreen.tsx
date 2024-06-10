import { ThemedView } from "@/components/ThemedView";
import ApiKeyInput from "@/components/ApiKeyInput";
import { LinearGradient } from "expo-linear-gradient";
import { AppColors, Colors } from "@/constants/Colors";
import { ThemedText } from "@/components/ThemedText";
import { ScrollView } from "react-native";
import styles from "@/styles/SettingsScreenStyles";

export default function SettingsScreen() {
  return (
    <ThemedView style={styles.layout}>
      <LinearGradient
        colors={[AppColors.primary.dark, Colors.dark.background]}
        style={styles.background}
      />

      <ThemedView style={styles.headerContainer}>
        <ThemedText style={styles.headerText}>Settings 🛠️</ThemedText>
      </ThemedView>

      <ScrollView>
        <ApiKeyInput />
      </ScrollView>
    </ThemedView>
  );
}
