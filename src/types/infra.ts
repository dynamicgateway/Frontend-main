import type { ReactNode } from 'react';

export type Route = Record<
  string,
  | ReactNode
  | string
  | boolean
  | any
  | Array<Record<string, ReactNode | string | boolean | any | Array<Record<string, ReactNode | string>>>>
>;
