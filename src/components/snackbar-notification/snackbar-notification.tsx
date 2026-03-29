import { dequeueSnackbarMessage, selectSnackbarNotifications } from '@/store/slices/snackbar-notification';
import { useAppDispatch } from '@/store/store';
import { IconButton, Portal, Snackbar } from '@mui/material';
import { useCallback, useEffect, useState, type FC } from 'react';
import { useSelector } from 'react-redux';
import { UserIcon } from '@/assets';
import { colors } from '@/theme/colors';
import { ZIndexLevelsEnum } from '@/constants/ui-constants';

const VARIANT_TO_BG_COLOR_CONFIG = {
  error: colors.error,
  success: colors.primaryBlue,
  info: colors.primaryBlue,
  warning: colors.darkGrey,
} as const;

/**
 * SnackbarNotification component that displays snackbar messages from the Redux store.
 *
 * @component
 * @returns {JSX.Element} The rendered `SnackbarNotification` component.
 */
export const SnackbarNotification: FC = () => {
  const dispatch = useAppDispatch();

  const enqueuedMessages = useSelector(selectSnackbarNotifications);

  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    if (enqueuedMessages.length && !open) setOpen(true);
  }, [enqueuedMessages, open]);

  const handleClose = useCallback(() => {
    dispatch(dequeueSnackbarMessage());
    setOpen(false);
  }, []);

  return (
    /** NikitaK - Wrapping in Portal allows to show Snackbar over DialogBox's backdrop. */
    <Portal>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        autoHideDuration={enqueuedMessages[0]?.isPersistent ? null : 5000}
        sx={{
          zIndex: ZIndexLevelsEnum.SNACKBAR_NOTIFICATION,
          '& .MuiSnackbarContent-root': {
            border: `1px solid ${VARIANT_TO_BG_COLOR_CONFIG[enqueuedMessages[0]?.variant || 'info']}`,
            borderRadius: '12px',
            backgroundColor: VARIANT_TO_BG_COLOR_CONFIG[enqueuedMessages[0]?.variant || 'info'],
          },
        }}
        open={open}
        message={enqueuedMessages[0]?.message}
        onClose={handleClose}
        transitionDuration={0}
        action={
          <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
            <UserIcon className="text-white" />
          </IconButton>
        }
      />
    </Portal>
  );
};
