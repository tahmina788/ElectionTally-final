import React, { useEffect,useContext,useState } from 'react';
import { useHistory } from "react-router-dom";

import { UserContext } from "../App";
{/* import Cookies from 'js-cookie'; */}


//const hostname = "localhost";
//const hostname = "192.168.200.249";
//const hostname = process.env.REACT_APP_HOST;
//const hostname = '192.168.0.102';
const port = "7000";

const { REACT_APP_HOST } = process.env;
const hostname = `${REACT_APP_HOST}`;

const Logout = () => {
	
	// promises
	const {state, dispatch} = useContext(UserContext);
	const history = useHistory();
	
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	
	const clearCredentials = () => {
    setEmail('');
    setPassword('');
     };
	
	useEffect(() => {
		fetch(`http://${hostname}:${port}/logout`, {
			method:"GET",
			headers:{
				Accept: "application/json",
				"Content-Type" : "application/json"
			},
			credentials: "include"
		}).then((res) => {
			dispatch({type:"USER", payload:false})
			history.push('/login', { replace: true })
			localStorage.removeItem('authenticated');
			localStorage.removeItem('candidateValues');
			localStorage.setItem('userEmail', '');
			localStorage.setItem('userpassword', '');
			localStorage.setItem('loggedinstatus', 'false');
			//Cookies.remove('jwtToken');
	        clearCredentials();
			if(res.status !== 200){
				const error = new Error(res.error);
				throw error;
			}
		}).catch((err) => {
			console.log(err)
		})
	});
	return(
	    <>
	      <h2>Logout page</h2>
	
	    </>
	)
}

export default Logout