import React , { useState, useEffect } from "react";
import { NavLink, useHistory } from 'react-router-dom';
import "./components.css";


const port = "7000";

const { REACT_APP_HOST } = process.env;
const hostname = `${REACT_APP_HOST}`;

const CandidateBangla = () => {
	
	const [candidateBanglaData, setCandidateBanglaData] = useState({
		electionid: "", constitutionid: "", candidateid: "", candidatenamebangla: "", partysymbol: "", date: ""	
	});
	
	// read election value from database
	
	const [electionOptionData, setElectionOptionData] = useState([]);
	
	// read constitution value from database
	
	const [constitutionOptionData, setConstitutionOptionData] = useState([]);
	
	let name, value;
	
const getElectionOptionValue = async() => {
	try{
	const res = await fetch('http://localhost:7000/getelectiondata',{
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
	}catch(error){
	//console.log(error);
	//history.push('./login');
	}
	}
	useEffect(()=>{
	   getElectionOptionValue();
	},[]);



  
  // read constitution for candi value from database
	
	const [constforcandibangladata, setconstforcandibangladata] = useState([]);
  //  get constitution name values


const getconstforcandibangladata = async() => {
	try{
	const res = await fetch('/getconstforcandibangladata',{
	method: "GET",
	headers:{
	Accept: "application/json",
	"Content-Type": "application/json"
	},
	credentials: "include"
	})
	
	
	const optionsdataforcandidate = await res.json();
	console.log('Constitution for candi data');
	console.log(optionsdataforcandidate);
	// const optionsArray = Object.entries(optionsdata).map(([electionid, banglaconstitutionname]) => ({ electionid, banglaconstitutionname }));
        // console.log('optionsArray data');
	// console.log(optionsArray);
	setconstforcandibangladata(optionsdataforcandidate);
	if(!res.status === 200){
	const error = new Error(res.error);
	throw error;
	}
	}catch(error){
	//console.log(error);
	}
	}
	useEffect(()=>{
	   getconstforcandibangladata();
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
	// const optionsArray = Object.entries(optionsdata).map(([electionid, banglaconstitutionname]) => ({ electionid, banglaconstitutionname }));
        // console.log('optionsArray data');
	// console.log(optionsArray);
	setConstitutionOptionData(optionsdata);
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
	
	// we are storing data in states
	
	const handleInputs = (e) => {
		console.log(e);
		name = e.target.name;
		value = e.target.value;
		setCandidateBanglaData({...candidateBanglaData, [name]:value});
	}
	
	
	const [selectedOption2, setSelectedOption2] = useState('');
	
	// this is first select option
	const [selectedValue, setSelectedValue] = useState([]);

const handleSelectChange = (event) => {
	const selectedValue = event.target.value;
	console.log('selectedValue');
	console.log(selectedValue)
    setSelectedValue(selectedValue);
	setSelectedOption2('');
};

// This function handles the change event for the second select input
  const handleOption2Change = (event) => {
    const selectedValue = event.target.value;
    setSelectedOption2(selectedValue);
  };
  
  


  // This function generates the options for the second select input based on the selected value of the first select input
  const getOption2Data = () => {
    if (selectedValue) {
      return constitutionOptionData[selectedValue].map((item) => (
        <option key={item.constitutionid} value={item.constitutionid}>
          {item.banglaconstitutionname}
        </option>
      ));
    } else {
      return <option value="">Select an option</option>;
    }
  };



  const handleFirstSelectChange = (event) => {
    const selectedValue = event.target.value;
	console.log('selectedValue')
	console.log(selectedValue)
	
  };
  
 

	
	
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
	
	
	return(
        <>
		  <div className="start_form">
			  <div className="container">
				  <div className="row">
				  
				  <form method="POST" id="contact_form">
	 
	  <>
	 <div>
		<p>Bangla election name</p>
		<select id="electionid" name="electionid" value={selectedValue} onChange={handleSelectChange}>
		<option value="">Select an option</option>
        {electionOptionData.map((item) => (
          <option value={item.electionid}>
            {item.banglaelectionname}
          </option>
        ))}
      </select>
	  
	    <br />

   
		</div>
		
		
		
		 <div>
		<p>constitution Name</p>
		<select id="banglaecname" name="constitutionid" onChange={handleFirstSelectChange}>
		{constitutionOptionData.map((item) => (
			<option value={item.constitutionid}>{item.banglaconstitutionname}{constitutionOptionData.electionid}</option>
			 ))}
		</select>
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
)
	
	
}


export default CandidateBangla