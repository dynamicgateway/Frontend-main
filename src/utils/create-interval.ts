export interface CreateIntervalOptions {
  /** Callback to execute during the interval, each time an iteration finishes. */
  callback: (currentIteration: number) => Promise<void> | void;

  /**
   * Whether in the first iteration, the passed callback should run without delay.
   * @default false
   */
  runOnceImmediately?: boolean | undefined;

  /** The time in milliseconds of each interation's delay. */
  timeout?: number | undefined;
}

/**
 * "createInterval" is a JS utility function that improves upon the built-in
 * "setInterval" JS function by implementing the following feature, that
 * is non-existant in "setInterval":
 *
 * It waits until the callback is completely done running,
 * even if ithe callback returns a JS promise,
 * or if for some other reason its execution is delayed.
 * @param createIntervalOptions Options passed to `createInterval`.
 * @returns A callback that stops the running interval.
 */
export const createInterval = ({ callback, runOnceImmediately = false, timeout }: CreateIntervalOptions) => {
  let currentTimeout: NodeJS.Timeout | number | undefined;
  let shouldContinueRunning = true;

  void (function runTimeout(currentIteration: number) {
    const resolveCallback = () =>
      Promise.resolve(callback(currentIteration)).then(() => {
        if (shouldContinueRunning) {
          void runTimeout(currentIteration + 1);
        }

        return;
      });

    if (runOnceImmediately && currentIteration === 1) {
      return resolveCallback();
    }

    currentTimeout = setTimeout(() => {
      void resolveCallback();
    }, timeout);

    return;
  })(1);

  const stopInterval = () => {
    shouldContinueRunning = false;
    clearTimeout(currentTimeout);
  };

  return stopInterval;
};
