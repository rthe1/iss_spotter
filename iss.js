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

const fetchMyIP = function (callback) {
  // use request to fetch IP address from JSON API
  request(`https://api.ipify.org?format=json`, (err, response, body) => {
    if (err) {
      callback(err, null)
      return;
    } else if (response.statusCode === 200) {
      let data = JSON.parse(body);
      callback(null, data.ip)
      return;
    } else if (response.statusCode != 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
  })
};


//defined function
const fetchCoordsByIP = function (ip, callback) {
  request(`https://freegeoip.app/json/${ip}`, (err, response, body) => {

    data = JSON.parse(body)
    // console.log(data)
    let latLong = {}
    latLong['longitude'] = data.longitude
    latLong['latitude'] = data.latitude

    if (err) {
      callback(err, null)
      return;
    } else if (response.statusCode !== 200) {
      let msg = `something went wrong`
      callback(Error(msg), null)
      return;
    } else {
      callback(null, latLong)
      return;
    }

  })
};
//defined function
const fetchISSFlyOverTimes = function (coords, callback) {
  request(`https://iss-pass.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`,
    (err, response, body) => {

      if (err) {
        callback(err, null)
        return;
      } else if (response.statusCode !== 200) {
        let msg = `something went wrong`
        callback(Error(msg), null)
        return;
      } else {
        const passes = JSON.parse(body).response;
        callback(null, passes);
        return;
      }




    })
};

/**
 * Orchestrates multiple API requests in order to determine the next 5 upcoming ISS fly overs for the user's current location.
 * Input:
 *   - A callback with an error or results. 
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly-over times as an array (null if error):
 *     [ { risetime: <number>, duration: <number> }, ... ]
 */
const nextISSTimesForMyLocation = function (callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      return callback(error, null);
    }

    fetchCoordsByIP(ip, (error, loc) => {
      if (error) {
        return callback(error, null);
      }

      fetchISSFlyOverTimes(loc, (error, nextPasses) => {
        if (error) {
          return callback(error, null);
        }

        callback(null, nextPasses);
      });
    });
  });
};


module.exports = { //fetchMyIP,
  fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation
};