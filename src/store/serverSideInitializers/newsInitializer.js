import { initialState as newsState } from '../../reducers/news';
import fetch from '../../core/fetch';
import { apiUrl, getDefaultHeaders } from '../../config';
import { getAllNewsesQuery } from '../../graphql/queries/news';

const getData = async() => {
  const url = `${apiUrl}/public/graphql`;
  const response = await fetch(url, {
    headers: getDefaultHeaders(),
    body: getAllNewsesQuery(1),
    method: 'POST'
  });

  return await response.json();
};

export default async function getNewsInitialState() {
  const remoteData = await getData();
  const { errors } = remoteData;
  if (!errors) {
    const { newses, nextPage } = remoteData.data.newses;
    newsState.newsList = newses;
    newsState.newsListNextPage = nextPage;
  }

  return newsState;
}
