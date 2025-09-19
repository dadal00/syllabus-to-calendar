import { CalendarEvents } from 'lib/models'

/* Sends post request with given path and body */
export async function sendPost(path: string, data: BodyInit): Promise<Response> {
	return await fetch(path, {
		method: 'POST',
		body: data
	})
}

/* Throws custom errors */
export async function grabEventsJsonFromResponse(response: Response): Promise<CalendarEvents> {
	const data = await response.json()

	if (!response.ok) {
		const msg = data.error || data.message || 'Unknown error'

		throw new Error(msg.length > 40 ? msg.slice(0, 40) + '…' : msg)
	}

	return data
}
