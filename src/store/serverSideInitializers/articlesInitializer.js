import fetch from '../../core/fetch';
import { apiUrl, getDefaultHeaders } from '../../config';
import { getArticleBySlugQuery } from '../../graphql/queries/articles';

export default async function getArticlesInitialState(slug, state) {
  const url = `${apiUrl}/articles/graphql`;
  const getData = async() => {
    const response = await fetch(url, {
      headers: getDefaultHeaders(),
      body: getArticleBySlugQuery(slug),
      method: 'POST'
    });
    return await response.json();
  };

  const remoteData = await getData();
  if (remoteData) {
    state.article = remoteData.data.articleBySlug;
    state.articleLoaded = true;
    state.articleLoading = false;
    state.articleError = false;
  } else {
    state.articleError = true;
  }

  return state;
}
