import React , { useState, useEffect } from "react";
import { NavLink, useHistory, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import "./4.1.2bootstrap.min.css";
import "./electiontally2.css";


const ElectionResult2 = () => {
	
	const { t } = useTranslation();
	const { lng } = useParams();
	const { eid } = useParams();
	const { cid1 } = useParams();
	const { cid2 } = useParams();
	const { temptype } = useParams();
	const [electionData, setElectionData] = useState([]);
	const [constitutionData, setConstitutionData] = useState([]);
	const [candidateData, setCandidateData] = useState([]);
	
	
	
	const getElectionValue = async() => {
	try{
	const res = await fetch('/getelectiondata',{
	method: "GET",
	headers:{
	Accept: "application/json",
	"Content-Type": "application/json"
	},
	credentials: "include"
	})
	const data = await res.json();
	console.log('electiondata')
	console.log(data)
	setElectionData(data);
	if(!res.status === 200){
	const error = new Error(res.error);
	throw error;
	}
	}catch(err){
	console.log(err);
	}
	}
	useEffect(()=>{
	   getElectionValue();
	},[]);
	const getConstitutionOptionValue = async() => {
	try{
	const res = await fetch('/getconstbangladata',{
	method: "GET",
	headers:{
	Accept: "application/json",
	"Content-Type": "application/json"
	},
	credentials: "include"
	})
	
	const optionsdata = await res.json();
	console.log('optionsdata')
	console.log(optionsdata)
	setConstitutionData(optionsdata);
	if(!res.status === 200){
	const error = new Error(res.error);
	throw error;
	}
	}catch(error){
		console.log(error);
		}
	}
	useEffect(()=>{
	   getConstitutionOptionValue();
	},[]);   
    const getCandidateValue = async() => {
	try{
	const res = await fetch('/getcandidatebangladata',{
	method: "GET",
	headers:{
	Accept: "application/json",
	"Content-Type": "application/json"
	},
	credentials: "include"
	})

	const data = await res.json();
    setCandidateData(data);
	if(!res.status === 200){
	const error = new Error(res.error);
	throw error;
	}
	}catch(err){
	console.log(err);
  	}
	}
	useEffect(()=>{
	   getCandidateValue();
	},[]);

	
	function convertToBengaliDigit(number) {
	  const bengaliDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
	  const numberString = number.toString();
	  let result = '';
	  
	  for (let i = 0; i < numberString.length; i++) {
		const digit = parseInt(numberString[i]);
		result += bengaliDigits[digit];
	  }
	  
	  return result;
	}
	

	   
   	const electionfilteredData = electionData.filter(
	  electionDataItem => electionDataItem.electionid === parseInt(eid)
	);

	const electionnameTitle = electionfilteredData.map(electionDataItem => {
	  return `${lng === 'bng' ? t(electionDataItem.englishelectionname) : electionDataItem.englishelectionname}`;
	});
	 console.log('electionnameTitle');console.log(electionnameTitle);
	 
	 const filteredConstitutionData = [];
     const filteredCandidateData = [];
	
	const constitutionfilteredData = constitutionData.filter(
	  constiDataItem => constiDataItem.electionid === `${eid}`
	);
	console.log('constitutionfilteredData');console.log(constitutionfilteredData);
	
	const candidatefilteredData = candidateData.filter(
	  candidateDataItem => candidateDataItem.electionid === `${eid}`
	);
	console.log('candidatefilteredData');console.log(candidatefilteredData);
	
	console.log('eid')
	console.log(eid)
	
	console.log('*************************************************************8888')
	
	const forConsElectionIds = constitutionData
	  .filter((data) => data.electionid === '9')
	  .map((data) => data.electionid);
	  
	  console.log('forConsElectionIds'); console.log(forConsElectionIds);

	const forCandidates = candidateData.filter((candidate) =>
	  forConsElectionIds.includes(candidate.electionid)
	);
	
	
  const mergedDataCandidates1st = constitutionData.filter((data) => data.constitutionid === `${cid1}`).map((data) => {
  const electionItem = electionData.find((item) => item.electionid === `${eid}`);
  const candidateItems = candidateData.filter((item) => item.electionid === `${eid}` && item.constitutionid === '12'); 
  return {
    ...electionItem,
    ...data,
    candidates: candidateItems // add the filtered candidate items to the merged object
  };
});

console.log('mergedDataCandidates1st'); console.log(mergedDataCandidates1st);

  const mergedDataCandidates2nd = constitutionData.filter((data) => data.constitutionid === `${cid2}`).map((data) => {
  const electionItem = electionData.find((item) => item.electionid === `${eid}`);
  const candidateItems = candidateData.filter((item) => item.electionid === `${eid}` && item.constitutionid === '13'); 
  return {
    ...electionItem,
    ...data,
    candidates: candidateItems // add the filtered candidate items to the merged object
  };
});

console.log('mergedDataCandidates2nd'); console.log(mergedDataCandidates2nd);
	
	
	
  return (
  
 <div class="container-fluid election_box">
          <>
			<h4>
			  <a href="https://bangla.bdnews24.com/election/city-corporation-vote">
			  {electionnameTitle}
			  </a>
			</h4>
			<div class="row">  
            
			 <div class="col-md-6 candidates_row_outer">
			 {mergedDataCandidates1st.map((mergedDataItem1st, index) => (			
			<>
			 <div class="candidates_area">
			 {`${lng}` == 'bng' ? t(mergedDataItem1st.banglaconstitutionname) : mergedDataItem1st.banglaconstitutionname}
			 </div>
			 <div class="row candidates_row ml-0">
			 {mergedDataItem1st.candidates
						.sort((a, b) => b.totalvote - a.totalvote) // sort the candidates array in descending order based on their total votes
						.map((candidate, candidateIndex) => (
			    <>
				<div class="col-sm-12 col-md-6 candidate_box2">
					<div class="logo_box">
						<img id="imagenew" width="100" src={candidate.partysymbol} />
					</div>
					<div class="seats_box">
			          <div class="candidate_title">
					    {`${lng}` === 'bng' ? (
					  <div className="candidate_title">
					  {t(candidate.candidatenamebangla)} 
					  </div>
						) : (
					  <div className="candidate_title_eng">
					  {candidate.candidatenamebangla}
					  </div>
					   )}
					  </div>
					  <div class="seats">{`${lng}` == 'bng' ? convertToBengaliDigit(candidate.totalvote) : candidate.totalvote}</div>
					</div>
					
				</div> {/*  end elec 1 candidate div */}
				
				</>
				   ))}  
				  
				<div class="col-sm-12 col-md-12 variable variable1" >
		    {`${lng}` === 'bng' ? (
			  <div>
			  {convertToBengaliDigit(mergedDataItem1st.totalcenter)} কেন্দ্রের মধ্যে {convertToBengaliDigit(mergedDataItem1st.obtainedcenter)} কেন্দ্রের ফল
			  </div>
			) : (
			  <div>
				{mergedDataItem1st.totalcenter} centres out of {mergedDataItem1st.obtainedcenter} centres
			  </div>
			)}
				</div>
				
					</div>{/*  end row candidates_row div */}
					</>
					 ))}
				</div>{/*  end col candidates_row_outer div */}
				
	<div class="col-md-6 candidates_row_outer">
	 {mergedDataCandidates2nd.map((mergedDataItem2nd, index) => (	
		<>
		
		<div class="candidates_area">
		{`${lng}` == 'bng' ? t(mergedDataItem2nd.banglaconstitutionname) : mergedDataItem2nd.banglaconstitutionname}
		</div>
		<div class="row candidates_row mr-0">
			{mergedDataItem2nd.candidates
						.sort((a, b) => b.totalvote - a.totalvote) // sort the candidates array in descending order based on their total votes
						.map((candidate, candidateIndex) => (
			    <>
				<div class="col-sm-12 col-md-6 candidate_box2">
					<div class="logo_box">
						<img id="imagenew" width="100" src={candidate.partysymbol} />
					</div>
					<div class="seats_box">
			          {`${lng}` === 'bng' ? (
				  <div className="candidate_title">
				  {t(candidate.candidatenamebangla)} 
				  </div>
				    ) : (
				  <div className="candidate_title_eng">
				  {candidate.candidatenamebangla}
				  </div>
				   )}
					  <div class="seats">{`${lng}` == 'bng' ? convertToBengaliDigit(candidate.totalvote) : candidate.totalvote} </div>
					</div>
				</div>{/*  end elec 1 candidate div */}
				 </>
				  ))}  
				 <div class="col-sm-12 col-md-12 variable variable2" >
		    {`${lng}` === 'bng' ? (
			  <div>
			  {convertToBengaliDigit(mergedDataItem2nd.totalcenter)} কেন্দ্রের মধ্যে {convertToBengaliDigit(mergedDataItem2nd.obtainedcenter)} কেন্দ্রের ফল
			  </div>
			) : (
			  <div>
				{mergedDataItem2nd.totalcenter} centres out of {mergedDataItem2nd.obtainedcenter} centres
			  </div>
			)}
				 </div>
				 
				</div>{/*  end row candidates_row div */}
				</>
					 ))}
				</div>{/*  end col candidates_row_outer div */}
	
												
            </div>

 </>
	</div>	

   
  );
};

export default ElectionResult2;
