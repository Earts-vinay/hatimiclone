// src/components/CommonButton.js

import React from 'react';
import { Button } from '@mui/material';

const CustomButton = ({
  children,
  onClick,
  variant = 'contained',
  size = 'medium',
  disabled = false,
  startIcon,
  position,
  endIcon,
  width = '100px',
  ...props
}) => {
  return (
    <Button
      onClick={onClick}
      variant={variant}
      size={size}
      disabled={disabled}
      startIcon={startIcon}
      endIcon={endIcon}
      sx={{
        borderRadius: "5px",
        textTransform: 'capitalize',
        width: width,
        position: position,
        color:"black",
        backgroundColor: '#b08e54', // Pink color
        '&:hover': {
          backgroundColor: '#b08e54', // Darker pink for hover effect
        }
      }}
      {...props}
    >
      {children}
    </Button>
  );
};

export default CustomButton;
