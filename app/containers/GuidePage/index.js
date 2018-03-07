/**
 *
 * GuidePage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Header from 'components/Header';
import Footer from 'components/Footer';
import CategoryOption from 'components/CategoryOption';
import RoundButton from 'components/RoundCornerButton';
import API from 'components/Apicall';
import 'containers/LoginPage/login.css'
export class GuidePage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props)
    this.openTrending = this.openTrending.bind(this)
  }
  openTrending() {
    location.href=API.PATH_PREFIX + '/trending'
  }
  render() {
    return (
      <div>
        <Header loggedIn="true" />
          <div className="login-wrapper">
            <div className="login-title"> 
              Next Steps:
            </div>
            <div className="row">
              <CategoryOption text="Our system will start customizaing your shortcus and will be available within 24 hours" className="dark-grey"/>
            </div>
            <div className="row">
              <CategoryOption text="Be on the lookout for an email letting you know your shortcuts are built and ready to use" className="dark-grey"/>
            </div>
            <div className="row">
              <CategoryOption text="Someone from TopicPulse will be in contact with you (talk to PI about cadence)" className="dark-grey"/>
            </div>
            <div className="row">
              <CategoryOption text="In the meantime, you cna see what's trending right now nationally!" className="dark-grey"/>
            </div>
            <div className="row center">
              <RoundButton text="See What's Trending Nationally" className="center" style={{'backgroundColor': '#ee4832', 'padding': '11px 28px 11px 28px'}} handleClick={this.openTrending}>
                <i className="icon-uniF310" style={{fontSize: '21px'}}></i>
              </RoundButton>
            </div>
          </div>
        <Footer />
      </div>
    );
  }
}

GuidePage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};


function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(null, mapDispatchToProps);

export default compose(
  withConnect,
)(GuidePage);
