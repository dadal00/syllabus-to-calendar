import { NextRequest } from 'next/server'
import { fileTypeFromBuffer } from 'file-type'

/* File parsing */

export async function grabFile(request: NextRequest): Promise<File> {
	return (await request.formData()).get('file') as File
}

export async function grabFileBytes(file: File): Promise<Buffer> {
	return Buffer.from(await file.arrayBuffer())
}

export function grabB64(buffer: Buffer): string {
	return buffer.toString('base64')
}

/* If the file type is valid, return the bytes so we can use it later */
export async function validateFileType(file: File): Promise<Buffer | undefined> {
	const fileBytes = await grabFileBytes(file)

	const type = await fileTypeFromBuffer(fileBytes)

	if (!type || 'application/pdf' !== type.mime) return undefined

	return fileBytes
}
