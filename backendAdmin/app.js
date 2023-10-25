const dotenv = require("dotenv");
const mongoose = require('mongoose');
var express = require('express');
const session = require('express-session');
var cors = require('cors');
var app = express();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var morgan = require("morgan");
app.use(cookieParser());

console.log('cookieParser')
//console.log(cookieParser)


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
dotenv.config({ path: './config.env' });


const hostname = process.env.HOST;

console.log(hostname)

mongoose.set('strictQuery', false);

// Initialize DB
 
 mongoose
.connect('mongodb://mongo:27017/registrationlogin',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('connection successful'))
.catch(err => console.log(`no connection`))


const User = require('./model/userSchema');


// for understand the json format
app.use(express.json())


app.use(cors({ 
  origin: `http://${hostname}:8800`, 
  credentials: true
 }));


//*******************************************************************//




app.use(
  session({
    secret: 'ABSDFRECXZHJUYIOP', // Replace with your actual secret key
    resave: false,
    saveUninitialized: true,
  })
);



//******************************************************************//

app.use(require('./router/auth'));


const port = process.env.PORT;



app.listen(port,() => {
   console.log(`server is running at port no ${port}`);
});
