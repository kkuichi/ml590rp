import { Fragment, ReactNode } from 'react';

export function renderSkeletons(count: number, component: ReactNode) {
  return Array.from({ length: count }).map((_, i) => (
    <Fragment key={i}>{component}</Fragment> // eslint-disable-line react/no-array-index-key
  ));
}
