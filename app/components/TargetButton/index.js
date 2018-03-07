/**
*
* TargetButton
*
*/

import React from 'react';
import './targetButton.css'
var FontAwesome = require('react-fontawesome');

class TargetButton extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <button className={"targetButton " + (this.props.selected ? 'selected' : 'unselected')} style={this.props.style} onClick={this.props.onClick}>
      	<div>
      		{
            this.props.names.map(function(value, i){
              return (
                <FontAwesome name={value} size='2x' key={i} />
              )
            })
          }
      	</div>
      	<span className="targetName">{this.props.label}</span>
      </button>
    );
  }
}

TargetButton.propTypes = {

};

export default TargetButton;
