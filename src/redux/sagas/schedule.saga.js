import axios from "axios";
import { put, takeLatest } from 'redux-saga/effects';


function* fetchShifts(action){
      console.log(`fetchSchedule: getting user ${action.payload} schedule from database (1/2)`); // GET route test log
      try {
        const schedule = yield axios.get(`/api/schedule/user/${action.payload}`);
        console.log('fetchSchedule: response from server (2/2):', schedule.data); // GET route test log
        yield put({ type: 'SET_SCHEDULE', payload: schedule.data });

    } catch {
        console.log('fetchSchedule: Error retrieving schedule (2/2)');
    }
}
function* fetchCalendar(){
      console.log(`fetchCalendar: Generating a calendar from database (1/2)`); // GET route test log
      try {
        const schedule = yield axios.get(`/api/schedule/${action.payload}`);
        console.log('fetchSchedule: response from server (2/2):', schedule.data); // GET route test log
        yield put({ type: 'SET_SCHEDULE', payload: schedule.data });

    } catch {
        console.log('fetchSchedule: Error retrieving schedule (2/2)');
    }
}


function* scheduleSaga(){
  // This function will route these specific actions to the corresponding functions above
  yield takeLatest('FETCH_SHIFTS', fetchShifts) 
  yield takeLatest('FETCH_CALENDAR', fetchCalendar) 
}
export default scheduleSaga;