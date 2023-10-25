import React , { useState, useEffect } from "react";
import { NavLink, useHistory } from 'react-router-dom';
import "./components.css";

const CandidateBanglafetch = () => {
	
	const history = useHistory();
	
  const [selectedElection, setSelectedElection] = useState("");
  const [constitutionOptionData, setConstitutionOptionData] = useState([]);
  
   const [candidateBanglaData, setCandidateBanglaData] = useState({
		electionid: "", constitutionid: "", candidateid: "", candidatenamebangla: "", partysymbol: "", date: ""	
	});
  
  // read election value from database
	
	const [electionOptionData, setElectionOptionData] = useState([]);
	
	 const [constitutionOptionByElecData, setConstitutionOptionByElecData] = useState([]);
	 
	 const [count, setCount] = useState(0);
	
 // const handleElectionSelectChange = (event) => {
	  // console.log('event');
	  // console.log(event.target.value);
    // const selectedElection = event.target.value;
    // setSelectedElection(selectedElection);
  // }


const handleElectionSelectChange = (event) => {
  const selectedElection = event.target.value || 7; // Set default value of 7 if selectedElection is not set
  setSelectedElection(selectedElection);

  fetch(`/constitution?electionid=${selectedElection}`)
    .then(response => response.json())
    .then(data => {
      console.log(data); // Log the constitution data to the console
    })
    .catch(error => {
      console.error(error); // Log any errors to the console
    });
}

	
  
    useEffect(() => {
    document.title = `You clicked ${count} times`;
  }, [count]);
 
	
  
  let name, value;
	
const getElectionOptionValue = async() => {
	try{
	const res = await fetch('/getelectiondata',{
	method: "GET",
	headers:{
	Accept: "application/json",
	"Content-Type": "application/json"
	},
	credentials: "include"
	})

	const optionsdata = await res.json();
	console.log('Election data');
	console.log(optionsdata);
	setElectionOptionData(optionsdata);
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
	   getElectionOptionValue();
	},[]);
	
	
	
	//  get constitution name values


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
	console.log(optionsdata);
	setConstitutionOptionData(optionsdata);
	if(!res.status === 200){
	const error = new Error(res.error);
	throw error;
	}
	}catch(err){
	console.log(err);
	}
	}
	useEffect(()=>{
	   getConstitutionOptionValue();
	},[]);
	
	// we are storing data in states
	
	const handleInputs = (e) => {
		console.log(e);
		name = e.target.name;
		value = e.target.value;
		setCandidateBanglaData({...candidateBanglaData, [name]:value});
	}
	
	
	const candidateNameForm = async (e) => {
		e.preventDefault();
		
		const { electionid, constitutionid, candidateid, candidatenamebangla, partysymbol, date	 } = candidateBanglaData;
		
		console.log('candidate post data');
	    console.log(candidateBanglaData);
		
		if(candidatenamebangla === ""){ alert("please enter your candidatenamebangla");}
		
		
		const res = await fetch('/candidatebangla', {
			method:"POST",
			headers:{
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				electionid,
				constitutionid,
				candidateid,
				candidatenamebangla,
				partysymbol
			})
		});
	
		const data = await res.json();
	    console.log('data.status')
		console.log(data.status)
			 if(data.status === 201){
				 alert("constitution value send Successfully");
				 setCandidateBanglaData({...candidateBanglaData,electionid: "", constitutionid:"", candidateid: "", candidatenamebangla:"", partysymbol: ""})
			 }
	}
	



  return (
   <>
     <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
		  <div className="start_form">
			  <div className="container">
				  <div className="row">
				  
				  <form method="POST" id="contact_form">
	 <>			  
    <div>
      <p>Bangla election fetch name</p>
      <select id="electionid" name="electionid" value={selectedElection} onChange={handleElectionSelectChange}>
        <option value="">Select an option</option>
        {electionOptionData.map((item) => (
          <option value={item.electionid} key={item.electionid}>
            {item.banglaelectionname}
          </option>
        ))}
      </select>

      <br />

      <div>
        <p>constitution Name</p>
        <select id="banglaecname" name="constitutionid">
          <option value="">Select an option</option>
          {constitutionOptionData.map((item) => (
            <option value={item.constitutionid} key={item.constitutionid}>
              {item.banglaconstitutionname}
            </option>
          ))}
        </select>
      </div>
    </div>
	<div className="form_input">
         <label>Constitutionid id (serial id)</label>
         <input type="text" onChange={handleInputs} value={candidateBanglaData.constitutionid} name="constitutionid" id="constitutionid" placeholder="Enter your Constitutionid ( serial id)" />
       </div>
	   <div className="form_input">
         <label>candidateid</label>
         <input type="text" onChange={handleInputs} value={candidateBanglaData.candidateid} name="candidateid" id="candidateid" placeholder="Enter your candidateid" />
       </div>
	    <div className="form_input">
         <label>Constitution totalcenter</label>
         <input type="text" onChange={handleInputs} value={candidateBanglaData.candidatenamebangla} name="candidatenamebangla" id="candidatenamebangla" placeholder="Enter your candidatenamebangla" />
       </div>
	    <div className="form_input">
         <label>Constitution obtainedcenter</label>
         <input type="text" onChange={handleInputs} value={candidateBanglaData.partysymbol} name="partysymbol" id="partysymbol" placeholder="Enter your partysymbol" />
       </div>  
	   
	    <br/>
	   <div className="contact_form_button">
		 <input type="submit" name="constitutionnamesubmit" id="constitutionnamesubmit" className="form-submit" value="submit" onClick={candidateNameForm} />
	   </div>
	    </>
	</form>
		</div>
		</div>
		</div> 
		 </>
  );
}


export default CandidateBanglafetch
