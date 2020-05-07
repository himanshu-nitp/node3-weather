const path = require( 'path' )
const express = require( 'express' )
const hbs = require( 'hbs' )
const geocode = require( './utils/geocode' )
const forecast = require( './utils/forecasts' )


const app = express()
const port = process.env.PORT || 3000

//Define paths for Express config
const publicDirectory = path.join( __dirname, '../public' )
const viewsPath = path.join( __dirname , '../templates/views')
const partialPath = path.join( __dirname, '../templates/partials')


//Setup handlebars engine and views location
app.set( 'view engine' , 'hbs' )
app.set( 'views' , viewsPath )
hbs.registerPartials( partialPath)

// Setup static directory to serve
app.use( express.static(publicDirectory) )


app.get( '' , ( req , res ) => {
    res.render( 'index' , {
        title : 'Weather',
        name : 'X1'
    })
})

app.get( '/about' , ( req , res ) => {
    res.render( 'about' , {
        title : "About",
        name : 'Y1'
    })
})
app.get( '/help' , ( req , res ) => {
    res.render( 'help' , {
        title : "Help",
        message : "How may i help you ?",
        name : "Z1"
    })
})


app.get( '/weather' , ( req ,  res ) => {
    if( !req.query.address )
    {
        return res.send({
            error : "Provide an address"
        })
    }
    geocode( req.query.address  , ( error, { lat , long , location} = {} ) => {

        if( error )
        {
            return res.send({
                error
            })
        }
        
    
        forecast( lat, long , (error, forecastData) => {
            if( error )
            {
                return res.send( { error } )
            }
    
    
            res.send({
                location,
                forecast : forecastData,
                address : req.query.address


            } )
            
        })
    })
    



    // res.send({
    //     address : req.query.address 
    // })
})

app.get( '/products' , ( req , res ) => {
    if( !req.query.search ) {
        return res.send({
            error : "You must provide a search term"
        })
        
    }
    res.send({
        products: []
    })
})

app.get( '/help/*' , (req, res ) => {
    res.render('404-page',
    {
        title : 'Error 404',
        msg : "Help article not found",
        name : 'PK'
    })
})

app.get( '*' , ( req , res ) => {
    res.render('404-page',
    {
        title : 'Error 404',
        msg : "Page not found",
        name : 'PK'
    })
})

app.listen( port , () => {
    console.log( 'server is up on port number '+ port )
})