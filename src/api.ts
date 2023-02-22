const BASE_URL = `https://api.coinpaprika.com/v1`;

export function fetchCoins() {
	// // const priceData = await(
	// // 	await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
	// // ).json();

	return fetch(`${BASE_URL}/coins/`).then((response) => response.json());
}

export function fetchCoinInfo(coinId: string) {
    return fetch(`${BASE_URL}/coins/${coinId}`).then((response) => response.json());
}

export function fetchCoinTickers(coinId: string) {
    return fetch(`${BASE_URL}/tickers/${coinId}`).then((response) => response.json());
}

export function fetchCoinHistory(coinId: string) {
    // const endDate = Math.floor(Date.now()) / 1000;
    // const startDate = endDate - 60 * 60 * 24 * 7;
    return fetch(`https://ohlcv-api.nomadcoders.workers.dev?coinId=${coinId}`).then((response) => response.json());
}

