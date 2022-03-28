import axios from "axios";
import { put, takeLatest } from 'redux-saga/effects';


function* sickCall(action){
  let sickShift = action.payload.cDate
  let userId = action.payload.user_id
      // console.log(`sickCall: Calling in sick for shiftId: ${action.payload} (1/2)`); // PUT route test log
      try {
        yield axios.put(`/api/shift/sick/${userId}`, sickShift);
        console.log('sickCall: response from server, success! (2/2)'); // GET route test log
        yield put({ type: 'FETCH_CALENDAR', payload: userId });
    } catch {
        console.log('sickCall: Error calling in sick');
    }
}
function* giveAwayShift(action){
      let givenShift = action.payload.cDate
      let userId = action.payload.user_id
      console.log(`giveAwayShift: Giving away shiftId: ${givenShift.shift_id} for user ID: ${userId} (1/2)`); // PUT route test log
      try {
        yield axios.post(`/api/shift/giveaway`, givenShift);
        console.log('giveAwayShift: response from server, success! (2/2)'); // GET route test log
        yield put({ type: 'FETCH_CALENDAR', payload: userId });
    } catch {
        console.log('giveAwayShift: Error calling in sick');
    }
}

function* modifyShiftSaga(){
  // This function will route these specific actions to the corresponding functions above
  yield takeLatest('CALL_IN_SICK', sickCall) 
  yield takeLatest('GIVE_AWAY_SHIFT', giveAwayShift) 
}
export default modifyShiftSaga;