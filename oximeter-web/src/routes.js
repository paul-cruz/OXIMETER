import React from 'react';
import { Navigate } from 'react-router-dom';
import { positions, Provider } from "react-alert";
import DashboardLayout from './layouts/DashboardLayout';
import MainLayout from './layouts/MainLayout';
import SettingsView from './views/SettingsView';
import AccountView from './views/AccountView';
import Dashboard from './views/Dashboard';
import Home from './views/Home';
import Error from './components/Error';
import AlertMUITemplate from 'react-alert-template-mui';

const alert_options = {
  position: positions.MIDDLE
};

const routes = [
  {
    path: 'app',
    element: <DashboardLayout />,
    children: [
      { path: 'account', element: <Provider template={AlertMUITemplate} {...alert_options}> <AccountView /> </Provider>},
      { path: 'dashboard', element: <Provider template={AlertMUITemplate} {...alert_options}> <Dashboard /> </Provider> },
      { path: 'settings', element: <Provider template={AlertMUITemplate} {...alert_options}> <SettingsView /> </Provider>},
      { path: '*', element: <Navigate to="/404" /> }
    ]
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: 'home', element: <Provider template={AlertMUITemplate} {...alert_options}> <Home /> </Provider>
      },
      { path: '404', element: <Error err="404" /> },
      { path: 'VerifyEmail', element: < Error err="Verify" msj="Por favor verifica tu correo electronico, puedes volver dado click a la imagen." /> },
      { path: '/', element: <Navigate to="/app/dashboard" /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  }
];

export default routes;
