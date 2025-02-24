import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: '8px',
  boxShadow: 24,
  p: 4,
  textAlign: 'center',
};

const ReuseModal = ({ open, handleClose, modalTitle, modalBody }) => {
  return (
    <Modal open={open} onClose={handleClose} aria-labelledby="modal-title" aria-describedby="modal-description">
      <Box sx={style}>
        <Typography id="modal-title" variant="h6" component="h2">
          {modalTitle}
        </Typography>
        <Typography id="modal-description" sx={{ mt: 2 }}>
          {modalBody}
        </Typography>
        <Button variant="contained" color="primary" onClick={handleClose} sx={{ mt: 2 }}>
          Close
        </Button>
      </Box>
    </Modal>
  );
};

export default ReuseModal;










// import React from 'react';
// import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
// import Modal from '@mui/material/Modal';

// const style = {
//   position: 'absolute',
//   top: '50%',
//   left: '50%',
//   transform: 'translate(-50%, -50%)',
//   width: 400,
//   bgcolor: 'background.paper',
//   border: '2px solid #000',
//   boxShadow: 24,
//   p: 4,
// };

// export default function ReuseModal(props) {

//     const {open,handleClose,modalTitle,modalBody} = props;
// //   const [open, setOpen] = useState(false);
// //   const handleOpen = () => setOpen(true);
// //   const handleClose = () => setOpen(false);

//   return (
//     <div>
//       {/* <Button onClick={handleOpen}>Open modal</Button> */}
//       <Modal
//         open={open}
//         onClose={handleClose}
//         aria-labelledby="modal-modal-title"
//         aria-describedby="modal-modal-description"
//       >
//         <Box sx={style}>
//           <Typography id="modal-modal-title" variant="h6" component="h2">
//             {modalTitle}
//           </Typography>
//           <Typography id="modal-modal-description" sx={{ mt: 2 }}>
//             {modalBody}
//           </Typography>
//         </Box>
//       </Modal>
//     </div>
//   );
// }
