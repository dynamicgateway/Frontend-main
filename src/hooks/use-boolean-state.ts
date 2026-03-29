import { type SetStateAction, useCallback, useEffect, useMemo, useRef, useState } from 'react';

export interface UseBooleanStateCallbacks {
  /** Callback that is called when the state value changes to "false". */
  onFalse?: (() => void) | undefined;

  /** Callback that is called when the state value changes to "true". */
  onTrue?: (() => void) | undefined;
}

/**
 * "useBooleanState" is a React custom hook that manages boolean state.
 * It provides toTrue, toFalse and toggle handlers, and accepts optional onTrue and onFalse callbacks.
 * It can be used to manage controlled modals, popovers and other similar components.
 * @param initialState - An optional initial state, or a function which returns an initial state. @default false
 * @param callbacks - An optional object including callbacks to be called on state changes.
 * @returns A tuple including the current state as its first element, and a handlers object as its second.
 */
export const useBooleanState = (
  initialState: (() => boolean) | boolean = false,
  callbacks: UseBooleanStateCallbacks = {}
) => {
  const [isTrue, setIsTrue] = useState(initialState);
  const callbacksRef = useRef({ ...callbacks });

  useEffect(() => {
    if (callbacks.onTrue !== callbacksRef.current.onTrue) {
      callbacksRef.current.onTrue = callbacks.onTrue;
    }

    if (callbacks.onFalse !== callbacksRef.current.onFalse) {
      callbacksRef.current.onFalse = callbacks.onFalse;
    }
  }, [callbacks.onTrue, callbacks.onFalse]);

  const toTrue = useCallback(() => {
    setIsTrue(true);
    callbacksRef.current.onTrue?.();
  }, []);

  const toFalse = useCallback(() => {
    setIsTrue(false);
    callbacksRef.current.onFalse?.();
  }, []);

  const toggle = useCallback(() => {
    setIsTrue((prevState) => {
      if (prevState) {
        callbacksRef.current.onFalse?.();
      } else {
        callbacksRef.current.onTrue?.();
      }

      return !prevState;
    });
  }, []);

  const setTo = useCallback((newState: SetStateAction<boolean>) => {
    setIsTrue((prevState) => {
      const extractedNewState = typeof newState === 'function' ? newState(prevState) : newState;

      if (extractedNewState) {
        callbacksRef.current.onTrue?.();
      } else {
        callbacksRef.current.onFalse?.();
      }

      return extractedNewState;
    });
  }, []);

  return [
    isTrue,
    useMemo(
      () => ({
        setTo,
        toFalse,
        toTrue,
        toggle,
      }),
      [setTo, toFalse, toTrue, toggle]
    ),
  ] as const;
};
