import React, { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import Navbar from './NavbarForLoginPage';

function LoginPage() {
	
	const history = useHistory();
	
  // Define state variables for username and password
  const [userEmail, setUserEmail] = useState('');
  const [userpassword, setPassWord] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  
  const [userData, setUserData] = useState([]);
  const [newloggedIn, setLoggedIn] = useState(false);

  console.log('newloggedIn before');
  console.log(newloggedIn);

const handleFormSubmit = async (e) => {
  e.preventDefault();

  try {
    // Send a request to your server to check if the email exists
    const response = await fetch(`/userinformation/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userEmail, userpassword }),
    });
	
	 localStorage.setItem('userEmail', userEmail);
     localStorage.setItem('userpassword', userpassword);
	 localStorage.setItem('loggedinstatus', newloggedIn);
    
	 console.log('newloggedIn before');
	 console.log(newloggedIn);

    // Check if email and password match stored values in localStorage
    const storedEmail = localStorage.getItem('userEmail');
    const storedPassword = localStorage.getItem('userpassword');   
	//const storednewloggedIn = localStorage.getItem('newloggedIn');
	

    if (userEmail === storedEmail && userpassword === storedPassword) {
      // Storing as a string
		localStorage.setItem('loggedinstatus', newloggedIn.toString());
	  // Retrieving and parsing as a boolean
		var retrievedLoggedIn = localStorage.getItem('loggedinstatus');
		if (retrievedLoggedIn === 'false') {
		  setLoggedIn(true);
		  localStorage.setItem('loggedinstatus', newloggedIn.toString());
		} else {
		  setLoggedIn(false);
		}
     // history.push('/');
    } else {
      setErrorMessage('Email and password do not match.'); // Display an error message
    }

    if (!response.ok) {
      setErrorMessage('Error checking email.'); // Handle non-OK response (e.g., network error)
    }
  } catch (error) {
    console.error('Error checking email:', error);
    setErrorMessage('Error checking email.');
  }
};

  console.log('newloggedIn after');
  console.log(newloggedIn);
  
 const handleLogout = () => {
    // Clear the login status and redirect to the login page
    setLoggedIn(false);
    // You can also clear any other user-related data or tokens here
  };
  
   return (
    <div>
      <h1>Login Page</h1>
	   {newloggedIn ? (
        <>
		   
		   <li className="nav-item">
		    <p>You are logged in as {userEmail}</p>
            <li className="nav-item"><NavLink className="nav-link" onClick={handleLogout} to="/logout">Logout</NavLink></li>
          </li>
        </>
        ) : (
      <form onSubmit={handleFormSubmit}>
        <div>
          <label htmlFor="userName">UserEmail:</label>
          <input
            type="text"
            id="userEmail"
            name="userEmail"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="passWord">Password:</label>
          <input
            type="password"
            id="userpassword"
            name="userpassword"
            value={userpassword}
            onChange={(e) => setPassWord(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
	   )}
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
}

export default LoginPage;

