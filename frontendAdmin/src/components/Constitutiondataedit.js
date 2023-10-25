
import React , { useState, useEffect  } from "react";
import { NavLink, useHistory, useParams } from 'react-router-dom';
import "./components.css";

const Constitutiondataedit = () => {
	
 // read election value from database
	const [electionData, setElectionData] = useState([]);
	
	const [constitutionData, setConstitutionData] = useState([]);
	
	const [candidateData, setCandidateData] = useState([]);
	
	const [threeCollectionData, setThreeCollectionData] = useState([]);
	
	
	const { constitutionid } = useParams();
	
	console.log('constitutionid')
	console.log(`${constitutionid}`)
	
	
	
	const getConstitutionForEdit = async() => {
	try{
	const res = await fetch(`/constitutiondataedit/${constitutionid}`,{
	method: "GET",
	headers:{
	Accept: "application/json",
	"Content-Type": "application/json"
	},
	credentials: "include"
	})
	
	const optionsdata = await res.json();
	console.log('Constitution data');
	//console.log(optionsdata);
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
	
	
	// we are retrive data from db
	
	const getElectionValue = async() => {
	try{
	const res = await fetch('/getelectiondata',{
	method: "GET",
	headers:{
	Accept: "application/json",
	"Content-Type": "application/json"
	},
	credentials: "include"
	})

	const data = await res.json();
	console.log('Election data');
	//console.log(data);
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
	const res = await fetch('/getconstbangladata',{
	method: "GET",
	headers:{
	Accept: "application/json",
	"Content-Type": "application/json"
	},
	credentials: "include"
	})
	
	const optionsdata = await res.json();
	console.log('Constitution data');
	//console.log(optionsdata);
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
	const res = await fetch('/getcandidatebangladata',{
	method: "GET",
	headers:{
	Accept: "application/json",
	"Content-Type": "application/json"
	},
	credentials: "include"
	})

	const data = await res.json();
	console.log('Candidate data');
	//console.log(data);
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
	
	


const mergedDataCandidates = constitutionData.map((constitutionItem) => {
  const electionItem = electionData.find((item) => item.electionid === constitutionItem.electionid);
  const candidateItems = candidateData.filter((item) => item.constitutionid === constitutionItem.constitutionid); // use filter instead of find
  return {
    ...electionItem,
    ...constitutionItem,
    candidates: candidateItems // add the filtered candidate items to the merged object
  };
});


console.log('mergedDataCandidates')
  console.log(mergedDataCandidates)

	 console.log('********************')


console.log('mergedData')
 // console.log(mergedDataFinalNew)

	 console.log('********************')
	 
	 
	mergedDataCandidates
  .filter((mergedDataItem) => mergedDataItem.constitutionid === '27')
  .forEach((mergedDataItem, index) => {
    localStorage.setItem('_id', mergedDataItem._id);
    localStorage.setItem('electionid', mergedDataItem.electionid);
    localStorage.setItem('constitutionid', mergedDataItem.constitutionid);
    localStorage.setItem('totalcenter', mergedDataItem.totalcenter);
    localStorage.setItem('obtainedcenter', mergedDataItem.obtainedcenter);

    mergedDataItem.candidates.forEach((candidate, candidateIndex) => {
		const keyCandidateId = `candidateid_${candidateIndex}`;
        const keyCandidatenamebangla = `candidatenamebangla_${candidateIndex}`;
		const keyTotalvote = `totalvote_${candidateIndex}`;
		const keyPartysymbol = `partysymbol_${candidateIndex}`;
		const keyCandidateIndex = `${candidateIndex}`;

localStorage.setItem(keyCandidateIndex, candidateIndex);
localStorage.setItem(keyCandidateId, candidate.candidateid);
localStorage.setItem(keyCandidatenamebangla, candidate.candidatenamebangla);
localStorage.setItem(keyTotalvote, candidate.totalvote);
localStorage.setItem(keyPartysymbol, candidate.partysymbol);
    });
  });


mergedDataCandidates
  .filter((mergedDataItem) => mergedDataItem.constitutionid === '27')
  .forEach((mergedDataItem, index) => {	 
	 
	const _id = localStorage.getItem('_id');
const electionid = localStorage.getItem('electionid');
const constitutionidStorage = localStorage.getItem('constitutionid');
const totalcenter = localStorage.getItem('totalcenter');
const obtainedcenter = localStorage.getItem('obtainedcenter');

mergedDataItem.candidates.forEach((candidate, candidateIndex) => {
  const keyCandidateId = `candidateid_${candidateIndex}`;
  const keyCandidatenamebangla = `candidatenamebangla_${candidateIndex}`;
  const keyTotalvote = `totalvote_${candidateIndex}`;
  const keyPartysymbol = `partysymbol_${candidateIndex}`;
  const keyCandidateIndex = `${candidateIndex}`;

  // Retrieve values from localStorage
  const candidateIndexValue = localStorage.getItem(keyCandidateIndex);
  const candidateId = localStorage.getItem(keyCandidateId);
  const candidatenamebangla = localStorage.getItem(keyCandidatenamebangla);
  const totalVote = localStorage.getItem(keyTotalvote);
  const partySymbol = localStorage.getItem(keyPartysymbol);

  // Use the retrieved values as needed
  console.log(candidateIndexValue);
  console.log(candidateId);
  console.log(candidatenamebangla);
  console.log(totalVote);
  console.log(partySymbol);
});
  });

 
	
	// we are storing data in states
	
	const handleInputChange = (e) => {
		console.log(e);
		name = e.target.name;
		value = e.target.value;
		console.log(name + ' ' + value)
		setThreeCollectionData({...threeCollectionData, [name]:value});
	}
	 
	 
	 
// Event handler for form submission
const handleFormSubmit = async(e) => {
  e.preventDefault();
  // Save the updated formFields to localStorage
 
  	const {  electionid, constitutionid, candidateid, candidatenamebangla, partysymbol, totalvote, date	 } = threeCollectionData;
	console.log(threeCollectionData)
	
	
	
	
	console.log('formFields')
	console.log(JSON.stringify(threeCollectionData))
	

	      console.log('****************************************************************************')
		 
  };
	
	
	
		
	return(
        <>
		  <div className="start_form">
			  <div className="container">
			  <div className="row">
			
					<form method="POST"
					  id="contact_form" onSubmit={handleFormSubmit}>
			  
			  
	    <div>
		<p>Bangla election name</p>
			<div>
			  <input type="text" value={electionid} onChange={handleInputChange} name="electionid" id="electionid" disabled />
			</div>
		</div>		
		<div>
		<p>constitution Name</p>
			<div>
			  <input type="text" value={constitutionidStorage} onChange={handleInputChange} name="constitutionid" id="constitutionid" disabled />
			</div>
		</div>
		<div>
		<p>Total Center</p>
			<div>
			  <input type="text" value={totalcenter} onChange={handleInputChange}  name="totalcenter" id="totalcenter" />
			</div>
		</div>
		<div>
		<p>obtainedcenter Center</p>
			<div>
			  <input type="text" value={obtainedcenter} onChange={handleInputChange}  name="obtainedcenter" id="obtainedcenter" />
			</div>
		</div>	
        <div>
		<p>candidate id</p>		
			<div>
			   <input type="text" value={candidateid} onChange={handleInputChange} name="candidateid" id={`candidateid_${candidateIndexValue}`} disabled />

			</div>	
        </div>	
        <div>
		<p>candidate name bangla</p>		  id={`candidatenamebangla_${candidateIndexValue}`}	
			<div>
		<input type="text" value={candidatenamebangla} onChange={handleInputChange} name="candidatenamebangla" id={`candidatenamebangla_${candidateIndexValue}`} disabled />
			  </div>
		</div>
		 <div>
		<p>totalvote</p>	
				<div>
                  <input type="text" value={totalvote} onChange={handleInputChange}  name="totalvote" id={`totalvote_${candidateIndexValue}`} />
				</div>
		</div>	
        <div>
		<p>partysymbol</p>			
		         <div>
		           <input type="text" value={partysymbol} onChange={handleInputChange}  name="partysymbol" id={`partysymbol_${candidateIndexValue}`} disabled />
				 </div>  
		</div>	  
			  
			    	
					  <br />
					  <div className="contact_form_button">
						<input
						  type="submit"
						  name="candidatennamesubmit"
						  id="candidatenamesubmit"
						  className="form-submit"
						  value="Submit"
						/>
					  </div>
					   <br />
					  <br />
					</form>
					  </div>
			   </div>
          </div> 
		</>
	)
		
}

export default Constitutiondataedit