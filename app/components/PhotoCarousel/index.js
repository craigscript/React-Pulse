/**
*
* PhotoCarousel
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import RoundButton from 'components/RoundButton';
import './carousel.css';
class PhotoCarousel extends React.Component { // eslint-disable-line react/prefer-stateless-function
	render() {
  	const { images, index, zoomed }=this.props;
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
    if(images && images[index]) {
	    return (
	      <div className="image">
	        <img src={ images[index].url } />
	        <button className="zoom" onClick={ e => this.props.zoom(e) }>
	        	{
	        		(zoomed) ? (	
	          	<i className="icon-resize_small"></i>
	          	) : (
	          		<i className="icon-fullscreen"></i>
	          	) 
	        	}
	        </button>
	        {
	          (index > 0) ? (
	            <RoundButton style = { styles.navigationLeft } handleClick={ this.props.previousImage }>
				        <i className="icon-uniF2EA" />
				      </RoundButton>
	          ) : ('')
	        }
	        {
	          (index < images.length-1) ? (
	            <RoundButton style = { styles.navigationRight } handleClick={ this.props.nextImage }>
	              <i className="icon-uniF2EE" />
	            </RoundButton>
	          ) : ('')
	        }
	      </div>
	    );
	  }
	  else {
	  	return <div className="image"></div>;
	  }
  }
}

PhotoCarousel.propTypes = {
	zoom: PropTypes.func,
	images: PropTypes.array,
	index: PropTypes.number,
	zoomed: PropTypes.bool,
};

export default PhotoCarousel;
