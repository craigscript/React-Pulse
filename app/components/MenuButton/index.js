/**
*
* ImageButton
*
*/

import React from 'react';
import './MenuButton.css';

class MenuButton extends React.Component {
	constructor(props) {
		super(props);
		
	}
  render() {       
    return (
      <a href={this.props.src} className="menu-button" style={this.props.style} onClick={ this.props.onClick }>
      	{this.props.children} 
      	<span>{this.props.text}</span>
      </a>
    );
  }
}

MenuButton.propTypes = {

};

export default MenuButton;
