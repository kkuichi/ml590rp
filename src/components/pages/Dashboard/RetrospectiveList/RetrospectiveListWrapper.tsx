'use client';

import React, { FC } from 'react';
import {
  useGetRetrospectivesQuery,
  useGetSupervisedRetrospectivesQuery,
} from '@/store/api/retrospectivesEndpoints/retrospectivesEndpoints';
import { RetrospectiveList } from './RetrospectiveList';

interface IRetrospectiveListWrapperProps {
  supervised: boolean;
}

export const RetrospectiveListWrapper: FC<IRetrospectiveListWrapperProps> = ({
  supervised,
}) => {
  const { data: retrospectives, isLoading } = useGetRetrospectivesQuery({
    dashboard: true,
  });
  const { data: supervisedRetrospectives, isLoading: isLoadingSupervised } =
    useGetSupervisedRetrospectivesQuery({
      dashboard: true,
    });
  return (
    <RetrospectiveList
    supervised={supervised}
      retrospectives={supervised ? supervisedRetrospectives : retrospectives}
      isLoading={supervised ? isLoadingSupervised : isLoading}
    />
  );
};
