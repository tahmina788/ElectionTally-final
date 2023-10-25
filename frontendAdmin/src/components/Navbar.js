import React, { useContext, useEffect,useState } from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import {NavLink,useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import logo from "../images/demo-logo.png";


import { UserContext } from "../App";

const Navbar = () => {
	const { state, dispatch } = useContext(UserContext);
	
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const history = useHistory();

  useEffect(() => {
    const authenticated = localStorage.getItem('authenticated');
    if (authenticated) {
      setIsLoggedIn(true);
    }
  }, []);
  
  function handleLogin() {
    // Make API call to your Express.js server to authenticate user
    // Once user is authenticated, set isLoggedIn to true and store in local storage
    setIsLoggedIn(true);
    localStorage.setItem('authenticated', 'true');
  }
  
  function handleLoginN() {
  window.location.href = '/login';
  localStorage.setItem('authenticated', 'true');
  }
  
  function handleLoginNew() {
    // Navigate to the login page using React Router
    history.push('/login');
  }

  function handleLogout() {
    // Make API call to your Express.js server to logout user
    // Once user is logged out, set isLoggedIn to false and remove from local storage
    setIsLoggedIn(false);
    localStorage.removeItem('authenticated');
  }

console.log('isLoggedIn')	
console.log(isLoggedIn)
console.log(state)
	
	const RenderMenu = () => {
		if (isLoggedIn) {
			return(
			  <>
				<li class="nav-item">
				   <NavLink class="nav-link active" aria-current="page" to="/">Home</NavLink>
				</li>
				{/*<li class="nav-item">
				   <NavLink class="nav-link" to="/about">About</NavLink>
				</li>*/}
				{/*<li class="nav-item">
				   <NavLink class="nav-link" to="/contact">Contact</NavLink>
				</li> */}
				{/* <li class="nav-item">
				    <NavLink class="nav-link" to="/scorecard">Scorecard</NavLink>
				</li> */}
				<li class="nav-item">
				   <NavLink class="nav-link" to="/electionalldatalist">Election List</NavLink>
				</li> 
				<li class="nav-item">
			       <NavLink class="nav-link" to="/addelectionname">Add Election Name</NavLink>
			    </li>
	  <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Constitution
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
		 <NavLink class="dropdown-item" to="/constitutionbangla">Constitution Bangla</NavLink>
		 <NavLink class="dropdown-item" to="/constitutionenglish">Constitution English</NavLink>
        </div>
      </li>
	  
	
	 <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Candidate
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
		 <NavLink class="dropdown-item" to="/candidatebangla">Candidate Bangla</NavLink>
		 <NavLink class="dropdown-item" to="/candidateenglish">Candidate English</NavLink>
		 <NavLink class="dropdown-item" to="/candidatebanglafromarray">Candidate Bangla Array</NavLink>
        </div>
      </li>
	  
				<li class="nav-item">
				   <li class="nav-item"><NavLink class="nav-link" onClick={handleLogout} to="/logout">Logout</NavLink></li>    
				</li>    		
			  </>
			)
		} else{
			return(
		<>
			<li class="nav-item">
			  <NavLink class="nav-link active" aria-current="page" to="/">Home</NavLink>
			</li>
			<li class="nav-item">
			  <NavLink class="nav-link" to="/about">About</NavLink>
			</li>
			<li class="nav-item">
			  <NavLink class="nav-link" to="/contact">Contact</NavLink>
			</li>
			<li class="nav-item">
			  <li class="nav-item"><NavLink class="nav-link" onClick={handleLoginNew} to="/login">Login</NavLink></li>
			</li>
			<li class="nav-item">
			  <NavLink class="nav-link" to="/signup">Register</NavLink>
			</li>    		
        </>	
			)
			
		}
		
	}
	
	return(
	 <>
	 <section id="nav-bar">
<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <a class="navbar-brand" href="#"><img src="images/demo-logo.png"/></a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <i class="fa fa-bars"></i>
  </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav ml-auto">
        <RenderMenu />
      </ul>
    </div>
</nav>
</section>
	 </>
	)
}

export default Navbar