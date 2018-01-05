import { initialState as homeState } from '../../reducers/home';
import fetch from '../../core/fetch';
import { apiUrl, getDefaultHeaders } from '../../config';
import { getBlogsQuery } from '../../graphql/queries/blogs';

const getData = async(settings) => {
  const url = settings.tiles ? `${apiUrl}/blogs/graphql` : `${apiUrl}/articles/all/1`;
  const options = {
    headers: getDefaultHeaders(),
    method: settings.tiles ? 'POST' : 'GET'
  };
  if (settings.tiles) {
    options.body = getBlogsQuery(1);
  }
  const response = await fetch(url, options);

  return await response.json();
};

export default async function getHomeInitialState(settings) {
  try {
    // set up settings stored in cookies
    homeState.isTilesOptionSelected = settings.tiles;
    homeState.isListOptionSelected = !settings.tiles;
    homeState.clickedLinks = settings.clickedLinks || [];

    const remoteData = await getData(settings);
    if (remoteData) {
      if (settings.tiles) {
        const { blogs, nextPage, errors } = remoteData.data.blogs;

        if (!errors) {
          homeState.blogList = blogs;
          homeState.blogListNextPage = nextPage;
        }
      } else {
        homeState.allArticlesList = remoteData.articles;
        homeState.allArticlesNextPage = remoteData.nextPage;
      }
    }
  } catch (error) {
    console.log(error); // eslint-disable-line
  }

  return homeState;
}
