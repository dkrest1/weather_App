const request = require("request");

// forcast
const forcast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=bb506fa77862863e6f1808e97be9cc68&query=${latitude},${longitude}&units=m`;
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback(
        "Can't connect to weather api, check your connection",
        undefined
      );
    } else if (body.error) {
      callback("check the latitude and longitude you supply", undefined);
    } else {
      callback(
        undefined,
        `the weather is ${body.current.weather_descriptions[0]}, and temperature is ${body.current.temperature} degree celcius, but feels like ${body.current.feelslike} degree celcius`
      );
    }
  });
};

module.exports = forcast;
