export const MAX_SIZE_5_MB = 5242880;
export const ALLOWED_VIDEO_EXTENSIONS = ['mp4', 'avi', 'mov'];
export const ALLOWED_IMAGE_EXTENSIONS = ['jpg', 'jpeg', 'png'];

export const getImageResolution = (file: File): Promise<{ width: number; height: number } | null> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve({ width: img.width, height: img.height });
    img.onerror = () => resolve(null);
    img.src = URL.createObjectURL(file);
  });
};

export const getVideoResolution = (file: File): Promise<{ width: number; height: number } | null> => {
  return new Promise((resolve) => {
    const video = document.createElement('video');
    video.preload = 'metadata';
    video.onloadedmetadata = () => {
      URL.revokeObjectURL(video.src);
      resolve({ width: video.videoWidth, height: video.videoHeight });
    };
    video.onerror = () => {
      resolve(null);
    };
    video.src = URL.createObjectURL(file);
  });
};

/**
 * Validates the uploaded file size based on its type.
 *
 * - Videos (`.mp4`) must not exceed **1 GB**.
 * - Images (any format other than `.mp4`) must not exceed **48 MB**.
 *
 * @param {File} file - The file to be validated.
 * @returns { { code: string, message: string } | null } - Returns an error object if the file exceeds the allowed size, otherwise returns `null`.
 */
export const dropzoneValidator = (file: File) => {
  const fileExtension = file.name.toLowerCase().split('.').pop() ?? '';

  if (ALLOWED_IMAGE_EXTENSIONS.includes(fileExtension)) {
    if (file.size > MAX_SIZE_5_MB) {
      return {
        code: 'image-file-is-too-large',
        message: 'Image must be 5MB or smaller.',
      };
    } else if (file.name.length > 100) {
      return {
        code: 'image-file-name-is-too-long',
        message: 'Image name is too long. Please use a name under 100 characters.',
      };
    }
  }

  // if (ALLOWED_VIDEO_EXTENSIONS.includes(fileExtension)) {

  // }

  if (fileExtension === 'jfif') {
    return {
      code: 'file-invalid-type',
      message: `Oops! This file format isn't supported. Failed to upload file - ${file.name}`,
    };
  }

  return null;
};

/**
 * Defines the accepted file types for dropzone file uploads, organized by category.
 * Each category (image, video, document) contains MIME types as keys and arrays of
 * corresponding file extensions as values.
 *
 * @example
 * {
 *   image: {
 *     'image/jpg': ['.jpg', '.jpeg'],
 *     'image/png': ['.png']
 *   },
 *   video: {
 *     'video/mp4': ['.mp4']
 *   },
 *   document: {
 *     'application/pdf': ['.pdf']
 *   }
 * }
 */
export const DROPZONE_ACCEPTED_FILE_TYPES = {
  // Most common image formats (includes HEIC for iPhone)
  image: {
    'image/jpg': ['.jpg', '.jpeg'],
    'image/jpeg': ['.jpg', '.jpeg'],
    'image/png': ['.png'],
    // 'image/heic': [],
    // 'image/webp': [],
  },
  //Most common video formats (includes HEVC support via MOV)
  video: {
    'video/mp4': ['.mp4'], // Covers standard MP4 (H.264)
    'video/avi': ['.avi'], // Covers standard AVI (H.264)
    'video/mov': ['.mov'], // Covers standard MOV (H.264)
    'video/quicktime': ['.mov'], // MOV files (includes HEVC/H.265 from iPhones)
    // 'video/webm': [],
  },
  // Most common document formats
  document: {
    'application/pdf': ['.pdf'],
    // 'application/msword': [],
    // 'application/vnd.openxmlformats-officedocument.wordprocessingml.document': [],
    // 'application/vnd.ms-excel': [],
    // 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': [],
    // 'application/vnd.ms-powerpoint': [],
    // 'application/vnd.openxmlformats-officedocument.presentationml.presentation': [],
  },
} as const;

/**
 * Maps MIME types to their display titles by extracting and formatting the subtype.
 * For example:
 * - 'image/jpeg' -> 'JPEG'
 * - 'video/mp4' -> 'MP4'
 * - 'application/pdf' -> 'PDF'
 */
export const DROPZONE_ACCEPTED_FILE_TYPES_TO_TITLE = {
  ...Object.keys(DROPZONE_ACCEPTED_FILE_TYPES.image).reduce(
    (acc, key) => ({
      ...acc,
      [key]: key.split('image/').pop()?.toUpperCase(),
    }),
    {}
  ),
  ...Object.keys(DROPZONE_ACCEPTED_FILE_TYPES.video).reduce(
    (acc, key) => ({
      ...acc,
      [key]: key.split('video/').pop()?.toUpperCase(),
    }),
    {}
  ),
  ...Object.keys(DROPZONE_ACCEPTED_FILE_TYPES.document).reduce(
    (acc, key) => ({
      ...acc,
      [key]: key.split('application/').pop()?.toUpperCase(),
    }),
    {}
  ),
};
