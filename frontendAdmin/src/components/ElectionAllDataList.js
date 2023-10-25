import React , { useState, useEffect } from "react";
import { NavLink, useHistory } from 'react-router-dom';
import "./components.css";
import ChildComponent from './EditElectionData';
import cors from 'cors';

const ElectionAllDataList = () => {
	
	const history = useHistory();
	
	// read election value from database
	
	const [electionData, setElectionData] = useState([]);

	//const hostname = "192.168.0.102";
    const port = "7000";

	const { REACT_APP_HOST } = process.env;
    const hostname = `${REACT_APP_HOST}`;
	
	// we are retrive data from db

	const getElectionValue = async() => {
	try{
	const res = await fetch(`http://${hostname}:${port}/getelectiondata`, {
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
	
	const reversedData = electionData.slice().reverse(); // create a new array and reverse its order	

	return(
        <>
		  <div className="start_form">
			  <div className="container">
			    	<div>
					 <div className="table-container" >
					 <div className="table-header">
						<div className="table-cell">Election id</div>
						<div className="table-cell">English name</div>
						<div className="table-cell">Bangla name</div>
						<div className="table-cell">temptype</div>
						<div className="table-cell">EDIT</div>
					  </div>
					{reversedData.map((item) => (
      <div className="table-row" key={item._id}>
        <div className="table-cell" key={item._id}>{item.electionid}</div>
        <div className="table-cell">{item.englishelectionname}</div>
        <div className="table-cell">{item.banglaelectionname}</div>
		<div className="table-cell">{item.temptype}</div>
			{/*<div className="table-cell"><NavLink to={`/dimensional/${item.electionid}`}>Edit</NavLink></div>*/}
		<div className="table-cell"><NavLink to={`/dimensional2api/${item.electionid}`}>TotalCenterEdit</NavLink></div>
      </div>
     ))}
    </div>
		</div>
	  
	   </div>
 </div> 

		</>
	)	
}


export default ElectionAllDataList