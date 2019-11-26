import React, { Component } from 'react';
import { PropTypes } from 'prop-types';

export default class ProviderApi extends Component {
  getChildContext() {
    return { apis: this.props.apis };
  }

  constructor() {
    super();
  }

  render() {
    return this.props.children;
  }
}

ProviderApi.childContextTypes = {
  apis: PropTypes.object,
};
