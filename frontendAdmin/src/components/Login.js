
import React, { useState, useEffect, useContext } from "react";
import { NavLink, useHistory } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import cors from 'cors';

import { UserContext } from "../App";

const Login = () => {

	const { state, dispatch } = useContext(UserContext);
	const history = useHistory();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const clearCredentials = () => {
		setEmail('');
		setPassword('');
	};

	//const hostname = "localhost";
	//const hostname = "192.168.200.249";
	//const hostname = process.env.REACT_APP_HOST;
	//const hostname = '192.168.0.102';
	const port = "7000";

	const { REACT_APP_HOST } = process.env;
    const hostname = `${REACT_APP_HOST}`;
	
	console.log('hostname frontendAdmin login');
	console.log(hostname);

	if(email != ''){
		localStorage.setItem('authenticated', 'false');
		localStorage.setItem('userEmail', '');
		localStorage.setItem('userpassword', '');
		localStorage.setItem('loggedinstatus', 'false');
	}

	const loginUser = async (e) => {
		e.preventDefault();
		const res = await fetch('/userinformation', {
		//const res = await fetch(`http://${hostname}:${port}/signin`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				email,
				password
			})
		});
		const data = res.json();

		if (res.status === 400 || !data) {
			window.alert("Invalid Credentials");
		} else {
			dispatch({ type: "USER", payload: true })
			window.alert("Login Successfull");
			localStorage.setItem('authenticated', 'true');
			localStorage.setItem('userEmail', email);
			localStorage.setItem('loggedinstatus', 'true');
			//clearCredentials();
			history.push('/')
		}
	}

	return (
		<>
			<section className="sign-in">
				<div className="container mt-5">
					<div className="signin-content">
						<div className="signin-image">
							<NavLink to="/signup" className="signup-image-link">Create an Acount</NavLink>
						</div>
						<div className="signin-form">
							<h2 className="form-title">Sign up</h2>
							<form method="POST" className="register-form" id="register-form">
								<div className="form-group">
									<label>Email</label>
									<input type="text" name="email" id="email" autoComplete="off" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your email" />
								</div>
								<div className="form-group">
									<label>Password</label>
									<input type="password" name="password" id="password" autoComplete="off" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="your password" />
								</div>
								<div className="form-group form-button">
									<input type="submit" name="signin" id="signin" className="form-submit" value="Log In" onClick={loginUser} />
								</div>
							</form>

						</div>
					</div>
				</div>
			</section>
		</>
	)
}

export default Login