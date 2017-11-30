const _ = require('lodash');
const { failOnError, withScales, draw50By50Square, drawSquare } = require('../helpers');

module.exports = {
  tags: ['geometry'],
  before: (browser) => {
    failOnError(withScales(browser))
      .url(browser.globals.devServerURL)
      .resizeWindow(1000, 800);
  },
  beforeEach: (browser) => {
    browser
      .refresh()
      .waitForElementVisible('.modal .new-floorplan', 5000)
      .setFlagOnError()
      .click('.modal .new-floorplan svg')
      .getScales();
  },
  afterEach: (browser, done) => {
    browser
      .checkForErrors();
    done();
  },
  after: (browser) => { browser.end(); },
  'duplicate vertex case': (browser) => {
    browser
      .perform(draw50By50Square)
      .click('[data-object-type="spaces"] .add-new')
      .perform(drawSquare(0, 50, 20, -20))
      .click('[data-object-type="spaces"] .rows > div:nth-child(1)')
      .perform(drawSquare(0, 50, 10, -30))
      .assert.validGeometry();
  },
};
