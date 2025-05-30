import Link from 'next/link';
import { Button, Divider, Grid2, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';
import { LongArrowIcon, SignInIcon } from '@/assets/icons/icons';
import { LanguageSelect } from '@/components/LanguageSelect/LanguageSelect';
import { Logo } from '@/components/Logo/Logo';
import { ERoutes } from '@/lib/constants/routes';
import { ThemeSwitcher } from '@/components/ThemeSwitcher/ThemeSwitcher';

const HomePage = () => {
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
          <Link href={ERoutes.signin} style={{ flexShrink: 0 }}>
            <Button data-id='go-to-login-button' variant='text' endIcon={<SignInIcon />}>
              {t('landingPage.signUp')}
            </Button>
          </Link>
        </Grid2>
      </Grid2>
      <Divider />
      <Grid2 container flex={1}>
        <Grid2
          container
          direction='column'
          justifyContent='center'
          maxWidth={700}
          gap={3}
        >
          <Typography
            variant='h2'
            component='h1'
            letterSpacing={-3}
            sx={{ wordBreak: 'break-word' }}
          >
            {t('landingPage.title1')}{' '}
            <Typography component='strong' variant='h2'>
              {t('landingPage.title2')}{' '}
            </Typography>
          </Typography>
          <Typography variant='subtitle1' component='h2' letterSpacing={0.2}>
            {t('landingPage.subtitle')}
          </Typography>
          <Grid2 container gap={1} alignItems='center'>
            <Link href={ERoutes.signin}>
              <Button size='large'>{t('landingPage.start')}</Button>
            </Link>
            <Button
              size='large'
              color='secondary'
              endIcon={<LongArrowIcon size={15} />}
              variant='text'
            >
              {t('landingPage.learnMore')}
            </Button>
          </Grid2>
        </Grid2>
      </Grid2>
    </Grid2>
  );
};

export default HomePage;
