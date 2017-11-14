// DATA PARSERS
const intervalParser = require('./dataParsingInterval'),
      addRateColumn = require('./dataAddRateColumn');


// INDICATORS
const di = require('./indicators/diTulip');


// TESTS
const diTest = require('./tests/cash/diTest');


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


// TODO random przechylić na stronę 0.x
function getRandom(percent) {
  var value = (Math.floor(Math.random() * ((100 + percent) - (100 - percent) + 1) + (100 - percent))) / 100
  return value
}

function popSorting(array) {
  array.sort((a, b) => {
    if (a[2] < b[2]) return 1;
    if (a[2] > b[2]) return -1;
    return 0;
  })
}


// APP
intervalParser('./data/EURUSD.txt', 15)
.then(parsedData => {
  //GENETIC ALGORITHM
  var population = [];
  var dead = [];
  // FIRST VARIATION
  for (let i = 0; i < 10; i++) {
    population.push([Math.ceil(Math.random() * 1000), Math.ceil(Math.random() * 20), 0])
  }
  (function nextGeneration(pop) {
    population = pop;
    // SELECTION PART 2
    new Promise(resolve => {
        (function popIteration(i) {
          if (i < 10) {
            new Promise(resolvePop => {
                di(parsedData, population[i][0])
                .then(postIndData => {
                  diTest(postIndData, population[i][1])
                  .then(results => {
                    // if (results.cash != 1) {
                    population[i][2] = results.cash;
                    // } else {
                    // dead.push([population[i][0], population[i][1]])
                    // }
                    resolvePop()
                  })
                })
              })
              .then(() => {
                popIteration(i + 1)
              })
          } else {
            popSorting(population)
            console.log(population)
            for (let i = 2; i < 10; i++) {
              dead.push([population[i][0], population[i][1]]);
            }
            for (let k = 2; k < 10; k++) {
              population[k][0] = Math.ceil(population[k][0] * getRandom(5));
              population[k][1] = Math.ceil(population[k][1] * getRandom(1));
              while (searchForArray(dead, [population[k][0], population[k][1]]) != -1 || (population[k][0] > 1000 && population[k][1] > 50)) {
                population[k][0] = Math.ceil(population[k][0] * getRandom(10));
                population[k][1] = Math.ceil(population[k][1] * getRandom(2));
              }
            }
            resolve(population)
          }
        })(2);
      })
      .then(population => {
        nextGeneration(population)
      })
  })(population)
})