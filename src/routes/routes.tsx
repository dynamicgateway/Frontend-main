import { Navigate, type RouteObject } from 'react-router';

import * as PATHS from '@/constants/router-paths-constants';
import { NewLoginPage } from '@/pages/new-login';
import FormioLoginPage from '@/pages/formio-login/FormioLoginPage';
import { NationalLoginPage } from '@/pages/national-login';
import { IslandFlagIcon } from '@/assets';
import PasswordResetPage from '@/pages/reset-password/reset-password-page';
import ForgotPassword from '@/pages/forgot-password';
import { AuthoritySelection } from '@/pages/authority-selection';
import { ArnonaRequestPage } from '@/pages/arnona-request';
import ClassesPage from '@/pages/classes';
import EducationPage from '@/pages/education';
import EngineeringPage from '@/pages/engineering';
import ResetForgotPasswordPage from '@/pages/reset-forgot-password';
import { EventsInfoCardsPage } from '@/pages/events-info-cards/events-info-cards-page';
import OpenRequestChangePayersPage from '@/pages/open-request-change-payers';
import SelectUserTypePage from '@/pages/select-user-type';
import RequestForLandRegistryPage from '@/pages/request-for-land-registry';
import MainMenuPage from '@/pages/main-menu';
import { GenericFormPage } from '@/pages/generic-form-page/GenericFormPage';
import { FormManager } from '@/components/DynamicForm/FormManager';
import { IframeFormDemoPage } from '@/pages/iframe-form-demo/IframeFormDemoPage';
import FormioTestPage from '@/pages/formio-test/FormioTestPage';

interface RouteAdditionalBreadcrumbsConfig {
  title?: string;
  children?: Array<RouteItem>;
  /** Use cases when ID is provided. Key could be used to find entity, whichst title should be used. */
  entityType?: string;
  key?: string;
  icon?: any;
}

export type RouteItem = RouteObject & RouteAdditionalBreadcrumbsConfig;

const ROUTES = [
  {
    key: 'home',
    path: '/',
    element: <Navigate to={PATHS.LOGIN} replace />,
  },
  {
    key: 'not-found',
    path: '*',
    element: <Navigate to={PATHS.LOGIN} replace />,
  },

  {
    key: 'forgot-password',
    title: 'Forgot Password',
    path: PATHS.FORGOT_PASSWORD,
    element: <ForgotPassword />,
    icon: IslandFlagIcon,
  },
  {
    key: 'Login',
    title: 'Login',
    path: PATHS.LOGIN,
    element: <NewLoginPage />,
    icon: IslandFlagIcon,
  },
  {
    key: 'National Login',
    title: 'National Login',
    path: PATHS.NATIONAL_LOGIN,
    element: <NationalLoginPage />,
    icon: IslandFlagIcon,
  },
  {
    key: 'Reset Forgot Password',
    title: 'Reset Forgot Password',
    path: PATHS.RESET_FORGOT_PASSWORD,
    element: <ResetForgotPasswordPage />,
    icon: IslandFlagIcon,
  },

  {
    key: 'Authority Selection',
    title: 'Authority Selection',
    path: PATHS.MUNICIPAL_SELECTION,
    element: <AuthoritySelection />,
    icon: IslandFlagIcon,
    displayInNavbar: false,
  },

  {
    key: 'password-reset',
    title: 'Password Reset',
    path: PATHS.RESET_PASSWORD,
    element: <PasswordResetPage />,
    icon: IslandFlagIcon,
    displayInNavbar: false,
  },
  {
    key: 'formio-test',
    title: 'Form.io Test',
    path: '/formio-test',
    element: <FormioTestPage />,
    icon: IslandFlagIcon,
    displayInNavbar: false,
  },
  {
    key: 'arnona-request',
    title: 'Arnona Request',
    path: PATHS.ARNONA_REQUEST,
    element: <ArnonaRequestPage />,
    icon: IslandFlagIcon,
    displayInNavbar: false,
  },
  {
    key: 'classes',
    title: 'Classes',
    path: PATHS.CLASSES,
    element: <ClassesPage />,
    icon: IslandFlagIcon,
    displayInNavbar: false,
  },
  {
    key: 'education',
    title: 'Education',
    path: PATHS.EDUCATION,
    element: <EducationPage />,
    icon: IslandFlagIcon,
    displayInNavbar: false,
  },
  {
    key: 'engineering',
    title: 'Engineering',
    path: PATHS.ENGINEERING,
    element: <EngineeringPage />,
    icon: IslandFlagIcon,
    displayInNavbar: false,
  },
  {
    key: 'events-info-cards',
    title: 'Events Info Cards',
    path: PATHS.EVENTS_INFO_CARDS,
    element: <EventsInfoCardsPage />,
    icon: IslandFlagIcon,
    displayInNavbar: false,
  },
  {
    key: 'open-request-change-payers',
    title: 'Open Request Change Payers',
    path: PATHS.OPEN_REQUEST_CHANGE_PAYERS,
    element: <OpenRequestChangePayersPage />,
    icon: IslandFlagIcon,
    displayInNavbar: false,
  },
  {
    key: 'select-user-type',
    title: 'Select User Type',
    path: PATHS.SELECT_USER_TYPE,
    element: <SelectUserTypePage />,
    icon: IslandFlagIcon,
    displayInNavbar: false,
  },
  {
    key: 'request-for-land-registry',
    title: 'Request for Land Registry',
    path: PATHS.REQUEST_FOR_LAND_REGISTRY,
    element: <RequestForLandRegistryPage />,
    icon: IslandFlagIcon,
    displayInNavbar: false,
  },
  {
    key: 'forms',
    title: 'Forms',
    path: PATHS.FORMS,
    element: <FormManager />,
    icon: IslandFlagIcon,
    displayInNavbar: false,
  },
  {
    key: 'form-view',
    title: 'View Form',
    path: PATHS.FORM_VIEW,
    element: <GenericFormPage />,
    icon: IslandFlagIcon,
    displayInNavbar: false,
  },
  {
    key: 'iframe-demo',
    title: 'IFrame Form Demo',
    path: '/iframe-demo',
    element: <IframeFormDemoPage />,
    icon: IslandFlagIcon,
    displayInNavbar: false,
  },
  {
    key: 'main-menu',
    title: 'Main Menu',
    path: PATHS.MAIN_MENU,
    element: <MainMenuPage />,
    icon: IslandFlagIcon,
    displayInNavbar: false,
  },
] as Array<RouteItem>;

export { ROUTES };

