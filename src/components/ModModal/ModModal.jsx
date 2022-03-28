import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import { useHistory } from 'react-router-dom';
import SendIcon from '@mui/icons-material/Send';
import { useDispatch } from 'react-redux';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};


function SickModal({ cDate, handleClose, user, dispatch }) {
  const [open, setOpen] = React.useState(false);
  const handleSickOpen = () => {
    setOpen(true);
  };
  const handleSickClose = () => {
    setOpen(false);
  };

  const callInSick = () => {
    console.log('calling in sick, shift_id:', cDate.shift_id);
    dispatch({ type: 'CALL_IN_SICK', payload: { cDate: cDate, user_id: user.id } })
    handleSickClose();
    handleClose();
  }

  return (
    <React.Fragment>
      <Button onClick={handleSickOpen} variant="contained" color="error">Call In Sick</Button>
      <Modal
        hideBackdrop
        open={open}
        onClose={handleSickClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: 300 }}>
          <h2 id="child-modal-title">I would recommend that you don't</h2>
          <p id="child-modal-description">

          </p>
          <Stack direction="row" spacing={2}>
            <Button variant="outlined" color="warning" onClick={handleSickClose}>I'll take Tylenol</Button>
            <Button variant="outlined" color="error" onClick={callInSick}>No, I Insist</Button>
          </Stack>
        </Box>
      </Modal>
    </React.Fragment>
  );
} //-------------- END SICK MODAL ------------

// function TradeModal({ cDate }) {
//   const [tradeOpen, setTradeOpen] = React.useState(false);
//   const handleTradeOpen = () => {
//     setTradeOpen(true);
//   };
//   const handleTradeClose = () => {
//     setTradeOpen(false);
//   };


//   return (
//     <React.Fragment>
//       <Button variant="contained" onClick={handleTradeOpen}>Trade Shift</Button>
//       <Modal
//         hideBackdrop
//         open={tradeOpen}
//         onClose={handleTradeClose}
//         aria-labelledby="child-modal-title"
//         aria-describedby="child-modal-description"
//       >
//         <Box sx={{ ...style, width: 300 }}>
//           <h2 id="child-modal-title">Select an option</h2>
//           <p id="child-modal-description">

//           </p>
//           <Stack direction="row" spacing={2}>
//             <Button variant="outlined" color="warning" onClick={handleTradeClose}>Current trade options</Button>
//             <Button variant="outlined" color="error" onClick={handleTradeClose}>No, I Insist</Button>
//           </Stack>
//         </Box>
//       </Modal>
//     </React.Fragment>
//   );
// } //-------------- END TRADE SHIFT MODAL ------------

function GiveAwayModal({ cDate }) {
  const [giveawayOpen, setGiveawayOpen] = React.useState(false);
  const handleGiveawayOpen = () => {
    setGiveawayOpen(true);
  };
  const handleGiveawayClose = () => {
    setGiveawayOpen(false);
  };

  return (
    <React.Fragment>
      <Button variant="contained" onClick={handleGiveawayOpen}>Trade Shift</Button>
      <Modal
        hideBackdrop
        open={giveawayOpen}
        onClose={handleGiveawayClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: 300 }}>
          <h2 id="child-modal-title">Select an option</h2>
          <p id="child-modal-description">

          </p>
          <Stack direction="row" spacing={2}>
            <Button variant="outlined" color="warning" onClick={handleGiveawayClose}>I'll take Tylenol</Button>
            <Button variant="outlined" color="error" onClick={handleGiveawayClose}>No, I Insist</Button>
          </Stack>
        </Box>
      </Modal>
    </React.Fragment>
  );
} //-------------- END GIVE AWAY MODAL ------------

function NestedModal({ cDate, user }) {
  let convertedShift;
  const dispatch = useDispatch();
  const history = useHistory();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const shiftConverter = () => { // This function here converts the string 'day','eve','nht' into their respective definitions
    if (cDate.shift_time == 'day') {
      convertedShift = '7:00am - 3:30pm'
      return true;
    } else if (cDate.shift_time == 'eve') {
      convertedShift = '3:00pm - 11:30pm';
      return true;
    } else if (cDate.shift_time == 'nht') {
      convertedShift = '11:00pm - 7:30am';
      return true;
    } else {
      return false;
    }
  };

  const handleGiveAway = () => {
    let requestedShift = { ...cDate, type: 'giveaway' }
    dispatch({ type: 'GIVE_AWAY_SHIFT', payload: { cDate: requestedShift, user_id: user.id } })
  };
  const handleTradeOpen = () => {
    console.log('shift ID is:', cDate.shift_id);
    handleClose();
    history.push(`/modify-shift/trade/${cDate.shift_id}`)
  }

  return (
    <div>
      {/* <ListItemText onClick={handleOpen} primary={cDate.week_day_name} secondary={cDate.shift_time} sx={{ bgcolor: '#9aca38', width: 270, borderRadius: '5px', p: 1 }}/> */}
      {(shiftConverter(cDate.shift_time)) ? <ListItemText onClick={handleOpen} primary={cDate.week_day_name} secondary={convertedShift} sx={{ bgcolor: '#9aca38', width: 270, borderRadius: '5px', p: 1 }} /> : <ListItemText primary={cDate.week_day_name} secondary={cDate.shift_time} sx={{ width: 270, borderRadius: '5px', p: 1 }} />}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box
          sx={{ ...style, width: 400 }}
        >
          <h2 id="parent-modal-title">Options for {cDate.week_day_name} - {cDate.abrv_date}</h2>
          <Stack direction="column" spacing={2}>
            {/* <Button variant="contained" onClick={()=>{history.push(`/modify-shift/trade/${cDate.shift_id}`)}}>Trade Shift</Button> */}

            {/* <TradeModal cDate={cDate} /> */}
            <Button variant="contained" onClick={handleTradeOpen}>Trade Shift</Button>

            {/* <Button variant="contained" onClick={handleGiveAway}>Give Away</Button> */}
            <SickModal cDate={cDate} handleClose={handleClose} user={user} dispatch={dispatch} />

          </Stack>


        </Box>
      </Modal>
    </div>
  );
}
export default NestedModal