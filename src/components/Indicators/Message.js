import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import style from './Message.styl';

export class Message extends React.Component {
  static propTypes = {
    isVisible: PropTypes.bool.isRequired,
    message: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['alert', 'message', 'info']).isRequired
  };

  state = { isMessageVisible: this.props.isVisible };
  currentTimeout = null;

  componentDidUpdate = (prevProps, prevState) => {
    const { isMessageVisible } = this.state;
    const { isVisible } = this.props;

    if (this.currentTimeout) {
      clearTimeout(this.currentTimeout); // eslint-disable-line
    }

    if (prevProps.isVisible !== isVisible) {
      this.setState({
        isMessageVisible: isVisible
      });
    }

    if (prevState.isMessageVisible === false && isMessageVisible) {
      this.currentTimeout = setTimeout(() => { // eslint-disable-line
        this.setState({
          isMessageVisible: false
        });
      }, 6000);
    }
  };

  render = () => {
    const { type, message } = this.props;
    let classNames = style.container;

    switch (type) {
      case 'alert':
        classNames = `${style.container} ${style['container--alert']}`;
        break;
      case 'message':
        classNames = `${style.container} ${style['container--message']}`;
        break;
      case 'info':
        classNames = `${style.container} ${style['container--info']}`;
        break;
    }

    if (this.state.isMessageVisible) {
      classNames = `${classNames} ${style['container--visible']}`;
    }

    return (
      <div className={classNames}>
        {message}
      </div>
    );
  }
}

export default withStyles(style)(Message);
