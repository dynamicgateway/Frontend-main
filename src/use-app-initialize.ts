import { setIsMobile } from '@/store/slices/system';
import { useAppDispatch } from '@/store/store';
import { useMediaQuery } from '@mui/material';
import { useEffect } from 'react';

const useAppInitialize = () => {
  const dispatch = useAppDispatch();

  const isMobile = useMediaQuery('(max-width:768px)');

  useEffect(() => {
    dispatch(setIsMobile(isMobile));
  }, [isMobile]);
};

export default useAppInitialize;
