import React from 'react'
import Calculator from '../components/calculator/Calculator'
import { Container } from '@material-ui/core'

const CalculatorView = () => {
	return (
		<Container
			style={{
				minHeight: '500px',
				padding: '20px',
				backgroundColor: '#d487ab',
				width: '100%',
			}}
		>
			<Calculator />
		</Container>
	)
}
export default CalculatorView
