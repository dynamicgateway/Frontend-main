import React, { useEffect, useRef, useState } from 'react';
import './SpeakingBallLively.css';

/**
 * Props interface for the SpeakingBallLively component
 */
interface SpeakingBallLivelyProps {
  /** Additional CSS class names to apply to the ball container */
  className?: string;
  /** Additional inline styles to apply to the ball container */
  style?: React.CSSProperties;
  /** Whether the ball is disabled (disabled balls are faded and non-functional) */
  disabled?: boolean;
  widthPresent?: number;
  heightPresent?: number;
}

/**
 * SpeakingBallLively Component
 * 
 * A simplified version of the SpeakingBall that only changes size and has
 * wavy color animations inside when the user is speaking.
 * 
 * <SpeakingBallLively 
      disabled={isBallDisabled}
      className={className}
      style={style}
    />
 *  
 * @param props - Component props
 * @returns JSX.Element - The rendered speaking ball component
 */
const SpeakingBallLively: React.FC<SpeakingBallLivelyProps> = ({
  className,
  style,
  disabled = false,
  widthPresent = 1,
  heightPresent = 1,
}) => {
  // State management for microphone and voice detection
  const [isListening, setIsListening] = useState(false);
  const [volume, setVolume] = useState(0);
  const [isMicrophoneOpen, setIsMicrophoneOpen] = useState(false);
  const [microphoneError, setMicrophoneError] = useState(false);

  // Audio context and analysis refs for real-time voice processing
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const microphoneRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  /**
   * Initializes microphone access and sets up real-time audio analysis
   */
  const startMicrophone = async () => {
    try {
      // Request microphone access with audio processing settings
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        },
      });

      // Create AudioContext if it doesn't exist
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }

      const audioContext = audioContextRef.current;

      // Create analyser node for frequency analysis
      const analyser = audioContext.createAnalyser();
      const microphone = audioContext.createMediaStreamSource(stream);

      // Configure analyser for optimal voice detection
      analyser.fftSize = 256;
      analyser.smoothingTimeConstant = 0.8;
      microphone.connect(analyser);

      // Store references for cleanup
      analyserRef.current = analyser;
      microphoneRef.current = microphone;
      setIsMicrophoneOpen(true);

      // Create data array for frequency analysis
      const dataArray = new Uint8Array(analyser.frequencyBinCount);

      /**
       * Updates volume levels and triggers listening state changes
       * This function runs continuously to monitor voice input
       */
      const updateVolume = () => {
        if (!analyserRef.current) return;

        // Get frequency data from the analyser
        analyserRef.current.getByteFrequencyData(dataArray);

        // Calculate average volume from frequency data
        const average = dataArray.reduce((a, b) => a + b) / dataArray.length;
        const normalizedVolume = average / 255; // Normalize to 0-1 range

        // Update state with current volume
        setVolume(normalizedVolume);

        // Set listening state based on volume threshold
        setIsListening(normalizedVolume > 0.05);

        // Continue monitoring
        animationFrameRef.current = requestAnimationFrame(updateVolume);
      };

      // Start the volume monitoring loop
      updateVolume();
    } catch (error) {
      console.error('Error accessing microphone:', error);
      setMicrophoneError(true);
    }
  };

  /**
   * Stops microphone access and cleans up audio resources
   */
  const stopMicrophone = () => {
    // Stop all audio tracks
    if (microphoneRef.current) {
      microphoneRef.current.mediaStream.getTracks().forEach((track) => track.stop());
      microphoneRef.current = null;
    }

    // Cancel animation frame to stop monitoring
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }

    // Reset all state
    setIsMicrophoneOpen(false);
    setIsListening(false);
    setVolume(0);
  };

  /**
   * Effect hook to initialize microphone on component mount
   */
  useEffect(() => {
    if (!disabled) {
      startMicrophone();
    }

    // Cleanup function to stop microphone when component unmounts
    return () => {
      stopMicrophone();
    };
  }, [disabled]);

  /**
   * Handles click events on the ball
   */
  const handleClick = () => {
    if (disabled) return;

    if (!isMicrophoneOpen) {
      startMicrophone();
    }
  };

  // Calculate dynamic animation properties based on volume
  const pulseScale = 1 + volume * 0.6;

  return (
    <div
      className={`speaking-ball ${isListening ? 'listening' : ''} ${disabled ? 'disabled' : ''} ${className || ''}`}
      style={style}
      onClick={handleClick}
      title={disabled ? 'Ball is disabled' : isMicrophoneOpen ? 'Microphone is active' : 'Click to enable microphone'}
    >
      <div
        className="ball"
        style={{
          transform: `scale(${pulseScale})`,
          transition: 'transform 0.15s ease-out',
        }}
      >
        {/* Crystal ball background with gradient effects */}
        <div className="ball-bg" />

        {/* Wavy color animation inside the ball */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: `${100 * widthPresent}%`,
            height: `${100 * heightPresent}%`,
            borderRadius: '50%',
            overflow: 'hidden',
            opacity: isListening ? 0.8 : 0.3,
          }}
        >
          {/* First wave layer */}
          <div
            style={{
              position: 'absolute',
              top: `${50 - volume * 20}%`,
              left: 0,
              width: `${100 * widthPresent}%`,
              height: `${60 * heightPresent}%`,
              background: `linear-gradient(180deg, 
                rgba(173, 216, 230, ${0.4 + volume * 0.5}) 0%, 
                rgba(138, 43, 226, ${0.3 + volume * 0.4}) 25%, 
                rgba(64, 224, 208, ${0.3 + volume * 0.4}) 50%, 
                rgba(255, 255, 0, ${0.2 + volume * 0.3}) 75%, 
                rgba(255, 165, 0, ${0.2 + volume * 0.3}) 100%)`,
              borderRadius: '50%',
              filter: `blur(${5 + volume * 10}px)`,
              transform: `scaleX(${1 + Math.sin(Date.now() * 0.001) * 0.1}) 
                         scaleY(${1 + Math.sin(Date.now() * 0.002) * 0.1})`,
              animation: isListening ? 'wave1 8s infinite ease-in-out' : 'none',
            }}
          />

          {/* Second wave layer */}
          <div
            style={{
              position: 'absolute',
              top: `${60 - volume * 30}%`,
              left: 0,
              width: `${100 * widthPresent}%`,
              height: `${50 * heightPresent}%`,
              background: `linear-gradient(180deg, 
                rgba(255, 165, 0, ${0.3 + volume * 0.5}) 0%, 
                rgba(255, 255, 0, ${0.3 + volume * 0.4}) 25%, 
                rgba(64, 224, 208, ${0.3 + volume * 0.4}) 50%, 
                rgba(138, 43, 226, ${0.2 + volume * 0.3}) 75%, 
                rgba(173, 216, 230, ${0.2 + volume * 0.3}) 100%)`,
              borderRadius: '40%',
              filter: `blur(${8 + volume * 15}px)`,
              transform: `scaleX(${1 + Math.cos(Date.now() * 0.002) * 0.1}) 
                         scaleY(${1 + Math.cos(Date.now() * 0.001) * 0.1})`,
              animation: isListening ? 'wave2 7s infinite ease-in-out' : 'none',
            }}
          />
        </div>

        {/* Microphone status indicator */}
        {/* {isMicrophoneOpen && (
          <div 
            className="mic-indicator"
            style={{
              backgroundColor: isListening ? '#ff4444' : '#44ff44'
            }}
          />
        )} */}

        {/* Error indicator for microphone access issues */}
        {microphoneError && <div className="mic-indicator error" title="Microphone access denied" />}
      </div>
    </div>
  );
};

export default SpeakingBallLively;
