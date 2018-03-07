/**
 *
 * ForgotPasswordPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Header from 'components/Header';
import Footer from 'components/Footer';
import RoundButton from 'components/RoundCornerButton';
import { Redirect } from 'react-router';
import 'containers/HomePage/home.css';
import 'containers/LoginPage/login.css';
import API from 'components/Apicall';
var axios = require('axios');

export default class ForgotPasswordPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props)
    this.state = { nomatch: false, email: '', failed: false }
    this.reset = this.reset.bind(this)
  }
  reset() {
    var self = this;
    axios.post(API.BASE_URL + 'forgot_password?email=' + this.state.email)
      .then(function(result) {
        if(result.status == 200) {
          if(result.data.success) {
            location.href=API.PATH_PREFIX + '/reset'
          }
          else {
            self.setState({ failed: true })
          }
        }
      })
      .catch(function(result){
        self.setState({ failed: true })
      })
  }
  updateEmail (evt) {
    this.setState({
      email: evt.target.value
    });
  }
  render() {
    return (
     <div>
        <Header />
          <div className="login-wrapper center">
            <div className="row login-title"> 
              Forgot Username or Password
            </div>
            {
              this.state.failed ? (
              <div className="login-row warning red"> 
                Request failed, please try again.
              </div>) : ('')
            }
            <div className="login-warning grey center">
              Enter your email address below and we will send you an email with a link to reset your password
            </div>
            <div className="login-row">
              <input value = { this.state.email } type="text" className="login-field" placeholder="Email" onChange={ evt => this.updateEmail(evt) } />
            </div>
            <div className="login-row">
              <RoundButton text="Send Password Reset Link" color="#ee4832" className="login-row" style={{'width': '291px', 'padding': '11px 28px 11px 28px'}} handleClick={this.reset}>
                <i className="material-icons" style={{'fontSize': '23px'}}>send</i>
              </RoundButton>
            </div>
          </div>
        <Footer />
      </div>
    );
  }
}
