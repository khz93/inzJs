//ADD NEW VALUES THROUGH PARAM
/**
 * 
 * @param {String} data Data in object with .close attr.
 * @param {Number} fast Fast period.
 * @param {Number} slow Slow period.
 * @param {Number} signal Signal period.
 */
function ema(data, fast, slow, signal) {
  return new Promise((resolve, reject) => {
    const tulind = require('tulind');

    function modify(temp, vel) {
      // temp.forEach((elem, ind) => {
      //   temp[ind] = parseFloat(elem.toString().slice(0, 8))
      // })
      for (var i = 1; i < vel; i++) {
        temp.unshift(0)
      }
    }

    var close = [];
    data.forEach(element => {
      close.push(element.close)
    })

    tulind.indicators.macd.indicator([close], [fast, slow, signal], function (err, results) {
      modify(results[0], slow)
      modify(results[1], slow)
      modify(results[2], slow)
      resolve({
        macd: results[0],
        signal: results[1],
        histogram: results[2],
      })
    });

  })
}


module.exports = ema;