import { useEffect, useRef } from 'react';
import { isDeepEqual } from 'remeda';

export type UseWhyDidYouRenderChangesObject = Record<
  string,
  {
    from: unknown;
    to: unknown;
  }
>;

export interface UseWhyDidYouRenderProps {
  /** Whether to compare the current and previous props deeply. @default false */
  deepEqual?: boolean | undefined;

  /**
   * The given name of the current "useWhyDidYouRender" instance,
   * used to help the developer distinguish between logs from various instances.
   */
  name: string;

  /** The current props, that should be compared with the previous ones. */
  props: Record<string, unknown>;
}

/**
 * "useWhyDidYouRender" is a React custom hook, that receives a name,
 * and a props object consisting of values suspected to cause re-renders
 * to a React component when they change (e.g. state or React component props).
 *
 * After every render, it logs an object, that helps the developer understand which value changes caused the re-render.
 *
 * Additionally, it may receive the optional property "deepEqual", which if true, would deeply diff the values.
 * @param useWhyDidYouRenderProps Props passed to`seWhyDidYouRender`.
 */
export const useWhyDidYouRender = ({ deepEqual = false, name, props }: UseWhyDidYouRenderProps) => {
  const previousProps = useRef<Record<string, unknown>>({});
  const numberOfRenders = useRef(0);

  useEffect(() => {
    // Increment overall number of renders by one
    const currentNumberOfRenders = ++numberOfRenders.current;

    // Get all keys from previous and current props
    const allKeys = Object.keys({ ...previousProps.current, ...props });

    // Use this object to keep track of changed props
    const changesObject: UseWhyDidYouRenderChangesObject = {};

    // Iterate through keys
    allKeys.forEach((key) => {
      const notEqual = deepEqual
        ? !isDeepEqual(previousProps.current[key], props[key])
        : previousProps.current[key] !== props[key];

      if (notEqual) {
        // Add to changesObject
        changesObject[key] = {
          from: previousProps.current[key],
          to: props[key],
        };
      }
    });

    // If changesObj not empty then output to console
    if (Object.keys(changesObject).length) {
      console.log('[why-did-you-render]', name, changesObject, `render no. ${currentNumberOfRenders.toString()}`);
    }

    // Finally update previousProps with current props for next hook call
    previousProps.current = props;
  });
};
