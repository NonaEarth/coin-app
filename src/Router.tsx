import { BrowserRouter, Route, Switch } from "react-router-dom";

import Coin from "./routes/Coin";
import Coins from "./routes/Coins";

interface IRouteProps {}

function Router({}: IRouteProps) {
	return (
		<BrowserRouter basename={process.env.PUBLIC_URL}>
			<Switch>
				<Route path="/:coinId">
					<Coin />
				</Route>
				<Route path="/">
					<Coins />
				</Route>
			</Switch>
		</BrowserRouter >
	);
}

export default Router;
