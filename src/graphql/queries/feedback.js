export const submitFeedbackQuery = (email, feedback) => {
  const query = `
    mutation {
      submit(email: "${email}", feedback: "${feedback}")
    }
  `;

  return JSON.stringify({ query });
};
