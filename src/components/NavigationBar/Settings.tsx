'use client';

import { useSession } from 'next-auth/react';
import React, { useState } from 'react';
import Image from 'next/image';
import {
  Grid2,
  IconButton,
  Paper,
  Popover,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material';
import { useLocale, useTranslations } from 'next-intl';
import { GlobalIcon, SettingsIcon } from '@/assets/icons/icons';
import { changeLanguage } from '@/lib/actions/changeLanguage';
import { useBreakPoint } from '@/lib/utils/hooks/useBreakPoint';
import { SignOutButton } from '../Authentication/SignOutButton';
import { ThemeSwitcher } from '../ThemeSwitcher/ThemeSwitcher';

export const Settings = () => {
  const t = useTranslations();

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const session = useSession();

  const languageOptions = ['en', 'sk'];
  const locale = useLocale();

  const selectedOption = languageOptions.find((option) => option === locale);

  const handleChangeLanguage = async (
    _: React.MouseEvent<HTMLElement>,
    newLanguage: 'en' | 'sk' | 'ru'
  ) => {
    if (newLanguage !== null) {
      await changeLanguage(newLanguage);
    }
  };

  const { xs, sm } = useBreakPoint();

  return (
    <>
      <IconButton
        data-id='settings-button'
        color={anchorEl ? 'primary' : 'secondary'}
        onClick={(e) => setAnchorEl(e.currentTarget)}
      >
        <SettingsIcon />
      </IconButton>
      <Popover
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        anchorEl={anchorEl}
        anchorOrigin={
          !(xs || sm)
            ? {
                vertical: 'top',
                horizontal: 'right',
              }
            : {
                vertical: 'bottom',
                horizontal: 'left',
              }
        }
        transformOrigin={
          !(xs || sm)
            ? {
                vertical: 'bottom',
                horizontal: 'left',
              }
            : {
                vertical: 'top',
                horizontal: 'left',
              }
        }
        sx={{
          mt: xs || sm ? 2 : 0,
          '.MuiPaper-root': {
            borderRadius: 3,
            p: 1,
          },
        }}
      >
        <Grid2 container width={250} height={300} direction='column' gap={1}>
          <Grid2 container direction='column' width='100%'>
            <Typography variant='caption'>{t('common.profile')}</Typography>
            {session.data?.user?.image && (
              <Paper
                variant='outlined'
                sx={{
                  display: 'flex',
                  gap: 1,
                  alignItems: 'center',
                  flexWrap: 'nowrap',
                  p: 1,
                  width: '100%',
                }}
              >
                <Image
                  src={session.data?.user?.image}
                  width={25}
                  height={25}
                  style={{ borderRadius: '50%' }}
                  alt='avatar'
                />
                <Typography
                  sx={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    flexGrow: 1,
                  }}
                >
                  {session.data?.user?.email}
                </Typography>
              </Paper>
            )}
          </Grid2>
          <Grid2 container direction='column'>
            <Typography variant='caption'>{t('common.language')}</Typography>
            <ToggleButtonGroup
              exclusive
              onChange={handleChangeLanguage}
              value={selectedOption}
            >
              <ToggleButton disabled value=''>
                <GlobalIcon size={20} />
              </ToggleButton>
              {languageOptions.map((option) => (
                <ToggleButton key={option} value={option}>
                  {option}
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
          </Grid2>
          <Grid2 container direction='column' alignItems='start'>
            <Typography variant='caption'>{t('common.theme')}</Typography>
            <ThemeSwitcher />
          </Grid2>
        </Grid2>
        <Grid2 container>
          <SignOutButton />
        </Grid2>
      </Popover>
    </>
  );
};
