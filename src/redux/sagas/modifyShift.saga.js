import axios from "axios";
import { put, takeLatest } from 'redux-saga/effects';


function* sickCall(action){
      console.log(`sickCall: Calling in sick for shiftId: ${action.payload} (1/2)`); // PUT route test log
      try {
        const confirmation = yield axios.put(`/api/shift/${action.payload}`);
        // console.log('fetchSchedule: response from server (2/2):', schedule.data); // GET route test log
        // yield put({ type: 'SET_SCHEDULE', payload: schedule.data });

    } catch {
        console.log('sickCall: Error calling in sick');
    }
}

function* modifyShiftSaga(){
  // This function will route these specific actions to the corresponding functions above
  yield takeLatest('CALL_IN_SICK', sickCall) 
}
export default modifyShiftSaga;