import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import electiondata from './../electiondata';

function Election(){
	const [electionid, setElectionid] = useState('');
	const [constitution, setConstitution] = useState([]);
	const [constitutionid, setConstitutionid] = useState('');
	
	
	const handleelection=(e)=>{
		const getelectionId = e.target.value;
		const getConstitutiondata = electiondata.find(election=>election.election_id===getelectionId).constitution;
		console.log('getConstitutiondata');
		console.log(getConstitutiondata);
		setConstitution(getConstitutiondata);
		console.log(getelectionId);
		setElectionid(getelectionId);
		
	}
	const handleconstitution =(e) => {
		const constitutionid = e.target.value;
		console.log(constitutionid);
		setConstitutionid(constitutionid);
	}
	
	const handlesubmit=(e)=>{
		e.preventDefault();
		alert('get election id'+electionid+ " and " + constitutionid);
	}
	
	
	return(
	  <Container className="content">
	    <div className="row">
		<div className="col-sm-12">
		 <h2 className="mt-4 mb-4 fw-bold">Select Election and Constitution</h2>
		 <div className="row mb-3">
		 <form className="row g-3" onSubmit={handlesubmit}>
		 <div className="form-group col-md-4">
		 <label className="mb-2">Election</label>
		 <select name="election" className="form-control" onChange={(e)=>handleelection(e)}>
		   <option>--Select Election name--</option>
		   {
			electiondata.map((getelectionname,index)=>(
                <option value={getelectionname.election_id} key={index}>{getelectionname.election_name}</option>
			))
		   }
		 </select>
		 </div>  {/* end-col-md-4 */}
		 <div className="form-group col-md-4">
		 <label className="mb-2">Constitution</label>
		 <select name="constitution" className="form-control" onChange={(e)=>handleconstitution(e)}>
		     {/*<option>--Select constitution name--</option>*/}
			 {
				 constitution.map((getconstitution,index)=>(
				     <option value={getconstitution.constitution_id} key={index}>{getconstitution.constitution_name}</option>
				 ))
			 }  
		 </select>
		 </div>  {/* end-col-md-4 */}
		 <div className="form-group col-md-2 mt-4">
		    <button className="btn btn-success mt-2">Submit</button>
		 </div>  {/* end-col-md-2 */}
		 
		 </form>
		 </div>  {/* end-row mb-3 */}
		</div>  {/* end-col-sm-12 */}
		</div>  {/* end-row */}
	
	  </Container>
	)
}

export default Election;