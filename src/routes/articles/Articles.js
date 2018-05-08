import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './Articles.styl';
import { connect } from 'react-redux';
import mapPublicStateToProps from '../../core/redux/mapPublicStateToProps';
import mapPublicDispatchToProps from '../../core/redux/mapPublicDispatchToProps';
import { decode } from 'he';
import HeaderSettings from '../../components/Layout/HeaderSettings';
import ArticleView from './parts/ArticleView';

class Articles extends React.Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    articlesState: PropTypes.object.isRequired,
    context: PropTypes.object.isRequired
  };

  componentWillUnmount = () => {
    const { actions: { articlesDataLoadedReset } } = this.props;
    articlesDataLoadedReset();
  };

  render = () => {
    const { articlesState: { article, articleLoading }, context } = this.props;
    const title = `${article.title} | Polski Front-End`;
    const description = article.description ? decode(article.description.replace(/(<([^>]+)>)/ig, '')).substr(0, 140) + '...' : '';

    const blog = article._blog || {};

    return (
      <div className={styles.container}>
        <HeaderSettings description={description} title={title} currentPath={context.path} />
        <ArticleView blogName={blog.name || ''}
                     blogIcon={blog.favicon || ''}
                     blogHref={blog.href || ''}
                     date={article.date || ''}
                     description={article.description ? decode(article.description.replace(/(<([^>]+)>)/ig, '')).trim().substr(0, 600) + '...' : ''}
                     href={article.href || ''}
                     isLoading={articleLoading}
                     title={article.title || ''}
        />
      </div>
    );
  }
}

export default connect(mapPublicStateToProps, mapPublicDispatchToProps)(withStyles(styles)(Articles));
