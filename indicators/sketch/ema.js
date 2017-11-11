var ema = function (fast, slow) {
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
      emaIndicator = require('technicalindicators').ema;
      var prices = valuesEurUsd.slice(1);
      var fastEMA = emaIndicator({
        period: fast,
        values: prices
      })
      var slowEMA = emaIndicator({
        period: slow,
        values: prices
      })
      var modify = function(temp,vel){
        temp.forEach((elem, ind)=>{
          temp[ind] = parseFloat(elem.toString().slice(0,8))
        })
        for (var i = 1; i < vel; i++) {
          temp.unshift(0)
        }
      }
      modify(fastEMA, fast);
      modify(slowEMA,slow);
      resolve({
        fastEMA: fastEMA,
        slowEMA: slowEMA,
      })
    })
  })
}

module.exports = ema;