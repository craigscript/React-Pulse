/**
*
* Popup
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import './popup.css'


class Popup extends React.Component { // eslint-disable-line react/prefer-stateless-function
	constructor(props) {
		super(props)
    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
	}
  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }
  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }
  setWrapperRef(node) {
    this.wrapperRef = node;
  }
  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.props.closePopup();
    }
  }
  render() {
    return (
      <div className="popup" id="fixed">
      	<div className={ "popup-inner" + (this.props.sidePopup ? ' side-popup' : '') } style={this.props.style} ref={this.setWrapperRef} >
      		{this.props.children}
      	</div>
      </div>
    );
  }
}

Popup.propTypes = {
  closePopup: PropTypes.func.isRequired,
  sidePopup: PropTypes.bool,
};

export default Popup;
