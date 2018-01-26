/* eslint-disable */
import { expect } from 'chai';
import validators from './validators';

describe('validators', () => {
  it('can validate url correctly', () => {
    expect(validators.isUrlValid('test.pl')).to.be.true;
    expect(validators.isUrlValid('test.com')).to.be.true;
    expect(validators.isUrlValid('test.test')).to.be.true;
    expect(validators.isUrlValid('sub.test.pl')).to.be.true;
    expect(validators.isUrlValid('http://test.pl')).to.be.true;
    expect(validators.isUrlValid('https://test.pl')).to.be.true;
    expect(validators.isUrlValid('ftp://test.pl')).to.be.true;

    expect(validators.isUrlValid('test')).to.be.false;
    expect(validators.isUrlValid('test.123456')).to.be.false;
    expect(validators.isUrlValid('dsfs:/test.123456')).to.be.false;
    expect(validators.isUrlValid('dsfs/test.123456')).to.be.false;
    expect(validators.isUrlValid('dsfs:test.123456')).to.be.false;
  });

  it('can validate (expecting protocol) url correctly', () => {
    expect(validators.isUrlValidWithProtocol('http://test.pl')).to.be.true;
    expect(validators.isUrlValidWithProtocol('https://test.pl')).to.be.true;
    expect(validators.isUrlValidWithProtocol('ftp://test.pl')).to.be.true;
    expect(validators.isUrlValidWithProtocol('http://sub.test.pl')).to.be.true;
    expect(validators.isUrlValidWithProtocol('http://test.abcdefg')).to.be.true;

    expect(validators.isUrlValidWithProtocol('test.pl')).to.be.false;
    expect(validators.isUrlValidWithProtocol('saddas:test.pl')).to.be.false;
    expect(validators.isUrlValidWithProtocol('dsad:/test.pl')).to.be.false;
    expect(validators.isUrlValidWithProtocol('fdsfs//test.pl')).to.be.false;
    expect(validators.isUrlValidWithProtocol('http://ttest.12')).to.be.false;
  });

  it('can validate required values correctly', () => {
    expect(validators.isRequired('test')).to.be.true;

    expect(validators.isRequired()).to.be.false;
    expect(validators.isRequired(null)).to.be.false;
    expect(validators.isRequired(0)).to.be.false;
    expect(validators.isRequired(100)).to.be.false;
    expect(validators.isRequired({ test: 1 })).to.be.false;
  });

  it('can validate email correctly', () => {
    expect(validators.isEmailValid('test@test.pl')).to.be.true;
    expect(validators.isEmailValid('test@test.com')).to.be.true;
    expect(validators.isEmailValid('test@test.co.uk')).to.be.true;

    expect(validators.isEmailValid(('test'))).to.be.false;
    expect(validators.isEmailValid(('test@test'))).to.be.false;
    expect(validators.isEmailValid(('test@test.test'))).to.be.false;
  });
});
