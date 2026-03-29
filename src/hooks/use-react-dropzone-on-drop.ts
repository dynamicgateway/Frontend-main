import { useCallback } from 'react';
import type { FileRejection } from 'react-dropzone';
import { useAppDispatch } from '@/store/store';
import { enqueueSnackbarMessage } from '@/store/slices/snackbar-notification';
import {
  ALLOWED_IMAGE_EXTENSIONS,
  ALLOWED_VIDEO_EXTENSIONS,
  getImageResolution,
  getVideoResolution,
} from '@/utils/dropzone-utils';

/**
 * Custom hook to handle file drops in react-dropzone
 *
 * @param {Object} params - Hook parameters
 * @param {function} params.handleAcceptedFiles - Callback to handle accepted files
 * @param {function} [params.handleRejectedFiles] - Optional callback to handle rejected files
 * @param {Array} [params.dependencies] - Optional array of dependencies for useCallback
 * @returns {Object} Object containing onDrop callback
 */
const useReactDropzoneOnDrop = ({
  handleAcceptedFiles,
  handleRejectedFiles,
  dependencies,
}: {
  handleAcceptedFiles: (files: Array<File>) => Promise<void>;
  handleRejectedFiles?: (files: Array<FileRejection>) => void;
  dependencies?: Array<unknown>;
}) => {
  const dispatch = useAppDispatch();

  /**
   * Callback function for handling file drops in react-dropzone
   *
   * @param {Array<File>} acceptedFiles - Array of files that passed validation
   * @param {Array<FileRejection>} rejectedFiles - Array of files that failed validation
   * @returns {void}
   */
  const onDrop = useCallback(async (acceptedFiles: Array<File>, rejectedFiles: Array<FileRejection>) => {
    if (rejectedFiles.length) {
      console.error('Rejected files:', rejectedFiles);

      if (rejectedFiles[0]?.errors[0]?.code === 'too-many-files') {
        dispatch(
          enqueueSnackbarMessage({
            message: `Please, upload not more than 5 files at a time.`,
            variant: 'error',
          })
        );
      } else {
        rejectedFiles.forEach((rejectedFile) => {
          rejectedFile.errors.forEach((error) => {
            if (error.code === 'file-invalid-type') {
              dispatch(
                enqueueSnackbarMessage({
                  message: `Unsupported format. Please upload a valid JPG, JPEG, PNG, MP4, AVI, or MOV file. - ${rejectedFile.file.name}`,
                  variant: 'error',
                })
              );
            } else {
              dispatch(enqueueSnackbarMessage({ message: error.message, variant: 'error' }));
            }

            handleRejectedFiles?.(rejectedFiles);
          });
        });
      }
    }

    if (acceptedFiles.length) {
      let valid = true;

      for (const file of acceptedFiles) {
        const fileExtension = file.name.toLowerCase().split('.').pop() ?? '';

        if (ALLOWED_IMAGE_EXTENSIONS.includes(fileExtension)) {
          const resolution = await getImageResolution(file);

          console.log('useReactDropzoneOnDrop onDrop image resolution', resolution);

          if (!resolution || resolution.width < 500 || resolution.height < 500) {
            dispatch(
              enqueueSnackbarMessage({
                message: `Your image must be at least 500x500 pixels. Please upload higher quality image.`,
                variant: 'error',
              })
            );
            valid = false;
          } else if (resolution.width > resolution.height) {
            dispatch(
              enqueueSnackbarMessage({
                message: `Your image must be in portrait orientation.`,
                variant: 'error',
              })
            );
            valid = false;
          }
        } else if (ALLOWED_VIDEO_EXTENSIONS.includes(fileExtension)) {
          const resolution = await getVideoResolution(file);

          console.log('useReactDropzoneOnDrop onDrop video resolution', resolution);

          if (!resolution || resolution.width < 1920 || resolution.height < 1080) {
            dispatch(
              enqueueSnackbarMessage({
                message: `Your video must be at least 1080p resolution. Please upload higher quality video.`,
                variant: 'error',
              })
            );
            valid = false;
          }
        }
      }

      if (valid) {
        await handleAcceptedFiles(acceptedFiles);
      }
    }
  }, dependencies || []);

  return { onDrop };
};

export default useReactDropzoneOnDrop;
