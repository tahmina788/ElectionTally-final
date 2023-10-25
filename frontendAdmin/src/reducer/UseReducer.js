  export const initialState = null;


  export const reducer = (state, action) => {
	  if(action.type === 'USER'){
		  return action.payload;
	  }
	
	  return state;
  }
 
 
// export let initialState = null

// export const reducer = (state, action) => {
   // if (action.type === 'USER') {
    // return action.payload
  // }
  // return state
// }

// initialState = {
  // loggedIn: localStorage.setItem('isLoggedin','123456'),
// }


// initialState = {
  // loggedIn: localStorage.getItem('isLoggedin') || false,
// }

// export const initialState = {
  // isAuthenticated: false,
  // user: null
// };

// export const reducer = (state, action) => {
	// console.log('use reducer')
	// console.log(action.type)
  // switch (action.type) {
    // case 'USER':
      // return {
        // ...state,
        // user: action.payload
      // };
    // default:
      // return state;
  // }
// }
