import { useState } from "react";

function App() {
	const [counter, setCounter] = useState(1);
	const [msg, setMsg] = useState("Hi");
	//let counter = 1;

	console.log("App is being redered")

	const handleBtnClick = () => {
		console.log("Counter before update", counter);
		setCounter(counter + 1);
		console.log("Counter after update", counter);

	}

	return (
		<div className='container'>
			<h1>01-react-basic</h1>

			<p>{msg}</p>

			<p>Counter: {counter}</p>

			

			<button onClick={handleBtnClick} className="btn btn-success">Click me</button>
			<button onClick={() => setMsg("HI sun")} className="btn btn-warning"> HI </button>

		</div >
	);
}

export default App
