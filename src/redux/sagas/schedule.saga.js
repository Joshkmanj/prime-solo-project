// import { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';


function* fetchSchedule(){
      console.log('fetchSchedule: getting schedule from database (1/2)'); // GET route test log
      try {
        const schedule = yield axios.get('/api/schedule');
        console.log('fetchSchedule: response from server (2/2):', schedule.data); // GET route test log
        // yield put({ type: 'SET_SCHEDULE', payload: schedule.data });

    } catch {
        console.log('fetchSchedule: Error retrieving schedule (2/2)');
    }
}


function* scheduleSaga(){
  yield takeLatest('FETCH_SCHEDULE', fetchSchedule)
}
export default scheduleSaga;