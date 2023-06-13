import { LazyExoticComponent } from 'react';

export interface PageRoute {
  path: string;
  element?: () => JSX.Element | LazyExoticComponent<() => JSX.Element>;
  isProtected?: boolean; // default is false,
  redirect?: string;
  children?: PageRoute[];
}
