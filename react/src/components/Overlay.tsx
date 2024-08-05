import React from 'react';

import { Box } from '@mui/material';

interface OverlayProps {
  closeModal: () => void;
}

const Overlay: React.FC = ({ children, close }) => {
  return (
    <Box>
      <Box sx={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        /* 透明度を持たせた黒で背景を暗くする */
        display: "flex",
        alignItems: "center",
        /* 中央揃えのためのスタイリング */
        "justify-content": "center",
        "z-index": 1000,
      }}
        onClick={props.closeCreateCategoryModal}>
      </Box >
    </Box>

  );
}

export default Overlay;