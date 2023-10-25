
import React , { useState, useEffect  } from "react";
import { useHistory, useParams } from 'react-router-dom';
import "./components.css";

const Dimensional2api = () => {
   
	const [candidateindividualData, setCandidateindividualData] = useState({});
    const [constitutionsData, setConstitutionsData] = useState({});
	
	const [candidateData, setCandidateData] = useState([]);
	
	const [electionData, setElectionData] = useState([]);
	
	const [responseData, setResponseData] = useState(null);

  const [isSubmitted, setIsSubmitted] = useState(false);
	
	const { electionid } = useParams();
	const history = useHistory();
	
	console.log('electionid');

	console.log(`${electionid}`)
	

  const [selectedElectionId, setSelectedElectionId] = useState('');

  useEffect(() => {
    setSelectedElectionId(electionid);
  }, [electionid]);
  
  
  
	
	const getCandidateValue = async() => {
	try{
	const res = await fetch(`http://localhost:7000/dimensional2api/${electionid}`,{
	method: "GET",
	headers:{
	Accept: "application/json",
	"Content-Type": "application/json"
	},
	credentials: "include"
	})

	const responseData = await res.json();
	console.log('Candidate data');
	console.log(responseData);
	setResponseData(responseData);
	if(!res.status === 200){
	const error = new Error(res.error);
	throw error;
	}
	
	// Update the state variables
	setElectionData(responseData.electiondata);
    setCandidateData(responseData.candidateindividualdata);
    setConstitutionsData(responseData.constitutions);
	}catch(err){
	console.log(err);
	//history.push('./login');
	}
	}
	useEffect(()=>{
	   getCandidateValue();
	},[]); 
	
   
	console.log('candidateData front  ' + selectedElectionId+' '  + ' '+ electionid  + 'Election data ' + electionData + '*****' )

	
	let name, value;
	
	const handleCandidateChange = (candidateIndex, field, value) => {
		console.log('dimension '+ candidateIndex + ' ' + field + ' ' + value)
  setCandidateData(prevCandidates => {
    const updatedCandidates = [...prevCandidates];
    const candidate = { ...updatedCandidates[candidateIndex] };
    candidate[field] = value;
    updatedCandidates[candidateIndex] = candidate;
    return updatedCandidates;
  });
};

  const handleFormSubmit = async(e) => {
  e.preventDefault();
 
  const { banglaelectionname, englishelectionname } = electionData;
  
  const { electionid, constitutionid, candidateid, candidatenamebangla, partysymbol, totalvote, date } = candidateData;
  // Destructure constitutionsData
  const { electionid: constitutionElectionId, constitutionid: constitutionConsId, banglaconstitutionname, totalcenter, obtainedcenter, sortingorder, date: constitutionDate } = constitutionsData;

  console.log('candidateData front  ' + selectedElectionId+' '  + ' '+ electionid)
  console.log(JSON.stringify(candidateData))
  console.log(JSON.stringify(constitutionsData))
  
  const mergedData = {
  electionData: electionData,
  candidateData: candidateData,
  constitutionsData: constitutionsData
};
  
 
  	console.log('=============================================================================')
		
	const candidateResponse = await fetch(`http://localhost:7000/candidatebangla2api/${selectedElectionId}`, {
			method:"PUT",
			headers:{
				"Content-Type": "application/json"
			},
			body: JSON.stringify(mergedData)
		});
		
		console.log('=============================================================================')
		
		
		console.log(mergedData);
		
		 if (!candidateResponse.ok) {
		  throw new Error("Failed to submit candidate data");
		}
		
		 console.log(candidateResponse)
		
	      console.log('****************************************************************************')
		const data = await candidateResponse.json();
		
		if (candidateResponse.status === 201) {
		  //console.log(data.message); // "value inserted successfully"
		  window.alert("data updated successfully");
		  console.log("data updated successfully");
		  setCandidateData({...candidateData,electionid: "", constitutionid:"", candidateid: "", candidatenamebangla:"", partysymbol: "", totalvote: ""})
		  //setConstitutionsData({...constitutionsData, electionid: "", constitutionid:"", banglaconstitutionname:"", totalcenter: "", obtainedcenter: ""}})
		  history.push(`/dimensional2api/${selectedElectionId}`);
		} else {
		  //console.log("Error:", data.message);
		  window.alert("Invalid data");
		  console.log("Invalid data");
		}

     // After successful form submission, set isSubmitted to true
     setIsSubmitted(true);	
  	
  };

  const renderConfirmation = () => {
    if (isSubmitted) {
      return <div>Form Submitted Successfully!<p><a href="http://localhost:8000/dimensional2api/1">Please Click This Link</a></p></div>;
    } else {
      return null;
    }
  };
	
	
		
	return (
	 <div class="container">

   <p> Election id : {selectedElectionId}</p>
  

  <form onSubmit={handleFormSubmit}>
	  {(!isSubmitted) && Array.isArray(electionData) && electionData.length > 0 && electionData
	  .filter(election => election.electionid === parseInt(selectedElectionId))
	  .map((election, electionIndex) => (
		<div key={electionIndex}>
		  <h3>election {electionIndex + 1}</h3>
		  <label>
			election Title:
			<input
			  value={election.englishelectionname || ''}
			  onChange={(e) => {
				const updatedData = [...electionData];
				updatedData[electionIndex].englishelectionname = e.target.value;
				handleCandidateChange(updatedData);
			  }}
			  type="text"
			/>
		  </label>
		</div>
	))}

    {(!isSubmitted) && Array.isArray(candidateData) && candidateData.length > 0 && candidateData.map((candidate, candidateIndex) => (
    <div key={candidateIndex} className="borderInCandidateBox">
      <h5>Candidate {candidateIndex + 1}</h5>
      <label>
        Total Vote:
        <input
          value={candidate.totalvote !== undefined ? candidate.totalvote : 0}
          onChange={(e) => {
            const updatedData = [...candidateData];
            updatedData[candidateIndex].totalvote = parseInt(e.target.value); // Parse input as an integer
            handleCandidateChange(updatedData);
          }}
          type="number" // Set input type to "number"
        />
      </label>
      <label>
        Constitution ID: {candidate.constitutionid}
	    </label>
      <label>
        Candidate Name:
        <input
          value={candidate.candidatenamebangla || ''}
          onChange={e => {
            const updatedData = [...candidateData];
            updatedData[candidateIndex].candidatenamebangla = e.target.value;
            handleCandidateChange(updatedData);
          }}
		  type="text"
        />
      </label>
	  <label>
        Edit Party Symbol:
		<img src={candidate.partysymbol} width="50" height="30"   />
      </label>
	  <input
          value={candidate.partysymbol || ''}
          onChange={e => {
            const updatedData = [...candidateData];
            updatedData[candidateIndex].partysymbol = e.target.value;
            handleCandidateChange(updatedData);
          }}
		  type="text" className="big-input"
        />
    </div>
  ))}
   {(!isSubmitted) && Array.isArray(constitutionsData) && constitutionsData.length > 0 && constitutionsData.map((constitutions, constitutionsIndex) => (
    <div key={constitutionsIndex}>
      <h3>constitutions id {constitutions.constitutionid}</h3>
      <h5>constitutions {constitutionsIndex + 1}</h5>
      <label>
        Total center:
        <input
          value={constitutions.totalcenter || ''}
          onChange={(e) => {
            const updatedData = [...constitutionsData];
            updatedData[constitutionsIndex].totalcenter = e.target.value; // Parse input as an integer
            handleCandidateChange(updatedData);
          }}
          type="number" // Set input type to "number"
        />
      </label>
	  <label>
        Obtained center:
        <input
          value={constitutions.obtainedcenter || ''}
          onChange={(e) => {
            const updatedData = [...constitutionsData];
            updatedData[constitutionsIndex].obtainedcenter = e.target.value; // Parse input as an integer
            handleCandidateChange(updatedData);
          }}
          type="number" // Set input type to "number"
        />
      </label>
      <label>
        constitutions Name:
        <input
          value={constitutions.banglaconstitutionname || ''}
          onChange={e => {
            const updatedData = [...constitutionsData];
            updatedData[constitutionsIndex].banglaconstitutionname = e.target.value;
            handleCandidateChange(updatedData);
          }}
		  type="text"
        />
      </label>
    </div>
  ))}
  
  {!isSubmitted ? (
	  <button type="submit">Submit</button>
	  ) : null}
  </form>
  {renderConfirmation()}
  </div>
);
	
}

export default Dimensional2api