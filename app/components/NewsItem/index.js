/**
*
* NewsItem
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import SocialWidget from 'components/SocialWidget';
import './news-item.css';

class NewsItem extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div className="news-item" >
      	<a className="news-item-title" target="_blank" href={ this.props.url }>
    			<div className="news-item-left">
	      		<img src={this.props.image} />
	      	</div>
	      	<div className="news-item-right">
	    			{this.props.source}
	      	</div>
    		</a>
      	
      	<div className="news-item-right">
      		<div className="news-item-content">
      			{this.props.content}
      		</div>
          <SocialWidget style={{ position: 'absolute', 'right': 0 }} source={this.props.source} content={this.props.content}/>
      	</div>
      </div>
    );
  }
}

NewsItem.propTypes = {
  image: PropTypes.string,
  url: PropTypes.string,
  source: PropTypes.string,
  content: PropTypes.string,
};

export default NewsItem;
