import React, { useRef, useState, useEffect } from 'react'
import AddTodoDialog from './AddTodoDialog'
import axios from 'axios'
import MaterialTable from 'material-table'
import { DateTime } from 'luxon'

//icons
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline'
import DoneIcon from '@material-ui/icons/Done'
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied'
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions'
// import FirstPage from '@material-ui/icons/FirstPage'
// import LastPage from '@material-ui/icons/LastPage'
// import ChevronLeft from '@material-ui/icons/ChevronLeft'
// import ChevronRight from '@material-ui/icons/ChevronRight'
// import Search from '@material-ui/icons/Search'
// import Clear from '@material-ui/icons/Clear'

const TodoTable = () => {
	//const [todoData, setTodoData] = useState([])
	// useEffect(() => {
	// 	axios.get('http://localhost:8000/todos').then((result) => {
	// 		console.log('result: ', result.data)
	// 		setTodoData(result.data)
	// 	})
	// }, [])

	const [update, setUpdate] = useState(false)

	const tableRef = useRef()

	const getData = (params) => {
		let resultData = { totalCount: 0, page: params.page, data: [] }
		return axios
			.get('http://localhost:8000/todos')
			.then((result) => {
				resultData.data = result.data
				return resultData
			})
			.catch((err) => {
				console.log('Error: ', err)
			})
	}

	useEffect(() => {
		if (update) {
			tableRef.current.onQueryChange()
			setUpdate(false)
		}
	}, [update])

	// const icons = {
	// 	FirstPage: () => <FirstPage />,
	// 	LastPage: () => <LastPage />,
	// 	NextPage: () => <ChevronRight />,
	// 	PreviousPage: () => <ChevronLeft />,
	// 	Search: () => <Search />,
	// 	ResetSearch: () => <Clear />,
	// }

	return (
		<>
			<AddTodoDialog setUpdate={setUpdate} />
			<MaterialTable
				tableRef={tableRef}
				options={{
					headerStyle: {
						backgroundColor: '#d487ab',
						color: '#FFF',
					},
					actionsColumnIndex: -1,
					pageSize: 10,
				}}
				data={getData}
				title='Tehtävät'
				//icons={icons}
				columns={[
					{
						title: 'Tila',
						field: 'isDone',
						cellStyle: (e, rowData) => {
							if (rowData.isDone) {
								return { color: '#7bd07b' }
							}
							return { color: '#fc7979' }
						},

						render: (rowData) => {
							if (!rowData.isDone) {
								return <SentimentVeryDissatisfiedIcon />
							}
							return <EmojiEmotionsIcon />
						},
						width: 30,
					},
					{
						title: 'Tehtävä',
						field: 'name',
						cellStyle: {
							backgroundColor: '#e6d1dd',
							color: 'black',
						},
					},
					{
						title: 'Kuvaus',
						field: 'description',
						cellStyle: {
							backgroundColor: '#f3e3ec',
							color: 'black',
						},
					},
					{
						title: 'Määräpäivä',
						field: 'dueDate',
						defaultSort: 'desc',
						cellStyle: {
							backgroundColor: '#fdecf5',
							color: 'black',
						},
						render: (rowData) => {
							let date = DateTime.fromISO(rowData.dueDate)
							return date.toLocaleString(DateTime.DATETIME_SHORT)
						},
					},
					{
						title: 'Tehtävä luotu',
						field: 'created',
						cellStyle: {
							backgroundColor: '#fdecf5',
							color: 'black',
						},

						render: (rowData) => {
							let date = DateTime.fromISO(rowData.created)
							return date.toLocaleString(DateTime.DATETIME_SHORT)
						},
					},
				]}
				actions={[
					{
						icon: () => <DoneIcon />,
						tooltip: 'Merkitse tehdyksi/tekemättömäksi',
						onClick: (event, rowData) => {
							let url = 'http://localhost:8000/todos/' + rowData.id
							console.log(rowData)
							let newData = {
								id: rowData.id,
								name: rowData.name,
								description: rowData.description,
								dueDate: rowData.dueDate,
								created: rowData.created,
								isDone: !rowData.isDone,
							}
							axios
								.put(url, newData)
								.then((res) => {
									console.log('result', res)
									tableRef.current.onQueryChange()
								})
								.catch((err) => {
									console.log('Error: ', err)
								})
						},
					},
					{
						icon: () => <DeleteOutlineIcon />,
						tooltip: 'Poista tehtävä',
						onClick: (event, rowData) => {
							let url = 'http://localhost:8000/todos/' + rowData.id
							axios
								.delete(url)
								.then((res) => {
									console.log(res)
									tableRef.current.onQueryChange()
								})
								.catch((err) => {
									console.log('Error: ', err)
								})
						},
					},
				]}
			/>
		</>
	)
}
export default TodoTable
