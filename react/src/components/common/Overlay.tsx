import React from 'react';
import { Box } from '@mui/material';

interface OverlayProps {
  children: React.ReactNode;
  onClick: () => void;
}

const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 1000
};

const Overlay: React.FC<OverlayProps> = ({ children, onClick }) => {
  return (
    <Box sx={overlayStyle} onClick={onClick}>
      {children}
    </Box>
  );
};

export default Overlay;