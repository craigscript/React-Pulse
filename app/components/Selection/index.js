/**
*
* Selection
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import './selection.css';

class Selection extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = { selected: this.props.selected };
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    this.setState({ selected: !this.state.selected });
    this.props.handleClick(this.props.name);
  }
  render() {
    return (
      <div className="selection" style={this.props.style}>
        <div className="inner-selection">
      	{!this.state.selected ? (
      		<button className="checkmark checkboxUnselected " onClick={this.handleClick}><i className="material-icons">check_box_outline_blank</i></button>
      		) : (
      		<button className="checkmark checkboxSelected" onClick={this.handleClick}><i className="material-icons">check_box</i></button>
      	)}
        <span className="selectionIcon"> 
          <i className={ "icon-topic-" + this.props.name + (this.state.selected ? ' checkboxSelected' : ' checkboxUnselected')} />
        </span>
      	<span className={"selectionText " + (this.state.selected ? 'checkboxSelected' : 'checkboxUnselected')}>{this.props.text}</span>
        </div>
      </div>
    );
  }
}

Selection.propTypes = {
  style: PropTypes.object,
  name: PropTypes.string,
  text: PropTypes.string,
  handleClick: PropTypes.func,
};

export default Selection;
