// import OpenAI from 'openai'

// const client = new OpenAI({
// 	apiKey: process.env['OPENAI_API_KEY']
// })

export async function POST(req: Request) {
	const formData = await req.formData()
	const file = formData.get('file') as File

	if (!file) {
		return new Response(JSON.stringify({ error: 'No file uploaded' }), {
			status: 400,
			headers: { 'Content-Type': 'application/json' }
		})
	}

	const arrayBuffer = await file.arrayBuffer()
	const base64String = Buffer.from(arrayBuffer).toString('base64')

	// const response = await client.responses.create({
	// 	model: 'gpt-5',
	// 	input: [
	// 		{
	// 			role: 'user',
	// 			content: [
	// 				{
	// 					type: 'input_file',
	// 					filename: file.name,
	// 					file_data: `data:application/pdf;base64,${base64String}`
	// 				},
	// 				{
	// 					type: 'input_text',
	// 					text: 'Extract the weekly syllabus events into a JSON. The JSON structure should be an array of objects with an example format of [{ "title": "Example", "start": "05/12/25", "end": "06/24/25" }]'
	// 				}
	// 			]
	// 		}
	// 	]
	// })

	// return new Response(JSON.stringify({ text: response.output_text }), {
	// 	status: 200,
	// 	headers: { 'Content-Type': 'application/json' }
	// })

	return new Response(JSON.stringify({ message: 'File received', name: file.name }), {
		status: 200,
		headers: { 'Content-Type': 'application/json' }
	})
}
