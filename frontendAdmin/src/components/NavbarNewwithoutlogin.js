import React, { useContext, useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { UserContext } from "../App";

const NavbarNewwithoutlogin = () => {
    const { state, dispatch } = useContext(UserContext);
  
    const [isLoggedIn, setIsLoggedIn] = useState(
      localStorage.getItem('authenticated') === 'true'
    );
    const history = useHistory();

    var loggedinstatusnew;

    var loggedinstatus = localStorage.getItem('loggedinstatus');
	
	var useremailvalue = localStorage.getItem('userEmail');
  
    const userNavPage = async () => {
        try {
            const res = await fetch('/getdata', {
            //const res = await fetch(`http://${hostname}:${port}/getdata`, {
              mode:'cors',
              method: "GET",
              headers: {
                "Content-Type": "application/json"
              },
              credentials: "include" // include the credentials (cookies)
          });
    
      
    
          const data = await res.json();
    
       
        } catch (err) {
          console.log(err);
        }
      }
  
    useEffect(() => {
      userNavPage();
      const authenticated = localStorage.getItem('authenticated');
      loggedinstatusnew = localStorage.getItem('loggedinstatus');
      if (authenticated) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    }, []);

    function handleLogin() {
        setIsLoggedIn(true);
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
  
    const RenderMenu = () => {
      
  
      if (loggedinstatus === 'true') {
        if (useremailvalue === 'admin@gmail.com') {
          return (
            <>
              {/* Admin links */}
              <li className="nav-item">
                <NavLink className="nav-link" to="/electionalldatalist">Election List</NavLink>
              </li> 
              <li className="nav-item">
                <NavLink className="nav-link" to="/addelectionname">Add Election Name</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link active" aria-current="page" to="/electionalldatalist">
                  Edit
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" onClick={handleLogout} to="/logout">
                  Logout
                </NavLink>
              </li>
            </>
          );
        } else {
          return (
            <>
              {/* Not admin links */}
              <li className="nav-item">
                <NavLink className="nav-link active" aria-current="page" to="/electionalldatalist">
                  Edit
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" onClick={handleLogout} to="/logout">
                  Logout
                </NavLink>
              </li>
            </>
          );
        }
      } else {
        return (
          <>
            <li className="nav-item">
              <NavLink className="nav-link active" aria-current="page" to="/">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" onClick={handleLoginNew} to="/login">
                Login
              </NavLink>
            </li>
          </>
        );
      }
      
  
      // Default case: No matching conditions, so render nothing
      return null;
    };
  
    return (
        <>
          <section id="nav-bar">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
              <a className="navbar-brand" href="#"><img src="images/demo-logo.png" /></a>
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <i className="fa fa-bars"></i>
              </button>
    
              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav ml-auto">
                  <RenderMenu />
                </ul>
              </div>
            </nav>
          </section>
        </>
      )
  };


  export default NavbarNewwithoutlogin