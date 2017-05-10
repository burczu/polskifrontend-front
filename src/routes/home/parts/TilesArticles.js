import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './TilesArticles.styl';
import dateFormat from 'dateformat';
import { decode } from 'he';
import * as dateHelper from '../../../core/helpers/dateHelper';
import Link from '../../../components/Link/Link';

const TilesArticles = props => {
  return (
    <div className={styles.items}>
      {(props.articles || []).map((article, artIndex) => {
        const isTodayArticle = dateHelper.isToday(new Date(article.date));
        const clicked = props.clickedArticles.find(art => art.url === article.href);
        let itemClass = `${styles.item} ${isTodayArticle ? styles['item--today'] : ''}`;
        let buttonItemClass = `${styles['buttons__item']} ${isTodayArticle ? styles['buttons__item--today'] : ''}`;
        let tagClass = `${styles['item__new']} ${isTodayArticle ? styles['item__new--visible'] : ''}`;
        itemClass = `${itemClass} ${clicked ? styles['item--clicked'] : ''}`;
        buttonItemClass = `${buttonItemClass} ${clicked ? styles['buttons__item--clicked'] : ''}`;
        tagClass = `${tagClass} ${clicked ? styles['item__new--clicked'] : ''}`;

        const description = article.description ? decode(article.description.replace(/(<([^>]+)>)/ig, '')).substr(0, 150) : '';

        return (
          <div className={itemClass} key={artIndex}>
            <div className={styles.article}>
              <h3 className={styles['article__header']}>
                <span className={tagClass}>Nowość</span>
                <Link to={`/artykuly/${article.slug}`}
                      onMouseUp={props.onArticleClicked.bind(this, article.href, isTodayArticle)}
                      onTouchStart={props.onArticleClicked.bind(this, article.href, isTodayArticle)}
                >{article.title}</Link>
              </h3>
              <div className={styles['meta']}>
                <p className={styles['meta__date']}>
                  <span>
                    <a href={props.blogHref} target="_blank" title={props.blogName}>{props.blogName}</a>
                  </span> | {dateFormat(article.date, 'dd-mm-yyyy')}
                </p>
                <p className={styles['meta__description']}>
                  {`${description}...`}
                </p>
              </div>
            </div>
            <div className={styles.buttons}>
              <div className={styles['buttons__container']}>
                <div className={styles['buttons__wrapper']}>
                  {isTodayArticle && !clicked
                    ? <a href=""
                         className={buttonItemClass}
                         onMouseUp={props.onArticleClicked.bind(this, article.href, isTodayArticle)}
                         onTouchStart={props.onArticleClicked.bind(this, article.href, isTodayArticle)}
                         onClick={(event) => event.preventDefault()}
                    >
                      <i className="fa fa-check">
                      </i>
                      <span className={styles['buttons__text']}>Czytany</span>
                    </a>
                    : null}
                  <Link className={buttonItemClass}
                        to={`/artykuly/${article.slug}`}
                        onMouseUp={props.onArticleClicked.bind(this, article.href, isTodayArticle)}
                        onTouchStart={props.onArticleClicked.bind(this, article.href, isTodayArticle)}
                  >
                    <i className="fa fa-folder">
                    </i>
                    <span className={styles['buttons__text']}>Otwórz</span>
                  </Link>
                  <a href={article.href}
                     className={buttonItemClass}
                     rel="nofollow"
                     target="_blank"
                     onMouseUp={props.onArticleClicked.bind(this, article.href, isTodayArticle)}
                     onTouchStart={props.onArticleClicked.bind(this, article.href, isTodayArticle)}
                  >
                    <i className="fa fa-link">
                    </i>
                    <span className={styles['buttons__text']}>Oryginał</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  );
};

TilesArticles.propTypes = {
  articles: PropTypes.array.isRequired,
  blogHref: PropTypes.string.isRequired,
  blogName: PropTypes.string.isRequired,
  clickedArticles: PropTypes.array.isRequired,
  onArticleClicked: PropTypes.func.isRequired
};

export default withStyles(styles)(TilesArticles);
