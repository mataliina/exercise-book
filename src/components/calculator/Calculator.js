import React, { useState } from 'react'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'
import Button from '@material-ui/core/Button'

const useStyles = makeStyles({
	root: {
		maxWidth: 300,
		justifyContent: 'space-between',
		border: '1px solid pink',
		borderRadius: '5px',
		padding: '5px',
	},
	input: {
		border: '1px solid pink',
		borderRadius: '5px',
		textAlign: 'right',
	},
	numButton: {
		backgroundColor: 'lightblue',
	},
	funcButton: {
		backgroundColor: '#f6e68b',
	},
	clearButton: {
		backgroundColor: '#f99494',
	},
	totalButton: {
		backgroundColor: '#afeeaf',
	},
})

const Calculator = () => {
	const classes = useStyles()
	const numButtons = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0']
	const funcButtons = ['+', '-', '*', '/']
	const [input, setInput] = useState('0')
	const [calcString, setCalcString] = useState('')
	const [total, setTotal] = useState('')
	const [prevClick, setPrevClick] = useState('')

	const handleNumClick = (e) => {
		setPrevClick(e)
		if (total !== '') {
			setTotal('')
		}
		input.length === 1 && input[0] === '0' ? setInput(e) : setInput((prevState) => prevState + e)
	}

	const clear = () => {
		setPrevClick('')
		setInput('0')
		setCalcString('')
		setTotal('')
	}

	const handleFuncClick = (func) => {
		if (funcButtons.includes(prevClick)) {
			if (func === '-' && prevClick !== '-') {
				setTotal('')
				setInput('-')
				setPrevClick(func)
			} else {
				// jos painetaan useita kertoja peräkkäin func-näppäintä, vain ensimmäinen
				// painallus huomioidaan
				return
			}
		} else {
			setPrevClick(func)
			//lasketaan tähänastinen tulos:
			let newTotal = eval(calcString + input)
			setTotal(() => newTotal.toString())

			//kaikki tähän mennessä annetut komennot stringinä:
			setCalcString(() => newTotal.toString() + func)

			setInput('')
		}
	}

	const handleTotal = () => {
		let newCalcString = calcString

		if (funcButtons.includes(prevClick)) {
			newCalcString = calcString.slice(0, calcString.length - 1)
		}

		let newTotal = eval(newCalcString + input)
		setTotal(() => newTotal.toString())

		setCalcString(newTotal.toString())

		setInput('')
		setPrevClick('=')
	}

	return (
		<>
			<Grid container spacing={1} alignItems='flex-end' className={classes.root}>
				<Grid item xs={9}>
					<Grid container spacing={1}>
						<Grid item xs={12} className={classes.input}>
							<Typography variant='h5' style={{ overflow: 'hidden' }}>
								{total === '' ? input : total}
							</Typography>
						</Grid>
						{numButtons.map((button) => {
							return (
								<Grid item xs={4} key={button} value={button}>
									<Button
										fullWidth
										className={classes.numButton}
										onClick={() => handleNumClick(button)}
									>
										{button}
									</Button>
								</Grid>
							)
						})}
						<Grid item xs={4}>
							<Button
								fullWidth
								value={'.'}
								className={classes.numButton}
								onClick={() => handleNumClick('.')}
							>
								.
							</Button>
						</Grid>
						<Grid item xs={4}>
							<Button fullWidth value={'='} className={classes.totalButton} onClick={handleTotal}>
								=
							</Button>
						</Grid>
					</Grid>
				</Grid>
				<Grid item xs={3}>
					<Grid container direction='column' spacing={1}>
						<Grid item xs={4}>
							<Button fullWidth value={'clear'} className={classes.clearButton} onClick={clear}>
								clear
							</Button>
						</Grid>
						{funcButtons.map((button) => {
							return (
								<Grid item xs={4} key={button}>
									<Button
										fullWidth
										className={classes.funcButton}
										onClick={() => handleFuncClick(button)}
									>
										{button}
									</Button>
								</Grid>
							)
						})}
					</Grid>
				</Grid>
			</Grid>
		</>
	)
}

export default Calculator
