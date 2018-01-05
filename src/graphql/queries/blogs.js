export const getBlogsQuery = (page) => {
  const query =
    `query {
      blogs(page: ${page}) {
        blogs {
          _id,
          name,
          href,
          rss,
          favicon,
          slug,
          publishedDate,
          articles {
            _id,
            title,
            href,
            description,
            summary,
            date,
            slug
          }
        },
        nextPage
      }
    }`;

  return JSON.stringify({ query });
};
