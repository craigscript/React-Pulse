/**
*
* SendLink
*
*/

import React from 'react';
import MdSendIcon from 'react-icons/lib/md/send';
import './vipSupport.css'
import API from 'components/Apicall';
var axios = require('axios');

class VIPSupport extends React.Component { // eslint-disable-line react/prefer-stateless-function
	constructor(props) {
		super(props);
    let email = sessionStorage.getItem('user_email');
		this.state = {issue: '', emailAddress: email, reportStatus: ''};
		this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextState !== this.state;
  }

  handleChange(event) {
    this.setState({issue: event.target.value});
  }
  handleChangeEmail(event) {
    this.setState({emailAddress: event.target.value});
  }

	handleSubmit(event) {
    event.stopPropagation();
    event.preventDefault();
    var self=this;
    if (!this.state.issue) {
      self.setState({reportStatus: 'empty'});
    }
    else if (!this.state.emailAddress) {
      self.setState({reportStatus: 'emailEmpty'});
    }
    else {    
      axios.get(API.BASE_URL + 'vipsupport_email?auth_token=' + sessionStorage.getItem('jwt') + '&issue=' + this.state.issue + '&email=' + this.state.emailAddress)
      .then(function(result) {
        if(result.status == 200) {
          self.setState({ reportStatus: 'reported' });
          setTimeout(function(){
            self.setState({ reportStatus: '' });
          },3000);
        }
      })
      .catch(function(error){
        console.log('ERROR: ',error);
        self.setState({ error: 'error' });
        setTimeout(function(){
          self.setState({ error: '' });
        },3000);
      })
    }
    // return false;
	}
  render() {
    return (
    	<div style={this.props.style} className="vipSupport">
        <form onSubmit={this.handleSubmit}>
          <label> Your Email Address:</label>
          <input type="text" className="vipSupportInput" value={this.state.emailAddress} onChange={this.handleChangeEmail}/>

          <label>Please describe the issue:</label>
            <textarea type="text" className="vipSupportInput" value={this.state.issue} onChange={this.handleChange} rows="4" cols="50"/>
          <button type="submit" className="vipSupportSubmit" >
            <MdSendIcon style={{'color': 'white'}} />
          </button>
        </form>
        {
          (
            ( this.state.reportStatus == 'empty' ? 
            (
              <div style={{ 'color': 'red'}}>Please add a description of the issue, then submit.</div>
            ) : (
              ( this.state.reportStatus == 'reported' ?
              (
                <div>Thank you, Your report has been submitted.</div>
              ) : (
                (this.state.error == 'error' ? 
                  (
                    <div style={{ 'color': 'red'}}>There was an issue with this submission. Please try again.</div>
                  ): (
                    (this.state.reportStatus == 'emailEmpty' ?
                      (
                        <div style={{ 'color': 'red'}}>Please add an email address.</div>
                      ): (
                        <div style={{'display':'none'}} />
                      ) 
                    )
                  ))
              ))
            ) 
            ))
        }
	    </div>
    );
  }
}

VIPSupport.propTypes = {

};

export default VIPSupport;
