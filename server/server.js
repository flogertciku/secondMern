const express = require('express');
const cors = require('cors');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const jwt = require("jsonwebtoken");


const socket = require('socket.io');
const app = express();
app.use(cookieParser());
           
app.use(cors({credentials: true, origin: 'http://localhost:5173'}));
app.use(express.json());                           /* This is new and allows JSON Objects to be posted */
app.use(express.urlencoded({ extended: true }));   /* This is new and allows JSON Objects with strings and arrays*/
require('./config/mongoose.config');    /* This is new */
require('./routes/post.route')(app);
const server =  app.listen(8000, () => {
    console.log("Listening at Port 8000")
})
const myFirstSecret = process.env.FIRST_SECRET_KEY;


const io = socket(server, {
    cors: {
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST'],
        allowedHeaders: ['*'],
        credentials: true,
    }
});

io.on("connection", socket => {
    console.log('socket id: ' + socket.id);
    
    socket.on("fromReactCreate", data => {
        // send a message with "data" to ALL clients EXCEPT for the one that emitted the
    	//     "event_from_client" event
        console.log("data")
        io.emit("fromServerCreated", data);
    });

});