import React, { Component } from 'react';
import './toggleSwitch.scss';
import UIThemeSwitcher from '../../styles/ui-theme-change';

import _ from 'lodash';

export class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultChecked: false
    };

    this.themeComponent = new UIThemeSwitcher('lightWhite');
    this.themeComponent.register(document.getElementsByTagName('body')[0]);   

    this.handleTheme = this.handleTheme.bind(this);
  }

  handleTheme(event) {
    if (event.target.checked === true) {
      this.themeComponent.setTheme(document.getElementsByTagName('body')[0], 'darkBlack');
    } else {
      this.themeComponent.setTheme(document.getElementsByTagName('body')[0], 'lightWhite');
    }
  }

  render() {
      const {defaultChecked} = this.state;
      return (
        <div className="switch">
            <input type="checkbox" className="switch__input" defaultChecked={defaultChecked}
            ref="c" id="switch__input" onChange={this.handleTheme}/>
            <label htmlFor="switch__input" className="switch__label">Switch theme</label>
        </div>
      );
    }
}

export default Toggle;