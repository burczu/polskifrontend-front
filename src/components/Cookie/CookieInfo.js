import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './CookieInfo.styl';
import cookies from '../../core/helpers/cookieHelper';

export class CookieInfo extends React.Component {
  constructor(props) {
    super(props);
    const shouldBeClosed = cookies.get('cookie-accepted');
    this.state = { shouldBeClosed: shouldBeClosed || false };
  }

  onOkClick = () => {
    cookies.set(true, 'cookie-accepted', { path: '/', expires: new Date(2050, 1, 1) });
    this.setState({
      shouldBeClosed: true
    });
  };

  render() {
    const containerClass = `${styles.container} ${this.state.shouldBeClosed ? styles['container--invisible'] : ''}`;

    return (
      <div className={containerClass}>
        <p className={styles['container__text']}>Ta strona, tak jak praktycznie każda w internecie, wykorzystuje ciasteczka.</p>
        <button className={styles['container__button']} onClick={this.onOkClick.bind(this)}>Rozumiem</button>
      </div>
    );
  }
}

export default withStyles(styles)(CookieInfo);
