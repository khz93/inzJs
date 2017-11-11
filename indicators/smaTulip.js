/**
 * 
 * @param {string} data Data in object with .close attr.
 * @param {number} period Period of sma.
 */
function sma(data, period) {
  return new Promise((resolve, reject) => {
    const tulind = require('tulind');


    var close = [];

    data.forEach(element => {
      close.push(element.close);
    })

    tulind.indicators.sma.indicator([close], [period], function (err, results) {
      data.reverse();
      results[0].reverse();

      for(i = 0; i < data.length; i++){
        data[i].sma = results[0][i];
      }

      data.reverse();
      
      resolve(data);
    });

  })
}


module.exports = sma;