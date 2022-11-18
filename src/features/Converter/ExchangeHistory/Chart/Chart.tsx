import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { useAppStore } from "store/store";
import { useMemo } from "react";

const round = (rate: number) => Math.round(rate * 1000) / 1000;

const Chart = () => {
  const exchangeHistory = useAppStore((state) => state.exchangeHistory);
  if (!exchangeHistory) return null;

  const minValue = useMemo(() => {
    const min = Math.min(...exchangeHistory.map((item) => item.rate));
    return round(min - min * 0.001);
  }, [exchangeHistory]);

  const maxValue = useMemo(() => {
    const max = Math.max(...exchangeHistory.map((item) => item.rate));
    console.log(`max`, round(max + max * 0.001));
    return round(max + max * 0.001);
  }, [exchangeHistory]);

  return (
    <LineChart width={500} height={300} data={exchangeHistory}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="date" />
      <YAxis dataKey="rate" domain={[minValue, maxValue]} />
      <Tooltip />
      <Line type="monotone" dataKey="rate" stroke="#009688" />
    </LineChart>
  );
};

export default Chart;
