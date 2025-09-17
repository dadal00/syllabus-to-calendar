import { grabJsonFromResponse, sendPost } from 'lib/frontend/requests'
import { EventsArray, UploadButtonProps } from 'lib/models'
import * as z from 'zod/v4/core'
import Spinner from './Spinner'

export default function FileUploadButton({
	events,
	setEvents,
	setUserMessage,
	loadingUpload,
	setLoadingUpload
}: UploadButtonProps) {
	async function handleSyllabusUpload(event: React.ChangeEvent<HTMLInputElement>) {
		if (loadingUpload) return

		/* Clear error message once button clicked */
		setUserMessage('')

		/* If there are no files, return */
		if (!event.target.files) return

		/* If there are no files, return */
		const file = event.target.files[0]
		if (!file) return

		console.log('Uploading file...')

		/* Syllabus payload */
		const formData = new FormData()
		formData.append('file', file)

		try {
			/* 
				Throws errors associated with response AND custom errors from backend

				1. Send post request
				2. Grab json from post response
			*/
			setLoadingUpload(true)

			const data = await grabJsonFromResponse(await sendPost('/convert-syllabus', formData))

			/* Parse the type correctly otherwise throw an error */
			const result = EventsArray.safeParse(data)
			if (!result.success) throw new Error(z.prettifyError(result.error))

			const parsedResult = result.data.map((item) => ({
				...item,
				/* Assign random id to avoid collisions */
				id: Math.floor(Math.random() * 1000000)
			}))

			/* Extend the current events to not override */
			setEvents([...events, ...parsedResult])
			setLoadingUpload(false)
			setUserMessage('Success!')

			console.log(data)
		} catch (error) {
			console.error(error)

			setLoadingUpload(false)
			/* If error, show message to the user */
			setUserMessage(error instanceof Error ? error.message : String(error))
		}
	}

	return (
		<>
			{/* Syllabus upload button */}
			<input
				id="file"
				type="file"
				onChange={handleSyllabusUpload}
				className="hidden"
				disabled={loadingUpload}
			/>
			<label
				htmlFor="file"
				className={`
				${loadingUpload ? 'disabled:cursor-not-allowed flex items-center' : 'cursor-pointer hover:bg-white hover:text-black'}
				
				text-white text-sm 
				
				py-3 px-4
				
				rounded-2xl bg-bright-gray

				select-none
				`}
			>
				{loadingUpload ? (
					<>
						<Spinner />
						Processing...
					</>
				) : (
					<>Upload Syllabus</>
				)}
			</label>
		</>
	)
}
