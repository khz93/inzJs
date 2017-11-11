const tulind = require('tulind');
const fs = require('fs')


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
intervalParser = require('./dataParsingInterval')

var diTest = require('./tests/dmTest')


intervalParser('./data/EURUSD.txt', 60)
  .then(parsedData => {
    di(parsedData, 762)
      .then(postIndData => {
        diTest(postIndData, 64)
          .then(results => {
            console.log(results.cash)
            // results.transactions.forEach(element => {
            //   console.log(element.price, element.turn)
            // })
          })
      })
  })