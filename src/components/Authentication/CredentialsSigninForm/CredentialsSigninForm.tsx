'use client';

import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Link, TextField } from '@mui/material';
import { useTranslations } from 'next-intl';
import * as yup from 'yup';
import { signinWithCredentials } from '@/lib/actions/signinWithCredentials';
import { ERoutes } from '@/lib/constants/routes';
import { ICredentials } from '@/types/types';

export const schema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required().min(8),
});

export const CredentialsSigninForm = () => {
  const t = useTranslations();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isValid, errors },
    setError,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
      password: '',
    },
    shouldUnregister: true,
  });

  const handleFormSubmit = async (values: ICredentials) => {
    try {
      const redirectUrl = await signinWithCredentials(values);
      router.push(redirectUrl);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setError('email', {});
      setError('password', { message: 'Invalid email or password' });
    }
  };

  return (
    <Box
      component='form'
      onSubmit={handleSubmit(handleFormSubmit)}
      display='flex'
      flexDirection='column'
      gap={2}
    >
      <TextField
        {...register('email')}
        label={t('forms.placeholders.email')}
        type='email'
        error={Boolean(errors.email)}
      />
      <TextField
        {...register('password')}
        label={t('forms.placeholders.password')}
        type='password'
        error={Boolean(errors.password)}
        helperText={errors.password?.message}
      />
      <Link alignSelf='end' href={ERoutes.registration}>
        {t('signinPage.sudjest')}
      </Link>
      <Button
        data-id='credentials-sign-in'
        loading={isSubmitting}
        type='submit'
        size='large'
        disabled={!isValid}
        sx={{ borderRadius: 3 }}
      >
        {t('landingPage.signIn')}
      </Button>
    </Box>
  );
};
