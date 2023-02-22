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
	return (
		<div>
			{isLoading ? (
				"Loading chart..."
			) : (
				<>
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
