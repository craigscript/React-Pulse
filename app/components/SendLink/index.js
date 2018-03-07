/**
*
* SendLink
*
*/

import React from 'react';
import MdSendIcon from 'react-icons/lib/md/send';
import './sendLink.css'
import API from 'components/Apicall';
var axios = require('axios');

class SendLink extends React.Component { // eslint-disable-line react/prefer-stateless-function
	constructor(props) {
		super(props);
		this.state = {value: ''};
		this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }


	handleSubmit(event) {
    event.stopPropagation();
    event.preventDefault();
    var self=this;
    axios.get(API.BASE_URL + 'download_app?auth_token=' + sessionStorage.getItem('jwt') + '&phone_email=' + this.state.value)
      .then(function(result) {
        if(result.status == 200) {
          self.setState({ value: 'Link Sent' });
          setTimeout(function(){
            self.setState({ value: '' });
          },3000);
        }
      })
      .catch(function(error){
        console.log('ERROR: ',error);
        self.setState({ error: 'Invalid or Empty Input' });
        setTimeout(function(){
          self.setState({ error: '' });
        },3000);
      })
    // return false;
	}
  render() {
    return (
    	<div style={this.props.style} className="sendLink">
      	<form onSubmit={this.handleSubmit}>
      		<input type="text" className="sendLinkInput" placeholder = {this.props.placeholder} value={this.state.value} onChange={this.handleChange}/>
      		<button type="submit" className="sendLinkSubmit" >
      			<MdSendIcon style={{'color': 'white'}} />
       		</button>
          {
            (this.state.error !== '' 
              ? (
                <div style={{ 'color': 'red'}}>{this.state.error}</div>
                )
              : (
                <div style={{'display':'none'}} />
                )
            )   
          }
      	</form>
	    </div>
    );
  }
}

SendLink.propTypes = {

};

export default SendLink;
