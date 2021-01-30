import React from 'react'
import App from '../App'
import Calculator from '../components/calculator/Calculator'
import Weather from '../components/weatherApp/Weather'
import TodoView from '../views/TodoView'

export default {
	title: 'SuperApp',
}

export const AppStory = () => {
	return <App />
}

export const WeatherAppStory = () => {
	return <Weather />
}

export const CalculatorStory = () => {
	return <Calculator />
}

export const TodoViewStory = () => {
	return <TodoView />
}
