'use client';

import { SyntheticEvent, useCallback, useState } from 'react';

export type TChangeTab<T> = (
  event: SyntheticEvent<Element, Event> | null,
  value: T
) => void;

export const useTabs = <T>(defaultValue: T): [T, TChangeTab<T>] => {
  const [activeTab, setActiveTab] = useState(defaultValue);

  const changeTab = useCallback(
    (event: SyntheticEvent<Element, Event> | null, value: T): void => {
      if (value === null) return;

      event?.preventDefault();
      setActiveTab(value);
    },
    []
  );

  return [activeTab, changeTab];
};
