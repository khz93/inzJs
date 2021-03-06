/**
 * 
 * @param {string} data Data in object with .close attr.
 * @param {number} period Period of roc.
 */
function sma(data, period) {
  return new Promise((resolve, reject) => {
    const tulind = require('tulind');

    function modify(temp, vel) {
      // temp.forEach((elem, ind) => {
      //   temp[ind] = parseFloat(elem.toString().slice(0, 8))
      // })
      for (var i = 1; i < vel+1; i++) {
        temp.unshift(0)
      }
    }

    var close = [];
    data.forEach(element => {
      close.push(element.close)
    })

    tulind.indicators.roc.indicator([close], [period], function (err, results) {
      modify(results[0], period)
      resolve(results[0])
    });

  })
}



module.exports = sma;