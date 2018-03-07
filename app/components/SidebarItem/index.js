/**
*
* SidebarItem
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import FavoriteButton from 'Components/FavoriteButton';
import RoundButton from 'components/RoundCornerButton';
import './sidebar-item.css';
import copy from 'copy-to-clipboard';
import striptags from 'striptags';
import API from 'components/Apicall';
var axios = require('axios');

const TEXT_PRESS_TIMEOUT_MS = 1500;

class SidebarItem extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = { emailText: 'Email', copyText: 'Copy to Clipboard'};
    this.copyClick = this.copyClick.bind(this);
    this.emailClick = this.emailClick.bind(this);
  }
  copyClick() {
    var self = this;
    var text = this.state.copyText;

    copy(this.props.title + '\n\n' + striptags(this.props.texts))

    self.setState({ copyText: 'Copied!' });
      setTimeout(function(){
        self.setState({ copyText: text });
      }, TEXT_PRESS_TIMEOUT_MS);
  }
  emailClick() {
    var self = this;
    var text = this.state.emailText;
    axios.get(API.BASE_URL + 'email_idea_starter?auth_token=' + sessionStorage.getItem('jwt') + '&content_id=' + this.props.id)
      .then(function(result) {
        if(result.status == 200) {
          self.setState({ emailText: 'Emailed!' });
          setTimeout(function(){
            self.setState({ emailText: text });
          }, TEXT_PRESS_TIMEOUT_MS);
        }
      })
      .catch(function(error){
        console.log(error)
      })
  }
  render() {
    return (
      <div className="sidebar-item" onClick={this.props.onClick}>
      	<div className="sidebar-image" >
          <img src={this.props.image} />
      	  <div className="bottom-right">
      		<RoundButton style={{'backgroundColor': 'rgba(0, 0, 0, 0.5)','fontSize': '12px', 'padding': '8px 10px'}}>
              <span>{this.props.time}</span>
            </RoundButton>
          </div>
        </div>
        <div className="sidebar-item-content" style={this.props.style}>
        	<div className="sidebar-item-title dark-grey">{this.props.title}</div>
        	<div dangerouslySetInnerHTML={{__html: this.props.texts }}>
        		
        	</div>
          <div className="button-row">
            <RoundButton text={this.state.copyText} style={{ padding: '9px 16px', backgroundColor: 'black', fontSize: '12px', float: 'left'}} handleClick={ this.copyClick }>
              <i className="material-icons" style={{'fontSize': '12px'}}>content_copy</i>
            </RoundButton>
            <RoundButton text={this.state.emailText} style={{ padding: '9px 16px', fontSize: '12px', float: 'right' }} handleClick={ () => this.emailClick(this.props.id)  }>
              <i className="material-icons" style={{'fontSize': '12px'}}>email</i> 
            </RoundButton>
          </div>
        </div>
      </div>
    );
  }
}

SidebarItem.propTypes = {
  id: PropTypes.string,
  texts: PropTypes.string,
  title: PropTypes.string,
  onClick: PropTypes.func,
  time: PropTypes.string,
};

export default SidebarItem;
