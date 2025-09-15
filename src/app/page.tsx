'use client'

import FileUploadButton from 'components/FileUploadButton'
import EventCalendar from 'components/EventCalendar'
import { useState } from 'react'
import { CalendarEvent } from 'lib/models'

export default function Home() {
	const [events, setEvents] = useState<CalendarEvent[]>([])

	return (
		<div className="flex h-screen">
			<div className="w-[15%] bg-gray-100 p-4"></div>
			<div className="flex-1 bg-white p-4">
				<EventCalendar events={events} />
				<FileUploadButton setEvents={setEvents} />
			</div>
		</div>
	)
}
