import OpenAI from 'openai'
import { CalendarEvents, EventsArray, EventsJson } from '../models'
import { zodTextFormat } from 'openai/helpers/zod.js'
import { grabB64 } from './fileProcessing'

/* OpenAI init + relevant extraction */

/* Background context used to guide the model */
const SystemPrompt =
	"You are a helpful syllabus parser. \
	You are to extract the schedules from unstructured \
	syllabus PDFs into the specified structured json format \
	consisting of a title, start date, and end date. The \
	title should be concise and include only actionable \
	items. For example instead of 'Week 10 — Read Handbook \
	Chapters 19-24', it should be 'Read Handbook Chapters \
	19-24'. If there are no obvious dates or timelines, \
	find as much context as possible such as the year or \
	season elsewhere in the document first. For example, \
	'Fall 2024' would start around the first Monday of \
	September. If there are truly no other context clues, treat \
	the current date as the start and mark the date for each \
	monday afterwards."

const client = new OpenAI({
	apiKey: process.env['OPENAI_API_KEY']
})

export async function openAIExtract(
	fileName: string,
	fileB64: string
): Promise<OpenAI.Responses.Response> {
	return client.responses.create({
		model: 'gpt-5-mini',
		input: [
			{
				/* System prompt provides context or background to the model */
				role: 'system',
				content: SystemPrompt
			},
			{
				role: 'user',
				content: [
					{
						type: 'input_file',
						filename: fileName,
						/* For now, we only take pdfs but can be expanded */
						file_data: `data:application/pdf;base64,${fileB64}`
					},
					{
						type: 'input_text',
						text: 'Extract the weekly syllabus events into a JSON.'
					}
				]
			}
		],
		text: {
			/* Expected structured output format: we want a structured json of events */
			format: zodTextFormat(EventsJson, 'events_extraction')
		}
	})
}

export async function grabExtractedEvents(fileName: string, fileBytes: Buffer): Promise<string> {
	/* 
		1. Pass file name + bytes to openAI
		2. Grab the output_text (or the result)
	*/
	return (await openAIExtract(fileName, await grabB64(fileBytes))).output_text
}

export async function fetchEvents(fileName: string, fileBytes: Buffer): Promise<CalendarEvents> {
	/* 
		Will emit a response error if openAI parsing fails 

		1. Pass the file name + bytes to get extracted events
		2. Parse the JSON grab the final result
		3. Check if the result an array of events
	*/
	const result = EventsArray.safeParse(
		JSON.parse(await grabExtractedEvents(fileName, fileBytes)).result
	)

	/* Throws the Zod error if we did NOT get an array of events */
	if (!result.success) {
		throw result.error
	}

	return result.data
}
