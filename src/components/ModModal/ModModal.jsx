import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import { useHistory } from 'react-router-dom';


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

function SickModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button onClick={handleOpen} variant="contained" color="error">Call In Sick</Button>
      <Modal
        hideBackdrop
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: 300 }}>
          <h2 id="child-modal-title">I would recommend that you don't</h2>
          <p id="child-modal-description">
            
          </p>
          <Stack direction="row" spacing={2}>
          <Button variant="outlined" color="warning" onClick={handleClose}>I'll take Tylenol</Button>
          <Button variant="outlined" color="error" onClick={handleClose}>No, I Insist</Button>
          </Stack>
        </Box>
      </Modal>
    </React.Fragment>
  );
}

function TradeModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
<Button variant="contained" onClick={()=>{history.push(`/modify-shift/trade/${cDate.shift_id}`)}}>Trade Shift</Button>
      <Modal
        hideBackdrop
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: 300 }}>
          <h2 id="child-modal-title">Select an option</h2>
          <p id="child-modal-description">
            
          </p>
          <Stack direction="row" spacing={2}>
          <Button variant="outlined" color="warning" onClick={handleClose}>I'll take Tylenol</Button>
          <Button variant="outlined" color="error" onClick={handleClose}>No, I Insist</Button>
          </Stack>
        </Box>
      </Modal>
    </React.Fragment>
  );
}

function NestedModal({ cDate }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      {/* <ListItemText onClick={handleOpen} primary={cDate.week_day_name} secondary={cDate.shift_time} sx={{ bgcolor: '#9aca38', width: 270, borderRadius: '5px', p: 1 }}/> */}
      {(cDate.shift_time) ? <ListItemText onClick={handleOpen} primary={cDate.week_day_name} secondary={cDate.shift_time} sx={{ bgcolor: '#9aca38', width: 270, borderRadius: '5px', p: 1 }} /> : <ListItemText primary={cDate.week_day_name} secondary={cDate.shift_time} sx={{ width: 270, borderRadius: '5px', p: 1 }} />}
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
          <TradeModal />
            <Button variant="contained" onClick={()=>{history.push(`/modify-shift/drop/${cDate.shift_id}`)}}>Give Away</Button>
          <SickModal />
          </Stack>

          {/* <p id="parent-modal-description">
            example text
          </p> */}
        </Box>
      </Modal>
    </div>
  );
}
export default NestedModal