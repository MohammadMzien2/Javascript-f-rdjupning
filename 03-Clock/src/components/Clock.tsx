import { useEffect, useState } from "react";

const Clock = () => {
	const [time, setTime] = useState(() => {
		return new Date().toLocaleDateString();
	});

	// Start clock when component was mounted for the first time
	useEffect(() => {
		const tickId = setInterval(() => {
			setTime(new Date().toLocaleTimeString());
		}, 1000);

		return () => {
			// This clean-up function will be exexuted when the component is unmounted .
			clearInterval(tickId);
		};
	}, []), // Empty dependency array means to run effect only once (component mount)

	//update page title with the current time but only if the time has changed since the last render
		useEffect(() => {
			document.title = time;
		}, [time]);

	return (
		<div className="display-1 text-center">
			{time}
		</div>
	)

}

export default Clock
