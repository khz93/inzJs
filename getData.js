/**
 * 
 * @param {String} pair Path to file.
 * @returns {Promise} Values.
 */
function data(pair) {
  return new Promise((resolve, reject) => {
    const fs = require('fs');
    const readline = require('readline');

    var values = {
      pair: pair,
      date: [],
      time: [],
      open: [],
      high: [],
      low: [],
      close: [],
    }

    const myInterface = readline.createInterface({
      input: fs.createReadStream(pair)
    });

    myInterface.on('line', (line) => {
      var temp = line.split(',')

      var close = temp[6],
        open = temp[3],
        high = temp[4],
        low = temp[5],
        date = temp[1],
        time = temp[2]

      values.date.push(date);
      values.time.push(time);
      values.open.push(open);
      values.high.push(high);
      values.low.push(low);
      values.close.push(close);
    });

    myInterface.on('close', () => {
      resolve(values)
    })
  })
}

module.exports = data