'use client'

import EventCalendar from 'components/EventCalendar'
import { useState } from 'react'
import { CalendarEvent } from 'lib/models'
import CalendarHeader from 'components/CalendarHeader'

export default function Home() {
	const [events, setEvents] = useState<CalendarEvent[]>([])

	return (
		<div className="flex h-screen bg-black p-10 justify-center">
			{/* Calendar panel */}
			<div className="bg-black rounded-2xl p-6 flex-column border-gray-700 border-1 min-w-125 max-h-150 overflow-auto justify-center content-center">
				{/* Panel header*/}
				<CalendarHeader setEvents={setEvents} events={events} />

				{/* Actual panel calendar */}
				<div className="bg-bright-gray rounded-2xl p-6 flex border-gray-700 border-1 overflow-auto">
					<EventCalendar events={events} />
				</div>
			</div>
		</div>
	)
}
