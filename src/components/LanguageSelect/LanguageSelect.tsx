'use client';

import { InputAdornment, MenuItem, Select } from '@mui/material';
import { useLocale } from 'next-intl';
import { GlobalIcon } from '@/assets/icons/icons';
import { changeLanguage } from '@/lib/actions/changeLanguage';

const options = [
  { value: 'en', label: 'English' },
  { value: 'sk', label: 'Slovenský' },
];

export const LanguageSelect = () => {
  const locale = useLocale();

  const selectedOption = options.find((option) => option.value === locale);

  const handleChange = async (value: string) => {
    if (value !== locale) {
      await changeLanguage(value);
    }
  };

  return (
    <Select
      id='language-select'
      variant='standard'
      sx={{
        '&::before': { borderBottom: 'none !important' },
        '&:hover::before': { borderBottom: 'none !important' },
        '&::after': { borderBottom: 'none !important' },
      }}
      startAdornment={
        <InputAdornment position='start'>
          <GlobalIcon size={20} />
        </InputAdornment>
      }
      value={selectedOption?.value}
      onChange={(e) => handleChange(e.target.value)}
    >
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </Select>
  );
};
