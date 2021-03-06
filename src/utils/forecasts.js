const request = require( 'request' )

const forecast = ( lat , long , callback ) => {
    const url ='http://api.weatherstack.com/current?access_key=a9aecf0b67930bfc951c123acf44413a&query=' + lat + ',' + long + '&units=m'
    request( { url  , json : true } , ( error , { body } ) => {
        if( error )
        {
            callback( 'Unable to connect to weather service' , undefined )
        }
        else if( body.error )
        {
            callback( 'Unable to find location' , undefined )
        }
        else
        {
            
            callback( undefined , 'It is currently '+ body.current.temperature + ' degrees out. There is a '+ 
                     body.current.precip + '% chance of rain. Summary : ' + body.current.weather_descriptions[0] + '\n Humidity : ' + 
                     body.current.humidity + '\n Pressure : ' + body.current.pressure)
        }
    })
}


module.exports = forecast