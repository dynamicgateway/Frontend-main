import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { CustomTypography } from '@/components/custom-typography';
import { dialogBoxTypes } from './dialog-box-types';

interface DialogBoxProps {
  open: boolean;
  onClose: () => void;
  title: string;
  message: string;
  primaryButtonText: string;
  secondaryButtonText: string;
  onPrimaryClick: () => void;
  onSecondaryClick: () => void;
  primaryButtonColor?: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info';
  secondaryButtonColor?: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info';
  type?: dialogBoxTypes;
  thirdButtonText?: string;
  onThirdClick?: () => void;
  thirdButtonColor?: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info';
  displayThirdButton?: boolean;
  disableBackdropClick?: boolean;
  disableEscapeKeyDown?: boolean;
}

const DialogBox: React.FC<DialogBoxProps> = ({
  open,
  onClose,
  title,
  message,
  primaryButtonText,
  secondaryButtonText,
  onPrimaryClick,
  onSecondaryClick,
  primaryButtonColor = 'primary',
  secondaryButtonColor = 'secondary',
  type = dialogBoxTypes.INFO,
  thirdButtonText,
  onThirdClick,
  thirdButtonColor,
  displayThirdButton,
  disableBackdropClick = false,
  disableEscapeKeyDown = false,
}) => {
  const handlePrimaryClick = () => {
    onPrimaryClick();
    onClose();
  };

  const handleSecondaryClick = () => {
    onSecondaryClick();
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      disableEscapeKeyDown={disableEscapeKeyDown}
      slotProps={{
        backdrop: {
          onClick: disableBackdropClick ? (e) => e.stopPropagation() : undefined,
        },
      }}
      PaperProps={{
        style: {
          borderRadius: '12px',
          padding: '8px',
        },
      }}
    >
      <DialogTitle>
        <CustomTypography type="hFour" style={{ textAlign: 'center', marginBottom: '8px' }}>
          {title}
        </CustomTypography>
      </DialogTitle>

      <DialogContent>
        <CustomTypography type="textPrimaryOne" style={{ textAlign: 'center', lineHeight: '1.5' }}>
          {message}
        </CustomTypography>
      </DialogContent>

      <DialogActions style={{ justifyContent: 'center', gap: '12px', padding: '16px 24px' }}>
        {displayThirdButton && (
          <Button
            variant="contained"
            onClick={onThirdClick}
            color={thirdButtonColor}
            style={{
              minWidth: '120px',
              borderRadius: '8px',
              textTransform: 'none',
              fontWeight: 600,
            }}
          >
            <CustomTypography type="button">{thirdButtonText}</CustomTypography>
          </Button>
        )}
        <Button
          variant="outlined"
          onClick={handleSecondaryClick}
          color={secondaryButtonColor}
          style={{
            minWidth: '120px',
            borderRadius: '8px',
            textTransform: 'none',
            fontWeight: 600,
          }}
        >
          <CustomTypography type="button">{secondaryButtonText}</CustomTypography>
        </Button>

        <Button
          variant="contained"
          onClick={handlePrimaryClick}
          color={primaryButtonColor}
          style={{
            minWidth: '120px',
            borderRadius: '8px',
            textTransform: 'none',
            fontWeight: 600,
          }}
        >
          <CustomTypography type="button">{primaryButtonText}</CustomTypography>
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogBox;
