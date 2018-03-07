/**
*
* Announcement
*
*/

import React from 'react';
import RoundButton from 'components/RoundButton';
import './announcement.css'
import API from 'components/Apicall';
var axios = require('axios');

class Announcement extends React.Component { // eslint-disable-line react/prefer-stateless-function
	constructor(props) {
		super(props)
		this.onClose = this.onClose.bind(this)
		this.state = ({ visible: false, announcements: [] })
    	this.announcementUpdate = this.announcementUpdate.bind(this);

	}
	onClose() {
		this.setState({ visible: false})
	}
	componentDidMount() {
		var self = this;
		this.interval = setInterval(this.announcementUpdate, 10000);
	}

	componentWillUnmount() {
		// stop announcement loop
		clearInterval(this.interval);
	}


	announcementUpdate() {
    	var self = this;


		axios.get(API.BASE_URL + 'announcement?auth_token=' + sessionStorage.getItem('jwt'))
			.then(function(result) {
				if(result.status == 200 && result.data.id != self.state.announcements.id) {
					self.setState({ visible: true, announcements: result.data });
				}
			})
			.catch(function(error){
				console.log(error)
			})

	}


	render() {
		return (
			<div>
			{
		    	this.state.visible ? (
		      	<div className="announcement">
		      	<div className="innerWrapper">
			      	<div className="content">
				      	<div className="title">
				      		{this.state.announcements.title}
				      	</div>
				      	<div className="text">
				      		{this.state.announcements.message}
				      	</div>
			      	</div>
			      	<RoundButton style={{'float': 'right'}} handleClick={ this.onClose }>
				        <i className="material-icons red" style={{fontSize: '28px'}}>close</i>
				      </RoundButton>
			      </div>
			      </div>
		       ) : ('')
		    }
		    </div>
		);
	}
}

Announcement.propTypes = {

};

export default Announcement;
