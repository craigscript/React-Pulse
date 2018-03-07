/**
 *
 * ResetPasswordPage
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
import 'containers/LoginPage/login.css'

export default class ResetPasswordPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props)
    this.state = {nomatch: false, newPassword: '', confirmPassword:''}
    this.reset = this.reset.bind(this)
  }
  reset() {
    this.setState({nomatch: this.state.newPassword !== this.state.confirmPassword})
  }
  updateNewPassword (evt) {
    this.setState({
      newPassword: evt.target.value
    });
  }
  updateConfirmPassword (evt) {
    this.setState({
      confirmPassword: evt.target.value
    });
  }
  render() {
    return (
     <div>
        <Header />
          <div className="login-wrapper center">
            <div className="row login-title"> 
              Reset Password for Username markgalit
            </div>
            {
              this.state.nomatch ? (
              <div className="login-row warning red"> 
                Passwords don't match. Please enter again.
              </div>) : ('')
            }
            <div className="login-row">
              <input value = { this.state.newPassword } type="password" className={"login-field " + (this.state.nomatch ? 'warning-input' : '')}  placeholder="New Password" onChange={evt => this.updateNewPassword(evt)}/>
            </div>
            <div className="login-row">
              <input value = { this.state.confirmPassword } type="password"  className={"login-field " + (this.state.nomatch ? 'warning-input' : '')}  placeholder="Re-enter New Password" onChange={evt => this.updateConfirmPassword(evt)}/>
            </div>
            <div className="login-row">
              <RoundButton text="Reset Password" color="#ee4832" className="login-row" style={{'width': '290px', 'padding': '11px 28px 11px 28px'}} handleClick={this.reset}/>
            </div>
          </div>
        <Footer />
      </div>
    );
  }
}
