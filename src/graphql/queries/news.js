export const getAllNewsesQuery = (page) => {
  const query = `
    {
      newses(page: ${page}) {
        newses {
          _id
          title
          message
          date
        }
        nextPage
      }
    }
  `;

  return JSON.stringify({ query });
};
