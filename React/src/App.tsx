import { useState } from 'react'
import './App.css'

function App() {
	const [showEvents, setShowEvents] = useState(true)
	const [events, setEvents] = useState([
		{ title: "mario's birthday bash", id: 1 },
		{ title: "luigi's birthday bash", id: 2 },
		{ title: "ha's birthday bash", id: 3 }
	])

	const handleClick = (id) => {
		setEvents((prevEvents) => {
			return prevEvents.filter((event) => {
				return id !== event.id

			})
		})
	}



	return (
		<div className='App'>
			{showEvents && (

				<div>
					<button onClick={() => setShowEvents(false)}>Hide events</button>
				</div>
			)}
			{!showEvents && (
				<div>
					<button onClick={() => setShowEvents(true)}>Show events</button>
				</div>
			)}
			{showEvents && events.map((event, index) => (
				<div key={event.id}>
					<h2>{index} - {event.title}</h2>
					<button onClick={() => handleClick(event.id)}>delete event</button>
				</div>
			))}

		</div>
	);
}

export default App
