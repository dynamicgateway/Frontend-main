import { clearToast } from '@/store/slices/toast';
import { useAppDispatch } from '@/store/store';
import { Snackbar, Alert } from '@mui/material';

export interface ToastType {
  type: ToastSeverity;
}
export enum ToastSeverity {
  SUCCESS = 'success',
  ERROR = 'error',
  WARNING = 'warning',
  INFO = 'info',
}
interface ToastProps extends ToastType {
  message: string;
  isOpen: boolean;
}

const Toast = ({ type, message, isOpen }: ToastProps) => {
  const dispatch = useAppDispatch();

  const handleClose = () => {
    dispatch(clearToast());
  };
  return (
    <Snackbar
      sx={{ width: '80vw', maxWidth: '545px', minWidth: '350px' }}
      open={isOpen}
      autoHideDuration={4000}
      onClose={handleClose}
      message={message}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <Alert onClose={handleClose} severity={type} variant="filled" sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default Toast;
