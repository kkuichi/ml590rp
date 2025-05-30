'use client';

import React, { use, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Button,
  Grid2,
  MobileStepper,
  Step,
  StepLabel,
  Stepper,
} from '@mui/material';
import { useTranslations } from 'next-intl';
import { Header } from '@/components/Page/Header';
import { steps } from '@/components/pages/Sailboat/steps';
import { TabPanel } from '@/components/TabPanel/TabPanel';
import { ERoutes } from '@/lib/constants/routes';
import { useBreakPoint } from '@/lib/utils/hooks/useBreakPoint';
import {
  useGetRetrospectiveDetailsQuery,
  useUpdateRetrospectiveMutation,
} from '@/store/api/retrospectivesEndpoints/retrospectivesEndpoints';

interface IPageProps {
  params: Promise<{
    id: string;
  }>;
}

const SailboatMethod = ({ params }: IPageProps) => {
  const { id } = use(params);
  const { data: retrospective } = useGetRetrospectiveDetailsQuery(id);
  const [updateRetrospective, { isLoading: isUpdating }] =
    useUpdateRetrospectiveMutation();
  const router = useRouter();
  useEffect(() => {
    if (retrospective?.completed) {
      router.replace(`${ERoutes.retrospectives}/${retrospective._id}`);
    }
  }, [retrospective?._id, retrospective?.completed, router]);
  const handleUpdateRetrospective = async (creationStage: number) => {
    if (retrospective) {
      try {
        if (creationStage < 6) {
          await updateRetrospective({
            _id: retrospective._id,
            creationStage,
          }).unwrap();
        } else {
          await updateRetrospective({
            _id: retrospective._id,
            completed: true,
          }).unwrap();
        }
      } catch (err) {
        console.error(err);
      }
    }
  };
  const { xs, sm } = useBreakPoint();
  const t = useTranslations();
  return retrospective ? (
    <Grid2
      container
      direction={{ xs: 'column-reverse', md: 'column' }}
      gap={{ xs: 1, md: 3 }}
      flex={1}
      wrap='nowrap'
      overflow='hidden'
    >
      <Header
        backPath={ERoutes.retrospectives}
        title={retrospective.title}
        tooltip='Sailboat'
      />
      <Grid2 container direction='column' gap={2} flex={1} overflow='hidden'>
        <Grid2 container direction='column' flex={1} gap={2} wrap='nowrap'>
          {!(xs || sm) && (
            <Stepper
              activeStep={
                retrospective.creationStage
                  ? retrospective.creationStage - 1
                  : undefined
              }
              sx={{ width: '100%' }}
            >
              {steps.map(({ title }) => (
                <Step key={title}>
                  <StepLabel>{t(title)}</StepLabel>
                </Step>
              ))}
            </Stepper>
          )}

          {steps.map(({ title, component }, i) => (
            <TabPanel
              key={title}
              index={i}
              value={retrospective.creationStage - 1}
            >
              {component({ retrospective, title, displayedContainer: i })}
            </TabPanel>
          ))}
        </Grid2>
        {xs || sm ? (
          <MobileStepper
            sx={{ position: 'static' }}
            steps={steps.length}
            activeStep={retrospective.creationStage - 1}
            backButton={
              <Button
                color='secondary'
                disabled={!retrospective || retrospective.creationStage === 1}
                onClick={() =>
                  handleUpdateRetrospective(retrospective!.creationStage - 1)
                }
              >
                Back
              </Button>
            }
            nextButton={
              <Button
                disabled={!retrospective}
                loading={isUpdating}
                onClick={() =>
                  handleUpdateRetrospective(retrospective!.creationStage + 1)
                }
              >
                {retrospective?.creationStage === 5 ? 'Complete' : 'Next'}
              </Button>
            }
          />
        ) : (
          <Grid2 container justifyContent='space-between' p={1}>
            <Button
              color='secondary'
              disabled={!retrospective || retrospective.creationStage === 1}
              onClick={() =>
                handleUpdateRetrospective(retrospective!.creationStage - 1)
              }
            >
              Back
            </Button>
            <Button
              disabled={!retrospective}
              loading={isUpdating}
              onClick={() =>
                handleUpdateRetrospective(retrospective!.creationStage + 1)
              }
            >
              {retrospective?.creationStage === 5 ? 'Complete' : 'Next'}
            </Button>
          </Grid2>
        )}
      </Grid2>
    </Grid2>
  ) : null;
};

export default SailboatMethod;
