import { NextResponse } from 'next/server'
import { maxFileSize } from '../models'

/* Responses */
export function noFileResponse(): NextResponse {
	return jsonErrorResponse('No file uploaded')
}

export function fileTooLargeResponse(): NextResponse {
	return jsonErrorResponse('File must be smaller than ' + maxFileSize)
}

export function fileInvalidType(): NextResponse {
	return jsonErrorResponse('File must be a pdf')
}

/* Response builders */
export function jsonResponse(data: unknown, status = 200): NextResponse {
	return NextResponse.json(data, { status })
}

export function jsonErrorResponse(message: string): NextResponse {
	return jsonResponse({ error: message }, 400)
}

export function jsonInternalErrorResponse(message: string, code: string): NextResponse {
	return jsonResponse({ message: message, internal_code: code }, 500)
}
