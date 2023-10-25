import React from 'react';
import { NavLink } from 'react-router-dom';

const Errorpage = () => {
	return(
	 <>
	 <div class="container">
	   <div id="notfound">
	      <div className="notfound">
	          <div className="notfound-404">
	              <h1>404</h1>  
	          </div>
			  <h2>we are sorry, page not found</h2>
			  <p className="mb-5">
			  page you are looking for might have been removed.
			  </p>
			  <NavLink to="/">Back To HomePage</NavLink>
	      </div>
	   </div>
	  </div>
	 </>
	)
	
}

export default Errorpage