import React from 'react'
import {Link} from '../navigation'

export const Footer = (props) => (
	<div>
		<Link to='all' toName='All'/>
		<Link to='active' toName='Active'/>
		<Link to='complete' toName='Complete'/>
	</div>
)
