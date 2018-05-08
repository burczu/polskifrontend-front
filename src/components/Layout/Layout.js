import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import style from './Layout.styl';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import TopHomePanel from './TopHomePanel';
import TopHomeLinks from './TopHomeLinks';
import CookieInfo from '../Cookie/CookieInfo';
import settingsHelper from '../../core/helpers/settingsHelper';
import { connect } from 'react-redux';
import mapPublicStateToProps from '../../core/redux/mapPublicStateToProps';
import mapPublicDispatchToProps from '../../core/redux/mapPublicDispatchToProps';
import _ from 'lodash';
import dateHelper from '../../core/helpers/dateHelper';

class Layout extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    newsState: PropTypes.object.isRequired
  };

  getNewsCount = () => {
    const { newsState: { newsList } } = this.props;
    const lastNewsVisit = settingsHelper.getSettings().lastNewsVisit;
    const lastVisitDate = new Date(lastNewsVisit);

    const filteredList = _.filter(newsList, item => {
      const newsDate = new Date(item.date);
      return newsDate > lastVisitDate && dateHelper.isThisWeek(newsDate);
    });

    return filteredList.length;
  };

  render = () => {
    return (
      <div className={style.container}>
        <div className={style.pusher}>
        </div>
        <Header />
        <TopHomeLinks newNewsCount={this.getNewsCount()} />
        <TopHomePanel />
        {this.props.children}
        <Footer />
        <CookieInfo />
      </div>
    );
  };
}

export default connect(mapPublicStateToProps, mapPublicDispatchToProps)(withStyles(style)(Layout));
