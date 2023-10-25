import React , { useState, useEffect } from "react";
import { NavLink, useHistory } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import mobileicon from "../images/mobileicon.png";

const Contact = () => {
		
	const history = useHistory();

	const [userData, setUserData] = useState({});

	let name, value;

	const userContact = async() => {
	try{
	const res = await fetch('/getdata',{
	method: "GET",
	headers:{
	Accept: "application/json",
	"Content-Type": "application/json"
	},
	credentials: "include"
	})

	const data = await res.json();
	console.log('contact data');
	console.log(data);
	setUserData(data);
	if(!res.status === 200){
	const error = new Error(res.error);
	throw error;
	}
	}catch(err){
	console.log(err);
	//history.push('./login');
	}
	}
	useEffect(()=>{
	   userContact();
	},[]);
	
	// we are storing data in states
	
	const handleInputs = (e) => {
		console.log(e);
		name = e.target.name;
		value = e.target.value;
		//setUserData({..userData, name: userData.name, email: userData.email, phone: userData.phone});
		setUserData({...userData, [name]:value});
	}
	
	// send the data to backend
	
	const contactForm = async (e) => {
		e.preventDefault();
		
		const { name, email, message } = userData;
		
		console.log('contact post data');
	    console.log(userData);
		
		const res = await fetch('/contact', {
			method:"POST",
			headers:{
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				name,
				email,
				message
			})
		});
		const data = await res.json();
		
		if(!data){
		  window.alert("message not send");	
		} else {
			window.alert("message send Successfull");
			setUserData({ ...userData, message: ""})	
		}
	}
	
	
	return(
	 <>
	    <div className="contact_info">
		<div className="container-fluid">
		  <div className="row">
		    <div className="col-lg-10 offset-lg-l d-flex justify-content-between">
			{/* mobile number */}
		     <div className="contact_info_item d-flex justify-content-start align-items-center">
				 <img src={mobileicon} alt="mobile phone"/>
				  <div className="contact_info_content">
					  <div className="contact_info_title">
					  name
					   </div>
						<div className="contact_info_text">
						   {userData.name}
					   </div>
			
				   </div>
		
		     </div>
			 {/* email */}
			 <div className="contact_info_item d-flex justify-content-start align-items-center">
				 <img src={mobileicon} alt="mobile phone"/>
				  <div className="contact_info_content">
					  <div className="contact_info_title">
						   Email  
					   </div>
						<div className="contact_info_text">
						   {userData.email} 
					   </div>
			
				   </div>
		
		     </div>
			 {/* address */}
			 <div className="contact_info_item d-flex justify-content-start align-items-center">
				 <img src={mobileicon} alt="mobile phone"/>
				  <div className="contact_info_content">
					  <div className="contact_info_title">
						  Address
					   </div>
						<div className="contact_info_text">
						   Road no 11 house no 11
					   </div>
			
				   </div>
		
		     </div>
		
		    </div>
		
		   </div>
		
		</div>
		
		</div>
		
		{/* contact us form */}
		
		<div className="contact_form">
		  <div className="container">
		  <div className="row">
		   <div className="col-lg-10 offset-lg-l">
			   <div className="contact_form_container py-5">
			    <div className="contact_form_title">
			       Contact Form
			    </div>
				<form method="POST" id="contact_form">
				  <div className="contact_form_name d-flex justify-content-between align-items-between">
			        <input type="text" id="contact_form_name" className="contact_form_name input_field" name="name" value={userData.name} onChange={handleInputs} placeholder="name" required="true" /> 
			        <input type="email" id="contact_form_email" className="contact_form_email input_field" name="email" value={userData.email} onChange={handleInputs} placeholder="email" required="true" />     
				  </div>
				  <div className="contact_form_text mt-5">
				    <textarea className="text_field contact_form_message" name="message" value={userData.message} onChange={handleInputs} placeholder="message" cols="30" rows="10"></textarea>
				  </div>
				  
				  <div className="contact_form_button">
				    <button type="submit" className="button contact_submit_button" onClick={contactForm}>message</button>
			      </div>
				
				</form>
			  </div>
		  </div>
		  </div>
		  </div>
		</div>
		
	 </>
	)
}

export default Contact