'use client';

import { Controller, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Grid2, MenuItem } from '@mui/material';
import { useTranslations } from 'next-intl';
import * as yup from 'yup';
import { PlusIcon } from '@/assets/icons/icons';
import { getInitialData } from '@/lib/constants/methodsInitialValues';
import { getRetrospectivePath } from '@/lib/utils/getRetrospectivePath';
import { useSwitch } from '@/lib/utils/hooks/useSwitch';
import { useCreateRetrospectiveMutation } from '@/store/api/retrospectivesEndpoints/retrospectivesEndpoints';
import { ICreateRetrospective } from '@/store/api/retrospectivesEndpoints/types';
import { TMethod } from '@/types/types';
import { SelectInput, SwitchInput, TextInput } from '../Input/index';
import { BaseModal } from './BaseModal';
import { ControlPanel } from './ControlPanel';

const schema = yup.object().shape({
  title: yup.string().required('Title is required'),
  interactive: yup.boolean().default(true),
  method: yup.string().oneOf(['sailboat']).required('Method is required'),
});

interface IFormValues {
  title: string;
  method: TMethod;
  interactive: boolean;
}

export const CreateRetrospectiveModal = () => {
  const router = useRouter();
  const t = useTranslations();

  const [isOpen, handleOpen, handleClose] = useSwitch(false);
  const [createRetrospective] = useCreateRetrospectiveMutation();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<IFormValues>({
    defaultValues: {
      title: '',
      interactive: true,
      method: 'sailboat',
    },
    resolver: yupResolver(schema),
  });

  const handleCloseModal = () => {
    handleClose();
    reset();
  };

  const onSubmit = async ({ interactive, method, title }: IFormValues) => {
    const newRetrospective: ICreateRetrospective = {
      title,
      method,
      completed: !interactive,
      data: getInitialData(method),
    };
    try {
      const res = await createRetrospective(newRetrospective).unwrap();
      router.push(getRetrospectivePath(res));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Button color='secondary' endIcon={<PlusIcon />} onClick={handleOpen}>
        {t('actions.create')}
      </Button>
      <BaseModal
        title={t('pages.retrospectives.createRetrospectiveModal.title')}
        open={isOpen}
        onClose={handleCloseModal}
      >
        <Grid2
          component='form'
          onSubmit={handleSubmit(onSubmit)}
          container
          gap={{ xs: 1.5, md: 3 }}
          direction='column'
        >
          <TextInput
            error={Boolean(errors['title'])}
            helperText={errors['title']?.message}
            {...register('title')}
            label={'Title'}
            autoComplete='off'
          />
          <Controller
            name='method'
            control={control}
            render={({ field, fieldState }) => (
              <SelectInput
                {...field}
                error={Boolean(fieldState.error)}
                helperText={fieldState.error?.message}
                label={'Method'}
                disabled={false}
              >
                <MenuItem value='sailboat'>Sailboat</MenuItem>
              </SelectInput>
            )}
          />
          <Controller
            name='interactive'
            control={control}
            render={({ field }) => (
              <SwitchInput
                {...field}
                label='Interactive creation'
                checked={field.value}
                onChange={(e) => field.onChange(e.target.checked)}
              />
            )}
          />
          <ControlPanel onCancel={handleCloseModal} loading={isSubmitting} />
        </Grid2>
      </BaseModal>
    </>
  );
};
