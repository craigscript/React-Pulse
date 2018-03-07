/**
*
* Header
*
*/

import React from 'react';
import MenuButton from 'components/MenuButton';
import RoundButton from 'components/RoundCornerButton';
import DropDownMenu from 'components/DropDownMenu';
import MobileMenu from 'components/MobileMenu';
import Popup from 'components/Popup';
import SendLink from 'components/SendLink';
import VIPSupport from 'components/VIPSupport';
import './header.css';
import LiveChat from 'react-livechat'
import logo from '../../images/logo.png';
import API from 'components/Apicall';
import 'icomoon-style.css';

const LIVECHAT_LICENSE = 8755466;

class Header extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
    this.state = { popup: null, userName: sessionStorage.getItem('username'), lc_open: 'false' };
  }

  onClick(name) {
    if (name == 'livechat') {
      this.liveChat();
    }
    else if (name == 'vipphone') {
      this.phone();
    }
    else if (name == 'glance') {
      window.open(API.BASE_URL + '../../v3/glance.php');
    }
    else if (name == 'topicpulse') {
      window.open(API.BASE_URL + '../../v3/');
    }
    else if (name == 'twitter'
      || name == 'slack'
      || name == 'download'
      || name == 'vipsupport') {
      this.setState({ popup: name });
    }
    else if (name == 'logout')  {
      sessionStorage.removeItem('jwt');
      location.href = API.PATH_PREFIX + '/';
    }
    else {
      this.setState({ popup: null }); 
    }
  }
  twitterConnect() {
    let tw_status = (sessionStorage.getItem('user_twitter') == 'true' ? true : false);
    if (tw_status) {
      window.open(API.BASE_URL + '../twitter_connect.php?action=disconnect&auth_token=' + sessionStorage.getItem('jwt'));
    }
    else {
      window.open(API.BASE_URL + '../twitter_connect.php?auth_token=' + sessionStorage.getItem('jwt'));
    }
  }

  slackConnect() {
      window.open(API.BASE_URL + '../slack_connect.php?auth_token=' + sessionStorage.getItem('jwt'));
  }

  liveChat() {
    var is_maximized = LC_API.chat_window_maximized();
    if (is_maximized) {
      LC_API.minimize_chat_window();
    }
    else {
      LC_API.open_chat_window();
    }
  }

  email() {
    location.href = 'mailto:VIPsupport<VIPsupport@futurimedia.com>';
  }

  phone() {
    location.href = 'tel:877-221-7979';
  }

  getPopupContent(type) {
    switch (type) {
      case "vipsupport":
        let email = sessionStorage.getItem('user_email');
        return (
            <div className="popup-content center"> 
              <div className="title" style={{'marginTop': '53px'}}>Contact you VIPSupport Team</div>
              <VIPSupport style={{'marginTop':'15px', 'marginBottom': '53px', 'width': '362px', textAlign: 'left'}} placeholder="Enter Your Phone Number or Email" email={ email } />
            </div>
        );
      case "download":
        return (
            <div className="popup-content center"> 
              <div className="title" style={{'marginTop': '53px'}}>Download the TopicPulse Mobile App</div>
              <div style={{'marginTop': '12px', 'padding': '10px'}}>Enter your phone number or email address and we'll send you a link to download it now!</div>
              <SendLink style={{'marginTop':'15px', 'marginBottom': '53px', 'width': '362px'}} placeholder="Enter Your Phone Number or Email" />
            </div>
        );
      case "slack":
        let conf_slack = (sessionStorage.getItem('user_slack') == 'true' ? true : false);
        if (conf_slack) {
          return (
              <div className="popup-content center"> 
                <div className="title" style={{'marginTop': '53px'}}>Connect TopicPulse to Slack</div>
                <div style={{'marginTop': '12px','marginBottom': '12px', 'padding': '10px', 'fontSize': '18px'}}>You are currently integrated with Slack. If the integration was removed through the configuration link above, you can</div>
                <RoundButton text='Reconnect' style={{'backgroundColor': '#ee4832','fontSize': '14px',  'padding': '14px 29px', marginBottom: '53px' }} handleClick={this.slackConnect}>
                 <i className="fa fa-slack"></i>
                </RoundButton>
              </div>
          );
        }
        else {
          return (
            <div className="popup-content center"> 
              <div className="title" style={{'marginTop': '53px'}}>Connect TopicPulse to Slack</div>
              <div style={{'marginTop': '12px','marginBottom': '12px', 'padding': '10px', 'fontSize': '18px'}}>You are currently not integrated with Slack</div>
              <RoundButton text='Connect' style={{'backgroundColor': '#ee4832','fontSize': '14px',  'padding': '14px 29px', marginBottom: '53px' }} handleClick={this.slackConnect}>
               <i className="fa fa-slack"></i>
              </RoundButton>
            </div>
          );
        }
      case "twitter":
        let conf_twit = (sessionStorage.getItem('user_twitter') == 'true' ? true : false);
        if (conf_twit) {
          return (
            <div className="popup-content center"> 
              <div className="title" style={{'marginTop': '53px'}}>Disconnect TopicPulse from Twitter</div>
              <div style={{'marginTop': '12px','marginBottom': '12px', 'padding': '10px', 'fontSize': '18px'}}>You are currently integrated with Twitter with user @futuri</div>
              <RoundButton text='Disconnect' style={{'backgroundColor': '#ee4832','fontSize': '14px',  'padding': '14px 29px', marginBottom: '53px' }} handleClick={this.twitterConnect}>
               <i className="fa fa-twitter"></i>
              </RoundButton>
            </div>
          );
        }
        else {
          return (
            <div className="popup-content center"> 
              <div className="title" style={{'marginTop': '53px'}}>Connect TopicPulse to Twitter</div>
              <div style={{'marginTop': '12px','marginBottom': '12px', 'padding': '10px', 'fontSize': '18px'}}>You are not currently integrated with Twitter with user @futuri</div>
              <RoundButton text='Connect' style={{'backgroundColor': '#ee4832','fontSize': '14px',  'padding': '14px 29px', marginBottom: '53px' }} handleClick={this.twitterConnect}>
               <i className="fa fa-twitter"></i>
              </RoundButton>
            </div>
          );
        }
        

    }
  }
  render() {
    var self = this;
    const dropMenuList = [
      {
        name: 'Glance Screen',
        icon: <i className="material-icons">remove_red_eye</i>,
        id: 'glance',
        onClick: this.liveChat,
      },
      {
        name: 'Top Tweets',
        icon: <i className="fa fa-twitter" aria-hidden="true"></i>,
        id: 'twitter',
        onClick: this.showPopup,
      },
      {
        name: 'Add to Slack',
        icon: <i className="fa fa-slack" aria-hidden="true"></i>,
        id: 'slack',
        onClick: this.showPopup,
      },
      {
        name: 'Classic TopicPulse',
        icon: <i className="classic-topicpulse icon-uniF318"></i>,
        id: 'topicpulse',
        onClick: this.showPopup,
      },
      // {
      //   name: 'Logout',
      //   icon: <i className="fa fa-sign-out" aria-hidden="true"></i>,
      //   id: 'logout',
      // },
    ];

    const menuList = [
      {
        name: 'Live Chat',
        icon: <i className="material-icons">chat</i>,
        id: 'livechat',
        onClick: this.liveChat,
      },
      {
        name: 'VIPsupport@futurimedia.com',
        icon: <i className="material-icons">mail</i>,
        id: 'vipsupport',
        onClick: this.onClick,
      },
      {
        name: '(877) 221-7979',
        icon: <i className="material-icons">phone_in_talk</i>,
        id: 'vipphone',
        onClick: this.phone,
      },
    ];
    let logoutItem = {
      name: 'Logout',
      icon: <i className="fa fa-sign-out" aria-hidden="true"></i>,
      id: 'logout',
      onClick: this.showPopup,
    };
    const mobileMenuList = dropMenuList.concat(menuList); 
    dropMenuList.push(logoutItem);
    mobileMenuList.push(logoutItem);

    return (
      <div className="mainContainer">
      	<div className="innerWrapper">
      		<img src={logo} className="logo" />
          <div className="menuWrapper">

          { 
            menuList.map(function(item) {
              return (
                <span className="menuButton" key={item.name}>
                <MenuButton src="#" text={item.name} styles={{'fontSize': '14px'}} onClick={() => self.onClick(item.id)}>
                  {item.icon}
                </MenuButton>
                </span>
              )
            })
          }
          </div>
          
          <div className="menuWrapper" style={{ float: 'right' }}>
          { this.props.loggedIn ?
            (
              <DropDownMenu list={dropMenuList} ref="dropdown" onClick={ this.onClick }>
                <button className="dropdown-button" onClick={ () => this.refs.dropdown.onOpen() }>
                   <span>{ this.state.userName }</span>
                   <i className="material-icons">arrow_drop_down</i>
                </button>
              </DropDownMenu>
            ) : ('')
          }
          </div>
          <div className="dropdown-button-wrapper mobile-menu-button">
            { this.props.loggedIn ?
              (
                <MobileMenu list={ mobileMenuList } ref="mobileMenu" onClick={ this.onClick } switchPanel={ this.props.switchPanel } showSideMenu={ this.props.showSideMenu }>
                  <button className="dropdown-button" onClick={ () => this.refs.mobileMenu.onOpen() }>
                     <i className="icon-reorder" style={{ fontSize: '28px' }}></i>
                  </button>
                </MobileMenu>
              ) : ('')
            }
          </div>
          <span className="download-button">
            <RoundButton text="Download Mobile" style={{ fontSize: '14px', padding: '11px 10px', width: '100%' }} handleClick={() => this.onClick('download')}/>
          </span>
       	</div>
        {
          (this.state.popup) ?
          (
            <Popup style={{"width": "493px", 'margin': '245px auto', 'padding': '18px'}} closePopup={() => this.onClick(null)}>
              <button className="popup-close red" onClick={() => this.onClick(null)}><i className="material-icons">close</i></button>
              { this.getPopupContent(this.state.popup)}
            </Popup>
          ) : ('')
        }
        <LiveChat license={ LIVECHAT_LICENSE }/>
      </div>
    );
  }
}

export default Header;
