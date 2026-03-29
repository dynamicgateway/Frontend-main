import React from 'react';
import { Box, Button } from '@mui/material';

interface TabsBtnsProps {
  modes: Array<string>;
  currentMode: string;
  setCurrentMode: (mode: string) => void;
}

const TabsBtns: React.FC<TabsBtnsProps> = ({ modes, currentMode, setCurrentMode }) => {
  return (
    <Box
      component="div"
      sx={{
        display: 'flex',
        backgroundColor: '#F7F7F7',
        borderRadius: '12px',
        p: '4px',
        gap: '4px',
      }}
    >
      {modes.map((mode) => {
        const isActive = mode === currentMode;
        return (
          <Button
            key={mode}
            onClick={() => setCurrentMode(mode)}
            sx={{
              flex: 1,
              textTransform: 'none',
              borderRadius: '8px',
              bgcolor: isActive ? 'purple' : 'transparent',
              color: isActive ? '#fff' : '#6B7280',
              '&:hover': {
                bgcolor: isActive ? 'purple' : '#E5E7EB',
              },
            }}
          >
            {mode}
          </Button>
        );
      })}
    </Box>
  );
};

export default TabsBtns;
