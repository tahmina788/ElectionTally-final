import React, { useState, useEffect } from "react";
import { NavLink, useHistory } from 'react-router-dom';
import "./components.css";

//const hostname = "localhost";
//const hostname = "192.168.200.249";
//const hostname = process.env.REACT_APP_HOST;
//const hostname = "192.168.0.102";
const port = "7000";

const { REACT_APP_HOST } = process.env;
const hostname = `${REACT_APP_HOST}`;

const Constitutionbangla = () => {

	const [constitutionBanglaData, setConstitutionBanglaData] = useState({
		constitutionid: "", banglaconstitutionname: "", totalcenter: "", obtainedcenter: "", sortingorder: "", date: ""

	});


	let name, value;

	const getElectionOptionValue = async () => {
		try {
			const res = await fetch(`http://${hostname}:${port}/getelectiondata`, {
				method: "GET",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json"
				},
				credentials: "include"
			})

			const optionsdata = await res.json();
			console.log('Election data');
			console.log(optionsdata);
			setElectionOptionData(optionsdata);
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
		getElectionOptionValue();
	}, []);



	// we are storing data in states

	const handleInputs = (e) => {
		e.preventDefault();
		console.log(e);
		name = e.target.name;
		value = e.target.value;
		setConstitutionBanglaData({ ...constitutionBanglaData, [name]: value });
	}


	const [options, setOptions] = useState([]);



	const handleFirstSelectChange = (event) => {
		const selectedValue = event.target.value;
		console.log('selectedValue')
		console.log(selectedValue)
	};

	const [selectedValue, setSelectedValue] = useState([]);

	const handleSelectChange = (event) => {
		const selectedValue = event.target.value;
		console.log('selectedValue');
		console.log(selectedValue)
		setSelectedValue(selectedValue);
	};
	// read election value from database

	const [electionOptionData, setElectionOptionData] = useState([]);



	const handleElectionOptionChange = (event) => {
		const selectedValue = event.target.value;
		console.log('selectedValue');
		console.log(selectedValue)
		setElectionOptionData(selectedValue);
	};

	//   for electionid

	const [electionId, setElectionId] = useState('');

	const handleIdInputs = (e) => {
		setElectionId(e.target.value);
	};

	console.log('electionOptionData')
	console.log(electionOptionData)


	const constitutionNameForm = async (e) => {
		e.preventDefault();

		const { electionid, constitutionid, banglaconstitutionname, totalcenter, obtainedcenter, sortingorder } = constitutionBanglaData;

		console.log('constitution post data');
		console.log(constitutionBanglaData);

		if (banglaconstitutionname === "") { alert("please enter your banglaconstitutionname"); }


		const res = await fetch(`http://${hostname}:${port}/constitutionbangla`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				electionid: selectedValue,
				constitutionid,
				banglaconstitutionname,
				totalcenter,
				obtainedcenter,
				sortingorder
			})
		});

		const data = await res.json();
		console.log('data.status')
		console.log(data.status)

		if (res.status === 201) {
			//console.log(data.message); // "value inserted successfully"
			window.alert("data inserted successfully");
			console.log("data inserted successfully");
			setConstitutionBanglaData({ ...constitutionBanglaData, electionid: "", constitutionid: "", banglaconstitutionname: "", totalcenter: "", obtainedcenter: "", sortingorder: "" })

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
									<select id="electionid" name="electionid" value={selectedValue} onChange={handleSelectChange}>
										<option value="">Select an option</option>
										{electionOptionData.map((item) => (
											<option value={item.electionid}>
												{item.banglaelectionname}
											</option>
										))}
									</select>
								</div>

								<div className="form_input">
									<label>Constitutionid id (serial id)</label>
									<input type="text" onChange={handleInputs} value={constitutionBanglaData.constitutionid} name="constitutionid" id="constitutionid" placeholder="Enter your Constitutionid ( serial id)" />
								</div>
								<div className="form_input">
									<label>Constitutionid name in Bangla</label>
									<input type="text" onChange={handleInputs} value={constitutionBanglaData.banglaconstitutionname} name="banglaconstitutionname" id="banglaconstitutionname" placeholder="Enter your banglaconstitutionname" />
								</div>
								<div className="form_input">
									<label>Constitution totalcenter</label>
									<input type="text" onChange={handleInputs} value={constitutionBanglaData.totalcenter} name="totalcenter" id="totalcenter" placeholder="Enter your totalcenter" />
								</div>
								<div className="form_input">
									<label>Constitution obtainedcenter</label>
									<input type="text" onChange={handleInputs} value={constitutionBanglaData.obtainedcenter} name="obtainedcenter" id="obtainedcenter" placeholder="Enter your obtainedcenter" />
								</div>
								<div className="form_input">
									<label>Constitution sortingorder</label>
									<select name="sortingorder" onChange={handleInputs}>
										<option value="">--Select constitution name--</option>
										<option value="asc">Ascending</option>
										<option value="desc">Descending</option>
									</select>
								</div>


								<br />
								<div className="contact_form_button">
									<input type="submit" name="constitutionnamesubmit" id="constitutionnamesubmit" className="form-submit" value="submit" onClick={constitutionNameForm} />
								</div>
							</>

						</form>
					</div>
				</div>
			</div>

		</>
	)


}


export default Constitutionbangla