const todaysDateReducer = (state = {}, action) => {

if (action.type === 'SET_TODAYS_DATE') {
return action.payload;
}
// If action.type is anything else, it'll just return the last value of state.
return state;
}

export default todaysDateReducer;