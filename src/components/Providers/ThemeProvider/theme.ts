'use client';

import { Roboto } from 'next/font/google';
import Link from 'next/link';
import { createTheme } from '@mui/material/styles';
import { beige, black, blue, error, grey, white } from './colors';

declare module '@mui/material/styles' {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  interface Palette {
    blue: Record<number, string>;
    white: string;
    beige: Record<number, string>;
  }
  // eslint-disable-next-line @typescript-eslint/naming-convention
  interface PaletteOptions {
    blue: Record<number, string>;
    white: string;
    beige: Record<number, string>;
  }
}

export const roboto = Roboto({
  subsets: ['latin', 'cyrillic'],
  weight: ['100', '300', '400', '500', '700', '900'],
  style: 'normal',
});

export const lightTheme = createTheme({
  cssVariables: true,
  typography: { fontFamily: roboto.style.fontFamily },
  palette: {
    mode: 'light',
    divider: 'rgba(0, 0, 0, 0.12)',
    primary: { main: blue[800] },
    secondary: { main: grey[300] },
    background: {
      default: white,
      paper: beige[100],
    },
    text: {
      primary: black,
      secondary: grey[600],
    },
    white,
    beige,
    error: {
      main: error,
    },
    blue: {
      800: '#21076D',
      700: '#4B3099',
      600: '#344CB7',
      400: '#344CB7',
    },
    grey: {
      // 800: '#B5B5BC',
      600: '#444444',
      500: '#313131',
      400: '#908BA0',
      300: '#B3AEC2',
      200: '#F5F5F5',
    },
  },
  components: {
    MuiButtonBase: {
      defaultProps: {
        LinkComponent: Link,
      },
    },
    MuiButton: {
      defaultProps: {
        variant: 'contained',
        loadingPosition: 'end',
      },
      styleOverrides: {
        root: {
          color: black,
          borderRadius: '20px',
        },
        contained: {
          '&.MuiButton-containedPrimary': {
            color: white,
            '&:hover': {},
            '&.Mui-disabled': {},
          },
          '&.MuiButton-containedSecondary': {
            color: white,
            '&:hover': {},
            '&.Mui-disabled': {},
          },
        },
      },
    },
    MuiStack: {
      defaultProps: {
        spacing: 1,
        direction: 'row',
        alignItems: 'center',
      },
    },
    MuiLink: {
      defaultProps: {
        underline: 'none',
        component: Link,
      },
      styleOverrides: {
        root: {
          color: black,
          cursor: 'pointer',
          borderBottom: `2px dashed ${blue[600]}`,
          transition: 'color 0.3s ease, border-bottom 0.3s ease',

          '&:hover': {
            color: grey[800],
            opacity: '90%',
            borderBottom: `2px dashed ${blue[800]}`,
          },

          '&.Mui-disabled': {
            color: grey[500],
            borderBottom: `2px dashed ${grey[500]}`,
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          fontWeight: 300,
          transition: 'border-color 0.2s ease-in-out',
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: 'rgba(0, 0, 0, 0.12)',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: 'rgba(0, 0, 0, 0.3)',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: 'rgba(0, 0, 0, 0.3)',
            borderWidth: '1px',
          },
          '&.Mui-disabled .MuiOutlinedInput-notchedOutline': {
            borderColor: '#F5F5F5',
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          borderRadius: '16px',
          fontWeight: 300,
          transition: 'border-color 0.2s ease-in-out',
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: 'rgba(0, 0, 0, 0.12)',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: 'rgba(0, 0, 0, 0.3)',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: 'rgba(0, 0, 0, 0.3)',
            borderWidth: '1px',
          },
          '&.Mui-disabled .MuiOutlinedInput-notchedOutline': {
            borderColor: '#F5F5F5',
          },
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        root: {},
        paper: {
          borderRadius: '12px',
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
          padding: '4px 0',
        },
        list: {
          padding: '8px',
        },
      },
    },
    MuiMenuItem: {
      defaultProps: {
        LinkComponent: Link,
      },
      styleOverrides: {
        root: {
          borderRadius: '8px',
        },
      },
    },
    MuiToggleButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          padding: '6px 12px',
          fontSize: '16px',
          '&.Mui-selected': {
            backgroundColor: blue[800],
            color: 'white',
            '&:hover': {
              backgroundColor: 'rgb(23, 4, 76)',
            },
          },
          '&.Mui-disabled': {
            color: black,
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          transition: 'background 0.3s ease',
        },
        colorPrimary: {
          borderRadius: '35%',
          color: 'white',
          background: grey[300],
          '&:hover': {
            background: '#7D7987 !important',
          },
        },
        colorSecondary: {
          borderRadius: '35%',
          '&:hover': {
            background: '#E2E2E2 !important',
          },
        },
      },
    },
    MuiAutocomplete: {
      styleOverrides: {
        paper: {
          borderRadius: '12px',
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
          padding: '4px 0',
        },
        option: {
          borderRadius: '8px',
        },
      },
    },
  },
});

export const darkTheme = createTheme({
  // @ts-expect-error i don't care
  palette: {
    mode: 'dark',
  },
});
