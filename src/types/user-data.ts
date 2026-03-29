export enum UserDataRole {
  JOB_SEEKER = 'job_seeker',
  EMPLOYER = 'employer',
}

export interface UserData {
  id: string;
  name: string;
  email: string;
  role: UserDataRole;
}

export enum UserOnBoardingStatus {
  INCOMPLETE = 'incomplete',
  COMPLETED = 'completed',
  INCOMPLETE_SKIPPED = 'incomplete_skipped',
}
