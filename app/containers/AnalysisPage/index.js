/**
 *
 * AnalysisPage
 *
 */

import React from 'react';
// import ReactDom from 'react-dom';
import PropTypes from 'prop-types';
import moment from 'moment'
import { timeParse as parse } from 'd3-time-format';
import { LineChart } from 'react-easy-chart';
import { Tweet } from 'react-twitter-widgets'
import Popup from 'Components/Popup';
import RoundButton from 'components/RoundButton';
import NewsItem from 'Components/NewsItem';
import RoundCornerButton from 'components/RoundCornerButton';
import SidebarItem from 'components/SidebarItem';
import SocialWidget from 'components/SocialWidget';
import PhotoCarousel from 'components/PhotoCarousel';
import VideoCarousel from 'components/VideoCarousel';
import MdSendIcon from 'react-icons/lib/md/send';
import API from 'components/Apicall';
var axios = require('axios');
import './analysis.css';

const TEXT_PRESS_TIMEOUT_MS = 1500;

export class AnalysisPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props)
    const initialWidth = window.innerWidth > 0 ? window.innerWidth : 500;
    this.state = { 
      loading: true,
      selectedTab: 0, 
      zoomed: null, 
      zoomedImage: null, 
      zoomedVideo: null, 
      article_view_count: 3, 
      current_image: 0, 
      current_video: 0, 
      reportStory: false, 
      issue: '',
      windowWidth: initialWidth - 100,
      componentWidth: 650,
      reportStatus: '',
      emailText: 'Email',
    };
    this.openTab = this.openTab.bind(this);
    this.zoom = this.zoom.bind(this);
    this.viewAll = this.viewAll.bind(this);
    this.previousImage = this.previousImage.bind(this);
    this.nextImage = this.nextImage.bind(this);
    this.previousVideo = this.previousVideo.bind(this);
    this.nextVideo = this.nextVideo.bind(this);
    this.emailClick = this.emailClick.bind(this);
    this.reportStory = this.reportStory.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleResize = this.handleResize.bind(this);

  }
  componentDidMount() {
    // this.setState({loading: false});
    window.addEventListener('resize', this.handleResize);
    // this.handleResize();
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
    this.setState({loading: true});
  }
  handleResize() {
    this.setState({
      windowWidth: window.innerWidth - 100,
      componentWidth: this.refs.component.offsetWidth,
    });
  }

  previousImage() {
    this.setState({ current_image: Math.max(this.state.current_image - 1, 0) });
  }
  nextImage() {
    this.setState({ current_image: Math.min(this.state.current_image + 1, this.props.story.images.length-1) });
  }

  previousVideo() {
    this.setState({ current_video: Math.max(this.state.current_video - 1, 0) });
  }
  nextVideo() {
    this.setState({ current_video: Math.min(this.state.current_video + 1, this.props.story.videos.length-1) });
  }

  viewAll() {
    this.setState({ article_view_count: this.props.story.articles.length });
  }
  openTab(tab) {
    this.setState({ selectedTab: tab });
  }
  zoom(zoomed) {
    // this.setState({ zoomed: image });
    if (zoomed == 'image' && this.state.zoomedImage !== 'zoom') {
      this.setState({ zoomedImage: 'zoom', zoomedVideo: 'hide'});
    }
    else if (zoomed == 'video' && this.state.zoomedVideo !== 'zoom') {
      this.setState({ zoomedImage: 'hide', zoomedVideo: 'zoom'});
    }
    else {
      this.setState({ zoomedImage: null, zoomedVideo: null});
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
  shareTwitter() {
    const { title, id } = this.props.story;
    let tpUrl = API.HOST_URL + API.PATH_PREFIX + '/trending?id=' + id;
    window.open('http://twitter.com/share?url='+encodeURIComponent(tpUrl)+'&text='+encodeURIComponent(title), '', 'left=0,top=0,width=550,height=450,personalbar=0,toolbar=0,scrollbars=0,resizable=0');
  }
  shareFacebook() {
    const { title, id } = this.props.story;
    let tpUrl = API.HOST_URL + API.PATH_PREFIX + '/trending?id=' + id;
    window.open("https://www.facebook.com/sharer/sharer.php?u="+escape(tpUrl)+"&t="+title, title, "menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600");
    // window.open('http://twitter.com/share?url='+encodeURIComponent(tpUrl)+'&text='+encodeURIComponent(title), '', 'left=0,top=0,width=550,height=450,personalbar=0,toolbar=0,scrollbars=0,resizable=0');
  }
  emailClickOLD() {
    const { title, id } = this.props.story;
    location.href='mailto:?to=&subject=' + title + '&body=' + API.HOST_URL + API.PATH_PREFIX + '/trending?id=' + id
  }
  emailClick() {
    const { title, id } = this.props.story;
    var text = this.state.emailText;
    var self = this;
    axios.get(API.BASE_URL + 'story_email?auth_token=' + sessionStorage.getItem('jwt') + '&content_id=' + id)
      .then(function(result) {
        if(result.status == 200) {
          self.setState({ emailText: 'Emailed' });
          setTimeout(function(){
            self.setState({ emailText: text });
          }, TEXT_PRESS_TIMEOUT_MS);
        }
      })
      .catch(function(error){
        console.log(error)
      })
  }
  reportStory() {
    this.setState({reportStory: !this.state.reportStory});
  }
  handleChange(event) {
    this.setState({issue: event.target.value, reportStatus: ''});
  }

  handleSubmit(event) {
    event.stopPropagation();
    event.preventDefault();
    var self=this;
    if (!this.state.issue) {
      self.setState({reportStatus: 'empty'});
    }
    else {
      axios.get(API.BASE_URL + 'report_story?auth_token=' + sessionStorage.getItem('jwt') + '&story_id=' + this.props.story.id + '&issue=' + this.state.issue)
        .then(function(result) {
          if(result.status == 200) {
            self.setState({ issue: '', reportStatus: 'reported' });
            setTimeout(function(){
              self.setState({reportStory: !self.state.reportStory, reportStatus: ''});
            },3000);
          }
        })
        .catch(function(error){
          self.setState({ issue: 'Invalid or Empty Input' });
          setTimeout(function(){
            self.setState({ issue: '' });
          },3000);
        })
    }
  }

  renderAnalysis() {
    let styles = {
      navigationLeft: {
        backgroundColor: 'white',
        position: 'absolute',
        left: '17px',
        top: '50%',
        transform: 'translateY(-50%)',
        width: '30px',
        height: '30px'
      },
      navigationRight: {
        backgroundColor: 'white',
        position: 'absolute',
        right: '17px',
        top: '50%',
        transform: 'translateY(-50%)',
        width: '30px',
        height: '30px'
      }
    }

    const { story } = this.props;
    const { current_image, current_video } = this.state;
    
    let tw_status = (sessionStorage.getItem('user_twitter') == 'true' ? true : false);
    let top_tweets = [];
    if(story.tweets) {
      for(let i=0; i<story.tweets.length; i++) {
        top_tweets.push(story.tweets[i]);
      }
    }

    let graphData = [];
    if(story.history) {
      const parseDate = parse('%Y-%m-%dT%I:%M:%S%Z');
      for(let i=0; i<story.history.length; i++) {
        const date = moment(parseDate(story.history[i].timestamp));
        graphData.push({ x: date.format('D-MMM-YY HH:mm'), y: story.history[i].social });
      }
    }
    switch(this.state.selectedTab) {
      case 0:
        return (
          <div ref="component" style={{ backgroundColor: 'white' }}>
            <LineChart
              axes
              dataPoints
              datePattern={'%d-%b-%y %H:%M'}
              xType={'time'}
              margin={{top: 20, right: 20, bottom: 30, left: 100}}
              width={ this.state.componentWidth }
              height={250}
              lineColors={['#ee4832']}
              xTicks={5}
              yTicks={3}
              data={[
                graphData
              ]}
              style={{
                '.line0': {
                  stroke: 'green'
                },
                '.axis': {
                  fontSize: '12px'
                }
              }}
            />
          </div>
          );
      case 1:
        if (top_tweets.length > 0){
          return (
            <div className="image-container top-tweets-container">
            <div className="dark-grey-2">Here is a sampling of tweets about this topic</div>
              <div className="top-tweets">
              {
                top_tweets.map((item, index) => {
                  return (
                    <div className="tweet" key={ index }>
                      <Tweet tweetId={ item } />
                    </div> 
                  )}
                )
              }
              </div>
            </div>
          );
        }
        else if (tw_status === true) {
          return (
            <div className="image-container top-tweets-container">
              <div className="dark-grey-2">There are no tweets available at the moment.</div>
              <div className="top-tweets">
                Check back later.
              </div>
            </div>
          )
        }
        else {
          return (
            <div className="image-container top-tweets-container sign-in">
              <div className="dark-grey-2">To view Top Tweets, sign in with Twitter</div>
              <div className="top-tweets">
                <RoundCornerButton text='Sign in with Twitter' style={{'backgroundColor': '#ee4832','fontSize': '14px',  'padding': '14px 29px', marginBottom: '53px' }} handleClick={this.twitterConnect}>
                  <i className="fa fa-twitter"></i>
                </RoundCornerButton>
              </div>
            </div>
          );
        }
      case 2:
        return (
          <div className="image-container">
            <div className={"image-section " + this.state.zoomedImage }>
              <div className="image-title center">Photo</div>
              <PhotoCarousel images = { this.props.story.images } zoom = { () => this.zoom('image') } index={ this.state.current_image } previousImage={ this.previousImage } nextImage={ this.nextImage } zoomed={ (this.state.zoomedImage ? true : false) }/>
            </div>
            <div className={"image-section " + this.state.zoomedVideo }>
              <div className="image-title center">Video</div>
              <div className='image'>
                <VideoCarousel videos = { this.props.story.videos } zoom = { () => this.zoom('video') } index={ this.state.current_video } previousVideo={ this.previousVideo } nextVideo={ this.nextVideo } zoomed={ (this.state.zoomedVideo ? true : false) }/>
              </div>
            </div>
          </div>
        );
      case 3:
        if (story && story.keywords && story.keywords.length > 0) {
          return (
            <div className='analysis-inner'>
            {
              story && story.keywords && story.keywords.map((item, index) => {
                return (
                  <div className="keyword" key={ index } style={{ color: '#ee4832' }}>
                    { item.name }
                  </div>
                )}
              )
            }
            </div>
          );
        }
        else {
          return (
            <div className='analysis-inner'>
              <div className="dark-grey-2">No Hashtags or Keywords</div>
              
            </div>
          );
        }
      case 4:
        let text = story && story.gender_class && story.age.gender_class || 'Neutral';
        let textClass = (text = 'Neutral' ? 'fa-genderless' :(text == 'Male' ? 'fa-male' : 'fa-female' ))
        return (
          <div className='analysis-inner'>
            <div className="engagement-row">
              <div className="engagement-block">
                <span className={"fa data " + textClass } style={{ marginTop: '8px' }}></span>
              </div>
              <div className="engagement-block">
                <div className="data">{ story && story.age && story.age.bracket && story.age.bracket.name }</div>
              </div>
            </div>
            <div className="engagement-row">
              <div className="engagement-block">
                <div className="label">{ story && story.gender_class }</div>
              </div>
              <div className="engagement-block">
                <div className="label">Age</div>
              </div>
            </div>
            <div className="engagement-row" style={{ marginTop: '20px' }}>
              <div className="engagement-block">
                <div className="data">{ story && story.sources_news }</div>
              </div>
              <div className="engagement-block">
                <div className="data">{ story && story.sources_social && story.sources_social.toLocaleString(navigator.language, { minimumFractionDigits: 0 }) }</div>
              </div>
            </div>
            <div className="engagement-row">
              <div className="engagement-block">
                <div className="label">News Sources</div>
              </div>
              <div className="engagement-block">
                <div className="label">Social Reach</div>
              </div>
            </div>
          </div>
          )
        break;
      default:
        return this.state.selectedTab;
    }
  }
  render() {
    const { article_view_count } = this.state;
    const { story } = this.props;
    let articles = [];
    for (var i=0; i<article_view_count; i++)
      articles.push(story.articles && story.articles[i]);
    if (this.props.loading === true) {
      return (
        <Popup sidePopup={true} closePopup={ this.props.closePopup }>
          <div className="title dark">
            Instant Analysis
            <div className="close-button">
            <RoundButton handleClick={ this.props.closePopup }>
              <i className="material-icons red" style={{ fontSize: '28px' }}>close</i>
            </RoundButton>
            </div>
            
          </div>
        </Popup>  
      )
    }


    return (
      <Popup sidePopup={true} closePopup={ this.props.closePopup }>
        <div className="title dark">
          Instant Analysis
          <div className="close-button">
          <RoundButton handleClick={ this.props.closePopup }>
            <i className="material-icons red" style={{ fontSize: '28px' }}>close</i>
          </RoundButton>
          </div>
          
        </div>
        <div className="black-grey" style={{'marginTop': '30px'}}>{ story.title }</div>
        <div className="popup-button-row">
          <RoundCornerButton text={ this.state.emailText} style={{ padding: '10px 35px', fontSize: '12px', marginRight: '22px' }} handleClick={this.emailClick}>
             <i className="material-icons" style={{'fontSize': '16px'}}>email</i> 
          </RoundCornerButton>
            
          <RoundCornerButton text="Flag for Review" style={{ padding: '10px 35px', fontSize: '12px' }} handleClick={this.reportStory}>
             <i className="fa fa-flag" aria-hidden="true" style={{'fontSize': '16px'}}></i> 
          </RoundCornerButton>
        </div>
        <div className="tabbar-wrapper">
          <div className="tabbar-comment black-grey">Swipe to reveal more tabs</div>
          <ul className="tabbar">
            <li className={ this.state.selectedTab == 0 ? 'selected-tab' : '' }>
              <a onClick={ () => this.openTab(0) }>Growth</a>
            </li>
            <li className={ this.state.selectedTab == 1 ? 'selected-tab' : '' }>
              <a onClick={ () => this.openTab(1) }>Top Tweets</a>
            </li>
            <li className={ this.state.selectedTab == 2 ? 'selected-tab' : '' }>
              <a onClick={ () => this.openTab(2) }>Photo & Video</a>
            </li>
            <li className={ this.state.selectedTab == 3 ? 'selected-tab' : '' }>
              <a onClick={ () => this.openTab(3)} >Hashtags & Keywords</a>
            </li>
            <li className={ this.state.selectedTab == 4 ? 'selected-tab' : '' }>
              <a onClick={ () => this.openTab(4) }>Engagement</a>
            </li>
          </ul>
        </div>
        <div className="analysis-area">
          {
            this.renderAnalysis(this.state.tab)
          }
        </div>
        {
          story && story.idea_starter && story.idea_starter.length > 0 ? (
          <div style={{'marginTop': '27px'}}>
            <div className="sidebar-item-title" style={{'fontSize': '20px'}}>
              Idea Starters
            </div>
              <SidebarItem 
                id={ story.idea_starter[0].id }
                image={ story.idea_starter[0].image_url }
                title={ story.idea_starter[0].header }
                time={ story.idea_starter[0].time_ago }
                texts={ story.idea_starter[0].commentary }
                style={{margin: '0 25px'}}
                
              >
            </SidebarItem>
          </div>) : ('')
        }
        <div className="top-source-title-row">
          <div className="sidebar-item-title" style={{ fontSize: '20px', float: 'left' }}>
            Top Sources
          </div>
        </div>
        {
          story && story.articles && story.articles.map((item, index) => {
            return (
              <NewsItem 
                key={ index }
                image={ item.favicon_url }
                source={ item.domain }
                content={ item.title }
                url={ item.url }
                >
              </NewsItem>
            )}
          )
        } 
        {
          (this.state.reportStory) ?
          (
            <Popup style={{"width": "493px", 'margin': '245px auto', 'padding': '18px'}} closePopup={() => this.reportStory()}>
              <button className="popup-close red" onClick={() => this.reportStory()}><i className="material-icons">close</i></button>
              <div className="popup-content center" style={{'paddingTop': '53px','paddingbottom': '53px'}}> 
                <div className="title">Reporting Story</div>
                <div style={{'marginTop': '12px', 'padding': '10px'}}><strong>TITLE: </strong>{ this.props.story.title }</div>
                <div style={{'marginTop':'15px', 'width': '362px'}} placeholder="Enter Your Phone Number or Email" />

                <form onSubmit={this.handleSubmit}>
                  <label>
                    <textarea type="text" className="sendLinkInput" placeholder = 'Please describe the issue' value={this.state.issue} onChange={this.handleChange}/>
                  </label>
                  <button type="submit" className="sendLinkSubmit" >
                    <MdSendIcon style={{'color': 'white'}} />
                  </button>
                </form>
                {
                  ( ( this.state.reportStatus == 'empty' ? 
                    (
                      <div style={{ 'color': 'red'}}>Please add a description of the issue, then submit.</div>
                    ) : (
                      ( this.state.reportStatus == 'reported' ?
                      (
                        <div>Thank you, Your report has been submitted.</div>
                      ) : (
                        <div style={{'display':'none'}} />
                      ))
                    ) 
                    ))
                }
              </div>
            </Popup>
          ) : ('')
        }
      </Popup>
    );
  }
}

AnalysisPage.propTypes = {
};

export default AnalysisPage;



