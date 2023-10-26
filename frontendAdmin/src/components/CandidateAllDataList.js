
import React, { useState, useEffect } from "react";
import { NavLink, useHistory } from 'react-router-dom';
import "./components.css";

const port = "7000";

const { REACT_APP_HOST } = process.env;
const hostname = `${REACT_APP_HOST}`;

const CandidateAllDataList = () => {

	// read election value from database

	const [candidateData, setCandidateData] = useState([]);

	// we are retrive data from db

	const getCandidateValue = async () => {
		try {
			const res = await fetch('http://localhost:7000/getcandidatebangladata', {
				method: "GET",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json"
				},
				credentials: "include"
			})

			const data = await res.json();
			console.log('Candidate data');
			console.log(data);
			setCandidateData(data);
			if (!res.status === 200) {
				const error = new Error(res.error);
				throw error;
			}
		} catch (err) {
			console.log(err);
			//history.push('./login');
		}
	}
	useEffect(() => {
		getCandidateValue();
	}, []);


	const reverseMap = candidateData.reverse().map((candidateitem) => candidateitem);

	const reversedData = candidateData.slice().reverse(); // create a new array and reverse its order	
	return (
		<>
			<div className="start_form">
				<div className="container">
					<div>
						<div className="table-container" >
							<div className="table-header">
								<div className="table-cell">Election id</div>
								<div className="table-cell">Constitution id</div>
								<div className="table-cell">Candidate id</div>
								<div className="table-cell">Candidate name</div>
								<div className="table-cell">partysymbol</div>
								<div className="table-cell">Totalvote</div>
								<div className="table-cell">EDIT</div>
							</div>

							{reversedData.map((item) => (
								<div className="table-row" key={item._id}>
									<div className="table-cell">{item.electionid}</div>
									<div className="table-cell">{item.constitutionid}</div>
									<div className="table-cell">{item.candidateid}</div>
									<div className="table-cell">{item.candidatenamebangla}</div>
									<div className="table-cell"><img src={item.partysymbol} width={100} height={80} /></div>
									<div className="table-cell">{item.totalvote}</div>
									<div className="table-cell"><NavLink to={`/candidatedataedit/${item.candidateid}`}>Edit</NavLink></div>
								</div>
							))}

						</div>
					</div>
				</div>
			</div>
		</>
	)
}


export default CandidateAllDataList