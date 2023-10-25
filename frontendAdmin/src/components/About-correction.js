import React from 'react'

const About = () = {
	return(
	 <>
	 
	  <div className="container emp-profile">
	   <form method="">
	     <div className="row">
		    <div className="col-md-4">
			  <img src={profilepic} alt="profilepic" />
			</div>  // col-md-4
			
			 <div className="col-md-6">
			   <div className="profile-head">
			      <h5>Sirajum Munira Muna</h5>
			      <h5>Student</h5>
			      <p className="profile-rating mt-3 mb-5">Rankings:<span>1/10</span></p> 
			        <ul className="nav nav-tabs" role="tablist">
						<li className="nav-item">
						  <a className="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab">About</a>
						</li>
						<li className="nav-item">
						  <a className="nav-link active" id="profile-tab" data-toggle="tab" href="#profile" role="tab">Timeline</a>
						</li>
					  </ul>
				</div>  // profile-head
			 
			 </div>  // col-md-6
			 
			<div className="col-md-2">
			  <input type="submit" className="profile-edit-btn" name="btnAddMore" value="Edit Profile" />
			</div>  // col-md-2
			   
		 
		  </div>  // row 
		  
		  <div className="row">
		     {/* left side url */}
			 <div className="col-md-4">
				 <div className="profile-work">
					   <p>Work Link</p>
					   <a href="https://www.youtube.com/channel/channel-i" target="channel-i">youtube</a><br/>
					   <a href="https://www.youtube.com/channel/channel-i" target="channel-i">instagram</a><br/>
				 </div>  // profile-work
			  </div>  // col-md-4
		  
		  </div>  // row 
		  
		  {/* right side url */}
		 
		 <div className="col-md-8 pl-5 about-info">
		    <div className="tab-content profile-tab" id="myTabContent">
			   <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
			      <div className="row mt-3">
				   <div className="col-md-6">
				       <label>User ID</label>
			       </div>
				   <div className="col-md-6">
				       <p>5678912345</p>
			       </div>
			     </div>  // row 
				  <div className="row mt-3">
				   <div className="col-md-6">
				       <label>Name</label>
			       </div>
				   <div className="col-md-6">
				       <p>Sirajum Munira muna</p>
			       </div>
			     </div>  // row 
				  <div className="row mt-3">
				   <div className="col-md-6">
				       <label>Email</label>
			       </div>
				   <div className="col-md-6">
				       <p>muna@gmail.com</p>
			       </div>
			     </div>  // row 
				  <div className="row mt-3">
				   <div className="col-md-6">
				       <label>User ID</label>
			       </div>
				   <div className="col-md-6">
				       <p>5678912345</p>
			       </div>
			     </div>  // row 
			   </div>  // tab-pane
			    <div className="tab-pane fade show active" id="profile" role="tabpanel" aria-labelledby="profile-tab">
			      <div className="row mt-3">
				   <div className="col-md-6">
				       <label>Experience</label>
			       </div>
				   <div className="col-md-6">
				       <p>5678912345</p>
			       </div>
			     </div>  // row 
				  <div className="row mt-3">
				   <div className="col-md-6">
				       <label>Hourly rate</label>
			       </div>
				   <div className="col-md-6">
				       <p>Sirajum Munira muna</p>
			       </div>
			     </div>  // row 
				  <div className="row mt-3">
				   <div className="col-md-6">
				       <label>Projects</label>
			       </div>
				   <div className="col-md-6">
				       <p>muna@gmail.com</p>
			       </div>
			     </div>  // row 
				  <div className="row mt-3">
				   <div className="col-md-6">
				       <label>User ID</label>
			       </div>
				   <div className="col-md-6">
				       <p>5678912345</p>
			       </div>
			     </div>  // row 
			   </div>  // tab-pane
			</div>  // tab-content
		 </div>  // col-md-8
	   
	   </form>
	 </div>  // container
	 
	 </>
	
	)
	
}