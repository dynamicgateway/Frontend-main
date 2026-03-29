import React from 'react';
import Dialog from '@mui/material/Dialog';
import Box from '@mui/material/Box';
import Player from 'lottie-react';
import loadingDots from '@/assets/animations/loading-dots.json';
import { CustomTypography } from '../custom-typography';
import { t } from 'i18next';
import { MonitorCvIcon } from '@/assets';

const Loader: React.FC = () => {
  return (
    <Dialog
      open
      onClose={() => {}}
      maxWidth={false}
      PaperProps={{
        style: {
          width: '200px',
          height: '200px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 16,
        },
      }}
      // Prevent closing on backdrop click or escape key
      hideBackdrop={false}
      disableEscapeKeyDown
      // MUI v5+ uses slotProps for Backdrop customization
      slotProps={{ backdrop: { style: { background: 'rgba(0,0,0,0.3)' } } }}
    >
      <Box className="flex h-full w-full items-center justify-center">
        <div className="mb-30">
          <MonitorCvIcon />
        </div>
        <CustomTypography type="hFour">{t('loader.generatingResume')}</CustomTypography>
        <Player autoplay loop animationData={loadingDots} style={{ width: 120, height: 120 }} />
      </Box>
    </Dialog>
  );
};

export default Loader;
