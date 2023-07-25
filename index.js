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

app.post("/fruits", (req, res) => {
    // first check if a fruit with the name specified by the user already exists
    const fruit = fruits.find((fruit) => fruit.name.toLowerCase() == req.body.name.toLowerCase());

    if (fruit != undefined) {
        // fruit already exists -> conflict response code returned
        res.status(409).send("The fruit already exists.");
    } else {
        // fruit does not already exist. Increment the maxId and add it to
        // the data sent to the server by the user
        maxId += 1;
        req.body.id = maxId;

        // add the fruit to the list of fruits
        fruits.push(req.body);

        // Return successfully created status code
        res.status(201).send(req.body);
    }
});

app.listen(port, () => console.log(`App running on port: ${port}`))



