import React from 'react'
import Weather from '../components/weatherApp/Weather'
import { Container } from '@material-ui/core'

const WeatherView = () => {
	return (
		<Container style={{ padding: '20px' }}>
			<Weather />
		</Container>
	)
}
export default WeatherView
