const oneDay = 60 * 60 * 24 * 1000; // ms
const oneWeek = oneDay * 7;

export default {
  isToday: (date) => {
    return (Date.now() - date) < oneDay;
  },
  isThisWeek: (date) => {
    return (Date.now() - date) < oneWeek;
  }
};
