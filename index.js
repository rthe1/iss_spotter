// index.js
// const { fetchMyIP } = require('./iss');
const { fetchCoordsByIP } = require('./iss')

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   }

//   console.log('It worked! Returned IP:', ip);
// });

fetchCoordsByIP('142.114.128.35',(err,data) => {

  if (err) {
    console.log("Error:", err);
    return;
  }

console.log(`latitude and longitude: ${JSON.stringify(data)}`)

});