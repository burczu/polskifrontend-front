export const submitFeedbackQuery = (email, feedback) => {
  const query = `
    mutation {
      feedbackSubmit(email: "${email}", feedback: "${feedback}")
    }
  `;

  return JSON.stringify({ query });
};
