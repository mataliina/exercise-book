import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
//import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import { v4 as uuidv4 } from 'uuid'
import axios from 'axios'
import DatePicker from '../common/DatePicker'

const AddTodoDialog = (props) => {
	const [open, setOpen] = useState(false)
	const { setUpdate } = props
	//const { open, setOpen } = props
	const [name, setName] = useState('')
	const [description, setDescription] = useState('')
	//const [dueDate, setDueDate] = useState('')
	const [selectedDate, setSelectedDate] = useState(new Date())

	const handleClickOpen = () => {
		setOpen(true)
	}

	const handleClose = () => {
		setOpen(false)
	}

	const handleSave = () => {
		axios
			.post('http://localhost:8000/todos', {
				id: uuidv4(),
				name,
				description,
				dueDate: selectedDate,
				isDone: false,
				created: new Date(),
			})
			.then((response) => {
				console.log('lisätty ', response)
				setUpdate(true)
				setOpen(false)
			})
	}

	return (
		<div>
			<Button variant='outlined' color='primary' onClick={handleClickOpen}>
				Lisää uusi tehtävä
			</Button>
			<Dialog open={open} onClose={handleClose} aria-labelledby='form-dialog-title'>
				<DialogTitle id='form-dialog-title'>Lisää tehtävä</DialogTitle>
				<DialogContent>
					{/* <DialogContentText>Tehtävän tiedot</DialogContentText> */}
					<TextField
						autoFocus
						margin='dense'
						id='name'
						label='Tehtävän nimi'
						fullWidth
						onChange={(e) => setName(e.target.value)}
					/>
					<TextField
						margin='dense'
						id='description'
						label='Tehtävän kuvaus'
						fullWidth
						onChange={(e) => setDescription(e.target.value)}
					/>
					<DatePicker selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
					{/* <TextField
						margin='dense'
						id='date'
						label='Määräpäivä'
						fullWidth
						onChange={(e) => setDueDate(e.target.value)}
					/> */}
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} color='primary'>
						Peruuta
					</Button>
					<Button onClick={handleSave} color='primary'>
						Tallenna
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	)
}

export default AddTodoDialog
