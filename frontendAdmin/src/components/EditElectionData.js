import { useState, useEffect } from "react";
import {connect} from 'react-redux';
import { getPost } from '../store/selectors/PostSelectors';

function EditElectionData(props){

  const [post, setPost] = useState(props.post);
  
  const [englishName, setEnglishName] = useState("");
  const [banglaName, setBanglaName] = useState("");
  const [status, setStatus] = useState("");
  

   useEffect(() => {
      setPost(props.post)
   }, [props.post])

	return(
	  <div>
	   <div>Edit Data</div>
	     <div>
		   <form>
			 <input
				type="text"
				value={englishName}
				onChange={(e) => setEnglishName(e.target.value)}
			  />
			  <input
				type="text"
				value={banglaName}
				onChange={(e) => setBanglaName(e.target.value)}
			  />
			  <input
				type="text"
				value={status}
				onChange={(e) => setStatus(e.target.value)}
			  />
			  <div>
			    <button type='submit'>Edit data</button>
			  </div>
		   
		   </form>
		 </div>
	  
	  </div>
	)
	
}

const makeStateToProps = () => {
	const post = getPost();
	return (state, props) => {
		return {
			post: post(state, props.match.params.id)
		}
	}
}

export default connect(makeStateToProps)(EditElectionData);