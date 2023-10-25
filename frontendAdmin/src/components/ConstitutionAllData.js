
import React , { useState, useEffect } from "react";
import { NavLink, useHistory } from 'react-router-dom';
import "./components.css";
import electiondata from './../electiondata';


//const hostname = "192.168.0.102";
const port = "7000";

const { REACT_APP_HOST } = process.env;
const hostname = `${REACT_APP_HOST}`;

const ConstitutionAllData = () => {
	const history = useHistory();
	
	// read election value from database
	const [electionData, setElectionData] = useState([]);
	
	const [constitutionData, setConstitutionData] = useState([]);
	
	const [candidateData, setCandidateData] = useState([]);
	
	// we are retrive data from db
	
	const getElectionValue = async() => {
	try{
	const res = await fetch(`http://${hostname}:${port}/getelectiondata`,{
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
	const res = await fetch(`http://${hostname}:${port}/getconstbangladata`,{
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
	const res = await fetch('http://localhost:7000/getcandidatebangladata',{
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
	
	return (
    <div className="start_form">
      <div className="container">
        <div>
  <div className="table-container">
	<div className="table-header">
	  <div className="table-cell">Election id</div>
	  <div className="table-cell">Constitution id</div>
	  <div className="table-cell">Total Center</div>
	  <div className="table-cell">Obtained Center</div>
	  <div className="table-cell">EDIT center info</div>
	</div>
		{/* Render table rows based on mergedDataCandidates */}
		{mergedDataCandidates
		  .map((mergedDataItem, index) => (
			<div key={mergedDataItem._id} className="table-row">
			  {/* Render table cell content */}
			  <div className="table-cell">{mergedDataItem.electionid}</div>
						<div className="table-cell">{mergedDataItem.constitutionid}</div>
						<div className="table-cell">{mergedDataItem.totalcenter}</div>
						<div className="table-cell">{mergedDataItem.obtainedcenter}</div>
						<div className="table-cell"><NavLink to={`/constitutiondataedit/${mergedDataItem.constitutionid}`}>Edit</NavLink></div>
			</div>
		  ))}
          </div>
        </div>
      </div>
    </div>
  );	
	
	
	}
  

export default ConstitutionAllData