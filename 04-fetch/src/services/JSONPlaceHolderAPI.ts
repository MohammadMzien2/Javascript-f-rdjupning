import { Resource } from "../types/Resource";

export const getResource = async (resource: string) => {

	// fetch resource
	const res = await fetch(`https://jsonplaceholder.typicode.com/${resource}`);

	// Make fetch behave correctly
	if (!res.ok) {
		throw new Error(`${res.status} ${res.statusText}`);
	}

	//parse response
	const payload: Resource[] = await res.json() as Resource[];

	// Fake slow api
	await new Promise(r => setTimeout(r, 1500));


	return payload;
}
