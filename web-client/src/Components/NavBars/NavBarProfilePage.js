import React, { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { SideBar } from './SideBar';
import './NavBarProfilePage.css';
import { IconContext } from 'react-icons';

export default function NavBarProfilePage({ onSidebarClick }) {
    const [sidebar, setSidebar] = useState(false);

    const showSidebar = () => setSidebar(!sidebar);

    function handleClick(item) {
        item.handleClick(onSidebarClick);
        showSidebar();
    }

    return (
        <>
            <IconContext.Provider value={{ color: 'white' }}>
                <div className='navBarProfilePage'>
                    <Link to='#' className='menu-bars'>
                        <FaIcons.FaBars onClick={showSidebar} />
                    </Link>
                </div>
                <nav className={sidebar ? 'nav-menu-sidebar active' : 'nav-menu-sidebar'}>
                    <ul className='nav-menu-sidebar-items' onClick={showSidebar}>
                        <li className='navbar-toggle'>
                            <Link to='#' className='menu-bars'>
                                <AiIcons.AiOutlineClose />
                            </Link>
                        </li>
                        {SideBar.map((item, index) => {
                            return (
                                <li key={index} className={item.cName} onClick={() => handleClick(item)}>
                                    <Link to={item.path}>
                                        {item.icon}
                                        <span>{item.title}</span>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>
            </IconContext.Provider>
        </>
    );
}
