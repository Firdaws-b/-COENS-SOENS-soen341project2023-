import React from "react";
import * as CgIcons from 'react-icons/cg';
import * as RxIcons from 'react-icons/rx';
import * as CiIcons from 'react-icons/ci';
import * as FiIcons from 'react-icons/fi';

export const SideBar = [
    {
        title: 'My Job Feed',
        path: '/home',
        icon: <CgIcons.CgWorkAlt />,
        cName: 'nav-text',
        //handleClick: (onSidebarClick) => onSidebarClick('My Job Feed'),
    },
    {
        title: 'My Profile',
        path: '/MyProfile',
        icon: <CgIcons.CgProfile />,
        cName: 'nav-text',
        //handleClick: (onSidebarClick) => onSidebarClick('My Profile')      
    },
    {
        title: 'Home',
        path: '/home',
        icon: <RxIcons.RxDashboard />,
        cName: 'nav-text',
        //handleClick: (onSidebarClick) => onSidebarClick('Home')
    },
    {
        title: 'Saved Jobs',
        path: '/home',
        icon: <CiIcons.CiSaveDown2 />,
        cName: 'nav-text',
        //handleClick: (onSidebarClick) => onSidebarClick('Saved Jobs')
    },
    {
        title: 'Settings',
        path: '/home',
        icon: <FiIcons.FiSettings />,
        cName: 'nav-text',
        //handleClick: (onSidebarClick) => onSidebarClick('Settings')
    },
];