/**
 * 
 * @param {String} data Data in object with .close attr.
 * @param {Number} period Period of willr. 
 */
function stoch(data, period) {
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

    var close = [],
      low = [],
      high = [];
    data.forEach(element => {
      close.push(element.close)
      low.push(element.low)
      high.push(element.high)
    })

    tulind.indicators.willr.indicator([high, low, close], [period], function (err, results) {
      modify(results[0], period)
      resolve(results[0])
    });

  })
}


module.exports = stoch;