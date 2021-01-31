import React from 'react'
import TodoTable from '../components/todoApp/TodoTable'
import { Container } from '@material-ui/core'

const TodoView = () => {
	return (
		<Container style={{ marginTop: '20px' }}>
			<TodoTable />
		</Container>
	)
}
export default TodoView
