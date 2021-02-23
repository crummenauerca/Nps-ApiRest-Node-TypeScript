import express from 'express'
import 'reflect-metadata'
import './database'

const app = express()

app.get('/', (request, response) => {
    return response.json({message: 'Hello NLW04'})
})

app.use(express.json())

app.post('/', (request, response) => {
    console.log(request.body)
    return response.json({message: 'The data was received successfully'})
})

app.listen(3333, () => {
    console.log('Server is running!')
})