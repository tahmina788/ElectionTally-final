import React from 'react'


const Loginform = () => {
	return(
	 <>
 <form className="register-form" id="register-form">
				   <div className="form-group">
				     <label>Email</label>
					 <input type="text" name="email" id="email" autoComplete="off" placeholder="your email"/>
				   </div>
				   <div className="form-group">
				     <label>Password</label>
					 <input type="password" name="password" id="password" autoComplete="off" placeholder="your password"/>
				   </div>
				     <div className="form-group form-button">
					 <input type="submit" name="signin" id="signin" className="form-submit" value="Log In"/>
				   </div>
				  </form>
				   </>
	)
}

export default Loginform