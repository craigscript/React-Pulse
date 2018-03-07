/**
*
* YouTube
*
*/

import React from 'react';
import './youtube.css';

class YouTube extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    var videoSrc = "https://www.youtube.com/embed/" + 
        this.props.video + "?autoplay=" + 
        this.props.autoplay + "&rel=" + 
        this.props.rel + "&modestbranding=" +
        this.props.modest;
    return (
      <div className="youtube-container">
        <iframe className="player" type="text/html" width="100%" height="100%"
		  src={videoSrc}
		  frameBorder="0"/>
      </div>
    );
  }
}

YouTube.propTypes = {

};

export default YouTube;
