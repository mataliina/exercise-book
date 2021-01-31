import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'

const NavMenu = () => {
	const [anchorEl, setAnchorEl] = useState(null)

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget)
	}

	const handleClose = () => {
		setAnchorEl(null)
	}

	return (
		<div>
			<IconButton
				aria-controls='simple-menu'
				aria-haspopup='true'
				color='inherit'
				edge='start'
				onClick={handleClick}
			>
				<MenuIcon />
			</IconButton>
			<Menu id='nav-menu' anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
				<Link to='/'>
					<MenuItem onClick={handleClose} style={{ color: '#d487ab' }}>
						Etusivu
					</MenuItem>
				</Link>
				<Link to='/todos'>
					<MenuItem onClick={handleClose} style={{ color: '#d487ab' }}>
						Todo-lista
					</MenuItem>
				</Link>
				<Link to='/calculator'>
					<MenuItem onClick={handleClose} style={{ color: '#d487ab' }}>
						Laskin
					</MenuItem>
				</Link>
				<Link to='/weather'>
					<MenuItem onClick={handleClose} style={{ color: '#d487ab' }}>
						Sää
					</MenuItem>
				</Link>
			</Menu>
		</div>
	)
}
export default NavMenu
