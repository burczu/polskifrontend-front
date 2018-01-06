export const getAllNewsesQuery = (page) => {
  const query = `
    {
      getAll(page: ${page}) {
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
