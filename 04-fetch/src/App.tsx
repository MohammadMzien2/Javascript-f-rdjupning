import { useEffect, useState } from "react";
import { getResource } from "./services/JSONPlaceHolderAPI";
import { Resource } from "./types/Resource";
import "./assets/App.scss";
import ResourceList from "./components/ResourceList";

function App() {
	const [resource, setResource] = useState("");
	const [data, setData] = useState<Resource[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | false>("false");

	// Hämta api
	useEffect(() => {


		console.log("Side-effect triggered due to resource changing value", resource);

		const fetchData = async () => {
			if (!resource) {
				return;
			}

			// Reset Data
			setData([]);
			setIsLoading(true);
			setError(false);

			try {
				// Make the actual request
				const payload = await getResource(resource);

				// set data to payload and loading state to false
				setData(payload);
			} catch (err) {
				if (err instanceof Error) {
					console.log("This happened:", err.message);
					setError(err.message);
				} else {
					setError("This should never happen again...")
				}
			}

			setIsLoading(false);
		}

		fetchData();
	}, [resource]);

	console.log("Rendering... Resource is:", resource);


	return (
		<div className="container">
			<h1 className="mb-3">🐶 Fetch</h1>

			<div className="d-flex justify-content-between m-5">
				<button onClick={() => setResource('albums')} className="btn btn-primary">Albums</button>
				<button onClick={() => setResource('photos')} className="btn btn-success">Photos</button>
				<button onClick={() => setResource('posts')} className="btn btn-warning">Posts</button>
				<button onClick={() => setResource('todos')} className="btn btn-danger">Todos</button>
				<button onClick={() => setResource('memes')} className="btn btn-info">Memes</button>
			</div>

			<ResourceList
			data={data}
			isLoading={isLoading}
			error={error}
			resource={resource}
			 />


		</div>
	)
}

export default App;
