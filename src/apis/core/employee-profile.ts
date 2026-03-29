// import { api } from './api';
// import { RequestMethodsEnum } from '@/constants/api-constants';
// import { baseEmployeeProfile } from '../paths/employee-profile-path';
// import type {
//   getResumeDownloadUrlResponse,
//   updateCandidateOnboardingStatus,
//   resumeInterface,
// } from '../types/employee-profile-type';
// import type { profileOnboardingStatus } from '../types/profile-types';

// export const employeeProfileBuildingChatApi = api.injectEndpoints({
//   endpoints: (build) => ({
//     // Check the status of the resume scan
//     getResumeDownloadUrl: build.query<getResumeDownloadUrlResponse, void>({
//       query: () => ({
//         method: RequestMethodsEnum.GET,
//         url: `${baseEmployeeProfile}/resume/`,
//       }),
//     }),
//     getCanduditeOnboardingStatus: build.query<profileOnboardingStatus, void>({
//       query: () => ({
//         method: RequestMethodsEnum.GET,
//         url: `${baseEmployeeProfile}s/profile/completion/`,
//       }),
//     }),
//     updateCandidateOnboardingStatus: build.mutation<profileOnboardingStatus, updateCandidateOnboardingStatus>({
//       query: (data) => ({
//         method: RequestMethodsEnum.PATCH,
//         url: `${baseEmployeeProfile}s/profile/completion/`,
//         data: data,
//       }),
//     }),
//     updateResume: build.mutation<resumeInterface, Partial<resumeInterface>>({
//       query: (data) => ({
//         method: RequestMethodsEnum.PATCH,
//         url: `${baseEmployeeProfile}s/profile/update/`,
//         data: data,
//       }),
//     }),
//   }),
// });

// export const {
//   useGetResumeDownloadUrlQuery,
//   useLazyGetResumeDownloadUrlQuery,
//   useUpdateResumeMutation,
//   useGetCanduditeOnboardingStatusQuery,
//   useLazyGetCanduditeOnboardingStatusQuery,
//   useUpdateCandidateOnboardingStatusMutation,
// } = employeeProfileBuildingChatApi;
