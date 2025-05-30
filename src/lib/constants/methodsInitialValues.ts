import { IRetrospective, TMethod } from '@/types/types';

const sailboatInitialValues: IRetrospective['data'] = {
  containers: [
    { id: 'goals', title: 'pages.retrospectives.sailboat.goals' },
    { id: 'forces', title: 'pages.retrospectives.sailboat.forces' },
    { id: 'obstacles', title: 'pages.retrospectives.sailboat.obstacles' },
    { id: 'threats', title: 'pages.retrospectives.sailboat.threats' },
    { id: 'motivation', title: 'pages.retrospectives.sailboat.motivation' },
  ],
  items: [],
};

const customInitialValues: IRetrospective['data'] = {
  containers: [],
  items: [],
};

export const getInitialData = (method: TMethod): IRetrospective['data'] => {
  switch (method) {
    case 'sailboat':
      return sailboatInitialValues;
    default:
      return customInitialValues;
  }
};
