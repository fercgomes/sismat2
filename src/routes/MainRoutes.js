// project imports
import MainLayout from 'layout/MainLayout';
import { lazy } from 'react';
import Loadable from 'ui-component/Loadable';
import ConfirmEnrollmentView from 'views/student/enrollment/confirm';
import SelectClassesView from 'views/student/enrollment/select-classes';
import SelectConstraintsView from 'views/student/enrollment/select-constraints';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));

// utilities routing
const UtilsTypography = Loadable(lazy(() => import('views/utilities/Typography')));
const UtilsColor = Loadable(lazy(() => import('views/utilities/Color')));
const UtilsShadow = Loadable(lazy(() => import('views/utilities/Shadow')));
const UtilsMaterialIcons = Loadable(lazy(() => import('views/utilities/MaterialIcons')));
const UtilsTablerIcons = Loadable(lazy(() => import('views/utilities/TablerIcons')));
const Enrollment = Loadable(lazy(() => import('views/student/enrollment/index')));

// sample page routing
const SamplePage = Loadable(lazy(() => import('views/sample-page')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: '/',
            element: <DashboardDefault />
        },
        {
            path: '/dashboard',
            element: <DashboardDefault />
        },
        {
            path: `/enrollment`,
            element: <Enrollment />
        },
        {
            path: `/enrollment/select-classes`,
            element: <SelectClassesView />
        },
        {
            path: `/enrollment/select-constraints`,
            element: <SelectConstraintsView />
        },
        {
            path: `/enrollment/confirm`,
            element: <ConfirmEnrollmentView />
        }
    ]
};

export default MainRoutes;
