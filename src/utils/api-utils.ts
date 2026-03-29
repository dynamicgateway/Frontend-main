import { toggleBusyIndicator } from '@/store/slices/busy-indicator';
import { enqueueSnackbarMessage } from '@/store/slices/snackbar-notification';
import type { ThunkDispatch, UnknownAction } from '@reduxjs/toolkit';
import type { BaseQueryFn } from '@reduxjs/toolkit/query';
import { AxiosError, type AxiosInstance, type AxiosRequestConfig } from 'axios';
import { t } from 'i18next';

/**
 * Handles API errors by transforming them into a standardized error format.
 *
 * @param error - The error object to handle, typically from an Axios request
 * @returns A Promise resolving to an object containing the standardized error information
 *          with data, message, and status properties if it's an AxiosError,
 *          or the original error if it's not
 */
export const handleApiError = async (error: unknown) => ({
  error:
    error instanceof AxiosError
      ? {
          data:
            error.response?.data instanceof Blob && error.response.data.type === 'application/json'
              ? (JSON.parse(await error.response.data.text()) as unknown)
              : (error.response?.data as unknown),
          message: error.message,
          status: error.response?.status,
        }
      : error,
});

/**
 * Creates a base query function for RTK Query using an Axios instance.
 *
 * @param axiosInstance - The configured Axios instance to use for making requests
 * @returns A base query function compatible with RTK Query that uses the provided
 *          Axios instance for making API requests
 *
 * @example
 * ```ts
 * const axiosInstance = axios.create({ baseURL: 'https://api.example.com' });
 * const baseQuery = createAxiosBaseQuery(axiosInstance);
 * ```
 */
export const createAxiosBaseQuery =
  (axiosInstance: AxiosInstance): BaseQueryFn<AxiosRequestConfig> =>
  async (axiosRequestConfig) => {
    try {
      const { data } = await axiosInstance.request<unknown>(axiosRequestConfig);

      return { data };
    } catch (error) {
      return await handleApiError(error);
    }
  };

/**
 * Handle the busy indicator on query util.
 * @param _ - The payload.
 * @param {Object} params - The parameters.
 * @param {ThunkDispatch<any, any, UnknownAction>} params.dispatch - The dispatch.
 * @param {Promise<unknown>} params.queryFulfilled - The query fulfilled.
 */
export const busyIndicatorOnQueryUtil = async (
  _: unknown,
  {
    dispatch,
    queryFulfilled,
    customErrorMessage,
  }: {
    dispatch: ThunkDispatch<any, any, UnknownAction>;
    queryFulfilled: Promise<unknown>;
    customErrorMessage?: string;
  }
) => {
  try {
    dispatch(toggleBusyIndicator(true));
    await queryFulfilled;
  } catch (error: unknown) {
    console.error('busyIndicatorOnQueryUtil onQueryStarted error:', error);

    if (error instanceof AxiosError && error.message !== 'Network Error') {
      dispatch(
        enqueueSnackbarMessage({
          message: customErrorMessage ?? t('snackbar_messages.something_went_wrong_please_try_again_later'),
          variant: 'error',
        })
      );
    }
  } finally {
    dispatch(toggleBusyIndicator(false));
  }
};
