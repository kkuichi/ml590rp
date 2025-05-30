export enum ERoutes {
  home = '/',
  signin = '/sign-in',
  registration = '/registration',
  dashboard = '/dashboard',
  retrospectives = '/retrospectives',
  supervise = '/supervise',
  interactiveRetrospectiveCreation = '/retrospectives/interactive',
}

export const publicRoutes: Array<string> = [ERoutes.home];

export const authRoutes: Array<string> = [ERoutes.signin, ERoutes.registration];

export const DEFAULT_LOGIN_REDIRECT = ERoutes.dashboard;

export const allRoutes = [
  ERoutes.home,
  ERoutes.signin,
  ERoutes.registration,
  ERoutes.dashboard,
  ERoutes.retrospectives,
  ERoutes.supervise,
];
