import {
	jsonResponse,
	jsonErrorResponse,
	jsonInternalErrorResponse
} from '../../src/lib/backend/responses'

/* Mock variables */

/* Basic json */
const mockJson = { test: 100 }

/* Errors */
const mockErrorMessage = 'Something is wrong'
const mockErrorJson = { error: mockErrorMessage }

/* Internal errors */
const mockInternalErrorMessage = 'Something internally is wrong'
const mockInternalErrorCode = 'x0a_1'
const mockInternalErrorJson = {
	message: mockInternalErrorMessage,
	internal_code: mockInternalErrorCode
}

/* Tests */

test('jsonResponse should give back valid json + default sucess status', async () => {
	const response = jsonResponse(mockJson)

	expect(await response.json()).toEqual(mockJson)
	expect(response.status).toBe(200)
})

test('jsonErrorResponse should give back error message + 400 status', async () => {
	const response = jsonErrorResponse(mockErrorMessage)

	expect(await response.json()).toEqual(mockErrorJson)
	expect(response.status).toBe(400)
})

test('jsonInternalErrorResponse should give back internal error message + code with 500 status', async () => {
	const response = jsonInternalErrorResponse(mockInternalErrorMessage, mockInternalErrorCode)

	expect(await response.json()).toEqual(mockInternalErrorJson)
	expect(response.status).toBe(500)
})
