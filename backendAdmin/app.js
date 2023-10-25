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
//dotenv.config();

const hostname = process.env.HOST;

console.log(hostname)

mongoose.set('strictQuery', false);

 //const hostname = "localhost";
 //const hostname = "192.168.200.249";
 //const hostname = "192.168.0.102";

// Initialize DB
{/* 
mongoose
 .connect('mongodb+srv://tahminabithe47:01757112809A@electiontallywithlogin.1x4u0rl.mongodb.net/',{
     useNewUrlParser: true,
     useUnifiedTopology: true,
 })
 .then(() => console.log('connection successful'))
 .catch(err => console.log(`no connection`))
 */}
 
 mongoose
.connect('mongodb://mongo:27017/registrationlogin',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('connection successful'))
.catch(err => console.log(`no connection`))

{/* 
mongoose
  .connect('mongodb://mongo:27017/registrationlogin', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connection successful');
  })
  .catch((err) => {
    console.error('Connection failed:', err);
  });
*/}

  // database connection with mongoose
  {/* 
 mongoose
 .connect('mongodb://localhost/registrationlogin',{
     useNewUrlParser: true,
     useUnifiedTopology: true,
 })
 .then(() => {
  console.log('Connection successful');
})
.catch((err) => {
  console.error('Connection failed:', err);
});
*/}


const User = require('./model/userSchema');


// for understand the json format
app.use(express.json())


app.use(cors({ 
  origin: `http://${hostname}:8800`, 
  credentials: true
 }));

 
 
{/* 
const allowedOrigins = ['http://192.168.200.249:3000'];

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, // Allow credentials (cookies, etc.) to be sent with the request
};

app.use(cors(corsOptions));
*/}

// we link the router files to make our route easy


//app.use(cors()); // Enable CORS for all routes

// Enable CORS



//app.use(cors({ credentials: true }));



 


//*******************************************************************//

{/*}
app.get('/', function (req, res) {
  // Cookies that have not been signed
  console.log('Cookies: ', req.cookies)

  // Cookies that have been signed
  console.log('Signed Cookies: ', req.signedCookies)
})*/}


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