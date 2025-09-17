import { maxFileSize } from 'lib/models'
import { grabFile, validateFileType } from 'lib/backend/fileProcessing'
import {
	fileInvalidType,
	fileTooLargeResponse,
	jsonInternalErrorResponse,
	jsonResponse,
	noFileResponse
} from 'lib/backend/responses'
import { fetchEvents } from 'lib/backend/openAI'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest): Promise<NextResponse> {
	/* Grab file data */
	const file = await grabFile(request)

	/* Check if a file was sent */
	if (!file) return noFileResponse()

	/* Check if file too large */
	if (file.size > maxFileSize) return fileTooLargeResponse()

	/* Check if file is a valid type, save the file bytes to use later */
	const fileBytes = await validateFileType(file)
	if (!fileBytes) return fileInvalidType()

	try {
		/* 
			We save the file bytes to create the Base64 here. 

			We catch: 
			- openAI API response errors (if communication failed)
			- zod safe parse errors (if we did NOT get an array of events)  
		*/
		const result = await fetchEvents(file.name, fileBytes)

		return jsonResponse(result)
	} catch (err: unknown) {
		if (err instanceof Error) return jsonInternalErrorResponse(err.message, 'unknown_error')

		return jsonInternalErrorResponse(String(err), 'unknown_error')
	}
}
