import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import style from './Home.styl';
import BlogTiles from './parts/BlogTiles';
import BlogList from './parts/BlogList';
import BlogListControlPanel from './parts/BlogListControlPanel';
import { connect } from 'react-redux';
import mapPublicStateToProps from '../../core/redux/mapPublicStateToProps';
import mapPublicDispatchToProps from '../../core/redux/mapPublicDispatchToProps';
import Message from '../../components/Indicators/Message';
import * as settingsHelper from '../../core/helpers/settingsHelper';
import * as dateHelper from '../../core/helpers/dateHelper';
import HeaderSettings from '../../components/Layout/HeaderSettings';

class Home extends React.Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    context: PropTypes.object.isRequired,
    homeState: PropTypes.object.isRequired
  };

  componentWillUnmount() {
    const { actions: { homeDataLoadedReset } } = this.props;
    homeDataLoadedReset();
  }

  onListOptionClick(event) {
    event.preventDefault();

    const { actions: { homeArticleListGet } } = this.props;
    homeArticleListGet(1);
  }

  onTilesOptionClick(event) {
    event.preventDefault();

    const { actions: { homeBlogListGet } } = this.props;
    homeBlogListGet(1);
  }

  onAllListScrolledBottom() {
    const { actions: { homeArticleListGet }, homeState: { allArticlesNextPage, allArticlesListLoading } } = this.props;
    if (allArticlesListLoading === false && allArticlesNextPage > 1) {
      homeArticleListGet(allArticlesNextPage);
    }
  }

  onBlogListScrolledBottom() {
    const { actions: { homeBlogListGet }, homeState: { blogListNextPage, blogListLoading } } = this.props;
    if (blogListLoading === false && blogListNextPage > 1) {
      homeBlogListGet(blogListNextPage);
    }
  }

  onLinkClicked(url, isToday) {
    const { actions: { homeAddLinkToClicked }, homeState: { clickedLinks } } = this.props;
    const link = clickedLinks.find(item => item === url);
    if (!link && isToday) {
      const settings = settingsHelper.getSettings();
      let clicked = settings.clickedLinks || [];

      // filter old clicked articles
      clicked = clicked.filter(item => {
        return dateHelper.isToday(item.date);
      });

      clicked.push({ url, date: Date.now() });
      settings.clickedLinks = clicked;
      settingsHelper.saveSettings(settings);

      homeAddLinkToClicked({ url, date: Date.now() });
    }

    return false;
  }

  render() {
    const { homeState: {
      blogList,
      blogListLoading,
      blogListError,
      blogListNextPage,
      articlesError,
      isTilesOptionSelected,
      isListOptionSelected,
      allArticlesList,
      allArticlesListLoading,
      allArticlesNextPage,
      allArticlesListError,
      clickedLinks
    }, context } = this.props;
    const title = 'Polski Front-End';
    const description = 'Polski Front-End to serwisy i blogi na temat front-endu w jednym miejscu, tylko po polsku. Coś dla każdego web developera!';

    return (
      <div className={style.container}>
        <HeaderSettings description={description} title={title} currentPath={context.path} />
        {isTilesOptionSelected ?
          <BlogTiles blogList={blogList || []}
                     blogListLoading={blogListLoading && blogListNextPage === 1}
                     nextPage={blogListNextPage}
                     isLoadingMore={blogListLoading && blogListNextPage > 1}
                     onScrolledBottom={this.onBlogListScrolledBottom.bind(this)}
                     onArticleClicked={this.onLinkClicked.bind(this)}
                     clickedArticles={clickedLinks}
          >
            <BlogListControlPanel isTilesOptionSelected={isTilesOptionSelected}
                                  isListOptionSelected={isListOptionSelected}
                                  onTilesOptionClick={this.onTilesOptionClick.bind(this)}
                                  onListOptionClick={this.onListOptionClick.bind(this)}
                                  isLoading={blogListLoading || allArticlesListLoading}
            />
          </BlogTiles>
          :
          <BlogList articles={allArticlesList || []}
                    isLoading={allArticlesListLoading && allArticlesNextPage === 1}
                    isLoadingMore={allArticlesListLoading && allArticlesNextPage > 1}
                    onScrolledBottom={this.onAllListScrolledBottom.bind(this)}
                    nextPage={allArticlesNextPage}
                    onArticleClicked={this.onLinkClicked.bind(this)}
                    clickedArticles={clickedLinks}
          >
            <BlogListControlPanel isTilesOptionSelected={isTilesOptionSelected}
                                  isListOptionSelected={isListOptionSelected}
                                  onTilesOptionClick={this.onTilesOptionClick.bind(this)}
                                  onListOptionClick={this.onListOptionClick.bind(this)}
                                  isLoading={blogListLoading || allArticlesListLoading}
            />
          </BlogList>}
        <Message type="alert"
                 message="Błąd pobierania danych. Spróbuj ponownie!"
                 isVisible={blogListError || articlesError || allArticlesListError} />
      </div>
    );
  }
}

export default connect(mapPublicStateToProps, mapPublicDispatchToProps)(withStyles(style)(Home));
