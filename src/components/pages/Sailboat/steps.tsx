import { ReactNode } from 'react';
import ForcesImage from '@/assets/images/sailboat/forces.png';
import GoalsImage from '@/assets/images/sailboat/goals.png';
import MotivationImage from '@/assets/images/sailboat/motivation.png';
import ObstaclesImage from '@/assets/images/sailboat/obstacles.png';
import ThreatsImage from '@/assets/images/sailboat/threats.png';
import { IRetrospective } from '@/types/types';
import { StepComponent } from './Steps/StepComponent';

export interface IStep {
  title: string;
  component: ({
    retrospective,
    title,
    displayedContainer,
  }: {
    retrospective: IRetrospective;
    title: string;
    displayedContainer: number;
  }) => ReactNode;
}

export const steps: Array<IStep> = [
  {
    title: 'pages.retrospectives.sailboat.goals',
    component: (props) => <StepComponent content={GoalsImage} {...props} />,
  },
  {
    title: 'pages.retrospectives.sailboat.forces',
    component: (props) => <StepComponent content={ForcesImage} {...props} />,
  },
  {
    title: 'pages.retrospectives.sailboat.obstacles',
    component: (props) => <StepComponent content={ObstaclesImage} {...props} />,
  },
  {
    title: 'pages.retrospectives.sailboat.threats',
    component: (props) => <StepComponent content={ThreatsImage} {...props} />,
  },
  {
    title: 'pages.retrospectives.sailboat.motivation',
    component: (props) => <StepComponent content={MotivationImage} {...props} />,
  },
];
