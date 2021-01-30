import React, { useState } from 'react'
import axios from 'axios'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
//import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
	root: {
		width: 345,
		minHeight: 100,
	},
	media: {
		height: 200,
		//objectFit: 'none',
	},
})

const Weather = () => {
	const classes = useStyles()

	const [location, setLocation] = useState('')
	const [result, setResult] = useState({})
	const [successError, setSuccessError] = useState(false)

	//console.log('result statesta_ ', result)

	const getWeather = (loc) => {
		setSuccessError(false)
		let url = 'http://api.weatherstack.com/current?access_key=' + process.env.WEATHER_API_KEY + '&query=' + loc

		axios
			.get(url)
			.then((result) => {
				//console.log('result ', result)
				console.log('haku tehty')
				setResult(result.data)
			})
			.catch((error) => {
				console.log('Virhe: ', error)
			})
	}
	return (
		<>
			<Grid container spacing={2}>
				<Grid item xs={12}>
					<Typography variant='h1'>Sää</Typography>
				</Grid>
				<Grid item xs={12}>
					<TextField
						id='location'
						label='Paikkakunta'
						//defaultValue='Paikkakunta'
						value={location}
						onChange={(e) => setLocation(e.target.value)}
					></TextField>
				</Grid>
				<Grid item xs={12}>
					<Button variant='outlined' onClick={() => getWeather(location)}>
						Hae
					</Button>
				</Grid>
				{result.error && (
					<Grid item xs={12}>
						<Card className={classes.root}>
							<Typography variant='body1'>Ei hakutuloksia</Typography>
						</Card>
					</Grid>
				)}
				{result.location && (
					<Grid item xs={12}>
						<Card className={classes.root}>
							<CardActionArea>
								<CardMedia
									className={classes.media}
									title='Weather_icon'
									image={`${result.current.weather_icons}`}
								/>
								<CardContent>
									<Typography variant='body1'>Sää alueella</Typography>

									<Typography variant='h4'>{`${result.location.name}`}</Typography>
									<Typography variant='body1'>{`Paikallinen aika: ${result.location.localtime}`}</Typography>
									<Typography variant='body1'>{`lämpötila: ${result.current.temperature}°C, tuntuu kuin: ${result.current.feelslike}°C`}</Typography>
									<Typography variant='body1'>{`${result.current.weather_descriptions}`}</Typography>
								</CardContent>
							</CardActionArea>
						</Card>
					</Grid>
				)}
			</Grid>
		</>
	)
}

export default Weather
