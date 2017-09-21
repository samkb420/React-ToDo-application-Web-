import React, {Component} from 'react'

export class Link extends Component {
	//#17: why we define static field in child Component
	static contextTypes = {
	    route: React.PropTypes.string,
	    linkHandler: React.PropTypes.func
	}

	handleClick = (e) => {
		//To skip reloading page just go to path
		e.preventDefault()

		this.context.linkHandler(this.props.to)
	}


	render() {
		const activeClass = this.context.route === this.props.to ? 'link-class-active' : 'link-class'
		return <a href="#" className={activeClass} onClick={this.handleClick}>{this.props.toName}</a>
	}
}


Link.propTypes = {
	to: React.PropTypes.string.isRequired,
	toName: React.PropTypes.string.isRequired
}
