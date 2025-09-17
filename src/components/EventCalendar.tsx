import { Calendar, View, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import { EventCalendarProps } from 'lib/models'

/* Used by EventCalendar to format and understand dates properly */
const localizer = momentLocalizer(moment)

/* Custom menu mapping, only showing month + agenda */
const customViews: View[] = ['month', 'agenda']

export default function EventCalendar({ events }: EventCalendarProps) {
	return (
		<Calendar
			localizer={localizer}
			/* Events are the custom events displayed as banners */
			events={events}
			/* Views allows for calendar to show by month, week, work week etc. */
			views={customViews}
			style={{ minHeight: 400, minWidth: 400, color: 'white' }}
		/>
	)
}
