// Node
// const http = require('http')
// const port = 3000
// const server = http.createServer((req, res) => {
//     res.statusCode = 404
//     res.setHeader("Content-Type", "text/html")
//     res.end("<img src='https://pbs.twimg.com/media/Dj8XlmjV4AEzsvr.jpg'>");
// })

// server.listen(port, () => console.log(`App running on port ${port}`))

// express is a library that works well with JS
// const express = require('express')
// const app = express()
// const port = 3000

// app.get('/', (req, res) => {
//     res.send("Hello world")
// })

// app.get('/penguins/:name', (req, res) => {
//    // res.send("Here are the penguins")
//    res.status(204).send() // codes that start with 2 mean that that everything is okay
//    res.send(req.params)
// })

// /* e.g http://localhost:3000/penguins/pingu returns
// {"name":"pingu"} Allows you to capture input from the user
// */

// app.listen(port, () => console.log(`App running on port ${port}`))

require('dotenv').config()
const port = process.env.PORT
/* Creating our own API */
const express = require('express');
const app = express();
// const port = 3000;
const cors = require('cors')
const fruits = require('./fruits.js')
app.use(cors())
app.use("/fruits", express.json())

app.get('/fruits', (req, res) => {
    res.send(fruits)
})
console.log("Helllo")
app.get('/fruits/:name', (req, res) => {
    let fruitName = req.params.name.charAt(0).toUpperCase() + req.params.name.slice(1)
    const fruit = fruits.find(fruit => fruit.name === fruitName) ?? res.status(404).send("The fruit does not exist") 
    res.send(fruit)
    // res.send(`Returns all the fruits with name ${fruitName}`)
});
const ids = fruits.map(fruit => fruit.id)
let maxId = Math.max(...ids)
app.post('/fruits/:name', (req, res) => {
    let fruitName = req.body.name.charAt(0).toUpperCase() + req.body.name.slice(1)
    const fruit = fruits.find(fruit => fruit.name === fruitName) ?? res.status(404).send("The fruit does not exist")
    console.log(fruit)
    // res.send("New fruit created")
    // res.send("New fruit created")
})

app.listen(port, () => console.log(`App running on port: ${port}`))

/*
- Create fruit - must do
- Challenge students to complete the POST route in pairs
Ask students to consider:
- How to prevent duplicate fruit
How to create a unique ID for the new fruit - this is not for the user to specify
What are the appropriate status codes
How to prevent user from adding whatever data fields they want to the fruit
Delete fruit - if they have time
Challenge students to create a DELETE route that deletes a fruit based on its name
Ask students to consider:
How to deal with bad requests and fruit not found
What are the appropriate status codes
Update fruit - stretch challenge for personal study
Challenge students to create a PATCH route that updates a fruit fruit based on its name
Ask students to consider:
How to deal with bad requests and fruit not found
What are the appropriate status codes
How to prevent user from adding extra data fields to the fruit

*/