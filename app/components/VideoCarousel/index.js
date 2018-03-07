/**
*
* VideoCarousel
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import YouTube from 'components/YouTube';
import RoundButton from 'components/RoundButton';
import '../PhotoCarousel/carousel.css';


class VideoCarousel extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
  	const { videos, index, zoomed }=this.props;
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
    if(videos && videos[index]) {
	    return (
	      <div className="image">
	        <YouTube video={ videos[index].video_identifier } autoplay="0" rel="0" modest="0" />
          {
	          (index > 0) ? (
	            <RoundButton style = { styles.navigationLeft } handleClick={ this.props.previousVideo }>
				        <i className="icon-uniF2EA" />
				      </RoundButton>
	          ) : ('')
	        }
	        {
	          (index < videos.length-1) ? (
	            <RoundButton style = { styles.navigationRight } handleClick={ this.props.nextVideo }>
	              <i className="icon-uniF2EE" />
	            </RoundButton>
	          ) : ('')
	        }
	        <button className="zoom" onClick={ e => this.props.zoom(e) }>
	        	{
	        		(zoomed) ? (	
	          	<i className="icon-resize_small"></i>
	          	) : (
	          		<i className="icon-fullscreen"></i>
	          		) 
	        	}
	        </button>
	      </div>
	    );
		}
		else {
			return <div className="image"></div>;
		}
  }
}

VideoCarousel.propTypes = {
	zoom: PropTypes.func,
	videos: PropTypes.array,
	index: PropTypes.number,
	zoomed: PropTypes.bool,
};

export default VideoCarousel;
