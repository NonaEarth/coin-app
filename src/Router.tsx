import { HashRouter, Route, Switch } from "react-router-dom";

import Coin from "./routes/Coin";
import Coins from "./routes/Coins";

interface IRouteProps {}

function Router({}: IRouteProps) {
	return (
		<HashRouter>
			<Switch>
				<Route path="/:coinId">
					<Coin />
				</Route>
				<Route path="/">
					<Coins />
				</Route>
			</Switch>
		</HashRouter>
	);
}

export default Router;
