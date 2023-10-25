import React, { useState, useEffect } from "react";
import "./components.css";
const port = "7000";
const { REACT_APP_HOST } = process.env;
const hostname = `${REACT_APP_HOST}`;
const Addconstitutionname = () => {
	const [electionNameData, setelectionNameData] = useState({
		constitutionid: "", banglaconstitutionname: "", englishconstitutionname: ""
	});
	// read election value from database
	const [electionOptionData, setElectionOptionData] = useState([]);
	let name, value;
	const getElectionOptionValue = async () => {
		try {
			const res = await fetch(`http://${hostname}:5000/getelectiondata`, {
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
		console.log(e);
		name = e.target.name;
		value = e.target.value;
		setelectionNameData({ ...electionNameData, [name]: value });
	}
	const handleFirstSelectChange = (event) => {
		const selectedValue = event.target.value;
		console.log('selectedValue')
		console.log(selectedValue)
	};
	const constitutionNameForm = async (e) => {
		e.preventDefault();
		const { constitutionid, banglaconstitutionname, englishconstitutionname } = electionNameData;
		console.log('constitution post data');
		console.log(electionNameData);
		if (banglaconstitutionname === "") { alert("please enter your banglaconstitutionname"); }
		else if (englishconstitutionname === "") { alert("please enter your englishconstitutionname"); }
		const res = await fetch(`http://${hostname}:5000/addconstitutionname`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				constitutionid,
				banglaconstitutionname,
				englishconstitutionname
			})
		});
		const data = await res.json();
		console.log('data.status')
		console.log(data.status)
		if (data.status === 201) {
			alert("constitution value send Successfully");
			setelectionNameData({ ...electionNameData, constitutionid: "", banglaconstitutionname: "", englishconstitutionname: "" })
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
									<label htmlFor="firstSelect">Select an option:</label>
									<select id="firstSelect" onChange={handleFirstSelectChange}>
										<option value="default">Default Option</option>
										<option value="election1">election 1</option>
										<option value="election2">election 2</option>
										<option value="election3">election 3</option>
									</select>
								</div>
								<div>
									<p>Bangla election name</p>
									<select id="banglaecname" onChange={handleFirstSelectChange}>
										{electionOptionData.map((item) => (
											<option value={item._id}>{item.banglaelectionname}</option>
										))}
									</select>
								</div>

								<div className="form_input">
									<label>Constitutionid id (serial id)</label>
									<input type="text" onChange={handleInputs} value={electionNameData.constitutionid} name="constitutionid" id="constitutionid" placeholder="Enter your Constitutionid ( serial id)" />
								</div>
								<div className="form_input">
									<label>Constitutionid name in Bangla</label>
									<input type="text" onChange={handleInputs} value={electionNameData.banglaconstitutionname} name="banglaconstitutionname" id="banglaconstitutionname" placeholder="Enter your banglaconstitutionname" />
								</div>
								<div className="form_input">
									<label>Constitutionid name in English</label>
									<input type="text" onChange={handleInputs} value={electionNameData.englishconstitutionname} name="englishconstitutionname" id="englishconstitutionname" placeholder="Enter your englishelectionname" />
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


export default Addconstitutionname
