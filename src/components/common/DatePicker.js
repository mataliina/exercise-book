import 'date-fns'
import React from 'react'
import DateFnsUtils from '@date-io/date-fns'
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers'

const DatePicker = (props) => {
	const { selectedDate, setSelectedDate } = props

	const handleDateChange = (date) => {
		setSelectedDate(date)
	}

	return (
		<>
			<MuiPickersUtilsProvider utils={DateFnsUtils}>
				<KeyboardDatePicker
					disableToolbar
					variant='inline'
					format='dd/MM/yyyy'
					margin='normal'
					id='date-picker-inline'
					label='Määräpäivä'
					value={selectedDate}
					onChange={handleDateChange}
					KeyboardButtonProps={{
						'aria-label': 'change date',
					}}
				/>
			</MuiPickersUtilsProvider>
		</>
	)
}
export default DatePicker
