import { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';

// TODO: change to the actual url
const SOCKET_URL = 'http://localhost:3001';

export const useSocket = () => {
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    socketRef.current = io(SOCKET_URL);

    // Clean up on unmount
    return () => {
      socketRef.current?.disconnect();
    };
  }, []);

  // Send event to server
  const sendEvent = (event: string, data: any) => {
    socketRef.current?.emit(event, data);
  };

  // Listen for events from server
  const onEvent = (event: string, callback: (data: any) => void) => {
    socketRef.current?.on(event, callback);
  };

  return { sendEvent, onEvent, socket: socketRef.current };
};
