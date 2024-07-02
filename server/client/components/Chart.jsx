/* eslint-disable react/prop-types */
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const Chart = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={600}>
      <BarChart width={150} height={40} data={data}>
        <XAxis dataKey={"name"} />
        <YAxis />
        <Tooltip />
        <Legend />
        <CartesianGrid strokeDasharray="4 4" />
        <Bar dataKey="total" fill="#102C57" />
      </BarChart>
    </ResponsiveContainer>
  );
};
export default Chart;
