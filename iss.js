// https://api.ipify.org?format=json

const { Request } = require('request');
const request = require('request');

/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
// const fetchMyIP = function (callback) {
//   // use request to fetch IP address from JSON API
//   request(`https://api.ipify.org?format=json`, (err, response, body) => {
//     if (err) {
//       callback(err, null)
//     } else if (response.statusCode === 200) {
//       let data = JSON.parse(body);
//       callback(null, data.ip)
//     } else if (response.statusCode != 200) {
//       const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
//       callback(Error(msg), null);
//     }
//   })
// };



const fetchCoordsByIP = function (ip, callback) {
  request(`https://freegeoip.app/json/${ip}`, (err, response, body) => {

    data = JSON.parse(body)
    // console.log(data)
    let latLong = {}
    latLong['longitude'] = data.longitude
    latLong['latitude'] = data.latitude

    if (err) {
      callback(err, null)
    } else if (response.statusCode !== 200) {
      let msg = `something went wrong`
      callback(Error(msg), null)
    } else {
      callback(null, latLong)
    }

  })
};



module.exports = { //fetchMyIP,
  fetchCoordsByIP
};