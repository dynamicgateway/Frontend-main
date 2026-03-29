import type { ComponentProps, FC, ForwardRefExoticComponent, RefObject, RefAttributes, SVGProps } from 'react';
import type { ConditionalExcept, Except, SetNonNullable } from 'type-fest';

export type RefOrFunction<T = unknown> = (() => T | null | undefined) | RefObject<T | null | undefined>;

/**
 * The "RemoveFunctionsFromObject" generic type accepts as its arguments an object type,
 * and removes from it all keys whose values are function types.
 */
export type RemoveFunctionsFromObject<ObjectType extends object> = ConditionalExcept<
  {
    [P in keyof ObjectType]: SetNonNullable<Required<ObjectType>>[P] extends (...args: infer _R) => void
      ? never
      : ObjectType[P];
  },
  undefined
>;

export interface SvgrComponentProps extends SVGProps<SVGSVGElement> {
  title?: string;
  titleId?: string;
}

export type SvgrComponent =
  | ForwardRefExoticComponent<Except<SvgrComponentProps, 'ref'> & RefAttributes<SVGSVGElement>>
  | FC<ComponentProps<'svg'> & { title?: string }>;

/** Selectable Option. */
export interface SelectableOption {
  /** The value of the option, returned to the form. */
  value: string | number;
  /** The label of the option, displayed in the dropdown. */
  label: string;
}
