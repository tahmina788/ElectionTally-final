import React , { useState, useEffect } from "react";
import { NavLink, useHistory } from 'react-router-dom';
import "./components.css";
import electiondata from './../electiondata-en';

const CandidateEnglish = () => {
	
	const [candidateEnglishData, setCandidateEnglishData] = useState({
		 candidateid: "", candidatenameenglish: "", partysymbol: "", totalvote: "", date: ""	
	});
	
	
	const [electionid, setElectionid] = useState('');
	const [constitution, setConstitution] = useState([]);
	const [constitutionid, setConstitutionid] = useState('');
	
	let name, value;
	
	// we are storing data in states
	
	const handleInputs = (e) => {
		console.log(e);
		name = e.target.name;
		value = e.target.value;
		setCandidateEnglishData({...candidateEnglishData, [name]:value});
	}
	
	
	const handleelection=(e)=>{
		const getelectionId = e.target.value;
		const getConstitutiondata = electiondata.find(election=>election.election_id===getelectionId).constitution;
		setConstitution(getConstitutiondata);
		setElectionid(getelectionId);		
	}
	

	const handleconstitution =(e) => {
		name = e.target.name;
		const constitutionid = e.target.value;
		setConstitutionid(constitutionid);
	}
		
	
	const myUpdatedValues = {constitutionid, ...candidateEnglishData}
	
	const myUpdatedValuesFinal = {electionid, ...myUpdatedValues}
	
	
	const candidateNameForm = async (e) => {
		e.preventDefault();
		
		const { electionid, constitutionid, candidateid, candidatenameenglish, partysymbol, totalvote, date	 } = myUpdatedValuesFinal;
			
		console.log('=============================================================================')
		
		console.log(myUpdatedValuesFinal)
		
		const response = await fetch('/candidateenglish', {
			method:"POST",
			mode: 'cors',
			headers:{
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				electionid,
				constitutionid,
				candidateid,
				candidatenameenglish,
				partysymbol,
				totalvote
			})
		});
	      console.log('****************************************************************************')
		const data = await response.json();

		if (response.status === 201) {
		  //console.log(data.message); // "value inserted successfully"
		  window.alert("data inserted successfully");
		  console.log("data inserted successfully");
		  setCandidateEnglishData({...candidateEnglishData,electionid: "", constitutionid:"", candidateid: "", candidatenameenglish:"", partysymbol: "", totalvote: ""})
		  document.getElementById("electionid").value = "";
		  document.getElementById("constitutionid").value = "";
		} else {
		  //console.log("Error:", data.message);
		  window.alert("Invalid data");
		  console.log("Invalid data");
		}
	}
	
	
	return(
        <>
		 <div className="start_form">
  <div className="container">
	  <div className="row">
	  	
	  <form method="POST" id="contact_form">
	  <>
	  <div>
		<p>Bangla election name</p>
		 <select id="electionid" name="electionid" value={electionid} className="form-control" onChange={handleelection}>
		   <option value="">--Select Election name--</option>
		   {
			electiondata.map((getelectionname,index)=>(
                <option value={getelectionname.election_id} key={index}>{getelectionname.election_name}</option>
			))
		   }
		 </select>
	    <br />  
        <p>You have selected: {electionid}</p>		
		</div>		
		<div>
		<p>constitution Name</p>
		 <select id="constitutionid" name="constitutionid" value={constitutionid} className="form-control" onChange={(e)=>handleconstitution(e)}>
		  <option value="">--Select constitution name--</option>
			 {
				 constitution.map((getconstitution,index)=>(
				     <option value={getconstitution.constitution_id} key={index}>{getconstitution.constitution_name}</option>
				 ))
			 }  
		 </select>
		</div>
		 <p>You have selected: {constitutionid}</p>	
		
	 
	   <div className="form_input">
         <label>candidateid</label>
         <input type="text" onChange={handleInputs} value={candidateEnglishData.candidateid} name="candidateid" id="candidateid" placeholder="Enter your candidateid" />
       </div>
	    <div className="form_input">
         <label>candidate Name</label>
         <input type="text" onChange={handleInputs} value={candidateEnglishData.candidatenameenglish} name="candidatenameenglish" id="candidatenameenglish" placeholder="Enter your candidatenameenglish" />
       </div>
	   
	    <div className="form_input">
         <label>party symbol</label>
         <input type="text" onChange={handleInputs} value={candidateEnglishData.partysymbol} name="partysymbol" id="partysymbol" placeholder="Enter your partysymbol" />
       </div>  
	   
	     <div className="form_input">
         <label>Total vote</label>
         <input type="text" onChange={handleInputs} value={candidateEnglishData.totalvote} name="totalvote" id="totalvote" placeholder="Enter your totalvote" />
       </div>  
	   
	    <br/>
	   <div className="contact_form_button">
		 <input type="submit" name="candidatennamesubmit" id="candidatenamesubmit" className="form-submit" value="submit" onClick={candidateNameForm} />
	   </div>
	   <br/>
	   <br/>
	 </>
		
	</form>
		</div>
		</div>
		</div> 
		
		</>
)
	
	
}


export default CandidateEnglish