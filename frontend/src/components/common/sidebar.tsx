import React, { useState, useEffect } from 'react';
import '../../assets/css/style.css';
import '../../assets/css/sidebar.css';

import sidebarLogo from '../../assets/images/Sanskar_Technolab_Logo-light.png';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { SidebarData } from '@/components/common/sidebar/sidebardata';
import SubMenu from '@/components/common/sidebar/submenu';
import { Link } from 'react-router-dom';

console.log(SidebarData);

const Sidebar = ({ isSidebarActive }) => {
    // State to manage hover state
    const [isHover, setIsHover] = useState(false);

    // Retrieve roles from localStorage
    const storedRoles = localStorage.getItem('user_roles');
    const carpenterrole = localStorage.getItem('carpenterrole');
    console.log(carpenterrole);
    const roles = storedRoles ? JSON.parse(storedRoles) : [];
    console.log("Roles from localStorage:", roles);

    // Function to get the index of a specific item by title
    const getItemIndex = (title) => SidebarData.findIndex(item => item.title === title);

    // Determine which items to render based on roles
    const determineItemsToRender = () => {
        if (roles.includes("Administrator")) {
            const addUserIndex = getItemIndex('Add User');
            return addUserIndex !== -1 ? SidebarData.slice(0, addUserIndex + 1) : SidebarData;
        } else if (roles.includes("Admin")) {
            const faqIndex = getItemIndex("FAQ's");
            return faqIndex !== -1 ? SidebarData.slice(0, faqIndex + 1) : SidebarData;
        } else if (carpenterrole === "Customer") {
            const startIndex = getItemIndex('Dashboard');
            const endIndex = getItemIndex('Help & Support');
            return startIndex !== -1 && endIndex !== -1 ? SidebarData.slice(startIndex, endIndex + 1) : [];
        } else {
            return SidebarData;
        }
    };

    const itemsToRender = determineItemsToRender();
    console.log("itemsToRender---------------------------------->",itemsToRender);

    useEffect(() => {
        // Effect to handle cleanup of event listeners
        const sidebar = document.querySelector('.side-menu');

        const handleMouseOver = () => setIsHover(true);
        const handleMouseOut = () => setIsHover(false);

        if (sidebar) {
            sidebar.addEventListener('mouseover', handleMouseOver);
            sidebar.addEventListener('mouseout', handleMouseOut);
        }

        return () => {
            if (sidebar) {
                sidebar.removeEventListener('mouseover', handleMouseOver);
                sidebar.removeEventListener('mouseout', handleMouseOut);
            }
        };
    }, []);

    return (
        <div className={`side-menu ${isSidebarActive ? (isHover ? 'wide' : 'narrow') : 'wide'} text-white`}>
            <div className="main-sidebar-header">
                <img 
                    src={sidebarLogo} 
                    alt="logo" 
                    className={`transition-all duration-300 ${isSidebarActive ?  (isHover ? 'w-32' : 'w-16') : 'w-32'}`} 
                />
            </div>
            <div className='main-sidebar'>
    <ul>
        {itemsToRender.map((item, index) => (
            item.subNav ? (
                <SubMenu 
                    item={item} 
                    key={index} 
                    isSidebarActive={isSidebarActive} 
                    isHover={isHover} 
                />
            ) : (
                <li className='sidebar-menu-item' key={index}>
                    {item.path ? (
                        <Link to={item.path} className="flex items-center">
                            {item.icon}
                            <span className="menu-text">{item.title}</span>
                        </Link>
                    ) : (
                        <div className="flex items-center cursor-default">
                            {item.icon}
                            <span className="menu-text">{item.title}</span>
                        </div>
                    )}
                </li>
            )
        ))}
    </ul>
</div>

        </div>
    );
};

export default Sidebar;
