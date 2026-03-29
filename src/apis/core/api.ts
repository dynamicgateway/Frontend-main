import { createApi } from '@reduxjs/toolkit/query/react';
import axios from 'axios';
import { fetchAuthSession } from 'aws-amplify/auth';

import { createAxiosBaseQuery } from '../../utils/api-utils';

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_ENDPOINT,
  // withCredentials: true,
});

axiosInstance.interceptors.request.use(async (config) => {
  const cognitoSession = await fetchAuthSession();
  const idToken = cognitoSession.tokens?.idToken;
  if (idToken) config.headers.Authorization = `${idToken}`;

  return config;
});

export const api = createApi({
  baseQuery: createAxiosBaseQuery(axiosInstance),
  endpoints: () => ({}),
  tagTypes: [],
});
