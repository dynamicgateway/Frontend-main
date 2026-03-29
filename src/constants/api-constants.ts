export enum RequestMethodsEnum {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
  PATCH = 'PATCH',
  OPTIONS = 'OPTIONS',
  HEAD = 'HEAD',
  CONNECT = 'CONNECT',
  TRACE = 'TRACE',
}

export const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).+$/;

export enum FileTypes {
  pdf = 'pdf',
  docx = 'docx',
}

export const AllowedFilesContentType: Array<string> = [
  'application/pdf',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];

export enum FileScanStatus {
  SCANNING = 'SCANNING',
  NO_THREATS_FOUND = 'NO_THREATS_FOUND',
  THREATS_FOUND = 'THREATS_FOUND',
  UNSUPPORTED = 'UNSUPPORTED',
  ACCESS_DENIED = 'ACCESS_DENIED',
  FAILED = 'FAILED',
}
