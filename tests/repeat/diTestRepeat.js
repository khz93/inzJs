const math = require('mathjs');

const diTest = require('../cash/diTest')

/**
 * 
 * @param {String} data data after indicator's job
 * @param {Number} gainProfit difference of plus and minus after which position is closed
 */
function diTestRepeat (data, gainProfit) {
  return new Promise(resolveFun => {
    var parts = [];
    var length = Math.floor(data.length / 5);
    var data1 = data.slice(0,length),
        data2 = data.slice(length, 2*length),
        data3 = data.slice(length*2, length*3),
        data4 = data.slice(length*3, length*4),
        data5 = data.slice(data*4);
    
    data = [data1, data2, data3, data4, data5];
  
    (function iteration(i){
      new Promise(resolve => {
        if (i < 5){
          new Promise(resolveIter => {
            diTest(data[i], gainProfit)
            .then(results => {
              parts.push(results.cash)
              iteration(i+1);
            })
          })
        } else {
          resolveFun(math.std(parts, 'uncorrected'))
        }
      })
    })(0)

  })
}

module.exports = diTestRepeat;