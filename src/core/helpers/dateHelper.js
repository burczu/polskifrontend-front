const oneDay = 60 * 60 * 24 * 1000; // ms
const oneWeek = oneDay * 7;

export default {
  isToday: (date) => {
    const now = Date.now();
    if (now < date) {
      throw new Error('Given date should be earlier than now');
    }

    return (now - date) < oneDay;
  },
  isThisWeek: (date) => {
    const now = Date.now();
    if (now < date) {
      throw new Error('Given date should be earlier than now');
    }

    return now - date < oneWeek;
  }
};
