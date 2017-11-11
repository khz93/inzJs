const tulind = require('tulind');
const fs = require('fs')

// DATA PARSERS
intervalParser = require('./dataParsingInterval');
addRateColumn = require('./dataAddRateColumn');


// INDICATORS
const di = require('./indicators/diTulip'),
  boll = require('./indicators/bollTulip'),
  ema = require('./indicators/emaTulip'),
  macd = require('./indicators/macdTulip'),
  rsi = require('./indicators/rsiTulip'),
  sma = require('./indicators/smaTulip'),
  stoch = require('./indicators/stochTulip'),
  cci = require('./indicators/cciTulip'),
  willr = require('./indicators/willrTulip'),
  trix = require('./indicators/trixTulip'),
  roc = require('./indicators/rocTulip')


// TESTS
const diTest = require('./tests/dmTest')


// FUNCTIONS
function searchForArray(haystack, needle) {
  var i, j, current;
  for (i = 0; i < haystack.length; ++i) {
    if (needle.length === haystack[i].length) {
      current = haystack[i];
      for (j = 0; j < needle.length && needle[j] === current[j]; ++j);
      if (j === needle.length)
        return i;
    }
  }
  return -1;
}

function getRandom(percent) {
  var value = (Math.floor(Math.random() * ((100 + percent) - (100 - percent) + 1) + (100 - percent))) / 100
  return value
}

function popSorting(array) {
  array.sort((a, b) => {
    if (a[2] < b[2]) return 1;
    if (a[2] > b[2]) return -1;
    return 0;
  })
}


// APP
intervalParser('./data/EURUSD.txt', 480)
  .then(parsedData => {
    addRateColumn(parsedData, 10)
    .then((data) => {
      data.forEach(element => {
        console.log(element.forecast)
      })
    })
  })