/**
*
* DropDownMenu
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import MenuButton from 'components/MenuButton';
import './mobilemenu.css';
class MobileMenu extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
    this.state = { opened: false };
    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.onOpen = this.onOpen.bind(this);
  }
  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }
  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }
  onOpen() {
    this.setState({ opened: !this.state.opened });
  }
  onClick(func) {
    this.onOpen();
    this.props.onClick(func);
  }
  setWrapperRef(node) {
    this.wrapperRef = node;
  }
  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.setState({ opened: false });
    }
  }
  render() {
    return (
      <div className="mobile-container" ref={this.setWrapperRef} role="button" tabIndex={0}>
        { this.props.children }
        {
          this.state.opened ? (
            <div className="mobile-menu">
            <button className="mobilemenu-close" onClick={ () => { this.setState({ opened: false }) } }>
              <i className="material-icons red" style={{fontSize: '28px'}}>close</i>
            </button>
              <ul>
                {
                  this.props.showSideMenu ? (
                  <li className="switch-menu-item">
                    <MenuButton src="#" text="Topics" onClick={ this.props.switchPanel } style={{ color: 'red' }}>
                      <i className="fa fa-th-large" aria-hidden="true"></i>
                    </MenuButton>
                  </li>
                  ) : (
                    <li className="switch-menu-item">
                      <MenuButton src="#" text="Idea Starters" onClick={ this.props.switchPanel } style={{ color: 'red' }}>
                        <i className="icon-light_bulb"></i>
                      </MenuButton>
                    </li>
                  )
                }
                {
                  this.props.list.map((item, index) => {
                    return (
                      <li key={index} className="grey">
                        <MenuButton src="#" text={item.name} onClick={() => this.onClick(item.id)}>
                          { 
                            item.icon != null ?
                            (item.icon) : 
                            (
                              <i className="fa fa-angle-right" aria-hidden="true" />
                            )
                          }
                        </MenuButton>
                      </li>
                    );
                  })
                }
              </ul>
            </div>
          ) : ('')
        }
      </div>
    );
  }
}

MobileMenu.propTypes = {
 
};

export default MobileMenu;
