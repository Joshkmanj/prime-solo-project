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
function* pickupShift(action){
  let takenShiftId = action.payload.takenShiftId;
  let userId = action.payload.userId;
  console.log('PickupShiftSaga: trying to pickup shift ID:', takenShiftId, userId);

  try{
    yield axios.put(`/api/shift/pickup/${userId}/${takenShiftId}`, takenShiftId);
    console.log('pickupShiftSaga: response from server, success! (2/2)');
    yield put({ type: 'FETCH_OPEN_SHIFTS', payload: userId });
    yield put({ type: 'FETCH_CALENDAR', payload: userId });
  } catch{
    console.log('pickupShiftSaga: Error calling in sick');
  }
}

function* modifyShiftSaga(){
  // This function will route these specific actions to the corresponding functions above
  yield takeLatest('CALL_IN_SICK', sickCall) 
  yield takeLatest('GIVE_AWAY_SHIFT', giveAwayShift) 
  yield takeLatest('PICKUP_SHIFT', pickupShift) 
}
export default modifyShiftSaga;