/**
 *
 * LoginPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Redirect } from 'react-router';
import Header from 'components/Header';
import Footer from 'components/Footer';
import RoundButton from 'components/RoundCornerButton';
import 'containers/HomePage/home.css';
import './login.css';
import API from 'components/Apicall';
var axios = require('axios');

export class LoginPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props)
    this.login = this.login.bind(this)
    this.state = ({ userName: '', password: '', nomatch: false})
  }

  _handleKeyPress (e) {
    var self = this;
    const { text } = self.state;
    if (e.key === 'Enter') {
      self.login();
    }
  }
  login() {
    var self = this;
    axios.post(API.BASE_URL + 'login?username=' + this.state.userName + '&password=' + this.state.password, {withCredentials: true})
      .then(function(result) {
        if(result.status == 200) {
          sessionStorage.setItem('jwt', result.data.auth_token);
          sessionStorage.setItem('username', result.data.user.username);
          sessionStorage.setItem('user_email', result.data.user.email);
          sessionStorage.setItem('user_twitter', result.data.user.twitter);
          sessionStorage.setItem('user_slack', result.data.user.slack);
          sessionStorage.setItem('user_formats', result.data.user.format_ids);
          sessionStorage.setItem('categories', JSON.stringify(result.data.categories));
          sessionStorage.setItem('filters', JSON.stringify(result.data.filters));
          sessionStorage.setItem('presets', JSON.stringify(result.data.presets));
          sessionStorage.setItem('levels', JSON.stringify(result.data.system.levels));
          sessionStorage.setItem('formats', JSON.stringify(result.data.user.all_formats));
          self.state.currentFormat = result.data.user.format_ids[0];
          location.href=API.PATH_PREFIX + '/trending';
        }
      })
      .catch(function(result){
        self.setState({ nomatch: true })
      })
  }
  updateUserName (evt) {
    this.setState({
      userName: evt.target.value
    });
  }
  updatePassword (evt) {
    this.setState({
      password: evt.target.value
    });
  }
  render() {

    let token = sessionStorage.getItem('jwt');
    if (!!token) {
      return ( <Redirect to={ '/trending'} /> )
    }


    return (
      <div>
        <Header />
        <div className="login-wrapper center">
          <div className="row login-title"> 
            Login to TopicPulse
          </div>
          {
            this.state.nomatch ? (
            <div className="login-row warning red"> 
              Invalid credentials, please try again.
            </div>) : ('')
          }
          <div className="login-row">
            <input value = { this.state.userName } type="text" className="login-field" placeholder="Username" onChange={ evt => this.updateUserName(evt) } onKeyPress={ e => this._handleKeyPress(e) }/>
          </div>
          <div className="login-row">
            <input value = { this.state.password } type="password" className="login-field" placeholder="Password" onChange={ evt => this.updatePassword(evt) } onKeyPress={ e => this._handleKeyPress(e) }/>
          </div>
          <div className="login-row">
            <RoundButton text="Login" color="#ee4832" className="login-row" style={{'width': '290px', 'padding': '11px 28px 11px 28px'}} handleClick={this.login}/>
          </div>
          <div className="login-row">
            <a href={API.PATH_PREFIX + "/forgot"} style={{ fontWeight: 'lighter' }}>Forgot Password?</a>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

LoginPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};


function mapDispatchToProps(dispatch) {
  return {
    dispatch
  };
}

const withConnect = connect(null, mapDispatchToProps);

export default compose(
  withConnect,
)(LoginPage);

