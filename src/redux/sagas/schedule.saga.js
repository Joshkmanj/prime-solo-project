import axios from "axios";
import { put, takeLatest } from 'redux-saga/effects';

// ---------------<  G e t   O p e n   S h i f t s   O n l y  >----------------------
function* fetchOpenShifts(action){
    //   console.log(`fetchSchedule: getting user ${action.payload} schedule from database (1/2)`); // GET route test log.
      try {
        const openShifts = yield axios.get(`/api/schedule/open-shifts/${action.payload}`);
        // console.log('fetchSchedule: response from server (2/2):', openShifts.data); // GET route test log.
        yield put({ type: 'SET_OPEN_SHIFTS', payload: openShifts.data });

    } catch {
        console.log('fetchSchedule: Error retrieving schedule');
    }
}

// ---------------<  G e t   O n l y   M y   S h i f t s  >----------------------
function* fetchMyShifts(action){
      // console.log(`fetchMyShifts: getting user ${action.payload} schedule from database (1/2)`); // GET route test log.
      try {
        const schedule = yield axios.get(`/api/schedule/user/${action.payload}`);
        // console.log('fetchMyShifts: response from server (2/2):', schedule.data); // GET route test log.
        yield put({ type: 'SET_SCHEDULE', payload: schedule.data });

    } catch {
        console.log('fetchMyShifts: Error retrieving schedule');
    }
}

// ---------------<  G e t   M y   C a l e n d a r  >----------------------
function* fetchCalendar(action){
      // console.log(`fetchCalendar: Getting calendar and shifts from database (1/2)`); // GET route test log.
      try {
        const calendar = yield axios.get(`/api/schedule/calendar/${action.payload}`);
        // console.log('fetchCalendar: response from server (2/2):', calendar.data); // GET route test log.
        yield put({ type: 'SET_CALENDAR', payload: calendar.data });

    } catch {
        console.log('fetchSchedule: Error retrieving schedule (2/2)');
    }
}

// ---------------< TEST SAGA: G e t   C u r r e n t   D a t e  >----------------------
function* fetchCurrentDate(){
    console.log(`fetchCurrentDate: Getting current date (1/2)`); // GET route test log.
    try {
      const today = yield axios.get(`/api/schedule/today`);
      console.log('fetchCurrentDate: response from server (2/2):', today.data); // GET route test log.
      yield put({ type: 'SET_TODAYS_DATE', payload: today.data });

  } catch {
      console.log('fetchSchedule: Error retrieving schedule (2/2)');
  }
}



// ---------------<  C o n n e c t i n g   S a g a  >----------------------
function* scheduleSaga(){
  // This function will route these specific actions to the corresponding functions above.
  yield takeLatest('FETCH_OPEN_SHIFTS', fetchOpenShifts) 
  yield takeLatest('FETCH_SHIFTS', fetchMyShifts) 
  yield takeLatest('FETCH_CALENDAR', fetchCalendar)
  
  // Test saga
  yield takeLatest('FETCH_CURRENT_DATE', fetchCurrentDate)
}
export default scheduleSaga;