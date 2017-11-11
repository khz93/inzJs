var MACD = function (fast, slow, signal) {
  return new Promise((resolve, reject) => {
    const fs = require('fs');
    const readline = require('readline');
    const myInterface = readline.createInterface({
      input: fs.createReadStream('EURUSD.txt')
    });

    var valuesEurUsd = [];

    myInterface.on('line', (line) => {
      var temp = line.split(',')
      var close = temp[6];
      close = parseFloat(close)
      valuesEurUsd.push(close)
    });

    myInterface.on('close', () => {
      MACDIndicator = require('technicalindicators').MACD;
      var prices = valuesEurUsd.slice(1);
      var MACDInput = {
        values: prices,
        fastPeriod: fast,
        slowPeriod: slow,
        signalPeriod: signal,
        SimpleMAOscillator: true,
        SimpleMASignal: true

      }
      var macd = MACDIndicator.calculate(MACDInput)
      var modify = function(temp,vel){
        for (var i = 1; i < vel; i++) {
          temp.unshift(0)
        }
      }
      modify(macd,slow)

      resolve({
        MACD: MACDIndicator.calculate(MACDInput),
      })
    })
  })
}

module.exports = MACD;