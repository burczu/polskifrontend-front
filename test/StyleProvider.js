import React, { Component, Children } from 'react'; // eslint-disable-line
import PropTypes from 'prop-types';

export default class Provider extends Component {
  getChildContext() {
    return { insertCss: this.props.insertCss };
  }

  render() {
    return Children.only(this.props.children);
  }
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
  insertCss: PropTypes.func.isRequired
};

Provider.childContextTypes = {
  insertCss: PropTypes.func.isRequired
};
