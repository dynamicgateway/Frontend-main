import { useRef, useState, useCallback, useEffect } from 'react';

interface UseAudioRecorderOptions {
  silenceTimeout?: number; // Time of silence before stopping recording (default 1500ms)
  autoStartOnPermission?: boolean; // Start recording immediately when permission is granted
  voiceActivityThreshold?: number; // Minimum audio level to detect voice activity (default 0.06)
  onRecordingComplete?: (audioBlob: Blob) => void; // Callback when recording completes
  onVoiceDetected?: (isDetected: boolean, audioLevel: number) => void; // Callback for voice detection
  onError?: (error: string) => void; // Callback for errors
}

interface UseAudioRecorderReturn {
  // State
  isRecording: boolean;
  isAutoRecording: boolean;
  hasMicPermission: boolean | null;
  error: string | null;
  lastRecordedAudio: Blob | null;
  voiceDetected: boolean;
  currentAudioLevel: number;

  // Actions
  startContinuousRecording: () => Promise<void>;
  stopRecording: () => void;
  requestMicPermission: () => Promise<boolean>;
  checkMicPermission: () => Promise<void>;
}

export const useAudioRecorder = ({
  silenceTimeout = 1500,
  autoStartOnPermission = true,
  voiceActivityThreshold = 0.06,
  onRecordingComplete,
  onVoiceDetected,
  onError,
}: UseAudioRecorderOptions = {}): UseAudioRecorderReturn => {
  const [isRecording, setIsRecording] = useState(false);
  const [isAutoRecording, setIsAutoRecording] = useState(false);
  const [hasMicPermission, setHasMicPermission] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [lastRecordedAudio, setLastRecordedAudio] = useState<Blob | null>(null);
  const [voiceDetected, setVoiceDetected] = useState(false);
  const [currentAudioLevel, setCurrentAudioLevel] = useState(0);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const microphoneRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const dataArrayRef = useRef<Uint8Array<ArrayBuffer> | null>(null);
  const voiceDetectedRef = useRef<boolean>(false);
  const voiceDetectedDuringSessionRef = useRef<boolean>(false);
  const audioChunksRef = useRef<Array<Blob>>([]);
  const lastVoiceDetectionStateRef = useRef<boolean>(false); // Track previous voice detection state
  const isComponentMountedRef = useRef<boolean>(true); // Track component mount state

  // Function to convert WebM audio to WAV format (16kHz, 16-bit, Mono)
  const convertWebMToWAV = useCallback(async (webmBlob: Blob): Promise<Blob> => {
    return new Promise((resolve, reject) => {
      // Starting WebM to WAV conversion

      // Validate the WebM blob first
      if (webmBlob.size < 100) {
        reject(new Error('WebM blob too small, likely corrupted'));
        return;
      }

      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const fileReader = new FileReader();

      fileReader.onload = async (e) => {
        try {
          const arrayBuffer = e.target?.result as ArrayBuffer;
          // FileReader loaded array buffer

          if (arrayBuffer.byteLength === 0) {
            throw new Error('ArrayBuffer is empty');
          }

          // Attempting to decode audio data
          const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

          // Converting WebM to WAV

          // Validate the decoded audio buffer
          if (audioBuffer.duration === 0) {
            throw new Error('Decoded audio has zero duration');
          }

          // Resample to 16kHz and convert to mono
          const targetSampleRate = 24000;
          const targetChannels = 1;
          const targetLength = Math.floor(audioBuffer.duration * targetSampleRate);

          // Creating offline audio context for resampling
          // Create new buffer with target specifications
          const offlineContext = new OfflineAudioContext(targetChannels, targetLength, targetSampleRate);
          const bufferSource = offlineContext.createBufferSource();
          bufferSource.buffer = audioBuffer;
          bufferSource.connect(offlineContext.destination);
          bufferSource.start();

          // Rendering audio buffer
          const renderedBuffer = await offlineContext.startRendering();

          // Encoding to WAV format
          // Convert to 16-bit PCM WAV
          const wavBuffer = encodeWAV(renderedBuffer, targetSampleRate);
          const wavBlob = new Blob([wavBuffer], { type: 'audio/wav' });

          // Audio converted to WAV

          await audioContext.close();
          resolve(wavBlob);
        } catch (error) {
          console.error('❌ Error converting WebM to WAV:', error);
          console.error('❌ Error details:', {
            errorName: (error as Error).name,
            errorMessage: (error as Error).message,
            webmBlobSize: webmBlob.size,
            webmBlobType: webmBlob.type,
          });
          await audioContext.close();
          reject(new Error('Failed to convert WebM to WAV'));
        }
      };

      fileReader.onerror = () => {
        console.error('❌ FileReader error occurred');
        reject(new Error('Failed to read WebM blob'));
      };

      // Starting FileReader
      fileReader.readAsArrayBuffer(webmBlob);
    });
  }, []);

  // Function to encode AudioBuffer to WAV format (16-bit PCM)
  const encodeWAV = useCallback((audioBuffer: AudioBuffer, sampleRate: number): ArrayBuffer => {
    const length = audioBuffer.length;
    const arrayBuffer = new ArrayBuffer(44 + length * 2);
    const view = new DataView(arrayBuffer);
    const samples = audioBuffer.getChannelData(0); // Get mono channel

    // WAV header
    const writeString = (offset: number, string: string) => {
      for (let i = 0; i < string.length; i++) {
        view.setUint8(offset + i, string.charCodeAt(i));
      }
    };

    writeString(0, 'RIFF');
    view.setUint32(4, 36 + length * 2, true);
    writeString(8, 'WAVE');
    writeString(12, 'fmt ');
    view.setUint32(16, 16, true);
    view.setUint16(20, 1, true); // PCM
    view.setUint16(22, 1, true); // Mono
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, sampleRate * 2, true); // Byte rate
    view.setUint16(32, 2, true); // Block align
    view.setUint16(34, 16, true); // Bits per sample
    writeString(36, 'data');
    view.setUint32(40, length * 2, true);

    // Convert samples to 16-bit PCM
    let offset = 44;
    for (let i = 0; i < length; i++) {
      const sample = Math.max(-1, Math.min(1, samples[i] || 0));
      const int16 = sample < 0 ? sample * 0x8000 : sample * 0x7fff;
      view.setInt16(offset, int16, true);
      offset += 2;
    }

    return arrayBuffer;
  }, []);

  // Function to analyze audio levels for voice detection
  const analyzeAudioLevel = useCallback(() => {
    if (!analyserRef.current || !dataArrayRef.current) return;

    // Create a local reference to ensure proper typing
    const dataArray = dataArrayRef.current;
    analyserRef.current.getByteFrequencyData(dataArray);

    // Calculate average audio level
    const average = dataArray.reduce((sum, value) => sum + value, 0) / dataArray.length;
    const normalizedLevel = average / 255; // Normalize to 0-1 range

    setCurrentAudioLevel(normalizedLevel);

    // Check if voice is detected
    const isVoiceDetected = normalizedLevel > voiceActivityThreshold;

    // Only log and update state if the voice detection state has changed
    if (isVoiceDetected !== lastVoiceDetectionStateRef.current) {
      setVoiceDetected(isVoiceDetected);
      voiceDetectedRef.current = isVoiceDetected;

      if (isVoiceDetected) {
        voiceDetectedDuringSessionRef.current = true;
      }

      // Update the last state reference
      lastVoiceDetectionStateRef.current = isVoiceDetected;

      // Call the callback
      onVoiceDetected?.(isVoiceDetected, normalizedLevel);
    }
  }, [voiceActivityThreshold, onVoiceDetected]);

  // Continuous recording function with silence detection
  const startContinuousRecording = useCallback(async () => {
    try {
      setError(null);
      setVoiceDetected(false);
      voiceDetectedRef.current = false;
      voiceDetectedDuringSessionRef.current = false;
      lastVoiceDetectionStateRef.current = false; // Reset voice detection state
      // Starting continuous recording

      // Get mic with specific audio constraints
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          sampleRate: 24000,
          channelCount: 1,
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        },
      });
      setHasMicPermission(true);

      // Set up audio analysis for voice detection
      audioContextRef.current = new AudioContext();
      analyserRef.current = audioContextRef.current.createAnalyser();
      analyserRef.current.fftSize = 256;
      const bufferLength = analyserRef.current.frequencyBinCount;
      dataArrayRef.current = new Uint8Array(bufferLength);

      microphoneRef.current = audioContextRef.current.createMediaStreamSource(stream);
      microphoneRef.current.connect(analyserRef.current);

      // Choose the most reliable MIME type available on this browser
      const preferredMimeTypes = [
        'audio/webm;codecs=opus',
        'audio/webm',
        'audio/mp4;codecs=mp4a.40.2', // Safari fallback
        'audio/mp4',
      ];
      const selectedMimeType =
        preferredMimeTypes.find((t) => {
          try {
            return MediaRecorder.isTypeSupported(t);
          } catch {
            return false;
          }
        }) || '';

      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: selectedMimeType,
        audioBitsPerSecond: 128000,
      });

      // MediaRecorder created

      mediaRecorderRef.current = mediaRecorder;
      setIsRecording(true);
      setIsAutoRecording(true);
      audioChunksRef.current = [];

      // Collect audio chunks for playback
      // IMPORTANT: Attach handler BEFORE starting the recorder to avoid
      // missing the initial header/codec chunk, which can corrupt the file.
      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          // Always collect ALL chunks to maintain WebM file integrity
          audioChunksRef.current.push(e.data);

          // Track voice detection for the session
          if (voiceDetectedRef.current) {
            voiceDetectedDuringSessionRef.current = true;
            // voice chunk collected
          }
        }
      };

      // MediaRecorder created, starting continuous recording
      // Start without a timeslice so the browser constructs a proper header.
      // We'll explicitly request the first data chunk shortly to force a headered chunk.
      mediaRecorder.start();

      // Force an initial chunk (with header) even if the user is silent
      const headerFlushDelayMs = 200;
      const headerFlushTimeoutId = setTimeout(() => {
        try {
          mediaRecorder.requestData();
          // Requested initial header chunk from MediaRecorder
        } catch (e) {
          console.warn('⚠️ Failed to request initial header chunk:', e);
        }
      }, headerFlushDelayMs);

      // Silence detection variables
      let silenceStartTime: number | null = null;
      let silenceTimeoutId: NodeJS.Timeout | null = null;
      const recordingStartTime = Date.now();
      const MIN_RECORDING_MS = 600; // ensure header/data are flushed before stopping

      // Start audio analysis with silence detection
      const analyzeInterval = setInterval(() => {
        analyzeAudioLevel();

        if (voiceDetectedRef.current) {
          silenceStartTime = null;
          console.log('🎤 Voice detected, resetting silence timer...');

          if (silenceTimeoutId) {
            clearTimeout(silenceTimeoutId);
            silenceTimeoutId = null;
          }
        } else {
          const currentTime = Date.now();

          if (silenceStartTime === null) {
            silenceStartTime = currentTime;
            // Silence started at
          }

          if (silenceStartTime !== null) {
            const silenceDuration = currentTime - silenceStartTime;

            if (silenceDuration >= silenceTimeout && !silenceTimeoutId) {
              const elapsed = Date.now() - recordingStartTime;
              const delay = Math.max(0, MIN_RECORDING_MS - elapsed);
              // Continuous silence detected
              silenceTimeoutId = setTimeout(
                () => {
                  if (mediaRecorder.state === 'recording') {
                    mediaRecorder.stop();
                  }
                },
                Math.max(100, delay)
              );
            }
          }
        }
      }, 100);

      mediaRecorder.onstop = () => {
        // Recording stopped, analyzing voice activity
        setIsRecording(false);
        setIsAutoRecording(false);
        clearInterval(analyzeInterval);
        clearTimeout(headerFlushTimeoutId);

        // Only process if voice was detected during the session AND we have chunks
        if (voiceDetectedDuringSessionRef.current && audioChunksRef.current.length > 0) {
          // Voice detected during session - creating audio blob

          const webmBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });

          // WebM audio blob created

          // Basic validation
          if (webmBlob.size < 100) {
            console.error('❌ WebM blob too small:', webmBlob.size, 'bytes');
            onError?.('Audio recording too short');
            return;
          }

          // Convert WebM to WAV format (16kHz, 16-bit, Mono)
          // Starting WebM to WAV conversion

          // Validate the WebM blob before conversion
          if (webmBlob.size < 100) {
            console.error('❌ WebM blob too small, likely corrupted:', webmBlob.size, 'bytes');
            onError?.('Audio recording too short or corrupted');
            return;
          }

          convertWebMToWAV(webmBlob)
            .then((wavBlob) => {
              // Check if component is still mounted before proceeding
              if (!isComponentMountedRef.current) {
                // Component unmounted, skipping audio processing
                return;
              }

              // Validate the converted WAV blob
              if (wavBlob.size < 100) {
                console.error('❌ Converted WAV blob too small:', wavBlob.size, 'bytes');
                onError?.('Audio conversion failed - result too small');
                return;
              }

              // WAV conversion successful

              // Update state and call callback
              setLastRecordedAudio(wavBlob);
              onRecordingComplete?.(wavBlob);
              return wavBlob;
            })
            .catch((error) => {
              // Check if component is still mounted before calling error callback
              if (isComponentMountedRef.current) {
                console.error('❌ Failed to convert WebM to WAV:', error);
                console.error('❌ Conversion error details:', {
                  errorName: (error as Error).name,
                  errorMessage: (error as Error).message,
                  webmBlobSize: webmBlob.size,
                  webmBlobType: webmBlob.type,
                });
              }
            });
        } else {
          // No voice detected during recording session
          onError?.('No voice detected during recording. Recording not saved.');
        }

        // Clean up stream and audio context
        stream.getTracks().forEach((track) => track.stop());
        if (audioContextRef.current) {
          audioContextRef.current.close();
          audioContextRef.current = null;
        }

        audioChunksRef.current = [];
      };

      mediaRecorder.onerror = (event) => {
        console.error('❌ MediaRecorder error:', event);
        const errorMsg = 'MediaRecorder error';
        setError(errorMsg);
        onError?.(errorMsg);
        setIsRecording(false);
        setIsAutoRecording(false);
        stream.getTracks().forEach((track) => track.stop());
        clearInterval(analyzeInterval);
        // Clean up audio context
        if (audioContextRef.current) {
          audioContextRef.current.close();
          audioContextRef.current = null;
        }
      };
    } catch (err: any) {
      console.error('❌ Continuous recording failed:', err);
      setHasMicPermission(false);
      const errorMsg = err.message || 'Audio error';
      setError(errorMsg);
      onError?.(errorMsg);
      setIsRecording(false);
      setIsAutoRecording(false);

      // Clean up any resources that might have been created
      if (audioContextRef.current) {
        audioContextRef.current.close();
        audioContextRef.current = null;
      }
    }
  }, [silenceTimeout, onRecordingComplete, onError, convertWebMToWAV, analyzeAudioLevel]);

  // Stop recording manually
  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current?.state === 'recording') {
      mediaRecorderRef.current.stop();
    }
  }, []);

  // Request microphone permission
  const requestMicPermission = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setHasMicPermission(true);

      stream.getTracks().forEach((track) => track.stop());

      if (autoStartOnPermission) {
        setTimeout(() => {
          startContinuousRecording();
        }, 500);
      }

      return true;
    } catch (err: any) {
      console.error('❌ Microphone permission denied:', err);
      setHasMicPermission(false);
      const errorMsg = err.message || 'Microphone permission denied';
      setError(errorMsg);
      onError?.(errorMsg);
      return false;
    }
  }, [autoStartOnPermission, startContinuousRecording, onError]);

  // Check microphone permission status
  const checkMicPermission = useCallback(async () => {
    try {
      const result = await navigator.permissions.query({ name: 'microphone' as PermissionName });

      if (result.state === 'granted') {
        setHasMicPermission(true);

        if (autoStartOnPermission && !isAutoRecording) {
          setTimeout(() => {
            startContinuousRecording();
          }, 500);
        }
      } else if (result.state === 'denied') {
        setHasMicPermission(false);
      } else {
        // permission is prompt
      }
    } catch (err) {
      console.error('❌ Error checking microphone permission:', err);
    }
  }, [autoStartOnPermission, isAutoRecording, startContinuousRecording]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      isComponentMountedRef.current = false;
      // Clean up any ongoing recording
      if (mediaRecorderRef.current?.state === 'recording') {
        mediaRecorderRef.current.stop();
      }
      // Clean up audio context
      if (audioContextRef.current) {
        audioContextRef.current.close();
        audioContextRef.current = null;
      }
    };
  }, []);

  return {
    // State
    isRecording,
    isAutoRecording,
    hasMicPermission,
    error,
    lastRecordedAudio,
    voiceDetected,
    currentAudioLevel,

    // Actions
    startContinuousRecording,
    stopRecording,
    requestMicPermission,
    checkMicPermission,
  };
};
