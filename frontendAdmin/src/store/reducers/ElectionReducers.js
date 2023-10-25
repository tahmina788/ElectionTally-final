import axios from 'axios';


const initialState = { electionsdata: [] };

export default async function ElectionReducer(state = initialState, action) {
  switch (action.type) {
    case 'FETCH_POSTS':
	  try {
		const response = await axios.get('http://localhost:20000/getelectiondata');
		const electionsdata = response.data;
		return { ...state, electionsdata };
	  } catch (error) {
		console.error(error);
		return state;
	  }
    default:
      return state;
  }
}

