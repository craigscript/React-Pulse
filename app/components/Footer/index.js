/**
*
* Footer
*
*/

import React from 'react';
import color from 'utils/constants.js';
import './footer.css'

class Footer extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div className="footer">
      	<div className="copyright">
      	Copyright &copy; 2017 <span className="companyName">Topicpulse</span> - All rights reserved.
      	</div>
      </div>
    );
  }
}

Footer.propTypes = {

};

export default Footer;
