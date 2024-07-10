import { Box, Divider, Modal, Typography } from '@mui/material';
import React from 'react';
import { BasicModalProps } from './BasicModal.types';

export function BasicModal(props: BasicModalProps) {
  const { show, size = 'auto', title, children, onClose } = props;

  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: size,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    overflow: 'hidden', // Ajustar el overflow a 'hidden' para controlar el desplazamiento interno
    borderRadius: '10px',
  };

  return (
    <Modal
      open={show}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        {title && (
          <Typography
            id="modal-modal-title"
            variant="h3"
            component="h2"
            fontWeight="700"
            className="pb-4"
          >
            {title}
          </Typography>
        )}
        <Divider />
        <Box sx={{ mt: 2, maxHeight: 'calc(90vh - 100px)', overflowY: 'auto' }}>
          {children}
        </Box>
      </Box>
    </Modal>
  );
}
