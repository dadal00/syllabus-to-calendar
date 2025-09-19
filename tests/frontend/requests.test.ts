import { sendPost, parseEventResponse } from '../../src/lib/frontend/requests'

/* Mock variables */

/* Basic fetch */
const mockFetchResponse = { test: 100 }

/* Parsing valid events */
const mockCalendarEvents = [
	{
		id: 1,
		title: 'Test Event',
		start: '2025-09-18T10:00:00.000Z',
		end: '2025-09-18T11:00:00.000Z'
	},
	{
		id: 2,
		title: 'Another Event',
		start: '2025-09-19T14:00:00.000Z',
		end: '2025-09-19T15:30:00.000Z'
	}
]

/* Reporting relevant errors */
const mockErrorMessage = 'Something went wrong'
const mockErrorResponse = {
	error: mockErrorMessage
}

/* Mock fetch */
global.fetch = jest.fn(() =>
	Promise.resolve({
		json: () => Promise.resolve(mockFetchResponse)
	} as unknown as Response)
)

/* Tests */

test('sendPost should send relevant post', async () => {
	const body = JSON.stringify({ foo: 'bar' })

	const response = await sendPost('/api/test', body)

	expect(fetch).toHaveBeenCalledWith('/api/test', {
		method: 'POST',
		body: body
	})

	const data = await response.json()
	expect(data).toEqual(mockFetchResponse)
})

test('parseEventResponse should parse calendar events json from response', async () => {
	const mockResponse = new Response(JSON.stringify(mockCalendarEvents), { status: 200 })

	const result = await parseEventResponse(mockResponse)
	expect(result).toEqual(mockCalendarEvents)
})

test('parseEventResponse should throw relevant errors', async () => {
	const mockResponse = new Response(JSON.stringify(mockErrorResponse), { status: 400 })

	await expect(parseEventResponse(mockResponse)).rejects.toThrow(mockErrorMessage)
})
