/**
*
* ListItem
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import FavoriteButton from 'Components/FavoriteButton';
import RoundButton from 'components/RoundCornerButton';
import API from 'components/Apicall'; 
import './list-item.css';

var axios = require('axios');

const TEXT_PRESS_TIMEOUT_MS = 1500;

class ListItem extends React.Component { // eslint-disable-line react/prefer-stateless-function
	constructor(props) {
    super(props)
    this.state = ({ levels: JSON.parse(sessionStorage.getItem('levels')), story: this.props.story, emailed: '' })
    this.emailClick = this.emailClick.bind(this);
    this.toggleStar = this.toggleStar.bind(this);
  }
  emailClick() {
    const { title, id } = this.state.story;
    var self = this;
    axios.get(API.BASE_URL + 'story_email?auth_token=' + sessionStorage.getItem('jwt') + '&content_id=' + this.props.storyId)
      .then(function(result) {
        if(result.status == 200) {
          self.setState({ emailed: 'emailed' });
          setTimeout(function(){
            self.setState({ emailed: '' });
          }, TEXT_PRESS_TIMEOUT_MS);
        }
      })
      .catch(function(error){
        console.log(error)
      })
  }
  toggleStar() {
    let story=this.state.story;
    story.starred = (!this.state.story.starred)
    this.setState({story: story});
  }
  render() {
  	const { levels } = this.state;
    return (
      <div className={"list-item " + this.props.className + (this.state.story.starred ? 'starred' : '')} onClick={ this.props.onClick }>
      	<div className="list-image" style={{ 'backgroundImage': 'url(' + this.props.image +')' }}>
          <div className={"email " + this.state.emailed}>
            <RoundButton style={{'backgroundColor': 'rgba(0, 0, 0, 0.5)','fontSize': '18px', 'width': '30px', height: '30px'}} handleClick={ this.emailClick }>
              <i className="material-icons" style={{'fontSize': '18px', 'verticalAlign': 'middle'}}>email</i>
            </RoundButton>
          </div>
        </div>
        <div className="list-content">
        	<div className="list-title dark-grey">{ this.props.title }</div>
	      	<span>
	      		<span className="list-category red">Growing fastest with social</span>
	          	 {
	          	 	(this.props.gender) ? 
	          	 		(
		              (this.props.gender.toLowerCase()==='male') ? (
		                <span className="fa fa-male"></span>
		              ) : (
		                (this.props.gender.toLowerCase()==='female') ? (
		                  <span className="fa fa-female"></span>
		                  ) : (<span className="fa fa-genderless"></span>)
		              )
		            ) : ('')
	            }
	          	<span className="list-category dark-grey">{this.props.gender}</span>&nbsp;
      			<span className="list-category dark-grey">{ this.props.area }</span>
	      	</span>
	      	<div style={{ marginTop: '15px' }}>
	      		{
	      			(this.props.type==='breaking') ? (
	      				<div className="type red-back">
	      				 <i className="icon-bullhorn" style={{ marginRight: '10px' }}></i>
	      				 { levels[this.props.type].text }
            		</div>
	      			) : (
	      				<div className={"type " + (this.props.type ==='viral' ? 'green-back' : (this.props.type ==='default' ? '' : 'blue-back'))}>
	      				 { levels[this.props.type].text }
            		</div>
	      			)
		        }
          </div>
	     	</div>
	     <div className="favorite">
	        <FavoriteButton 
              story= { this.state.story }
              storyId={ this.props.storyId }
              selected={ this.props.storyStar }
              action={ this.toggleStar }
			  listMode="true" 
		    />
	      </div>
      </div>
    );
  }
}

ListItem.propTypes = {
	title: PropTypes.string.isRequired
};

export default ListItem;
