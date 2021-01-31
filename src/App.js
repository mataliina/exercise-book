//import './App.css'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import TodoView from './views/TodoView'
import CalculatorView from './views/CalculatorView'
import WeatherView from './views/WeatherView'
import Home from './views/Home'
import Header from './components/common/Header'

const App = () => {
	return (
		<>
			<Router>
				<div>
					<Header />

					<Switch>
						<Route exact path='/'>
							<Home />
						</Route>
						<Route path='/todos'>
							<TodoView />
						</Route>
						<Route path='/calculator'>
							<CalculatorView />
						</Route>
						<Route path='/weather'>
							<WeatherView />
						</Route>
					</Switch>
				</div>
			</Router>
		</>
	)
}

export default App
