/**
*
* RoundButton
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import './round-button.css';

class RoundButton extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
	   	<button className='round-button' onClick={() => this.props.handleClick()} style={this.props.style}>
	   		{this.props.children}
			</button>
    );
  }
}

RoundButton.propTypes = {
	style: PropTypes.object,
};

export default RoundButton;
