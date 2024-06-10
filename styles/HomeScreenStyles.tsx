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
  poweredBy: {
    marginVertical: 10,
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    gap: 5,
  },
  poweredByText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  assetsContainer: {
    marginVertical: 0,
    paddingHorizontal: 0,
  },
  assetScrollView: {
    width: "100%",
    paddingHorizontal: 20,
    marginBottom: 20,
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
    marginHorizontal: 20,
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
    marginVertical: 20,
    alignItems: "center",
  },
  errorText: {
    color: AppColors.error.light,
  },
  cgLogo: {
    width: 25,
    height: 25,
  },
});

export default styles;
