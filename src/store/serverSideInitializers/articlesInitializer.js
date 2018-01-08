import { initialState as articlesState } from '../../reducers/public/articles';
import fetch from '../../core/fetch';
import { apiUrl, getDefaultHeaders } from '../../config';
import { getArticleBySlugQuery } from '../../graphql/queries/articles';

const getData = async(slug) => {
  const url = `${apiUrl}/public/graphql`;
  const response = await fetch(url, {
    headers: getDefaultHeaders(),
    body: getArticleBySlugQuery(slug),
    method: 'POST'
  });

  return await response.json();
};

export default async function getArticlesInitialState(slug) {
  try {
    const remoteData = await getData(slug);
    const { errors } = remoteData;

    if (!errors) {
      articlesState.article = remoteData.data.articleBySlug;
      articlesState.articleLoading = false;
      articlesState.articleError = false;
    } else {
      articlesState.articleError = true;
    }
  } catch (error) {
    articlesState.articleError = true;
    articlesState.dataLoaded = true;
  }

  return articlesState;
}
