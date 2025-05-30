import { BoatIcon, HomeIcon, SuperviseIcon } from '@/assets/icons/icons';
import { ERoutes } from '@/lib/constants/routes';

interface INavigationItem {
  icon: React.ReactNode;
  path: string;
  title: string;
}

export const NAVIGATION_ITEMS: Array<INavigationItem> = [
  {
    icon: <HomeIcon size={26} />,
    path: ERoutes.dashboard,
    title: 'Dashboard',
  },
  {
    icon: <BoatIcon size={26} />,
    path: ERoutes.retrospectives,
    title: 'Retrospectives',
  },
  {
    icon: <SuperviseIcon size={26} />,
    path: ERoutes.supervise,
    title: 'Supervise',
  },
];
