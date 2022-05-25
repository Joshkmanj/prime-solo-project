const openShiftsReducer = (state = [], action) => {

  if (action.type === 'SET_OPEN_SHIFTS') {
    return action.payload;
  }
  // If action.type is anything else, it'll just return the last value of state.
  return state;
}


export default openShiftsReducer;