// DATA PARSERS
const intervalParser = require('./dataParsingInterval'),
  addRateColumn = require('./dataAddRateColumn');


// INDICATORS
const di = require('./indicators/diTulip');


// TESTS
const diTestRepeat = require('./tests/repeat/diTestRepeat');


// FUNCTIONS
function searchForArray(haystack, needle) {
  var i, j, current;
  for (i = 0; i < haystack.length; ++i) {
    if (needle.length === haystack[i].length) {
      current = haystack[i];
      for (j = 0; j < needle.length && needle[j] === current[j]; ++j);
      if (j === needle.length)
        return i;
    }
  }
  return -1;
}

function getRandom(percent) {
  var value = (Math.floor(Math.random() * ((100 + percent) - (100 - percent) + 1) + (100 - percent))) / 100
  return value
}

function popSorting(array) {
  array.sort((a, b) => {
    if (a[2] > b[2]) return 1;
    if (a[2] < b[2]) return -1;
    return 0;
  })
}


// APP
intervalParser('./data/EURUSD.txt', 30)
  .then(parsedData => {
    //GENETIC ALGORITHM
    var population = [];
    var dead = [];
    // FIRST VARIATION
    for (let i = 0; i < 10; i++) {
      population.push([Math.ceil(Math.random() * 1000), Math.ceil(Math.random() * 20), 0])
    }
    (function nextGeneration(pop) {
      console.log(population)
      population = pop;
      // SELECTION PART 2
      new Promise(resolve => {
          (function popIteration(i) {
            if (i < 10) {
              new Promise(resolvePop => {
                  //  \/- timer interval
                  if (parsedData.length / 5 < population[i][0]) {
                    population[i][2] = 1;
                  } else {
                    di(parsedData, population[i][0])
                    .then(postIndData => {
                      diTestRepeat(postIndData, population[i][1])
                        .then(results => {
                          population[i][2] = results;
                          // } else {
                          // dead.push([population[i][0], population[i][1]])
                          // }
                          resolvePop()
                        })
                    })
                  }
                  
                })
                .then(() => {
                  popIteration(i + 1)
                })
            } else {
              popSorting(population)

              for (let i = 2; i < 10; i++) {
                dead.push([population[i][0], population[i][1]]);
              }
              for (let k = 2; k < 10; k++) {



                population[k][0] = Math.ceil(((population[0][0] + population[1][0])/2) * getRandom(5));
                population[k][1] = Math.ceil(((population[0][1] + population[1][1])/2) * getRandom(5));
                while (searchForArray(dead, [population[k][0], population[k][1]]) != -1 || (population[k][0] > 1000 && population[k][1] > 50)) {
                  population[k][0] = Math.ceil(((population[k][0] + population[k][0])/2) * getRandom(20));
                  population[k][1] = Math.ceil(((population[k][1] + population[k][1])/2) * getRandom(20));
                }
              }
              resolve(population)
            }
          })(0);
        })
        .then(population => {
          nextGeneration(population)
        })
    })(population)
  })