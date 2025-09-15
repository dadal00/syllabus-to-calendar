import { Calendar, Views, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import { EventCalendarProps } from 'lib/models'

const localizer = momentLocalizer(moment)

export default function EventCalendar({ events }: EventCalendarProps) {
	return (
		<Calendar
			localizer={localizer}
			events={events}
			views={Object.values(Views)}
			style={{ height: 500 }}
		/>
	)
}
