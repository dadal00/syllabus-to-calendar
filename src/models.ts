interface CalendarEvent {
	id: number
	title: string
	start: Date
	end: Date
}

interface LiveCalendarProps {
	events: CalendarEvent[]
}

interface SetStateProp {
	setEvents: React.Dispatch<React.SetStateAction<CalendarEvent[]>>
}
