import { roboto } from '../Providers/ThemeProvider/theme';

export const userSelectStyles = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  container: (provided: any) => ({
    ...provided,
    width: '100%',
  }),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: (provided: any, state: any) => ({
    ...provided,
    border: `1px solid ${state.isDisabled ? '#f5f5f5' : 'lightgray'}`,
    borderRadius: '12px',
    padding: '1px 0',
    fontFamily: roboto.style.fontFamily,
    fontWeight: 300,
    fontSize: '16px',
    lineHeight: '23px',
    backgroundColor: 'inherit',
    boxShadow: 'none',
    '&:hover': {
      borderColor: 'lightgray',
    },
  }),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  menu: (provided: any) => ({
    ...provided,
    marginTop: '0px',
    borderRadius: '12px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    zIndex: 10,
  }),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dropdownIndicator: (provided: any, state: any) => ({
    ...provided,
    transform: state.selectProps.menuIsOpen ? 'scaleY(-1)' : 'scaleY(1)',
    transition: 'transform 0.2s ease',
    display: state.isDisabled ? 'none' : 'flex',
  }),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  indicatorSeparator: (provided: any, state: any) => ({
    ...provided,
    display: state.isDisabled ? 'none' : 'block',
  }),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  placeholder: (provided: any) => ({
    ...provided,
    color: '#999',
  }),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  singleValue: (provided: any) => ({
    ...provided,
  }),
};
