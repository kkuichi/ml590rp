import { Button } from '@mui/material';
import { useTranslations } from 'next-intl';
import { SignOutIcon } from '@/assets/icons/icons';
import { signOutUser } from '@/lib/actions/signOutUser';

export const SignOutButton = () => {
  const t = useTranslations();
  return (
    <form action={signOutUser}>
      <Button color='secondary' type='submit' endIcon={<SignOutIcon />}>
        {t('actions.signout')}
      </Button>
    </form>
  );
};
