/**
*
* GridItem
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import FavoriteButton from 'Components/FavoriteButton';
import RoundButton from 'components/RoundCornerButton';
import striptags from 'striptags';
import API from 'components/Apicall'; 
import './grid-item.css';

var axios = require('axios');

const TEXT_PRESS_TIMEOUT_MS = 1500;


class GridItem extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = ({ megaStory: this.props.megaStory, levels: JSON.parse(sessionStorage.getItem('levels')), story: this.props.story, emailed: '' });
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
      <div className={ "grid-item " + this.props.className + (this.state.megaStory ? 'megastory' : '') + (this.state.story.starred ? 'starred' : '')} onClick={this.props.onClick}>
      	<div className="grid-image" style={{'backgroundImage': 'url(' + this.props.image +')'}}>
          { 
            (this.props.type==='breaking') ? (
              <div className="breaking-news-badge">
                <i className="icon-bullhorn"></i>
                <div className="badge-text badge-text-1">Breaking <span>News</span></div>
              </div>
            ) : (
              <div className={ "badge " + (this.props.type ==='viral' ? 'green-back' : (this.props.type ==='default' ? '' : 'blue-back')) }>
                { levels && levels[this.props.type].text }
              </div>
            )
          }
          <div className="favorite">
            <FavoriteButton 
              story= { this.state.story }
              storyId={ this.props.storyId }
              selected={ this.props.storyStar }
              action={ this.toggleStar }
            />
          </div>
          <div className={"email " + this.state.emailed}>
            <RoundButton style={{'backgroundColor': 'rgba(0, 0, 0, 0.5)','fontSize': '18px', 'width': '30px', height: '30px', padding: '0 0 3px 5px'}} handleClick={ this.emailClick }>
              <i className="material-icons" style={{'fontSize': '18px', 'verticalAlign': 'middle'}}>email</i>
            </RoundButton>
          </div>
        </div>
      	<div className="grid-title dark-grey">{this.props.title}</div>
      	<div className="grid-content">
      		<span className="grid-category red left">Growing fastest with social</span>
          <span className="right">
            {
              (this.props.gender) ? (
              (this.props.gender && this.props.gender.toLowerCase()==='male') ? (
                <span className="fa fa-male left"></span>
              ) : (
                (this.props.gender && this.props.gender.toLowerCase()==='female') ? (
                  <span className="fa fa-female left"></span>
                  ) : (<span className="fa fa-genderless left"></span>)
              )
              ) : ('')
            }
            <span className="grid-category dark-grey left" style={{ marginRight:'5px' }}>{this.props.gender}</span>&nbsp;
        		<span className="grid-category dark-grey left">{ this.props.area }</span>
          </span>
      	</div>
        {
          this.props.megaStory ? (
            <div className="happening-now">
              <div className="happening-header">
                <div>HAPPENING NOW</div>
                <RoundButton style={{ 'backgroundColor': 'red','fontSize': '17px', fontWeight: 'bold', 'padding': '9px 15px', float: 'right', verticalAlign: 'middle' }} text="LIVE">
                </RoundButton>
              </div>
              <div className={"happening-content" + (this.state.story.live_content.length > 1 ? '' : ' single')} >
                {
                  this.state.story.live_content.map((item, index) => {
                    return (
                      <div className="ago-container">
                        <div className="ago" style={{'display': 'inline-block', 'backgroundColor':'#f8f9fb'}}><span className="number">{item.ago_set[0].ago}</span><br/>{item.ago_set[0].label}</div>
                        <div className="ago-label" style={{'display': 'inline-block'}}>{striptags(item.live_content)}</div>
                      </div>  
                    );
                  })
                }

              </div>
            </div>
          ) : ('')
        }
      </div>
    );
  }
}

GridItem.propTypes = {
  megaStory: PropTypes.bool
};

export default GridItem;
