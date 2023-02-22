import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../atoms";
import styled from "styled-components";

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

const PriceBox = styled.div`
	background-color: ${(props) => props.theme.boxColor};
	width: 100%;
	height: 150px;
	border-radius: 20px;
`;

const UList = styled.ul`
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 15px;
`;

const Li = styled.li`
	font-size: 17px;
	font-weight: 600;

	&:last-child {
		color: ${(props) => props.theme.accentColor};
		font-weight: 800;
	}
`;

function Price({ coinId }: ChartProps) {
	const { isLoading, data } = useQuery<IHistorical[]>([coinId], () =>
		fetchCoinHistory(coinId)
	);

	const databox = (() => {
		let returnValue: IHistorical[] = [];
		if (data) {
			for (let index = 0; index < data.length; index++) {
				if (index < 4) {
					returnValue.push(data[index]);
				}
			}
		}

		return returnValue;
	})();

	console.log(databox);

	return (
		<div>
			{isLoading ? (
				"Loading price..."
			) : (
				<>
					<PriceBox>
						<UList>
							{databox &&
								databox.map((one) => (
									<>
										<Li>
											<span>
												{new Date(Number(one.time_close)).toLocaleTimeString()}
											</span>
											<span>{one.high}$</span>
										</Li>
									</>
								))}
						</UList>
					</PriceBox>
				</>
			)}
		</div>
	);
}

export default Price;
