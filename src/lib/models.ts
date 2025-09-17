import z from 'zod'

/* Individual event structure */
const EventObject = z.object({
	id: z.number().optional().nullable(),
	title: z.string(),
	start: z
		.string()
		.datetime()
		.transform((str) => new Date(str)),
	end: z
		.string()
		.datetime()
		.transform((str) => new Date(str))
})

export const EventsArray = z.array(EventObject)

/* Compile time TS types */
export type CalendarEvents = z.infer<typeof EventsArray>

export type CalendarEvent = z.infer<typeof EventObject>

/* Array of events */
export const EventsJson = z.object({
	result: z.array(EventObject)
})

/* File input constraints */
/* ~5mb max size */
export const maxFileSize = 5 * 1024 * 1024

/* Expected props */
export interface EventCalendarProps {
	events: CalendarEvent[]
}

export interface CalendarHeaderProps extends EventCalendarProps {
	setEvents: React.Dispatch<React.SetStateAction<CalendarEvent[]>>
}

export interface UploadButtonProps extends CalendarHeaderProps {
	setUserMessage: React.Dispatch<React.SetStateAction<string>>
	loadingUpload: boolean
	setLoadingUpload: React.Dispatch<React.SetStateAction<boolean>>
}
