import React, { useState, useEffect } from "react";
import { NavLink, useHistory } from 'react-router-dom';
import "./components.css";

const Constitutionenglish = () => {

	const [constitutionEnglishData, setConstitutionEnglishData] = useState({
		constitutionid: "", englishconstitutionname: ""

	});

	// read election value from database

	const [electionOptionData, setElectionOptionData] = useState([]);

	let name, value;

	const getElectionOptionValue = async () => {
		try {
			const res = await fetch('/getelectiondata', {
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
		setConstitutionEnglishData({ ...constitutionEnglishData, [name]: value });
	}


	const [options, setOptions] = useState([]);



	const handleFirstSelectChange = (event) => {
		const selectedValue = event.target.value;
		console.log('selectedValue')
		console.log(selectedValue)
	};




	const constitutionNameForm = async (e) => {
		e.preventDefault();

		const { constitutionid, englishconstitutionname } = constitutionEnglishData;

		console.log('constitution post data');
		console.log(constitutionEnglishData);

		if (englishconstitutionname === "") { alert("please enter your englishconstitutionname"); }


		const res = await fetch('/constitutionenglish', {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				constitutionid,
				englishconstitutionname
			})
		});

		const data = await res.json();
		console.log('data.status')
		console.log(data.status)
		if (data.status === 201) {
			alert("constitution value send Successfully");
			setConstitutionEnglishData({ ...constitutionEnglishData, constitutionid: "", englishconstitutionname: "" })
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
									<select id="banglaecname" onChange={handleFirstSelectChange}>
										{electionOptionData.map((item) => (
											<option value={item._id}>{item.englishelectionname}</option>
										))}
									</select>
								</div>

								<div className="form_input">
									<label>Constitutionid id (serial id)</label>
									<input type="text" onChange={handleInputs} value={constitutionEnglishData.constitutionid} name="constitutionid" id="constitutionid" placeholder="Enter your Constitutionid ( serial id)" />
								</div>
								<div className="form_input">
									<label>Constitutionid name in English</label>
									<input type="text" onChange={handleInputs} value={constitutionEnglishData.englishconstitutionname} name="englishconstitutionname" id="englishconstitutionname" placeholder="Enter your englishelectionname" />
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


export default Constitutionenglish