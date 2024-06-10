import { AppColors } from "@/constants/Colors";
import { StyleSheet } from "react-native";

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
  walletConnectContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  walletConnectButton: {
    marginVertical: 10,
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
    backgroundColor: AppColors.primary.light,
    borderRadius: 10,
    height: 40,
  },
  walletConnectText: {
    fontSize: 16,
    fontWeight: "bold",
    paddingHorizontal: 10,
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
  assetScrollView: {
    width: "100%",
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  assetsContainer: {
    marginVertical: 0,
    paddingHorizontal: 0,
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
  assetImage: {
    width: 25,
    height: 25,
  },
  loadingErrorContainer: {
    alignItems: "center",
  },
  errorText: {
    color: AppColors.error.light,
  },
});

export default styles;
