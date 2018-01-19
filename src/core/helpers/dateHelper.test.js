/* eslint-disable */
import { expect } from 'chai';
import dateHelper from './dateHelper';

describe('dateHelper', () => {
  const oneHour = 60 * 60 * 1000; // ms
  const oneDay = 60 * 60 * 24 * 1000; // ms

  it('checks if it\'s today correctly', () => {
    const todayDate = Date.now() - (oneHour * 5);
    const yesterdayDate = Date.now() - (oneHour * 30);

    expect(dateHelper.isToday(todayDate)).to.be.true;
    expect(dateHelper.isToday(yesterdayDate)).to.be.false;
  });

  it('throws exception if given date is later than now', () => {
    const laterDate = Date.now() + (oneHour * 5);
    const expectedMessage = 'Given date should be earlier than now';

    expect(() => dateHelper.isToday(laterDate)).to.throw(expectedMessage);
  });

  it('checks it the date is in this week correctly', () => {
    const thisWeekDate = Date.now() - (oneDay * 2);
    const previousWeekDate = Date.now() - (oneDay * 10);

    expect(dateHelper.isThisWeek(thisWeekDate)).to.be.true;
    expect(dateHelper.isThisWeek(previousWeekDate)).to.be.false;
  });



  it('throws exception if given date is later than now', () => {
    const laterDate = Date.now() + (oneDay * 5);
    const expectedMessage = 'Given date should be earlier than now';

    expect(() => dateHelper.isThisWeek(laterDate)).to.throw(expectedMessage);
  });
});
