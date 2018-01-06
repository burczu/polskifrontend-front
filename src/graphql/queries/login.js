export const authenticateQuery = (user, password) => {
  const query = `
    mutation {
      authenticate(user: "${user}", password: "${password}") {
        success
        token
      }
    }
  `;

  return JSON.stringify({ query });
};
