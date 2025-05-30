import { Attachments } from './Attachments';
import { GeneralInfo } from './GeneralInfo';

export const RETROSPECTIVE_WIDGET_TABS = [
  {
    label: 'pages.retrospectiveDetails.generalInfo',
    content: () => <GeneralInfo />,
  },
  {
    label: 'pages.retrospectiveDetails.attachments',
    content: () => <Attachments />,
  },
];

export const SUPERVISE_WIDGET_TABS = [
  {
    label: 'pages.retrospectiveDetails.generalInfo',
    content: () => <GeneralInfo disabled />,
  },
  {
    label: 'pages.retrospectiveDetails.attachments',
    content: () => <Attachments />,
  },
];
