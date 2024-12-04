const express = require('express')
const path = require('path')

const app = express()

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use('/bootstrap', express.static(path.join(__dirname, 'node_modules/bootstrap/dist')))

const key = 'd8c1d68bf61f928228c39b0632f16ed0'
let city = 'Tartu'

app.get('/', (req, res) =>{
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`
    console.log(url)
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`)
    .then((response) =>{
        return response.json()
    })
    .then((data) =>{
        let description = data.weather[0].description  
        let city = data.name
        let temp = Math.round(parseFloat(data.main.temp)-273.15)
        res.render('index', {
        description: description,
        city: city,
        temp: temp
     })
    })
})

app.listen(3002, () => {
    console.log('http://localhost:3002')
} )
