import { LineChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import { AppColors } from "@/constants/Colors";
import intlNumberFormat from "@/utils/lib/intlNumberFormat";
import { CoinGeckoAssetChartData } from "@/features/coin-gecko/services/coinGeckoApi";

interface AssetChartProps {
  data: CoinGeckoAssetChartData;
}

const AssetChart = ({ data }: AssetChartProps) => {
  // Sample data points to reduce the number of points being rendered
  const sampleData = (dataArray: number[][], sampleRate: number) => {
    return dataArray.filter((_, index) => index % sampleRate === 0);
  };

  const sampleRate = Math.ceil(data.prices.length / 10); // Adjust sample rate to target around 30 points
  const sampledPrices = sampleData(data.prices, sampleRate);

  // Format labels to display only a subset
  const formattedLabels = sampledPrices.map((price) => {
    const date = new Date(price[0]);
    return `${date.getMonth() + 1}/${date.getDate()}`; // MM/DD format
  });

  const reducedLabels = formattedLabels.map((label, index) => {
    return index % Math.ceil(formattedLabels.length / 7) === 0 ? label : ""; // Display every 7th label
  });

  const chartData = {
    labels: reducedLabels,
    datasets: [
      {
        data: sampledPrices.map((price) => price[1]),
      },
    ],
  };

  return (
    <LineChart
      data={chartData}
      width={Dimensions.get("window").width - 40}
      height={220}
      yAxisInterval={data.prices[0][1] > 1000 ? 1000 : 100}
      chartConfig={{
        backgroundColor: AppColors.success.main,
        backgroundGradientFrom: AppColors.primary.dark,
        backgroundGradientTo: AppColors.primary.light,
        decimalPlaces: 1,
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        style: {
          borderRadius: 16,
        },
        propsForDots: {
          r: "5",
          strokeWidth: "2",
          stroke: AppColors.primary.light,
        },
      }}
      bezier
      style={{
        borderRadius: 12,
        elevation: 1,
      }}
      formatYLabel={(value) => intlNumberFormat(Number(value))}
    />
  );
};

export default AssetChart;
