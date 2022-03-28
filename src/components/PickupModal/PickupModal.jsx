import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { useHistory } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import { useDispatch, useSelector } from 'react-redux';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';

import { FixedSizeList } from 'react-window';

import Fab from '@mui/material/Fab';
import { styled } from '@mui/material/styles';


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







function TradeModal({ item, user }) {
  const [tradeOpen, setTradeOpen] = React.useState(false);
  const dispatch = useDispatch();

  const handleTradeOpen = () => {
    setTradeOpen(true);
  };
  const handleTradeClose = () => {
    setTradeOpen(false);
  };

  const handlePickup = () => {
    console.log('Trying to pick up shift:', item.shift_id, user.id);
    dispatch({ type: 'PICKUP_SHIFT', payload: { takenShiftId: item.shift_id, userId: user.id } })
    handleTradeClose();
  };

  const shiftConverter = (timeframe) => { // This function here converts the string 'day','eve','nht' into their respective definitions
    if (timeframe == 'day') {
      // convertedShift = '7:00am - 3:30pm'
      return '7:00am - 3:30pm';
    } else if (timeframe == 'eve') {
      // convertedShift = '3:00pm - 11:30pm';
      return '3:00pm - 11:30pm';
    } else if (timeframe == 'nht') {
      // convertedShift = '11:00pm - 7:30am';
      return '11:00pm - 7:30am';
    } else {
      return false;
    }
  };


  return (
    <React.Fragment>
      <Button variant="contained" onClick={handleTradeOpen} sx={{ width: 9/10 }}
      >{item.abrv_date} : {shiftConverter(item.shift_time)}</Button>
      <Modal
        hideBackdrop
        open={tradeOpen}
        onClose={handleTradeClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: 300 }}>
          {/* <h2 id="child-modal-title">Pick up</h2> */}
          <h3 id="child-modal-title">Pick up {item.week_day_name} - {item.abrv_date}</h3>
          <h3>{shiftConverter(item.shift_time)}</h3>
          <p id="child-modal-description">

          </p>
          <Stack direction="row" spacing={2}>
            <Button variant="contained" color="error" onClick={handleTradeClose}>Cancel</Button>
            <Button variant="contained" color="success" onClick={handlePickup}>Confirm</Button>
          </Stack>
        </Box>
      </Modal>
    </React.Fragment>
  );
} //-------------- END TRADE SHIFT MODAL ------------






function PickupModal({ user }) {
  let convertedShift;
  // const history = useHistory();
  const openShifts = useSelector((store) => store.openShifts)

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleTradeOpen = () => {
    console.log('shift ID is:', cDate.shift_id);
    handleClose();
  }

  const StyledFab = styled(Fab)({
    position: 'absolute',
    zIndex: 1,
    top: -30,
    left: 0,
    right: 0,
    margin: '0 auto',
  });

  return (
    <div>
      <StyledFab color="secondary" aria-label="add">
        <AddIcon onClick={handleOpen} />
      </StyledFab>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description">
        <Box sx={{ ...style, width: 400 }}>
          <h2 id="parent-modal-title">Open Shifts</h2>


          <List
            sx={{
              width: '100%',
              maxWidth: 360,
              bgcolor: 'background.paper',
              position: 'relative',
              overflow: 'auto',
              maxHeight: 300,
              '& ul': { padding: 0 },
            }} subheader={<li />}
          >
            {/* {[0, 1, 2, 3, 4].map((sectionId) => (<li key={`section-${sectionId}`}> */}
                <ul>
                  {/* <ListSubheader>{`Here's what's open, ${user.first_name}`}</ListSubheader> */}
                  {openShifts.map((item, index) => (
                    <ListItem key={index}>
                      {/* <ListItemText primary={`${item.abrv_date} ${shiftConverter(item.shift_time)}`} /> */}
                      <TradeModal item={item} user={user}/>
                    </ListItem>
                  ))}
                </ul>
              {/* </li> */}
            {/* // ))} */}
          </List>

          <Stack direction="row" spacing={2}>
            {/* <Button variant="contained" onClick={()=>{history.push(`/modify-shift/trade/${cDate.shift_id}`)}}>Trade Shift</Button> */}
            {/* <TradeModal cDate={cDate} /> */}
            <Button variant="contained" color='error' onClick={handleClose} sx={{ mt:2}}>Back</Button>
            {/* <Button variant="contained" onClick={handlePickup}>confirm</Button> */}
          </Stack>


        </Box>
      </Modal>
    </div>
  );
}
export default PickupModal