
import React , { useState, useEffect  } from "react";
import { NavLink, useHistory, useParams } from 'react-router-dom';
import "./components.css";

const Candidateedit = () => {
   
	const [electionData, setElectionData] = useState([]);

	const [constitutionData, setConstitutionData] = useState([]);

	const [candidateData, setCandidateData] = useState([]);
	
	const [formChanged, setFormChanged] = useState(false);

	const { electionid } = useParams();
	const history = useHistory();
	
	console.log('electionid');

	console.log(`${electionid}`)
	
	// we are retrive data from db

	const getElectionValue = async() => {
	try{
	const res = await fetch(`http://localhost:7000/searchbyelectionid/${electionid}`,{
	method: "GET",
	headers:{
	Accept: "application/json",
	"Content-Type": "application/json"
	},
	credentials: "include"
	})

	const data = await res.json();
	
	setElectionData(data);
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
	   getElectionValue();
	},[]);
	
	
	const getConstitutionOptionValue = async() => {
	try{
	const res = await fetch('http://localhost:7000/getconstbangladata',{
		
	method: "GET",
	headers:{
	Accept: "application/json",
	"Content-Type": "application/json"
	},
	credentials: "include"
	})
	
	const optionsdata = await res.json();
	
	setConstitutionData(optionsdata);
	if(!res.status === 200){
	const error = new Error(res.error);
	throw error;
	}
	}catch(error){
	//console.log(error);
	}
	}
	useEffect(()=>{
	   getConstitutionOptionValue();
	},[]);                    
	
	const getCandidateValue = async() => {
	try{
	const res = await fetch(`http://localhost:7000/candidateedit/${electionid}`,{
	method: "GET",
	headers:{
	Accept: "application/json",
	"Content-Type": "application/json"
	},
	credentials: "include"
	})

	const data = await res.json();
	
	setCandidateData(data);
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
	   getCandidateValue();
	},[]);
	
	


let name, value;
//console.log('mergedData');
//console.log(mergedData);

		const handleInputChange = (e) => {
		e.preventDefault();
		
		name = e.target.name;
		value = e.target.value;
		console.log(name+ ' ' + value);
		setCandidateData({...candidateData, [name]:value});
		setFormChanged(true);
	}
	
	const handleInputChangeCons = (e) => {
		e.preventDefault();
		
		name = e.target.name;
		value = e.target.value;
		console.log(name+ ' ' + value);
		setConstitutionData({...constitutionData, [name]:value});
		setFormChanged(true);
	}
	

	
	



  useEffect(() => {
    // Your code here
    if (Array.isArray(constitutionData) && Array.isArray(candidateData)) {
     
	  const filteredCandidates = candidateData.filter(candidate => candidate.electionid === electionid);

      const candidateCount = filteredCandidates.length;
  
      
  
      const filteredConstitutions = constitutionData.filter(constitution => constitution.electionid === electionid);
      const constitutionCount = filteredConstitutions.length;
  
  if (candidateCount > 0) {
  filteredCandidates.slice(-candidateCount).forEach((candidate, index) => {
    const offset = candidateCount - 3 + index + 1;
	console.log('offset');
	console.log(offset);
    localStorage.setItem(`electionidStorage_${offset}`, candidate.electionid);
    localStorage.setItem(`constitutionidStorage_${offset}`, candidate.constitutionid);
    localStorage.setItem(`candidateidStorage_${offset}`, candidate.candidateid);
    localStorage.setItem(`candidatenamebanglaStorage_${offset}`, candidate.candidatenamebangla);
    localStorage.setItem(`partysymbolStorage_${offset}`, candidate.partysymbol);
    localStorage.setItem(`totalvoteStorage_${offset}`, candidate.totalvote);
    localStorage.setItem(`idStorage_${offset}`, candidate._id);
	
	const _idStore = localStorage.getItem(`idStorage_${offset}`);
	const electionidStore = localStorage.getItem(`electionidStorage_${offset}`);
	const constitutionidStore = localStorage.getItem(`constitutionidStorage_${offset}`);
	const candidateidStore = localStorage.getItem(`candidateidStorage_${offset}`);
	const candidatenamebanglaStore = localStorage.getItem(`candidatenamebanglaStorage_${offset}`);
	const partysymbolStore = localStorage.getItem(`partysymbolStorage_${offset}`);
	const totalvoteStore = localStorage.getItem(`totalvoteStorage_${offset}`);
	
	
	if (formChanged) {
			if (Array.isArray(candidateData)) {
			console.log('.............if...............');
			 candidateData.map((candidate, index) => {
		  setCandidateData({
			id: _idStore || '',
			electionid: electionidStore || '',
			constitutionid: constitutionidStore || '',
			candidateid: candidateidStore || '',
			candidatenamebangla: candidatenamebanglaStore || '',
			partysymbol: partysymbolStore || '',
			totalvote: totalvoteStore || ''
		  });
		  });
			}
		} else {
			console.log('.............else...............');
			console.log(candidateData)
			if (Array.isArray(candidateData)) {
		  candidateData.map((candidate, index) => {
			setCandidateData((prevFormFields) => ({
			  ...prevFormFields,
			  id: candidate._id || '',
			  electionid: candidate.electionid || '',
			  constitutionid: candidate.constitutionid || '',
			  candidateid: candidate.candidateid || '',
			  candidatenamebangla: candidate.candidatenamebangla || '',
			  partysymbol: candidate.partysymbol || '',
			  totalvote: candidate.totalvote || ''
			}));
		  });
		}
		}
	
	
  });
}
if (constitutionCount > 0) {
  filteredCandidates.slice(-constitutionCount).forEach((constitution, index) => {
    const offset = candidateCount - 3 + index + 1;
	console.log('constitutionCount offset');
	console.log(offset);
	
    localStorage.setItem(`cons_electionidStorage_${offset}`, constitution.electionid);
    localStorage.setItem(`cons_constitutionidStorage_${offset}`, constitution.constitutionid);
    localStorage.setItem(`banglaconstitutionnameStorage_${offset}`, constitution.banglaconstitutionname);
    localStorage.setItem(`totalcenterStorage_${offset}`, constitution.totalcenter);
    localStorage.setItem(`obtainedcenterStorage_${offset}`, constitution.obtainedcenter);
    localStorage.setItem(`sortingorderStorage_${offset}`, constitution.sortingorder);
    localStorage.setItem(`cons_idStorage_${offset}`, constitution._id);
	
		
	const cons_idStore = localStorage.getItem(`cons_idStorage_${offset}`);
	const cons_electionidStore = localStorage.getItem(`cons_electionidStorage_${offset}`);
	const cons_constitutionidStore = localStorage.getItem(`cons_constitutionidStorage_${offset}`);
	const cons_banglaconstitutionnameStore = localStorage.getItem(`banglaconstitutionnameStorage_${offset}`);
	const cons_totalcenterStore = localStorage.getItem(`totalcenterStorage_${offset}`);
	const cons_obtainedcenterStore = localStorage.getItem(`obtainedcenterStorage_${offset}`);
	const cons_sortingorderStore = localStorage.getItem(`sortingorderStorage_${offset}`);
	
	
	if (formChanged) {
			if (Array.isArray(constitutionData)) {
			console.log('.............if...............');
			 constitutionData.map((constitution, index) => {
		  setConstitutionData({
			id: cons_idStore || '',
			electionid: cons_electionidStore || '',
			constitutionid: cons_constitutionidStore || '',
			banglaconstitutionname: cons_banglaconstitutionnameStore || '',
			totalcenter: cons_totalcenterStore || '',
			obtainedcenter: cons_obtainedcenterStore || '',
			sortingorder: cons_sortingorderStore || ''
		  });
		  });
			}
		} else {
			console.log('.............else...............');
			console.log(constitutionData)
			if (Array.isArray(constitutionData)) {
		  constitutionData.map((constitution, index) => {
			setConstitutionData((prevFormFields) => ({
			  ...prevFormFields,
			  id: constitution._id || '',
			  electionid: constitution.electionid || '',
			  constitutionid: constitution.constitutionid || '',
			  banglaconstitutionname: constitution.banglaconstitutionname || '',
			  totalcenter: constitution.totalcenter || '',
			  obtainedcenter: constitution.obtainedcenter || '',
			  sortingorder: constitution.sortingorder || ''
			}));
		  });
		}
		}
	
	
	
	
  });
}

 }
  });

	 
	 if (Array.isArray(constitutionData)) {
	
		 if (Array.isArray(constitutionData)) {
			 constitutionData
			  .filter(constitution => constitution.electionid === `${electionid}`)
			  .map((constitution, index) => {
				  localStorage.setItem('constitutionelectionidStorage', constitution.electionid);
					localStorage.setItem('constitutionidStorage', constitution.constitutionid);
					localStorage.setItem('constitutioncandidateidStorage', constitution.candidateid);
					localStorage.setItem('banglaconstitutionnameStorage', constitution.banglaconstitutionname);
					localStorage.setItem('totalcenterStorage', constitution.totalcenter);
					localStorage.setItem('obtainedcenterStorage', constitution.obtainedcenter);
					localStorage.setItem('constitutionidStorage', constitution._id);
				  console.log(constitution.electionid)
				  console.log(constitution.constitutionid)
				  console.log(constitution.banglaconstitutionname)
				  console.log(constitution.totalcenter)
				  console.log(constitution.obtainedcenter)
			  });
			}
			
			
	 }
	




	console.log(' ************************************************')
  console.log(candidateData)
  
  console.log(constitutionData)
  console.log(' ************************************************')
  
  
  const handleFormSubmit = async(e) => {
  e.preventDefault();
  // Save the updated formFields to localStorage
  // localStorage.setItem('candidateValues', JSON.stringify([formFields]));
  const formValuesJoin = {
	  id:candidateData.id,
	  electionid:candidateData.electionid,
	  constitutionid:candidateData.constitutionid,
	  candidateid: candidateData.candidateid,
	  candidatenamebangla: candidateData.candidatenamebangla,
	  partysymbol: candidateData.partysymbol,
	  totalvote: candidateData.totalvote	  
  }
  	
  };

return (
		<>
		
		  <div className="start_form">
			<div className="container">
			  <div className="row">
			
					<form method="POST"
					  id="contact_form" onSubmit={handleFormSubmit}>
					  
					  <div className="form-row align-items-center">
         
        
          <div className="col-auto">
		  <p>Election ID</p>
            <input type="text" 
            value={candidateData.electionid}
			onChange={handleInputChange}
			name="electionid"
			id="electionid"
			disabled
		     />
          </div>
		   <div className="col-auto">
			<p>Constitution ID</p>
			<input
			  type="text"
			  value={candidateData.constitutionid}
			  onChange={handleInputChange}
			  name="constitutionid"
			  id="constitutionid"
			  disabled
			/>
		   </div>
		   <div className="col-auto">
			<label>Candidate ID</label>
			<input
			  type="text"
			  value={candidateData.candidateid}
			  onChange={handleInputChange}
			  name="candidateid"
			  id="candidateid"
			/>
		  </div>
		   <div className="col-auto">
			<label>Candidate Name</label>
			<input
			  type="text"
			  value={candidateData.candidatenamebangla}
			  onChange={handleInputChange}
			  name="candidatenamebangla"
			  id="candidatenamebangla"
			/>
		  </div>
		  
			<div className="col-auto">  
			<label>Total Vote</label>
			<input
			  type="text"
			  value={candidateData.totalvote}
			  onChange={(e) => setCandidateData({...candidateData, totalvote: e.target.value})}
			  name="totalvote"
			  id="totalvote"
			/>
		  </div>
          <div className="col-auto">
            <button type="submit" className="btn btn-primary">Submit</button>
          </div>
        </div>
					  
		<div className="form-row align-items-center">
         
        
          <div className="col-auto">
		  <p>Election ID</p>
            <input type="text" 
            value={candidateData.electionid}
			onChange={handleInputChange}
			name="electionid"
			id="electionid"
			disabled
		     />
          </div>
		   <div className="col-auto">
			<p>Constitution ID</p>
			<input
			  type="text"
			  value={candidateData.constitutionid}
			  onChange={handleInputChange}
			  name="constitutionid"
			  id="constitutionid"
			  disabled
			/>
		   </div>
		   <div className="col-auto">
			<label>Candidate ID</label>
			<input
			  type="text"
			  value={candidateData.candidateid}
			  onChange={handleInputChange}
			  name="candidateid"
			  id="candidateid"
			/>
		  </div>
		   <div className="col-auto">
			<label>Candidate Name</label>
			<input
			  type="text"
			  value={candidateData.candidatenamebangla}
			  onChange={handleInputChange}
			  name="candidatenamebangla"
			  id="candidatenamebangla"
			/>
		  </div>
		  
			<div className="col-auto">  
			<label>Total Vote</label>
			<input
			  type="text"
			  value={candidateData.totalvote}
			  onChange={handleInputChange}
			  name="totalvote"
			  id="totalvote"
			/>
		  </div>
          <div className="col-auto">
            <button type="submit" className="btn btn-primary">Submit</button>
          </div>
        </div>
					  
					
					</form>
				
			  </div>
			</div>
		  </div>
		</>
	  );

   
   	}


export default Candidateedit