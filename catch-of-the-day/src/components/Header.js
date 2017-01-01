import React from 'react';

class Header extends React.Component{
	render() {
		return (
			<header className="top">
			<h1>
				catch
			<span class="ofthe"> 
			<span class="of">of</span> 
			<span class="the">the</span> 
			</span>
			day
			</h1>
			<h3 className="tagline"><span>{this.props.tagline}</span></h3>
			</header>
			)
	}
}

export default Header;


//to inform others about data that r used,to b passes, etc
Header.propTypes = {
	tagline: React.PropTypes.string.isRequired
}