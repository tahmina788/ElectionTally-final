import React, { useState, useEffect } from "react";
import { NavLink, useHistory } from 'react-router-dom';
import "./components.css";
import electiondata from './../electiondatadocker';


//const hostname = "192.168.0.102";
const port = "7000";

const { REACT_APP_HOST } = process.env;
const hostname = `${REACT_APP_HOST}`;

const CandidateForBangla = () => {

	const [candidateBanglaData, setCandidateBanglaData] = useState({
		candidateid: "", candidatenamebangla: "", partysymbol: "", totalvote: "", date: ""
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
		console.log(name + ' ' + value)
		setCandidateBanglaData({ ...candidateBanglaData, [name]: value });
	}


	const handleelection = (e) => {
		const getelectionId = e.target.value;
		const getConstitutiondata = electiondata.find(election => election.election_id === getelectionId).constitution;
		setConstitution(getConstitutiondata);
		setElectionid(getelectionId);
	}


	const handleconstitution = (e) => {
		name = e.target.name;
		const constitutionid = e.target.value;
		setConstitutionid(constitutionid);
	}


	const myUpdatedValues = { constitutionid, ...candidateBanglaData }

	const myUpdatedValuesFinal = { electionid, ...myUpdatedValues }


	const candidateNameForm = async (e) => {
		e.preventDefault();

		const { electionid, constitutionid, candidateid, candidatenamebangla, partysymbol, totalvote, date } = myUpdatedValuesFinal;

		console.log('=============================================================================')

		const response = await fetch(`http://${hostname}:${port}/candidatebangla`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				electionid,
				constitutionid,
				candidateid,
				candidatenamebangla,
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
			setCandidateBanglaData({ ...candidateBanglaData, electionid: "", constitutionid: "", candidateid: "", candidatenamebangla: "", partysymbol: "", totalvote: "" })
			document.getElementById("electionid").value = "";
			document.getElementById("constitutionid").value = "";
		} else {
			//console.log("Error:", data.message);
			window.alert("Invalid data");
			console.log("Invalid data");
		}
	}

	return (
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
											electiondata.map((getelectionname, index) => (
												<option value={getelectionname.election_id} key={index}>{getelectionname.election_name}</option>
											))
										}
									</select>
									<br />
									<p>You have selected: {electionid}</p>
								</div>
								<div>
									<p>constitution Name</p>
									<select id="constitutionid" name="constitutionid" value={constitutionid} className="form-control" onChange={(e) => handleconstitution(e)}>
										<option value="">--Select constitution name--</option>
										{
											constitution.map((getconstitution, index) => (
												<option value={getconstitution.constitution_id} key={index}>{getconstitution.constitution_name}</option>
											))
										}
									</select>
								</div>
								<p>You have selected: {constitutionid}</p>


								<div className="form_input">
									<label>candidateid</label>
									<input type="text" onChange={handleInputs} value={candidateBanglaData.candidateid} name="candidateid" id="candidateid" placeholder="Enter your candidateid" />
								</div>
								<div className="form_input">
									<label>candidate Name</label>
									<input type="text" onChange={handleInputs} value={candidateBanglaData.candidatenamebangla} name="candidatenamebangla" id="candidatenamebangla" placeholder="Enter your candidatenamebangla" />
								</div>

								<div className="form_input">
									<label>party symbol</label>
									<input type="text" onChange={handleInputs} value={candidateBanglaData.partysymbol} name="partysymbol" id="partysymbol" placeholder="Enter your partysymbol" />
								</div>

								<div className="form_input">
									<label>Total vote</label>
									<input type="text" onChange={handleInputs} value={candidateBanglaData.totalvote} name="totalvote" id="totalvote" placeholder="Enter your totalvote" />
								</div>

								<br />
								<div className="contact_form_button">
									<input type="submit" name="candidatennamesubmit" id="candidatenamesubmit" className="form-submit" value="submit" onClick={candidateNameForm} />
								</div>
								<br />
								<br />
							</>

						</form>
					</div>
				</div>
			</div>

		</>
	)



}


export default CandidateForBangla