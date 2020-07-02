const path = require('path') 
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast.js')

const app = express()

const port = process.env.PORT || 3000 

// Define paths for express config
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
const publicDirectoryPath = path.join(__dirname, '../public')

// Setup handlebar engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {

    res.render('index', {
        title: 'Weather App',
        name: 'Siddhant'

    })
})

app.get('/about', (req, res) => {

    res.render('about', {
        title: 'About',
        name : 'Siddhant'

    })
})

app.get('/help', (req, res) => {

    res.render('help',{
        title: 'Help',
        message: 'We are always here to help you. Just enter your city name in the box and hit enter or click on search button.',
        name: 'Siddhant'

    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Siddhant',
        errorMessage: 'Help article not found.'
        
    })

})

app.get('/weather', (req, res) => {

    if(!req.query.city) {
        return res.send({
            error: 'Please provide a City'})

    }
    forecast(req.query.city , (error, forecast) => {
        if(error) {
    
            return res.send({error})
    
        } else {
       return res.send({forecast})
      }})

    })


app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Siddhant',
        errorMessage: 'Page not found'
        

    })

})

app.listen(port, () => {
    console.log('Server is up on port '+ port)
})