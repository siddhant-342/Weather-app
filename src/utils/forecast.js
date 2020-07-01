const request = require("request");

const forecast = (city, callback) => {

const url = "http://api.openweathermap.org/data/2.5/weather?q=" + decodeURIComponent(city) + "&APPID=aeb0f9d93984a8a3a87c0825529919b9&units=metric"
request({url, json:true }, (error, {body} = {}) => {

    if(error) {

        callback('Unable to connect to weather services.', undefined)

    } else if(body.cod == 404) {

        callback('Please enter a valid city name', undefined)

    } else {
        //callback(undefined, "It is currently " + (body.main.temp) + " degrees out there")
        callback(undefined,"<strong>" + body.weather[0].main + "</strong><br>It is currently " + body.main.temp + " degrees out there.<br> There is " + body.main.humidity + "% humidty.<br> Wind is blowing at " + body.wind.speed + "m/s." )
    }
})
}

module.exports = forecast 