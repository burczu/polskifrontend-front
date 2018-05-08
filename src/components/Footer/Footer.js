import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './Footer.styl';

export class Footer extends React.Component {
  state = { currentYear: (new Date()).getFullYear() };

  render = () => {
    return (
      <div className={styles.footer}>
        <p>Copyright@{this.state.currentYear} - <a className={styles['footer__link']} target="_blank" href="https://nafrontendzie.pl">Na Frontendzie</a></p>
      </div>
    );
  };
}

export default withStyles(styles)(Footer);
