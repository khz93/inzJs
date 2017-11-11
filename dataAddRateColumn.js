const sma = require('./indicators/smaTulip');


function forecast(data, smaPeriod) {
  return new Promise(resolve => {
    sma(data, smaPeriod)
      .then(data => {

        for (let i = 0; i < data.length - smaPeriod + 1; i++) {
          let diff = (data[i + smaPeriod - 1].sma / data[i].close);

          switch (true) {
            case (diff < 0.998):
              data[i].forecast = 0.1;
              break;
            case (diff < 0.999):
              data[i].forecast = 0.3;
              break;
            case (diff >= 0.999 && diff <= 1.001):
              data[i].forecast = 0.5;
              break;
            case (diff > 1.002):
              data[i].forecast = 0.7;
              break;
            case (diff > 1.001):
              data[i].forecast = 0.9;
              break;
          }
        }
        data.forEach(element => {
          delete element.sma;
        })

        resolve(data)
      })
  })
}

module.exports = forecast;