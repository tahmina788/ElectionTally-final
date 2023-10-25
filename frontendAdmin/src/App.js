import React, { createContext, useReducer } from 'react';
import { Route, Switch } from "react-router-dom";
import cors from 'cors';
import 'bootstrap/dist/css/bootstrap.css';
import "./App.css";
import Navbar from "./components/NavbarNewwithoutlogin";
import Home from "./components/HomeNew";
import About from "./components/About";
import Contact from "./components/Contact";    
import Contactus from "./components/Contactus";

import Login from "./components/Login";

import Signup from "./components/Signup";
import Addelectionname from "./components/Addelectionname";

import Addconstitutionname from "./components/Addconstitutionname";
import ElectionAllDataList from "./components/ElectionAllDataList";

import DataAll from "./components/DataAll";
import CandidateAllDataList from "./components/CandidateAllDataList";

import ConstitutionAllData from "./components/ConstitutionAllData";
import Dimensional2api from "./components/Dimensional2api";
import LocalStorage from "./components/LocalStorage";
import ErrorPage from "./components/Errorpage";
import Logout from "./components/Logout";
import Constitutionbangla from "./components/Constitutionbangla";
import Constitutionenglish from "./components/Constitutionenglish";
import Candidatebangla from "./components/Candidatebangla";
import Candidateforbangla from "./components/Candidateforbangla";
import Candidateenglish from "./components/Candidateenglish";



import Constitution from './components/Constitution';
import ElectionList from './components/Election';




import ElectionResult from './components/ElectionResult';
import ElectionResult2 from './components/ElectionResult2';

import ElectionResult3 from './components/ElectionResult3';

import ElectionResult4 from './components/ElectionResult4';

import EditElectionData from './components/EditElectionData';

import Authfound from './components/Authfound';


import PrintLocalStorage from './components/PrintLocalStorage';

import { initialState, reducer } from "../src/reducer/UseReducer";

import { I18nextProvider } from 'react-i18next';
// import i18n (needs to be bundled ;)) 
import i18n from './i18n';
import dotenv from 'dotenv'; // Import dotenv

const hostname = process.env.REACT_APP_HOST;

// contextAPI
export const UserContext = createContext(null);

const Routing = () => {
	return (
		<Switch>
			<Route exact path="/">
				<Home />
			</Route>
			<Route path="/about">
				<About />
			</Route>
			<Route path="/constitution/:electionid">
				<Constitution />
			</Route>
			<Route path="/contactus">
				<Contactus />
			</Route>
			<Route path="/printstorage">
				<PrintLocalStorage />
			</Route>
			<Route path="/login">
				<Login />
			</Route>
			<Route path="/signup">
				<Signup />
			</Route>
			<Route path="/electionalldatalist">
				<ElectionAllDataList />
			</Route>
			<Route path="/constitutionalldata">
				<ConstitutionAllData />
			</Route>
			<Route path='/posts/edit/:id'>
				<EditElectionData />
			</Route>
			<Route path="/dataall">
				<DataAll />
			</Route>
			<Route path="/candidatealldatalist">
				<CandidateAllDataList />
			</Route>
			<Route path="/dimensional2api/:electionid">
				<Dimensional2api />
			</Route>
			<Route path="/localstorage/:candidateid">
				<LocalStorage />
			</Route>
			<Route path="/addelectionname">
				<Addelectionname />
			</Route>
			<Route path="/addconstitutionname">
				<Addconstitutionname />
			</Route>
			<Route path="/constitutionbangla">
				<Constitutionbangla />
			</Route>
			<Route path="/constitutionenglish">
				<Constitutionenglish />
			</Route>
			<Route path="/candidatebangla">
				<Candidatebangla />
			</Route>
			<Route path="/candidateforbangla">
				<Candidateforbangla />
			</Route>
			<Route path="/candidateenglish">
				<Candidateenglish />
			</Route>
			<Route path="/election">
				<ElectionList />
			</Route>
			<Route path="/electionresult/:lng/:eid/:cid">
				<ElectionResult />
			</Route>
			<Route path="/electionresult2/:lng/:eid/:cid1/:cid2/:temptype">
				<ElectionResult2 />
			</Route>
			<Route path="/electionresult3/:lng/:eid/:cid1/:cid2/:temptype">
				<ElectionResult3 />
			</Route>
			<Route path="/electionresult4/:lng/:eid/:cid1/:cid2/:temptype">
				<ElectionResult4 />
			</Route>
			<Route path="/logout">
				<Logout />
			</Route>
			<Route>
				<ErrorPage />
			</Route>
		</Switch>
	)
}

const App = () => {

	const showNavbarElection = !window.location.pathname.includes('/electionresult');

	// Pass the retrieved state as the initial state of your UserContext
	const [state, dispatch] = useReducer(reducer, initialState);

	const accessToken = localStorage.getItem('isLoggedin');

	console.log('hi');
	console.log(accessToken);

	return (
		<>
			<I18nextProvider i18n={i18n}>
				<UserContext.Provider value={{ state, dispatch }}>
				
					{showNavbarElection ? <Navbar /> : <Authfound />}
					
					<Routing />
				</UserContext.Provider>
			</I18nextProvider>
		</>
	)
}



export default App;
