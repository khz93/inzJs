/**
 * 
 * @param {String} data Data in object with  .high .low attr.
 * @param {Number} period Period of values. 
 */
function di(data, period) {
  return new Promise((resolve, reject) => {
    const tulind = require('tulind');

    var close    = [],
        low      = [],
        high     = [];

    data.forEach(element => {
      close.push(element.close)
      low.push(element.low)
      high.push(element.high)
    })

    tulind.indicators.di.indicator([high, low, close], [period], function (err, results) {
      data.reverse();
      results[0].reverse();
      results[1].reverse();

      for(i = 0; i < data.length; i++){
        data[i].plus_di = results[0][i];
        data[i].minus_di = results[1][i];
      }

      data.reverse();
      
      resolve(data)
    });


  })
}


module.exports = di;