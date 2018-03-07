/*
 * HomePage
 *
 */

import React from 'react';
import ReactSlider from 'react-slider';
import Header from 'components/Header';
import Footer from 'components/Footer';
import CategoryOption from 'components/CategoryOption';
import TargetButton from 'components/TargetButton';
import SendLink from 'components/SendLink';
import Selection from 'components/Selection';
import RoundButton from 'components/RoundCornerButton';
import './home.css';
import API from 'components/Apicall';
var axios = require('axios');

export default class HomePage extends React.Component { // eslint-disable-line react/prefer-stateless-function
	constructor(props) {
		super(props)
		this.state = { target: 'male', userName: sessionStorage.getItem('username'), gender: {}, topics: {}, selectedTopics: [], selectedAge: [18, 44] }
		this.completeSetup = this.completeSetup.bind(this)
		this.targetSelect = this.targetSelect.bind(this)
		this.topicSelect = this.topicSelect.bind(this)
		this.getAge = this.getAge.bind(this)
	}
	componentDidMount() {
		var self = this;
		axios.get(API.BASE_URL + 'intro_form?auth_token=' + sessionStorage.getItem('jwt'))
      .then(function(result) {
        if(result.status == 200) {
          self.setState({ gender: result.data.form_data.gender_class });
          self.setState({ topics: result.data.form_data.topics });
        }
      })
      .catch(function(error){
      	console.log(error)
      })
	}
	getAge(e) {
		this.setState({ selectedAge: e });
	}
	completeSetup() {
		var self = this;
		var form_data = {
			topics: this.state.selectedTopics,
			age: this.state.selectedAge,
			gender_class: this.state.target,
			group_id: 2,
		};
		axios.post(API.BASE_URL + 'intro_form?auth_token=' + sessionStorage.getItem('jwt') + '&form_data='+ JSON.stringify(form_data))
      .then(function(result) {
        if(result.status == 200) {
	        if(result.data.complete) {
	         	location.href=API.PATH_PREFIX + '/guide';
	        } else {
	        	console.log(result)
	        }
        }
      })
      .catch(function(error){
      	console.log(error)
      })
	}
	targetSelect(target) {
    this.setState({ target: target });
  }
  topicSelect(topic) {
  	var topics = this.state.selectedTopics;
  	var index = topics.indexOf(topic);
  	if(index >= 0) {
  		topics.splice(index, 1);
  	} else {
  		topics.push(topic);
  	}
  	this.setState({ selectedTopics: topics });
  }
  render() {
  	const { target, gender, topics, selectedAge } = this.state;
    return (
      <div>
	      <Header loggedIn="true" />
	      <div className="mainWrapper">
	      	<div className="row">
	      		<span className="title dark-grey">Welcome {this.state.userName} Let us help you set up your TopicPulse</span>
	      	</div>
		    <div className="row"> 
	      	<CategoryOption text="Who are you targeting" className="dark-grey"/>
	      	<div className="innerContent"> 
	      	<TargetButton names={['genderless']} label={ gender.ignore } selected={ (target == 'ignore') } onClick={() => this.targetSelect('ignore')}/>
		      	<TargetButton names={['male']} label={ gender.male } selected={ (target == 'male') } style={{'marginLeft': '15px'}} onClick={() => this.targetSelect('male')}/>
		      	<TargetButton names={['female']} label={ gender.female } selected={ (target == 'female') } style={{'marginLeft': '15px'}} onClick={() => this.targetSelect('female')}/>
		      	<TargetButton names={['male', 'female']} label={ gender.neutral }  selected={ (target == 'neutral') } style={{'marginLeft': '15px'}} onClick={() => this.targetSelect('neutral')}/>
		      	<div className="row"> 
			      	<span className="subtitle"> Age </span>
			      	<div style={{ width: '50%', marginTop: '10px'}}>
			      		<ReactSlider defaultValue={ selectedAge } withBars min={12} max={74} onChange={ this.getAge }/>
			      		<div style={{ marginTop: '10px', position: 'relative'}}>
			      			<span className="slider-label start">12</span>
			      			<span className="slider-label label-18">18</span>
			      			<span className="slider-label label-24">24</span>
			      			<span className="slider-label label-34">34</span>
			      			<span className="slider-label label-44">44</span>
			      			<span className="slider-label label-54">54</span>
			      			<span className="slider-label label-64">64</span>
			      			<span className="slider-label label-74 end">74</span>
			      		</div>
			      	</div>
		      	</div>
	      	</div>
      	</div>
      	
      	<div className="row">
					<CategoryOption text="What types of topics do you like to talk about on the air?" />
			    	<div className="innerContent"> 
			    		<div className="grid grid-5">
			      		<Selection text={ topics && topics.news && topics.news.name } name='news' handleClick={ () => this.topicSelect('news') } />
			      		<Selection text={ topics && topics.sports && topics.sports.name } name='sports' handleClick={ () => this.topicSelect('sports') } />
			      		<Selection text={ topics && topics.politics && topics.politics.name } name='politics' handleClick={ () => this.topicSelect('politics') } />
			      		<div style={{ marginLeft: '37px', marginTop: '10px'}}>
			      			<span style={{ fontSize: '15px' }}>{ topics && topics.politics && topics.politics.text } <a><i className="icon-uniF1F5" style={{ fontSize: '14px' }} /></a></span>
			      			<ReactSlider defaultValue={0} withBars min={0} max={2} defaultValue={ 1 }/>
			      			<div style={{ marginTop: '10px', position: 'relative', height: '70px'}}>
				      			<span className="slider-label start">{ topics && topics.politics && topics.politics.options && topics.politics.options.progressive }</span>
				      			<span className="slider-label label-half">{ topics && topics.politics && topics.politics.options && topics.politics.options.moderate }</span>
				      			<span className="slider-label label-74 end">{ topics && topics.politics && topics.politics.options && topics.politics.options.conservative }</span>
				      		</div>
			      		</div>
			      		<Selection text={ topics && topics.news && topics.entertainment.name } name='entertainment' handleClick={ () => this.topicSelect('entertainment') } />
			      		<Selection text={ topics && topics.news && topics.hispanic_community.name } name='hispanic_community' handleClick={ () => this.topicSelect('hispanic_community') } />
			      		<Selection text={ topics && topics.news && topics.black_community.name } name='black_community' handleClick={ () => this.topicSelect('black_community') } />
			      		<Selection text={ topics && topics.news && topics.civil_rights.name } name='civil_rights' handleClick={ () => this.topicSelect('civil_rights') } />
			      	</div>
			      	<div className="grid grid-4">
			      		<Selection text={ topics && topics.news && topics.health_beauty.name } name='health_beauty' handleClick={ () => this.topicSelect('health_beauty') } />
			      		<Selection text={ topics && topics.news && topics.lifestyle.name } name='lifestyle' handleClick={ () => this.topicSelect('lifestyle') } />
			      		<Selection text={ topics && topics.news && topics.parent_family.name } name='parent_family' handleClick={ () => this.topicSelect('parent_family') } />
			      		<Selection text={ topics && topics.news && topics.pets_animals.name } name='pets_animals' handleClick={ () => this.topicSelect('pets_animals') } />
			      		<Selection text={ topics && topics.news && topics.technology.name } name='technology' handleClick={ () => this.topicSelect('technology') } />
			      		<Selection text={ topics && topics.news && topics.business.name } name='business' handleClick={ () => this.topicSelect('business') } />
			      		<Selection text={ topics && topics.news && topics.weird_news.name } name='weird_news' handleClick={ () => this.topicSelect('weird_news') } />
			      		<Selection text={ topics && topics.news && topics.christian.name } name='christian' handleClick={ () => this.topicSelect('christian') } />
			      		<Selection text={ topics && topics.news && topics.music.name } name='music' handleClick={ () => this.topicSelect('music') } />
			      	</div>
		      	</div>
		    </div>
		    <div className="center">
		   		<RoundButton text="Complete Setup" color="#ee4832" style={{'backgroundColor': '#ee4832', 'padding': '11px 28px 11px 28px'}} onClick={this.completeSetup} />
		    </div>
		  </div>
		    <div className="row">
		    	<div className="dashed-line" />
				</div>
			<div className="mainWrapper">
		    <div className="row">
			    <div className="center">
			    	<span className="title">Download the TopicPulse Mobile App</span>
			    	<div className="center" style={{'width': '370px', 'marginTop':'18px', 'fontSize': '16px', 'fontWeight': 'lighter'}}>Enter your phone number or mail address and we'll send you a link to download it now!</div>
			    	<SendLink style={{'marginTop':'25px', 'marginBottom': '66px', 'width': '370px'}} placeholder="Enter Your Phone Number or Email" />
			    </div>
		    </div>
	      </div>
	      <Footer />
      </div>
    );
  }
}

