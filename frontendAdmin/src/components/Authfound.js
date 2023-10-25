import React, { useContext, useEffect,useState } from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import { useHistory } from 'react-router-dom';

import { UserContext } from "../App";

const Authfound = () => {
	const { state } = useContext(UserContext);
	
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const history = useHistory();

  useEffect(() => {
    const authenticated = localStorage.getItem('authenticated');
    if (authenticated) {
      setIsLoggedIn(true);
    }
  }, []);
  
 


console.log(state)

        const RenderMenu = () => {
		if ((!isLoggedIn && state) || (isLoggedIn && !state)) {}}
		
		return(
	 <>
	
	 </>
	)
	
	
	}

export default Authfound