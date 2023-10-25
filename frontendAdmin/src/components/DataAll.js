
import React , { useState, useEffect } from "react";
import { NavLink, useHistory } from 'react-router-dom';
import "./components.css";
import electiondata from './../electiondata';



const DataAll = () => {
	
	// read election value from database
	const [electionData, setElectionData] = useState([]);
	
	const [constitutionData, setConstitutionData] = useState([]);
	
	const [candidateData, setCandidateData] = useState([]);
	
	
	
	
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
	 
	 // useState for selected values
	
	const [selectelectionid, setSelectElectionid] = useState('');
	const [selectconstitution, setSelectConstitution] = useState([]);
	const [selectconstitutionid, setSelectConstitutionid] = useState('');
	
	const handleelection=(e)=>{
		const getelectionId = e.target.value;
		const getConstitutiondata = electiondata.find(election=>election.election_id===getelectionId).constitution;
		setSelectConstitution(getConstitutiondata);
		setSelectElectionid(getelectionId);		
	}
	

	const handleconstitution =(e) => {
		name = e.target.name;
		const constitutionid = e.target.value;
		setSelectConstitutionid(constitutionid);
	}
	
		
	return(
        <>
		  <div className="start_form">
			  <div className="container">
			  
			  
			  
			  <div>
		<p>Bangla election name</p>
		 <select id="selectelectionid" name="selectelectionid" value={selectelectionid} className="form-control" onChange={handleelection}>
		   <option value="">--Select Election name--</option>
		   {
			electiondata.map((getelectionname,index)=>(
                <option value={getelectionname.election_id} key={index}>{getelectionname.election_name}</option>
			))
		   }
		 </select>
	    <br />  
        <p>You have selected: {selectelectionid}</p>		
		</div>		
		<div>
		<p>constitution Name</p>
		 <select id="selectconstitutionid" name="selectconstitutionid" value={selectconstitutionid} className="form-control" onChange={(e)=>handleconstitution(e)}>
		  <option value="">--Select constitution name--</option>
			 {
				 selectconstitution.map((getconstitution,index)=>(
				     <option value={getconstitution.constitution_id} key={index}>{getconstitution.constitution_name}</option>
				 ))
			 }  
		 </select>
		</div>
		 <p>You have selected: {selectconstitutionid}</p>	
			  
			  
			  
			  
			  
			    	<div>
						 <div className="table-container" >
						 <div className="table-header">
							 <div className="table-cell">Election id</div>
							 <div className="table-cell">Constitution id</div>
							 <div className="table-cell">Total Center</div>
							 <div className="table-cell">Obtained Center</div>
							 <div className="table-cell">EDIT center info</div>
						 </div>
						 {mergedDataCandidates
						 .filter((mergedDataItem) => mergedDataItem.constitutionid === selectconstitutionid)
						 .map((mergedDataItem, index) => (
						  <div className="table-row" key={mergedDataItem._id}>
							<div className="table-cell">{mergedDataItem.electionid}</div>
							<div className="table-cell">{mergedDataItem.constitutionid}</div>
							<div className="table-cell">{mergedDataItem.totalcenter}</div>
							<div className="table-cell">{mergedDataItem.obtainedcenter}</div>
							<div className="table-cell"><NavLink to={`/constitutiondataedit/${mergedDataItem.constitutionid}`}>Edit</NavLink></div>
							<div className="table-cell">
							 <div className="table-header">
								 <div className="table-cell">Candidate id</div>
								 <div className="table-cell">Candidate name</div>
								 <div className="table-cell">Totalvote</div>
								 <div className="table-cell">partysymbol</div>
								 <div className="table-cell">EDIT candidate info</div>
							  </div>	 
							{mergedDataItem.candidates
							  .map((candidate, candidateIndex) => (
									<div className="table-row" key={candidateIndex}>
									    <div className="table-cell">{candidate.candidateid}</div>
										<div className="table-cell">{candidate.candidatenamebangla}</div>
										<div className="table-cell">{candidate.totalvote}</div>
										<div className="table-cell"><img width={200} height={100} src={candidate.partysymbol} alt={candidate.partyname}/></div>
										<div className="table-cell"><NavLink to={`/candidatedataedit/${candidate.candidateid}`}>Edit</NavLink></div>
									  </div>
									))}
							</div>
							
						  </div>
						))}
						 </div>
					 </div>
			   </div>
          </div> 
		</>
	)	
}


export default DataAll