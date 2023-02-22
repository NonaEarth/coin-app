import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../atoms";

interface IHistorical {
	time_open: string;
	time_close: string;
	open: number;
	high: number;
	low: number;
	close: number;
	volume: number;
	market_cap: number;
}

interface ChartProps {
	coinId: string;
}

function Chart({ coinId }: ChartProps) {
	const isDark = useRecoilValue(isDarkAtom);
	const { isLoading, data } = useQuery<IHistorical[]>(["ohlcv", coinId], () =>
		fetchCoinHistory(coinId)
	);

	console.log(data);
	return (
		<div>
			{isLoading ? (
				"Loading chart..."
			) : (
				<>
					<ApexChart
						type="candlestick"
						series={[
							{
								data: data?.map((one) => [
									new Date(one.time_close),
									one.open,
									one.high,
									one.low,
									one.close,
								]) as number[][],
							},
						]}
						options={{
							theme: {
								mode: isDark ? "dark" : "light",
							},
							chart: {
								type: "candlestick",
								height: 300,
								width: 500,
								toolbar: {
									show: false,
								},
								background: "transparent",
							},
							stroke: {
								curve: "smooth",
								width: 2,
							},
							yaxis: {
								show: false,
							},
							xaxis: {
								type: "datetime",
								categories: data?.map((one) => one.time_close),
								labels: {
									style: {
										colors: "#f19e2a",
									},
								},
							},
							plotOptions: {
								candlestick: {
									colors: {
										upward: "#f1662a",
										downward: "#4686df",
									},
								},
							},
						}}
					/>
					<ApexChart
						type="line"
						series={[
							{
								name: "Price",
								data: data?.map((price) => price.close) as number[],
							},
						]}
						options={{
							theme: {
								mode: isDark ? "dark" : "light",
							},
							chart: {
								height: 300,
								width: 500,
								toolbar: {
									show: false,
								},
								background: "transparent",
							},
							grid: {
								show: false,
							},
							xaxis: {
								axisBorder: {
									show: false,
								},
								labels: {
									show: false,
								},
								type: "datetime",
								axisTicks: {
									show: false,
								},
								categories: data?.map((price) => price.time_close),
							},
							yaxis: {
								show: false,
							},
							fill: {
								type: "gradient",
								gradient: { gradientToColors: ["#f19e2a"], stops: [0, 100] },
							},
							colors: ["#f19e2a"],
							stroke: {
								curve: "smooth",
								width: 7,
							},
							tooltip: {
								y: { formatter: (value) => `$ ${value.toFixed(3)}` },
							},
						}}
					/>
				</>
			)}
		</div>
	);
}

export default Chart;
