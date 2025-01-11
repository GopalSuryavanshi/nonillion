// reducer.js
const initialState = {
    catId: null,
  };
  
  const catReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_CAT_ID':
        return {
          ...state,
          catId: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default catReducer;
  