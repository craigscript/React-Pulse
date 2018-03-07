/**
 *
 * MainPage
 *
 */

import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { compose } from 'redux';
import Header from 'components/Header';
import Footer from 'components/Footer';
import SearchBar from 'components/SearchBar';
import DropDownMenu from 'components/DropDownMenu';
import GridItem from 'components/GridItem';
import ListItem from 'components/ListItem';
import FavoriteButton from 'Components/FavoriteButton';
import SidebarItem from 'Components/SidebarItem';
import Popup from 'Components/Popup';
import RoundCornerButton from 'components/RoundCornerButton';
import AnalysisPage from 'containers/AnalysisPage';
import Announcement from 'components/Announcement';
import API from 'components/Apicall';
import ReactGA from 'react-ga';
import './main.css';
import gif from 'images/Ellipsis.gif';
var axios = require('axios');

const ITEMS_PER_PAGE = 30;

export default class MainPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props)
    
    // If entering without being logged in can create a crash, Catch it early.
    let token = sessionStorage.getItem('jwt');
    if (!token) {
      location.href = API.PATH_PREFIX + '/';
    } else {

      this.state = { 
        viewMode: 'grid', 
        modalStatus: false, 
        stories: null, 
        idea_starters: [], 
        filtered_stories: [], 
        filters: JSON.parse(sessionStorage.getItem('filters')), 
        presets: JSON.parse(sessionStorage.getItem('presets')),
        current_story: [], 
        currentPreset: JSON.parse(sessionStorage.getItem('presets'))[0], 
        currentFormat: sessionStorage.getItem('user_formats')[0],
        showSideMenu: false,
        isTwitter: sessionStorage.getItem('user_twitter'),
        viewFavorites: false,
        searchText: '',
        loadingAnalysis: false,
        page: 0,
      };
      this.changeCategory = this.changeCategory.bind(this);
      this.openAnalysis = this.openAnalysis.bind(this);
      this.updateAnalysis = this.updateAnalysis.bind(this);
      this.closePopup = this.closePopup.bind(this);
      this.changePreset = this.changePreset.bind(this);
      this.filterResult = this.filterResult.bind(this);
      this.ideaStarterUpdate = this.ideaStarterUpdate.bind(this);
      this.userUpdate = this.userUpdate.bind(this);
      this.switchPanel = this.switchPanel.bind(this);
      this.toggleFavoriteView = this.toggleFavoriteView.bind(this);
      this.clearSearch = this.clearSearch.bind(this);
      this.infiniteScroll = this.infiniteScroll.bind(this);
    }

    ReactGA.initialize(API.google_analytics_tracker_id, {
      debug: true,
      titleCase: false,
      
    });
  }
  componentDidMount() {
    var self = this;

    // load analysis if id is given.
    const search = this.props.location.search;
    const params = new URLSearchParams(search);
    const story_id = params.get('id');
    if (story_id) {
      this.openAnalysis(story_id);
    }

    let preset = this.state.currentPreset;
    this.changePreset(preset.id);

    let token = sessionStorage.getItem('jwt');
    if (!!token) {
      // start the ideaStarter loop:
      this.ideaStarterUpdate();
      this.userUpdate();
      this.intervalIdea = setInterval(this.ideaStarterUpdate, 30000);
      this.intervalUser = setInterval(this.userUpdate, 5000);
      this.intervalScroll = setInterval(this.infiniteScroll,500);
      // this.intervalFilter = setInterval(this.filterResult,120000);
    }
    
  }

  componentWillUnmount() {
    // stop ideaStarter loop
    clearInterval(this.intervalIdea);
    // stop main content loop
    clearInterval(this.intervalPreset);
    clearInterval(this.userUpdate);
    clearInterval(this.infiniteScroll);
    // clearInterval(this.intervalFilter);

  }

  ideaStarterUpdate() {
    var self = this;

    axios.get(API.BASE_URL + 'idea_starters?auth_token=' + sessionStorage.getItem('jwt') + '&format_ids=' + self.state.currentFormat+'&limit=20', {withCredentials: true})
      .then(function(result) {
        if(result.status == 200) {
          self.setState({ idea_starters: result.data });
        }
      })
      .catch(function(error){
        console.log(error)
      })

  }

  userUpdate() {
    var self = this;
    axios.post(API.BASE_URL + 'user?auth_token=' + sessionStorage.getItem('jwt'))
      .then(function(result) {
        if(result.status == 200) {
          sessionStorage.setItem('username', result.data.user.username);
          sessionStorage.setItem('user_email', result.data.user.email);
          sessionStorage.setItem('user_twitter', result.data.user.twitter);
          sessionStorage.setItem('user_slack', result.data.user.slack);
          sessionStorage.setItem('user_formats', result.data.user.format_ids);
          if (result.data.user.twitter !== self.state.isTwitter) {
            self.setState({ isTwitter: result.data.user.twitter });
            self.updateAnalysis();
          }

        }
      })
      .catch(function(error){
          console.log('RESULT FAILS:', error);
      })
  }

  infiniteScroll() {
    let { stories, page } = this.state;
    var body = document.body,
        html = document.documentElement,
        scrollPos = document.body.scrollTop,
        itemCount = stories && stories.length,
        totalVisible = page * ITEMS_PER_PAGE;

    var height = Math.max( body.scrollHeight, body.offsetHeight, 
                       html.clientHeight, html.scrollHeight, html.offsetHeight );
    var threshold = height * 2 / 3;

    if (scrollPos > threshold && totalVisible < itemCount) {
      this.setState({page: page + 1});
    }

  }

  changePreset(id) {
    var self = this;
    console.log('HELLO: ',this.state, 'ID: ',id);
    if(this.state.presets) {
      let presets = this.state.presets.filter(function( obj ) {
        return obj.id == id;
      });
      if(presets && presets.length) {
        let preset = presets[0];
        this.filterResult(preset);
        console.log('presets[0]: ',presets[0]);
        this.setState({currentPreset: presets[0], page: 0, loading: true});
        console.log('currentPreset: ',this.state.currentPreset);
        clearInterval(this.intervalPreset);
        this.intervalPreset = setInterval(function(){
          self.filterResult(preset)
        }, 120000);
      }
    }
  }

  filterResult(preset) {
     var self=this;
        console.log('currentPreset: ',this.state.currentPreset, preset);
     this.setState({ searchText: '' });
     axios.get(API.BASE_URL + 'filtered_stories?auth_token=' + sessionStorage.getItem('jwt') + '&page=0&shortcut_id='+preset.id+'&limit=250', {withCredentials: true})
      .then(function(result) {
        if(result.status == 200) {
          self.setState({ stories: result.data, loading: false });
        }
      })
      .catch(function(error){
        self.setState({ loading: false });
        console.log(error)
      })
  }
  closePopup() {
    this.setState({ modalStatus: false });
  }

  openAnalysis(story_id) {
    var self = this;
    axios.get(API.BASE_URL + 'story?auth_token=' + sessionStorage.getItem('jwt') + '&story_id='+ story_id, {withCredentials: true})
      .then(function(result) {
        if(result.status == 200) {
          console.log(result.data);
          self.setState({ current_story: result.data });
          self.setState({ loadingAnalysis: false });
        }
      })
      .catch(function(error){
        console.log(error)
      })
      self.setState({ modalStatus: true, loadingAnalysis: true });
    
  }

  updateAnalysis() {
    var self = this;
    let story_id = this.state.current_story.id;
    let { modalStatus } = this.state;
    if(modalStatus) {
      axios.get(API.BASE_URL + 'story?auth_token=' + sessionStorage.getItem('jwt') + '&story_id='+ story_id, {withCredentials: true})
        .then(function(result) {
          if(result.status == 200) {
            self.setState({ current_story: result.data });
          }
        })
        .catch(function(error){
          console.log(error)
        })
    }
  }

  changeCategory(viewMode) {
    this.setState({viewMode: viewMode});
  }

  search(text) {
    var self=this;
    this.setState({ loading: true, searchText: text });
    if (!text) {
      this.filterResult(this.state.currentPreset);
      return false;
    }

    axios.get(API.BASE_URL + 'story_search?auth_token=' + sessionStorage.getItem('jwt') + '&category_ids=7,450&terms=' + text, {withCredentials: true})
      .then(function(result) {
        if(result.status == 200) {
          self.setState({ stories: result.data, loading: false });
        }
      })
      .catch(function(error){
        self.setState({ stories: [], loading: false });
        console.log("search error=============", error)
      })
  }

  clearSearch() {
    let preset = this.state.currentPreset;
    this.filterResult(preset);
  }

  switchPanel() {
    this.setState({ showSideMenu: !this.state.showSideMenu });
  }

  toggleFavoriteView() {
    this.setState({ viewFavorites: !this.state.viewFavorites })
  }

  render() {
    let token = sessionStorage.getItem('jwt');
    if (!token) {
      return ( <Redirect to={ '/'} /> )
    }

    const { stories, viewMode, idea_starters, presets, current_story, currentPreset, currentFormat, showSideMenu, isTwitter } = this.state;
    
    var self = this;
    let formats = JSON.parse(sessionStorage.getItem('formats'));
    let format = formats.filter(function( obj ) {
      return  parseInt(obj.id) == parseInt(currentFormat);
    });

    let showItemsCount = (this.state.page + 1) * ITEMS_PER_PAGE ;

    return (
       <div>
        <Header loggedIn="true" switchPanel={ this.switchPanel } showSideMenu={ showSideMenu }/>
        <Announcement />
        <div className="home-wrapper">
          <div className={ "left-section" + (showSideMenu ? ' hide-panel' : '') }>
            <div className="trending-topic">
              <span className="dark subtitle" style={{"float": 'left'}}>Trending</span>
              <div className="trending-input-wrapper">
                <DropDownMenu list={ presets } ref="dropdown" onClick={ this.changePreset }>
                  <div className="trending-input" onClick={ () => this.refs.dropdown.onOpen() }>
                    <input type="text" className="" placeholder="Trending" value={ currentPreset && currentPreset.name }/>
                    <i className="material-icons">arrow_drop_down</i>
                  </div>
                </DropDownMenu>
              </div>
              <div style={{ 'bottom':'0', 'right': '0' }}>
                <FavoriteButton action={this.toggleFavoriteView} className='header' style={{ borderColor: '#b4b4b4', backgroundColor: '#f1f1f2', width: '37px', height: '37px' }} />
              </div>
            </div>
            <div className="search-topic">
              <SearchBar text={ this.state.searchText } style={{"width": "calc(100% - 116px)",'float': 'left'}} handleClick={ this.clearSearch } onSearch = { e => this.search(e) } />
              <div className="viewmode">
               <button className={ "viewmode-button " + (this.state.viewMode==='grid' ? 'red' : 'medium-grey inactive') } onClick={() => this.changeCategory('grid')} style={{borderRight: '1px solid #b4b4b4'}}>
                <i className="fa fa-th-large" aria-hidden="true"></i>
                </button>
                <button className={ "viewmode-button last-button " + (this.state.viewMode==='list' ? 'red' : 'medium-grey inactive') } onClick={() => this.changeCategory('list')}>
                  <i className="fa fa-th-list" aria-hidden="true"></i>
                </button>
              </div>  
              
              <div className="switch-button">
                <RoundCornerButton text="Idea Starters" style={{'padding': '9px 16px', 'fontSize': '14px', height: '100%' }} handleClick={ this.switchPanel }>
                  <i className="icon-light_bulb" style={{'fontSize': '17px'}}></i>
                </RoundCornerButton>
              </div>
            </div>
            <div className={"news-section " + (this.state.loading === true ? 'loading' : '') + (this.state.viewFavorites === true ? 'view-favorites' : '')}>
            {
              (this.state.loading ? (
                <div className="no-result">
                  <img src={ gif } />
                </div>
                ) : (stories && stories.length > 0 ? (
                     ( viewMode === 'grid' ? (

                       stories.map((item, index) => {
                        let className = (index >= showItemsCount ? 'hide' : '');
                        let megaStory = (item.breaking && item.live_content && item.live_content.length > 0)
                        return (
                          <GridItem 
                            key={ index }
                            story={ item }
                            storyId={ item.id }
                            storyStar={ item.starred }
                            image={ item.thumbnail }
                            title={ item.title }
                            gender={ item.gender_class }
                            area={ item.age && item.age.bracket && item.age.bracket.name }
                            type={ item.api_level }
                            onClick={() => this.openAnalysis(item.id)}
                            megaStory={ megaStory }
                            className={ className }
                           >
                          </GridItem>
                        )})
                      ) : (
                        stories.map((item, index) => {
                          let className = (index >= showItemsCount ? 'hide' : '');
                          return (
                            <ListItem 
                              key={ index }
                              story={ item }
                              storyId={ item.id }
                              storyStar={ item.starred }
                              image={ item.thumbnail }
                              title={ item.title }
                              category={ item.category }
                              gender={ item.gender_class }
                              area={ item.age && item.age.bracket && item.age.bracket.name }
                              type={ item.api_level }
                              onClick={() => this.openAnalysis(item.id)}
                              className={ className }
                              >
                            </ListItem>
                          )})
                        )
                      )
                    ) : (
                    <div className="no-result">
                      No stories match your search criteria
                    </div>
                    )
                  )
              )
            }
            </div>
          </div>

          <div className={ "sidebar"  + (!showSideMenu ? ' hide-panel' : '') }>
            <div className="switch-button">
              <RoundCornerButton text="Topics" style={{'padding': '9px 16px', 'fontSize': '14px' }} handleClick={ this.switchPanel }>
                <i className="fa fa-th-large" aria-hidden="true"></i>
              </RoundCornerButton>
            </div>
            <div className="sidebar-header">
              <span className="dark">IDEA STARTERS : </span><span className="red">{format[0].name}</span>
            </div>
            <div className="sidebar-content">
            {
              this.state.idea_starters.map((item, index) => {
                return (
                  <SidebarItem 
                    key={ index }
                    id={ item.id }
                    image={ item.thumbnail }
                    title={ item.header }
                    time={ item.time_ago }
                    texts={ item.commentary }
                    onClick={() => this.openAnalysis(item.story_ids[0])}
                    >
                  </SidebarItem>
                )}
              )
            }
            </div>
          </div>
          { 
            this.state.modalStatus ? 
            (
              <AnalysisPage story={ current_story } loading={ this.state.loadingAnalysis } closePopup={() => this.closePopup()}/>
            ) : ('')
          }
        </div>
        
        <Footer />
      </div>
    );
  }
}

