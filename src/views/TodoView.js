import React, { useState } from 'react'
import Header from '../components/common/Header'
import TodoTable from '../components/todoApp/TodoTable'

const TodoView = () => {
	return (
		<>
			<Header />

			<TodoTable />
		</>
	)
}
export default TodoView
