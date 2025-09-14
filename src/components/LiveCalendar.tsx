import { Calendar, Views, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'

const localizer = momentLocalizer(moment)

export default function LiveCalendar({ events }: LiveCalendarProps) {
	return (
		<Calendar
			localizer={localizer}
			events={events}
			views={Object.values(Views)}
			style={{ height: 500 }}
		/>
	)
}
