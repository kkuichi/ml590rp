import React, { FC, useEffect } from 'react';
import { Control, useFieldArray, useForm } from 'react-hook-form';
import { useParams } from 'next/navigation';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Button,
  ButtonBase,
  Grid2,
  IconButton,
  Typography,
} from '@mui/material';
import { useTranslations } from 'next-intl';
import { CheckIcon, CloseIcon } from '@/assets/icons/icons';
import { TextInput } from '@/components/Input';
import { UserSelect } from '@/components/UserSelect/UserSelect';
import { getUsers } from '@/lib/actions/getUsers';
import { useSwitch } from '@/lib/utils/hooks/useSwitch';
import {
  useGetRetrospectiveDetailsQuery,
  useUpdateRetrospectiveMutation,
} from '@/store/api/retrospectivesEndpoints/retrospectivesEndpoints';
import {
  getDefaultValues,
  retrospectiveWidgetSchema,
} from '../pages/RetrospectiveDetails/Widget/helpers';
import { IRetrospectiveWidgetFormValues } from '../pages/RetrospectiveDetails/Widget/types';
import { WidgetMenu } from './WidgetMenu';

interface IGeneralInfoProps {
  disabled?: boolean;
}

export const GeneralInfo: FC<IGeneralInfoProps> = ({ disabled = false }) => {
  const t = useTranslations();
  const [isEditMode, openEditMode, closeEditMode] = useSwitch();

  const findUsers = async (inputValue: string) =>
    (await getUsers(inputValue)).map((user) => ({
      value: user,
      label: user,
    }));

  const { id: retrospectiveId } = useParams();
  const { data: retrospective, isFetching } = useGetRetrospectiveDetailsQuery(
    retrospectiveId as string
  );
  
  const {
    control,
    register,
    reset,
    handleSubmit,
    formState: { errors, disabled: isFormDisabled, isSubmitting, isDirty },
  } = useForm<IRetrospectiveWidgetFormValues>({
    resolver: yupResolver<IRetrospectiveWidgetFormValues>(
      retrospectiveWidgetSchema
    ),
    disabled: isFetching || !isEditMode || disabled,
  });

  useEffect(() => {
    if (retrospective) {
      reset(getDefaultValues(retrospective));
    }
  }, [reset, retrospective]);

  const {
    fields: members,
    append: appendMember,
    remove: removeMember,
  } = useFieldArray({
    control,
    name: 'members',
    shouldUnregister: true,
  });

  const {
    fields: supervisors,
    append: appendSupervisor,
    remove: removeSupervisor,
  } = useFieldArray({
    control,
    name: 'supervisors',
    shouldUnregister: true,
  });
  const [updateRetrospective] = useUpdateRetrospectiveMutation();

  const handleUpdate = async (values: IRetrospectiveWidgetFormValues) => {
    if (retrospective) {
      try {
        const { members, supervisors, title, description } = values;
        await updateRetrospective({
          _id: retrospective._id,
          members: members.map((member) => member!.value),
          supervisors: supervisors.map((supervisor) => supervisor!.value),
          title,
          description,
        }).unwrap();
        closeEditMode();
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <Grid2
      container
      height='100%'
      direction='column'
      wrap='nowrap'
      overflow='auto'
      position='relative'
      justifyContent='space-between'
      component='form'
      onSubmit={handleSubmit(handleUpdate)}
    >
      <Grid2 container direction='column' p={1} gap={1}>
        <TextInput
          size='small'
          {...register('title')}
          label={t('common.title')}
          error={Boolean(errors.title)}
          helperText={errors.title?.message}
        />
        <TextInput
          size='small'
          multiline
          {...register('description')}
          label={t('common.description')}
          error={Boolean(errors.description)}
          helperText={errors.description?.message}
        />
        <TextInput
          size='small'
          label={t('common.author')}
          value={retrospective ? retrospective.author : ''}
          disabled
        />
        <Grid2 container direction='column'>
          <Typography ml={1} variant='caption'>
            {t('pages.retrospectiveDetails.members')}
          </Typography>
          <Grid2 container direction='column' gap={1}>
            {members.length ? (
              members.map((field, index) => (
                <UserSelect
                  loadOptions={findUsers}
                  key={field.id}
                  name={`members.${index}`}
                  control={control as unknown as Control}
                  button={
                    <IconButton
                      size='small'
                      onClick={() => removeMember(index)}
                    >
                      <CloseIcon />
                    </IconButton>
                  }
                />
              ))
            ) : (
              <Typography sx={{ opacity: '50%', ml: 1 }} variant='body2'>
                {t('pages.retrospectiveDetails.noMembers')}
              </Typography>
            )}
          </Grid2>
          {!isFormDisabled && (
            <ButtonBase
              disableRipple
              sx={{ width: 'fit-content', ml: 1 }}
              onClick={() => appendMember(null)}
            >
              <Typography variant='caption'>{t('actions.add')}</Typography>
            </ButtonBase>
          )}
        </Grid2>
        <Grid2 container direction='column'>
          <Typography ml={1} variant='caption'>
            {t('pages.retrospectiveDetails.supervisors')}
          </Typography>
          <Grid2 container direction='column' gap={1}>
            {supervisors.length ? (
              supervisors.map((field, index) => (
                <UserSelect
                  key={field.id}
                  loadOptions={findUsers}
                  name={`supervisors.${index}`}
                  control={control as unknown as Control}
                  button={
                    <IconButton
                      size='small'
                      onClick={() => removeSupervisor(index)}
                    >
                      <CloseIcon />
                    </IconButton>
                  }
                />
              ))
            ) : (
              <Typography variant='body2' sx={{ opacity: '50%', ml: 1 }}>
                {t('pages.retrospectiveDetails.noSupervisors')}
              </Typography>
            )}
          </Grid2>
          {!isFormDisabled && (
            <ButtonBase
              disableRipple
              sx={{ width: 'fit-content', ml: 1 }}
              onClick={() => appendSupervisor(null)}
            >
              <Typography variant='caption'>{t('actions.add')}</Typography>
            </ButtonBase>
          )}
        </Grid2>
      </Grid2>
      <Grid2
        container
        justifyContent={isEditMode ? 'space-between' : 'end'}
        position='sticky'
        bottom={0}
        m={1}
        borderRadius={5}
        bgcolor='background.paper'
      >
        {!disabled &&
          (isEditMode ? (
            <>
              <Button
                color='secondary'
                onClick={() => {
                  reset(getDefaultValues(retrospective!));
                  closeEditMode();
                }}
              >
                {t('actions.cancel')}
              </Button>
              <Button
                endIcon={<CheckIcon />}
                loading={isSubmitting}
                type='submit'
                disabled={!isDirty}
              >
                {t('actions.save')}
              </Button>
            </>
          ) : (
            <WidgetMenu disabled={isFetching} openEditMode={openEditMode} />
          ))}
      </Grid2>
    </Grid2>
  );
};
