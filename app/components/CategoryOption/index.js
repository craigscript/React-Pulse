/**
*
* CategoryOption
*
*/

import React from 'react';
import './categoryOption.css';


class CategoryOption extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
    <div className="category-title">
	  <input type="radio" defaultChecked />
	  <span>{this.props.text}</span>
    </div>
    );
  }
}

CategoryOption.propTypes = {

};

export default CategoryOption;
