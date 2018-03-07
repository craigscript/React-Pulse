/**
*
* SearchBar
*
*/

import React from 'react';
import './searchbar.css';

class SearchBar extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = { text: this.props.text};
    this.handleClick = this.handleClick.bind(this);
    this.clearText = this.clearText.bind(this);
  }
  _handleKeyPress (e) {
    var self = this;
    const { text } = self.state;
    if (e.key === 'Enter') {
      self.props.onSearch(text);
    }
  }
  updateText (evt) {
    this.setState({
      text: evt.target.value
    });
  }
  handleClick () {
    const { text } = this.state;
    this.props.onSearch(text);
  }
  clearText() {
    this.setState({text: ''});
    this.props.handleClick();
  }
  render() {
    const { text } = this.state;
    return (
      <div style={this.props.style} className="searchbar">
      	<div className="searchbar-input">
	      	<input type="text" className="" placeholder="Search Topic" value={ text } onKeyPress={ e => this._handleKeyPress(e) } onChange={ evt => this.updateText(evt) } />
	      	<span className="fa fa-search" onClick={this.handleClick}></span>
          <span className="fa fa-close" onClick={this.clearText}></span>
      	</div>
      </div>
    );
  }
}

SearchBar.propTypes = {

};

export default SearchBar;
