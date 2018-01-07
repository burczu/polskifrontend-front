export const authenticateQuery = (user, password) => {
  const query = `
    mutation {
      userAuthenticate(user: "${user}", password: "${password}") {
        success
        token
      }
    }
  `;

  return JSON.stringify({ query });
};
