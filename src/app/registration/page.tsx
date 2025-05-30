import React from 'react';
import Link from 'next/link';
import { Divider, Grid2, Paper, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';
import { RegistrationForm } from '@/components/Authentication/CredentialsSigninForm/RegistrationForm';
import { LanguageSelect } from '@/components/LanguageSelect/LanguageSelect';
import { Logo } from '@/components/Logo/Logo';
import { ThemeSwitcher } from '@/components/ThemeSwitcher/ThemeSwitcher';


const RegistrationPage = () => {
  const t = useTranslations();
  return (
    <Grid2
      container
      direction='column'
      width='90%'
      mx='auto'
      wrap='nowrap'
      height='100dvh'
    >
      <Grid2
        component='header'
        container
        width='100%'
        justifyContent='space-between'
        p={1}
        wrap='nowrap'
      >
        <Link href='/'>
          <Logo />
        </Link>
        <Grid2
          container
          alignItems='center'
          gap={{ xs: 0, sm: 2 }}
          wrap='nowrap'
        >
          <ThemeSwitcher />
          <LanguageSelect />
        </Grid2>
      </Grid2>
      <Divider />
      <Grid2 container direction='column' gap={3} m='auto'>
        <Typography
          variant='h2'
          component='h1'
          letterSpacing={-3}
          sx={{ wordBreak: 'break-word' }}
          textAlign='center'
        >
          {t('registrationPage.title')}
        </Typography>
        <Paper
          variant='outlined'
          sx={{
            p: { xs: 2.5, md: 5 },
            borderRadius: 5,
            width: {
              xs: '100%',
              sm: 600,
            },
          }}
        >
          <Typography mb={4}>{t('registrationPage.subtitle')}</Typography>
          <Grid2 container direction='column' gap={2}>
            <RegistrationForm />
          </Grid2>
        </Paper>
      </Grid2>
    </Grid2>
  );
};

export default RegistrationPage;