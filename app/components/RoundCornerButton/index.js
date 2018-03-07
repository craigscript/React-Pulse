/**
*
* RoundCornerButton
*
*/

import React from 'react';
import './roundCornerButton.css';

class RoundCornerButton extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(e) {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    this.props.handleClick();
  }
  render() {
    return (
      <button className="roundCornerButton" style={this.props.style} onClick={ this.handleClick }>
         <span>{this.props.children}</span>&nbsp;<span>{this.props.text}</span>
      </button>
    );
  }
}

RoundCornerButton.propTypes = {

};

export default RoundCornerButton;
