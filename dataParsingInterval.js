/**
 * 
 * @param {String | URL} file Path to the file.
 * @param {Number} interval Time interval.
 */


function dataParsinInterval(file, interval) {
  return new Promise((resolve, reject) => {
    const fs = require('fs');
    const readline = require('readline');

    const myInterface = readline.createInterface({
      input: fs.createReadStream(file)
    })

    var counter = 1;
    var tempValues = [];
    var tempObj = {};
    var finalArr = [];

    myInterface.on('line', (line) => {
      var temp = line.split(',');

      var pair  = temp[0]
          date  = temp[1],
          time  = temp[2],
          open  = temp[3],
          high  = temp[4],
          low   = temp[5],
          close = temp[6];

      if (counter == 1) {
        tempValues.push(pair)
        tempValues.push(date);
        tempValues.push(time);
        tempValues.push(open);
      }
      if (tempValues[4] == undefined || tempValues[4] < high) {
        tempValues[4] = high;
      }
      if (tempValues[5] == undefined || tempValues[5] > low) {
        tempValues[5] = low;
      }
      if (counter == interval) {
        tempValues[6] = close;

        tempObj.pair  = tempValues[0];
        tempObj.date  = tempValues[1];
        tempObj.time  = tempValues[2];
        tempObj.open  = tempValues[3];
        tempObj.high  = tempValues[4];
        tempObj.low   = tempValues[5];
        tempObj.close = tempValues[6];

        finalArr.push(tempObj);

        tempValues = [];
        tempObj = {};
        counter = 1;
      } else {
        counter++;
      }
    })
    myInterface.on('close', () => {
      resolve(finalArr)
    })
  })
}

module.exports = dataParsinInterval;
