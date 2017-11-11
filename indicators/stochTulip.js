/**
 * 
 * @param {String} data Data in object with .close attr.
 * @param {Number} kPeriod 
 * @param {Number} kSlowing 
 * @param {Number} dPeriod 
 */
function stoch(data, kPeriod, kSlowing, dPeriod) {
  return new Promise((resolve, reject) => {
    const tulind = require('tulind');

    function modify(temp, vel1, vel2, vel3) {
      var sum = vel1 + vel2 + vel3
      // temp.forEach((elem, ind) => {
      //   temp[ind] = parseFloat(elem.toString().slice(0, 8))
      // })
      for (var i = 1; i < sum - 2; i++) {
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

    tulind.indicators.stoch.indicator([high, low, close], [kPeriod, kSlowing, dPeriod], function (err, results) {
      modify(results[0], kPeriod, kSlowing, dPeriod)
      modify(results[1], kPeriod, kSlowing, dPeriod)
      resolve({
        stochK: results[0],
        stochD: results[1],
      })
    });

  })
}


module.exports = stoch;