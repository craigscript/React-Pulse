/**
*
* SocialWidget
*
*/

import React from 'react';
import PropTypes from 'prop-types'
import './social-widget.css'

class SocialWidget extends React.Component { // eslint-disable-line react/prefer-stateless-function
	constructor(props) {
		super(props);
		this.state = { expanded: false };
		this.expand = this.expand.bind(this)
		this.shareTwitter = this.shareTwitter.bind(this)
		this.shareFacebook = this.shareFacebook.bind(this)
	}
	expand() {
		this.setState({ expanded: !this.state.expanded });
	}
  shareTwitter() {
  	let source = this.props.source;
  	let content = this.props.content;
    // const { source, content  } = this.props;
    window.open('http://twitter.com/share?url='+encodeURIComponent(source)+'&text='+encodeURIComponent(content), '', 'left=0,top=0,width=550,height=450,personalbar=0,toolbar=0,scrollbars=0,resizable=0');
  }
  shareFacebook() {
    const { source, content  } = this.props;
    window.open("https://www.facebook.com/sharer/sharer.php?u="+escape(source)+"&t="+content, content, "menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600");
  }

  render() {
    return (
      <div className={ "social-widget " + (this.state.expanded ? ' expanded' : '') + (this.props.size == 'large' ? ' large' : '') } style={ this.props.style } onClick={ this.expand }>
      	{
      		this.state.expanded ? (
      			<div className="expanded-part">
			      	<button onClick={this.shareTwitter}>
			      		<i className="icon-uniF360 red"></i>
			      	</button>
			      	<button onClick={this.shareFacebook}>
			      		<i className="icon-uniF343 red"></i>
			      	</button>
		      	</div>
		      ) : ('')
	     }
      	<button>
      		<i className="material-icons red">share</i>
      	</button>
      </div>
    );
  }
}

SocialWidget.propTypes = {
	style: PropTypes.object,
	url: PropTypes.string,
	source: PropTypes.string,
	content: PropTypes.string,
};

export default SocialWidget;
