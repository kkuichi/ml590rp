'use client';

import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Link, TextField } from '@mui/material';
import { useTranslations } from 'next-intl';
import * as yup from 'yup';
import { ERoutes } from '@/lib/constants/routes';
import { useRegistrationMutation } from '@/store/api/userEndpoints/userEndpoints';
import { ICredentials } from '@/types/types';

export const schema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required().min(8).max(16),
  confirmPassword: yup
    .string()
    .required()
    .min(8)
    .max(16)
    .oneOf([yup.ref('password')]),
});

export const RegistrationForm = () => {
  const router = useRouter();
  const t = useTranslations();

  const [doRegistration] = useRegistrationMutation();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
    shouldUnregister: true,
  });

  const handleFormSubmit = async ({ email, password }: ICredentials) => {
    try {
      await doRegistration({ email, password }).unwrap();
      router.push(ERoutes.signin);
    } catch (err) {
      console.error(err);
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
        helperText={errors.email?.message}
      />
      <TextField
        {...register('password')}
        label={t('forms.placeholders.password')}
        type='password'
        error={Boolean(errors.password)}
        helperText={errors.password?.message}
      />
      <TextField
        {...register('confirmPassword')}
        label={t('forms.placeholders.confirmPassword')}
        type='password'
        error={Boolean(errors.confirmPassword)}
        helperText={errors.confirmPassword?.message}
      />
      <Link alignSelf='end' href={ERoutes.signin}>
        {t('registrationPage.sudjest')}
      </Link>
      <Button
        loading={isSubmitting}
        type='submit'
        size='large'
        sx={{ borderRadius: 3 }}
      >
        {t('actions.registration')}
      </Button>
    </Box>
  );
};
