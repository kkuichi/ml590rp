import { useCallback, useState } from 'react';

type TToggleFunction = (state: boolean) => boolean;
type TChangeFunction = () => void;
export type TToggleType = (prop?: boolean | TToggleFunction | unknown) => void;

export const useSwitch = (
  initialState = false
): [boolean, TChangeFunction, TChangeFunction, TToggleType] => {
  const [state, setState] = useState(initialState);

  const on = () => {
    setState(true);
  };
  const off = () => {
    setState(false);
  };

  const toggle: TToggleType = useCallback(
    (prop) => {
      if (typeof prop === 'function') {
        setState(prop(state));
      } else {
        setState((prevState) =>
          typeof prop === 'boolean' ? prop : !prevState
        );
      }
    },
    [state]
  );

  return [state, on, off, toggle];
};
