import { FC } from 'react';
import { Button, ButtonProps } from '@mui/material';
import { signIn } from '@/config/auth/auth';

interface ISignInButtonProps extends ButtonProps {
  provider: 'github' | 'google';
}

export const SignInButton: FC<ISignInButtonProps> = ({
  children,
  provider,
}) => (
  <form
    action={async () => {
      'use server';
      await signIn(provider);
    }}
  >
    <Button
      size='large'
      fullWidth
      sx={{
        height: '70px',
        display: 'flex',
        gap: 1,
        backgroundColor: 'white',
        color: 'black !important',
      }}
      type='submit'
    >
      {children}
    </Button>
  </form>
);
