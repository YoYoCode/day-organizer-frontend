import React, { Component } from 'react';
import './toggleSwitch.scss';

import _ from 'lodash';

export class Toggle extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
     
      return (
        <div class="switch">
            <input type="checkbox" class="switch__input" id="switch__input"/>
            <label for="switch__input" class="switch__label">Dark/Light</label>
        </div>
      );
    }
}

export default Toggle;