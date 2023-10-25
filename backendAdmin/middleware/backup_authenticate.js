const bcrypt = require("bcryptjs")
const dotenv = require("dotenv");
const jwt = require('jsonwebtoken');
const User5 = require("../model/userSchema");
const session = require('express-session');

dotenv.config({ path: '../config.env' });



const Authenticate = async(req, res, next) => {


	let token; 
	const password_me = '123456';
	const userLogin5 = await User5.findOne({ email: 'admin@gmail.com' }).exec();
    //const isMatch = await bcrypt.compare(password, userLogin5.password);
	
    	
	//if(req.cookies.jwtoken){
	if(true){
	try{
		//token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGE0MzM2ZmJmMWU2OWFhZTQ1NTZkODMiLCJpYXQiOjE2OTAzNjg3NzR9.ejOkCXAz8jJpwbYRN2KXEpxQmyQcjnPWetGI5XhgLvs';
		//token = await userLogin5.generateAuthToken();
		const tokens = userLogin5.tokens;
		if (tokens.length === 0) {
			return res.status(404).json({ error: 'No tokens found for this user' });
		  }

  // Assuming the tokens array is sorted by date in ascending order
		  const lastToken = tokens[tokens.length - 1];
		  console.log(lastToken)
		  const token7 = lastToken.token;
		const verifyToken = jwt.verify(token7, process.env.SECRET_KEY);
		
		console.log('***********************jwt end******************************88');
				//const verifyToken = jwt.verify(token, 'ASDEFCVXZBNVGHNB');
		//const rootUser = await User5.findOne({_id: verifyToken._id, "tokens.token": token7 });
		const rootUser = await User5.findOne({ email: 'admin@gmail.com' }).exec();
		console.log('rootUser');
		console.log(rootUser);
		console.log('**************************************************************');
		if(!rootUser) { throw new Error('User Not Found')}
		
		
		
		req.token = token7;
		req.rootUser = rootUser;
		req.userID = rootUser._id;
		
		next();
		
	} catch(err)
	{
		res.status(401).send('Unauthorized: no token provided');
		console.log(err);
	}
	}
	 
	 }

module.exports = Authenticate;