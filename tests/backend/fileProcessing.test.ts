import { NextRequest } from 'next/server'
import { grabFile } from '../../src/lib/backend/fileProcessing'

/* Mock file */
const mockFile = new File(['file content'], 'test.txt', { type: 'text/plain' })
/* Mock formData promise */
const mockFormData = {
	get: jest.fn().mockReturnValue(mockFile)
}
/* Mock NextRequest */
const mockRequest = {
	formData: jest.fn().mockResolvedValue(mockFormData)
} as unknown as NextRequest

test('grabFile should promise a file from a request', async () => {
	const result = await grabFile(mockRequest)

	expect(result).toBe(mockFile)
	expect(mockRequest.formData).toHaveBeenCalled()
	expect(mockFormData.get).toHaveBeenCalledWith('file')
})
