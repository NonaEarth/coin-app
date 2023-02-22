import styled from "styled-components";
import { useState, useEffect } from "react";
import {
	Switch,
	Route,
	useLocation,
	useParams,
	useRouteMatch,
} from "react-router-dom";
import { Link } from "react-router-dom";
import Price from "./Price";
import Chart from "./Chart";
import { useQuery } from "react-query";
import { Helmet } from "react-helmet";
import { fetchCoinInfo, fetchCoinTickers } from "../api";

const Container = styled.div`
	padding: 0px 20px;
	max-width: 480px;
	margin: 0 auto;
`;

const Header = styled.header`
	height: 10vh;
	display: flex;
	justify-content: center;
	align-items: center;

	h1 {
		font-weight: 750;
		font-size: 35px;
	}
`;

const Title = styled.h1`
	font-size: 48px;
	color: ${(props) => props.theme.accentColor};
`;

const Loader = styled.span`
	text-align: center;
	display: block;
`;

const Overview = styled.div`
	display: flex;
	justify-content: space-between;
	background-color: ${(props) => props.theme.boxColor};
	padding: 15px 30px;
	border-radius: 20px;
`;
const OverviewItem = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	font-weight: 730;
	span:first-child {
		font-size: 10px;
		font-weight: 400;
		text-transform: uppercase;
		margin-bottom: 5px;
	}
`;
const Description = styled.p`
	margin: 20px 0px;
`;

const Tabs = styled.div`
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	margin: 25px 0px;
	gap: 10px;
`;

const Tab = styled.span<{ isActive: boolean }>`
	text-align: center;
	text-transform: uppercase;
	font-size: 12px;
	font-weight: 400;
	background-color: ${(props) => props.theme.boxColor};
	padding: 7px 0px;
	border-radius: 10px;
	color: ${(props) =>
		props.isActive ? props.theme.accentColor : props.theme.textColor};
	a {
		display: block;
	}
`;

const BackBtn = styled.a`
	height: 25px;
	width: 50px;
	border-radius: 25px;
	background-color: #F19E2A;
	margin-right: 5px;
	text-align: center;
	line-height: 25px;
	font-size: 13px;
`;
const Span = styled.span`
	color: #7b756d;
`;

interface RouteParams {
	coinId: string;
}

interface RouteState {
	name: string;
}

interface InfoData {
	id: string;
	name: string;
	symbol: string;
	rank: number;
	is_new: boolean;
	is_active: boolean;
	type: string;
	description: string;
	message: string;
	open_source: boolean;
	started_at: string;
	development_status: string;
	hardware_wallet: boolean;
	proof_type: string;
	org_structure: string;
	hash_algorithm: string;
	first_data_at: string;
	last_data_at: string;
}

interface PriceData {
	id: string;
	name: string;
	symbol: string;
	rank: number;
	circulating_supply: number;
	total_supply: number;
	max_supply: number;
	beta_value: number;
	first_data_at: string;
	last_updated: string;
	quotes: {
		USD: {
			ath_date: string;
			ath_price: number;
			market_cap: number;
			market_cap_change_24h: number;
			percent_change_1h: number;
			percent_change_1y: number;
			percent_change_6h: number;
			percent_change_7d: number;
			percent_change_12h: number;
			percent_change_15m: number;
			percent_change_24h: number;
			percent_change_30d: number;
			percent_change_30m: number;
			percent_from_price_ath: number;
			price: number;
			volume_24h: number;
			volume_24h_change_24h: number;
		};
	};
}

interface ICoinProps {}

function Coin({}: ICoinProps) {
	// // const [loading, setLoading] = useState(true);
	// // const [info, setInfo] = useState<InfoData>();
	// // const [priceInfo, setPriceInfo] = useState<PriceData>();

	// // useEffect(() => {
	// // 	(async () => {
	// // 		const infoData = await (
	// // 			await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)
	// // 		).json();
	// // 		const priceData = await (
	// // 			await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
	// // 		).json();

	// // 		console.log(infoData);
	// // 		setInfo(infoData);
	// // 		setPriceInfo(priceData);
	// // 		setLoading(false);
	// // 	})();
	// // }, [coinId]);

	const { coinId } = useParams<RouteParams>();
	const { state } = useLocation<RouteState>();
	const priceMatch = useRouteMatch("/:coinId/price");
	const chartMatch = useRouteMatch("/:coinId/chart");

	const { isLoading: infoLoading, data: infoData } = useQuery<InfoData>(
		["info", coinId],
		() => fetchCoinInfo(coinId),
		{
			refetchInterval: 5000,
		}
	);
	const { isLoading: tickersLoading, data: tickersData } = useQuery<PriceData>(
		["tickersc", coinId],
		() => fetchCoinTickers(coinId),
		{
			refetchInterval: 10000,
		}
	);

	const loading = infoLoading || tickersLoading;
	return (
		<Container>
			<Helmet>
				<title>
					{state?.name ? state.name : loading ? "Loading" : infoData?.name}
				</title>
			</Helmet>
			<Header>
				<BackBtn href="../">
					BACK
				</BackBtn>
				<Title>
					{state?.name
						? state.name.toUpperCase()
						: loading
						? "Loading"
						: infoData?.name}
				</Title>
			</Header>
			{loading ? (
				<Loader>Loading...</Loader>
			) : (
				<>
					<Overview>
						<OverviewItem>
							<Span>Rank:</Span>
							<span>{infoData?.rank}</span>
						</OverviewItem>
						<OverviewItem>
							<Span>Symbol:</Span>
							<span>${infoData?.symbol}</span>
						</OverviewItem>
						<OverviewItem>
							<Span>Price:</Span>
							<span>{tickersData?.quotes.USD.price.toFixed(3)}</span>
						</OverviewItem>
					</Overview>
					<Description>{infoData?.description}</Description>
					<Overview>
						<OverviewItem>
							<Span>Total Suply:</Span>
							<span>{tickersData?.total_supply}</span>
						</OverviewItem>
						<OverviewItem>
							<Span>Max Supply:</Span>
							<span>{tickersData?.max_supply}</span>
						</OverviewItem>
					</Overview>
					<Tabs>
						<Tab isActive={chartMatch !== null}>
							<Link to={`/${coinId}/chart`}>Chart</Link>
						</Tab>
						<Tab isActive={priceMatch !== null}>
							<Link to={`/${coinId}/price`}>Price</Link>
						</Tab>
					</Tabs>
					<Switch>
						<Route path={`/:coinId/price`}>
							<Price coinId={coinId} />
						</Route>
						<Route path={`/:coinId/chart`}>
							<Chart coinId={coinId} />
						</Route>
					</Switch>
				</>
			)}
		</Container>
	);
}
export default Coin;
