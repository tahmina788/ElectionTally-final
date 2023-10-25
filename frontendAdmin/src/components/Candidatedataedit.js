
import React, { useState, useEffect } from "react";
import { NavLink, useHistory, useParams } from 'react-router-dom';
import "./components.css";

const Candidatedataedit = () => {

	const [candidateData, setCandidateData] = useState('');
	const { candidateid } = useParams();
	const history = useHistory();

	const [formChanged, setFormChanged] = useState(false);

	const [formFields, setFormFields] = useState([]);

	console.log(`${candidateid}`)

	//const hostname = "localhost";
	//const hostname = "192.168.200.249";
	//const hostname = "192.168.0.102";
	const port = "7000";

	const { REACT_APP_HOST } = process.env;
    const hostname = `${REACT_APP_HOST}`;

	const getCandidateValue = async () => {
		try {
			const res = await fetch(`http://${hostname}:${port}/candidatedataedit/${candidateid}`, {
				method: "GET",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json"
				},
				credentials: "include"
			})

			const data = await res.json();
			console.log('individual Candidate data');
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

	let name, value;

	console.log("candidateeditpage here")
	console.log(candidateData)

	// we are storing data in states

	// we are storing data in states

	const handleInputChange = (e) => {
		e.preventDefault();

		name = e.target.name;
		value = e.target.value;
		console.log(name + ' ' + value);
		setCandidateData({ ...candidateData, [name]: value });
		setFormChanged(true);
	}



	if (formChanged && Array.isArray(candidateData)) {

		candidateData.map((candidate, index) => {
			localStorage.setItem('electionidStorage', candidate.electionid);
			localStorage.setItem('constitutionidStorage', candidate.constitutionid);
			localStorage.setItem('candidateidStorage', candidate.candidateid);
			localStorage.setItem('candidatenamebanglaStorage', candidate.candidatenamebangla);
			localStorage.setItem('partysymbolStorage', candidate.partysymbol);
			localStorage.setItem('totalvoteStorage', candidate.totalvote);
			localStorage.setItem('idStorage', candidate._id);
		});
	}

	useEffect(() => {
		const _idStore = localStorage.getItem('idStorage');
		const electionidStore = localStorage.getItem('electionidStorage');
		const constitutionidStore = localStorage.getItem('constitutionidStorage');
		const candidateidStore = localStorage.getItem('candidateidStorage');
		const candidatenamebanglaStore = localStorage.getItem('candidatenamebanglaStorage');
		const partysymbolStore = localStorage.getItem('partysymbolStorage');
		const totalvoteStore = localStorage.getItem('totalvoteStorage');
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
	}, [formChanged, candidateData]);

	console.log(' after useEffect candidateData')
	console.log(candidateData)
	console.log('formFields values')
	console.log(formFields)
	//console.log(candidateValuesFromStorage[0].candidateid)
	// Event handler for form submission
	const handleFormSubmit = async (e) => {
		e.preventDefault();
		// Save the updated formFields to localStorage
		// localStorage.setItem('candidateValues', JSON.stringify([formFields]));
		const formValuesJoin = {
			id: candidateData.id,
			electionid: candidateData.electionid,
			constitutionid: candidateData.constitutionid,
			candidateid: candidateData.candidateid,
			candidatenamebangla: candidateData.candidatenamebangla,
			partysymbol: candidateData.partysymbol,
			totalvote: candidateData.totalvote
		}
		const { id, electionid, constitutionid, candidateid, candidatenamebangla, partysymbol, totalvote, date } = formValuesJoin;
		console.log('formValuesJoin')
		console.log(formValuesJoin)

		console.log(`${candidateid}`)

		console.log('formValuesJoin')
		console.log(JSON.stringify(formValuesJoin))
		const upid = `${candidateid}`;



		console.log('****************************************************************************')
		// Make the API call to update the candidate values on the server
		const response = await fetch(`http://${hostname}:${port}/candidate/:${upid}`, {
			method: "POST",
			mode: 'cors',
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(formValuesJoin)
		});
		console.log('****************************************************************************')

		const data = await response.json();
		if (response.status === 201) {
			//console.log(data.message); // "value inserted successfully"
			window.alert("data updated successfully");
			console.log("data updated successfully");
			setCandidateData({ ...candidateData, electionid: "", constitutionid: "", candidateid: "", candidatenamebangla: "", partysymbol: "", totalvote: "" })
			localStorage.removeItem('candidateValues');
			localStorage.removeItem("idStorage");
			localStorage.removeItem("electionidStorage");
			localStorage.removeItem("constitutionidStorage");
			localStorage.removeItem("candidateidStorage");
			localStorage.removeItem("candidatenamebanglaStorage");
			localStorage.removeItem("partysymbolStorage");
			localStorage.removeItem("totalvoteStorage");
			history.push('/candidatealldatalist');
		} else {
			//console.log("Error:", data.message);
			window.alert("Invalid data");
			console.log("Invalid data");
		}

	};

	console.log('electionidStore')

	console.log(candidateData.electionid)
	console.log(candidateData.constitutionid)
	return (
		<>

			<div className="start_form">
				<div className="container">
					<div className="row">

						<form method="POST"
							id="contact_form" onSubmit={handleFormSubmit}>
							<div>
								<p>Bangla election name</p>
								<input
									type="text"
									value={candidateData.electionid}
									onChange={handleInputChange}
									name="electionid"
									id="electionid"
									disabled
								/>
								<br />
							</div>
							<div>
								<p>Constitution Name</p>
								<input
									type="text"
									value={candidateData.constitutionid}
									onChange={handleInputChange}
									name="constitutionid"
									id="constitutionid"
									disabled
								/>
							</div>
							<div className="form_input">
								<label>Candidate ID</label>
								<input
									type="text"
									value={candidateData.candidateid}
									onChange={handleInputChange}
									name="candidateid"
									id="candidateid"
								/>
							</div>
							<div className="form_input">
								<label>Candidate Name</label>
								<input
									type="text"
									value={candidateData.candidatenamebangla}
									onChange={handleInputChange}
									name="candidatenamebangla"
									id="candidatenamebangla"
								/>
							</div>
							<div className="form_input">
								<label>Party Symbol</label>
								<input
									type="text"
									value={candidateData.partysymbol}
									onChange={handleInputChange}
									name="partysymbol"
									id="partysymbol"
								/>
							</div>
							<div className="form_input">
								<label>Total Vote</label>
								<input
									type="text"
									value={candidateData.totalvote}
									onChange={handleInputChange}
									name="totalvote"
									id="totalvote"
								/>
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
	);


}


export default Candidatedataedit