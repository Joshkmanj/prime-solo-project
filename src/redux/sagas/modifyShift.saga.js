import axios from "axios";
import { put, takeLatest } from 'redux-saga/effects';


function* sickCall(action){
      // console.log(`sickCall: Calling in sick for shiftId: ${action.payload} (1/2)`); // PUT route test log
      try {
        const confirmation = yield axios.put(`/api/shift/sick/${action.payload.shift_id}`);
        console.log('sickCall: response from server, success! (2/2)'); // GET route test log
        yield put({ type: 'FETCH_CALENDAR', payload: action.payload.user_id });
    } catch {
        console.log('sickCall: Error calling in sick');
    }
}

function* modifyShiftSaga(){
  // This function will route these specific actions to the corresponding functions above
  yield takeLatest('CALL_IN_SICK', sickCall) 
}
export default modifyShiftSaga;