'use client'

import FileUpload from 'components/FileUpload'
import LiveCalendar from 'components/LiveCalendar'
import { useState } from 'react'

export default function Home() {
	const [events, setEvents] = useState<CalendarEvent[]>([])

	return (
		<div className="flex h-screen">
			<div className="w-[15%] bg-gray-100 p-4"></div>
			<div className="flex-1 bg-white p-4">
				<LiveCalendar events={events} />
				<FileUpload setEvents={setEvents} />
			</div>
		</div>
	)
}
