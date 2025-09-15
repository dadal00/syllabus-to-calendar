import { SetEventsProp } from 'lib/models'
import { useState } from 'react'

export default function FileUploadButton({ setEvents }: SetEventsProp) {
	const [file, setFile] = useState<File | null>(null)

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			setFile(e.target.files[0])
		}
	}

	const handleUpload = async () => {
		if (file) {
			console.log('Uploading file...')

			const formData = new FormData()
			formData.append('file', file)

			try {
				const response = await fetch('/convert-syllabus', {
					method: 'POST',
					body: formData
				})

				const data = await response.json()

				if (!response.ok) {
					console.log(data)
					return
				}

				setEvents(data)
				console.log(data)
			} catch (error) {
				console.error(error)
			}
		}
	}

	return (
		<>
			<div className="mb-4">
				<input
					id="file"
					type="file"
					onChange={handleFileChange}
					className="block w-full text-sm text-gray-700
                         file:mr-4 file:py-2 file:px-4
                         file:rounded-full file:border-0
                         file:text-sm file:font-semibold
                         file:bg-blue-500 file:text-white
                         hover:file:bg-blue-600
                         cursor-pointer
                         border border-gray-300 rounded-md
                         focus:outline-none focus:ring-2 focus:ring-blue-400"
				/>
			</div>

			{file && (
				<section className="mb-4 p-4 border border-gray-200 rounded-md bg-gray-50">
					<h2 className="font-semibold mb-2">File details:</h2>
					<ul className="list-disc list-inside text-gray-700">
						<li>Name: {file.name}</li>
						<li>Type: {file.type || 'N/A'}</li>
						<li>Size: {file.size} bytes</li>
					</ul>
				</section>
			)}

			{file && (
				<button
					onClick={handleUpload}
					className="px-6 py-2 bg-blue-500 text-white font-medium rounded-md
                         hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400
                         transition-colors"
				>
					Upload File
				</button>
			)}
		</>
	)
}
