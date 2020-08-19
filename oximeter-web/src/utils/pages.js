import {
    Activity as AcivityIcon,
    Settings as SettingsIcon,
    User as UserIcon,
  } from 'react-feather';

const items = [
    {
      href: '/app/dashboard',
      icon: AcivityIcon,
      title: 'Inicio'
    },
    {
      href: '/app/account',
      icon: UserIcon,
      title: 'Cuenta'
    },
    {
      href: '/app/settings',
      icon: SettingsIcon,
      title: 'Settings'
    }
  ];

  export default items;