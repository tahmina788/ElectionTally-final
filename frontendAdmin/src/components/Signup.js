import React, { useState } from 'react';
import cors from 'cors';

import { useHistory, NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';

const Signup = () => {
	const history = useHistory();
	const [user, setUser] = useState({
		name: "", email: "", password: ""
	});

	let name, value;

	const handleInputs = (e) => {
		console.log('handleInputs e');
		console.log(e);
		console.log('handleInputs e');
		name = e.target.name;
		value = e.target.value;
		console.log(e.target.name);
		console.log(e.target.value);
		setUser({ ...user, [name]: value });
	}

	//const hostname = "localhost";
	//const hostname = "192.168.200.249";
	//const hostname = process.env.REACT_APP_HOST;
	const port = "7000";

	const { REACT_APP_HOST } = process.env;
    const hostname = `${REACT_APP_HOST}`;

	const PostData = async (e) => {
		e.preventDefault();

		// object destructuring
		const { name, email, password } = user;
		console.log('frontend signup');
		console.log(name + ' ' + email + ' ' + password)
		console.log('frontend signup');
		// return promise
		const res = await fetch(`http://${hostname}:${port}/register`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				name, email, password
			})
		});
		const data = await res.json();

		if (data.status === 442 || !data) {
			window.alert("Invalid Registration");
			console.log("Invalid Registration")
		} else {
			window.alert("Registration Successfull");
			console.log("Successfull Registration");

			history.push("/login");
		}
	}

	return (
		<>
			<section className="signup">
				<div className="container mt-5">
					<div className="signup-content">
						<div className="signup-form">
							<h2 className="form-title">Sign up</h2>
							<form method="POST" className="register-form" id="register-form">
								<div className="form-group">
									<label>Name</label>
									<input type="text" name="name" id="name" autoComplete="off" value={user.name} placeholder="your name" onChange={handleInputs} />
								</div>
								<div className="form-group">
									<label>Email</label>
									<input type="text" name="email" id="email" autoComplete="off" value={user.email} placeholder="your email" onChange={handleInputs} />
								</div>
								<div className="form-group">
									<label>Password</label>
									<input type="password" name="password" id="password" autoComplete="off" value={user.password} onChange={handleInputs} placeholder="your password" />
								</div>
								<div className="form-group form-button">
									<input type="submit" name="signup" id="signup" className="form-submit" value="register" onClick={PostData} />
								</div>
							</form>

						</div>
					</div>
				</div>
			</section>
		</>
	)
}

export default Signup