import "./assets/App.scss";
import { useState } from "react";
import Clock from "./components/Clock";


function App() {

	const [showClock, setShowClock] = useState(false);

	return (
		<div className="container">
			<button className="btn btn-primary"
				onClick={() => setShowClock(!showClock)}>
				Show / Hide clock
			</button>

			{showClock && <Clock />}
		</div>
	);
}

export default App;
