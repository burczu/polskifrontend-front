export const getArticlesQuery = (page) => {
  const query = `
    query {
      articles(page: ${page}) {
        articles {
          _id,
          title,
          href,
          description,
          date,
          slug,
          _blog {
            _id,
            name,
            href,
            rss,
            favicon,
            slug,
            publishedDate
          },
        }
        nextPage
      }
    }`;

  return JSON.stringify({ query });
};

export const getArticleBySlugQuery = (slug) => {
  const query = `
    query {
      articleBySlug(slug: "${slug}") {
        _id,
        title,
        href,
        description,
        date,
        slug,
        _blog {
          _id,
          name,
          href,
          rss,
          favicon,
          slug,
          publishedDate
        }
      }
    }
  `;

  return JSON.stringify({ query });
};

