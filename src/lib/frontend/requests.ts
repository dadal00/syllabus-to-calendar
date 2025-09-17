/* Sends post request with given path and body */
export async function sendPost(path: string, data: any): Promise<Response> {
	return await fetch(path, {
		method: 'POST',
		body: data
	})
}

/* Throws custom errors */
export async function grabJsonFromResponse(response: Response): Promise<any> {
	const data = await response.json()

	if (!response.ok) throw new Error(data.error)

	return data
}
