// index.js
const { fetchMyIP } = require('./iss');
const { fetchCoordsByIP } = require('./iss')
const { fetchISSFlyOverTimes } = require('./iss')
const {nextISSTimesForMyLocation} = require('./iss')

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   }

//   console.log('It worked! Returned IP:', ip);
// });

// fetchCoordsByIP('142.114.128.35', (err, data) => {

//   if (err) {
//     console.log("Error:", err);
//     return;
//   }

//   console.log(`latitude and longitude: ${JSON.stringify(data)}`)

// });

// fetchISSFlyOverTimes({ longitude: '-79.8065', latitude: '43.6661' }, (err, data) => {

//   if (err) {
//     console.log(`there has been and error: ${err}`)
//   } else if (data == null) {
//     console.log(`something went wrong response code: ${response.statusCode}`)
//   } else {
//     console.log(`Times To View The ISS Are: ${data}`)
//   }


// });

const printPassTimes = function(passTimes) {
  for (const pass of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  printPassTimes(passTimes);
});

module.exports = {printPassTimes};
