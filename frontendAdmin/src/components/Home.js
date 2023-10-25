import React, {useState, useEffect} from 'react';
import cors from 'cors';
import Cookies from 'js-cookie';


const Home = () => {

	
	const port = "7000";
	const { REACT_APP_HOST } = process.env;
    const hostname = `${REACT_APP_HOST}`;

	const [userName, setUserName] = useState('');
	const [show, setShow] = useState(false);
	const [userEmail, setUserEmail] = useState(localStorage.getItem('userEmail') || '');
	//const show = true;


	const userHomePage = async() => {
		try{ 
			    const res = await fetch('/getdata', {
			//	const res = await fetch(`http://${hostname}:${port}/getdata`, {
				mode:'cors',
				method: "GET",
				headers: {
					"Content-Type": "application/json"
				},
				credentials: "include" // include the credentials (cookies)
			});
			
			console.log('...........home response start..............')
            //console.log(res)
			console.log('...........home response end..............')
			
			const data = await res.json();
			
			setUserName(data.name);
			setShow(true);
		}catch(err){
			console.log(err);
		}	
	}
	useEffect(() => {
		userHomePage();
		const jwtoken = Cookies.get('jwtoken');
		console.log('jwtoken in ReactJS:', jwtoken);
	}, []);
	return(
	 <>
	 <div className="container">
	 <div className="home-page">
	   <div className="home-div">
	   <p className="pt-5">You are logged in by this {userEmail} email</p>
		 <h2>{show ? 'welcome this project' : 'welcome this project'}</h2>
	   </div>
	 </div>
	 </div>  
	 </>
	)
}

export default Home