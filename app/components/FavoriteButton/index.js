/**
*
* FavoriteButton
*
*/

import React from 'react';
import MdStarOutline from 'react-icons/lib/md/star-outline';
import MdStar from 'react-icons/lib/md/star';

import API from 'components/Apicall';
var axios = require('axios');

import './favorite-button.css';

class FavoriteButton extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props)
   	this.state = {selected: this.props.selected, story_id: this.props.storyId}
    this.handleClick = this.handleClick.bind(this)
  }
  handleClick(e) {
    var self = this;
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    let action = (this.state.selected ? 'unstar' : 'star' )

    this.setState({ selected: !this.state.selected })

    if (e.currentTarget && e.currentTarget.classList.contains('header')) {
      this.props.action();
    }
    else {

      axios.get(API.BASE_URL + 'story_star?auth_token=' + sessionStorage.getItem('jwt') + '&story_id=' + self.state.story_id+'&action=' + action, {withCredentials: true})
        .then(function(result) {
          if(result.status == 200) {
            
          }
        })
        .catch(function(error){
          console.log(error)
        })
      if(this.props.action) {
        this.props.action();
      }
    } 
  }

  componentWillReceiveProps(nextProps: Object) {
    if (this.props.storyId !== nextProps.storyId ) {
      this.setState({selected: nextProps.selected, story_id: nextProps.storyId})
    }
  }

  render() {
    return (
	   <button className={(this.props.listMode ? 'favorite-list' : 'favorite-button') + ' ' + this.props.className}  onClick={ this.handleClick } style={this.props.style}>
		{
			this.state.selected ? (
				<i className="material-icons red">star</i>
				) : (
				<i className="material-icons">star_border</i>)
		}
		</button>
    );
  }
}

FavoriteButton.propTypes = {

};

export default FavoriteButton;
