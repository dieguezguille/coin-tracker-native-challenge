import { AppColors } from "@/constants/Colors";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  layout: {
    backgroundColor: "transparent",
    padding: 20,
    flex: 1,
  },
  backButtonContainer: {
    marginVertical: 40,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 5,
  },
  backButtonText: {
    flexDirection: "row",
    alignItems: "center",
    fontSize: 20,
    gap: 5,
  },
  scrollView: {
    flex: 1,
    gap: 20,
  },
  favoriteButtonContainer: {
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: 5,
  },
  favoriteButtonText: {
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
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
  assetImage: {
    width: 25,
    height: 25,
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  marketCapText: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  priceText: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  changeRow: {
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
  },
  changeLabelText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  intervalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  intervalText: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "left",
  },
  loadingErrorContainer: {
    alignItems: "center",
  },
  errorText: {
    color: AppColors.error.light,
  },
});

export default styles;
