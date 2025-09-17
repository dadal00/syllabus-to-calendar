import { CalendarHeaderProps } from 'lib/models'
import { useState } from 'react'
import FileUploadButton from './FileUploadButton'

export default function CalendarHeader({ events, setEvents }: CalendarHeaderProps) {
	const [userMessage, setUserMessage] = useState('')

	const [loadingUpload, setLoadingUpload] = useState<boolean>(false)

	return (
		<div className="flex flex-row mb-8 items-center">
			{/* Calendar title */}
			<h1
				className="
				text-white text-lg font-medium"
			>
				Calendar
			</h1>

			<div className="ml-auto flex items-center">
				{/* Relevant user error/success message */}
				{!loadingUpload && (
					<p className={`text-${userMessage === 'Success!' ? 'green' : 'red'}-400 text-sm mr-4`}>
						{userMessage}
					</p>
				)}

				{/* Upload button */}
				<FileUploadButton
					setEvents={setEvents}
					setUserMessage={setUserMessage}
					events={events}
					loadingUpload={loadingUpload}
					setLoadingUpload={setLoadingUpload}
				/>
			</div>
		</div>
	)
}
