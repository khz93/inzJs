const tulind = require('tulind');
const fs = require('fs')
/**
 * 
 * @param {string} data data with plus_di and minus_di params 
 * @param {number} gainProfit difference of plus and minus after which position is closed
 */
function dmTest(data, gainProfit) {
  return new Promise(resolve => {
    //GAME VARIABLES

    var cash = 1,
        op = 0, //open positions
        transactionsAmount = 0,
        transactions = [];

    function pushing(data, turn) {
      transactions.push({
        date: data.date,
        time: data.time,
        price: data.close,
        turn: turn,
        diff: diff,
        cash: cash,
      })
    }

    for (let i = 1; i < data.length - 1; i++) {
      var diff = (data[i].plus_di - data[i].minus_di);
      var change = (((data[i - 1].plus_di - data[i - 1].minus_di) < 0 && (data[i].plus_di - data[i].minus_di) > 0) ||
                    ((data[i - 1].plus_di - data[i - 1].minus_di) > 0 && (data[i].plus_di - data[i].minus_di) < 0))
      switch (true){
        case (change && diff > 0 && op == 0):
          pushing(data[i], 'buy');
          cash = cash / data[i].close;
          op = 1;
          transactionsAmount++;
          break;
        case (change && diff < 0 && op == 0):
          pushing(data[i], 'sell');
          cash = cash * data[i].close;
          op = -1;
          transactionsAmount++;
          break;
        case (diff  > 0 && op == -1):
          cash = cash / data[i].close;
          pushing(data[i], 'closeAndBuy');
          cash = cash / data[i].close;
          op = 1;
          transactionsAmount++;
          break;
        case (diff  < 0 && op == 1):
          cash = cash * data[i].close;
          pushing(data[i], 'closeAndSell');
          cash = cash * data[i].close;
          op = -1;
          transactionsAmount++;
          break;
        case (diff > gainProfit && op == 1):
          cash = cash * data[i].close;
          op = 0;
          pushing(data[i], 'close');
          break;
        case (Math.abs(diff) > gainProfit && op == -1):
          cash = cash / data[i].close;
          op = 0;
          pushing(data[i], 'close');
          break;
        }
    }
    if (op == 1) {
      cash = cash * data[data.length - 1].close
      transactionsAmount++
      pushing(data[data.length - 1], 'sellAndClose');
    } else if (op == -1) {
      cash = cash / data[data.length - 1].close
      transactionsAmount++
      pushing(data[data.length - 1], 'buyAndClose');
      
    }
    resolve({
      cash: cash,
      transactionsAmount: transactionsAmount,
      transactions: transactions,
    })
  })
}

module.exports = dmTest;