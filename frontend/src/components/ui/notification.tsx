import React, { useState } from 'react';
import { TiGift, TiStar, TiUser, TiTick, TiTime } from 'react-icons/ti'; // Adjusted import
import '../../assets/css/header.css';
import '../../assets/css/style.css';
import { Link } from 'react-router-dom';

// Map icon names to React components
const iconMap = {
    'ti-gift': TiGift,
    'ti-discount-2': TiStar,
    'ti-user-check': TiUser,
    'ti-circle-check': TiTick,
    'ti-clock': TiTime, // Ensure this icon exists
};

const NotificationDropdown = ({ isOpen, toggleDropdown }) => {
    const initialNotifications = [
        { id: 1, color: 'primaries', avatarColor: 'bg-primary', icon: 'ti-gift', text1: 'Your Order Has Been Shipped', text2: 'Order No: 123456 Has Shipped To Your Delivery Address', class: '', class1: '' },
        { id: 2, color: 'secondaries', avatarColor: 'bg-secondary', icon: 'ti-discount-2', text1: 'Discount Available', text2: 'Discount Available On Selected Products', class: '', class1: '' },
        { id: 3, color: 'pinkes', avatarColor: 'bg-pink', icon: 'ti-user-check', text1: 'Account Has Been Verified', text2: 'Your Account Has Been Verified Successfully', class: '', class1: '' },
        { id: 4, color: 'warninges', avatarColor: 'bg-warning', icon: 'ti-circle-check', text1: 'Order Placed ', text2: 'Order Placed Successflly', class: 'text-warning', class1: ' ID: #1116773' },
        { id: 5, color: 'successes', avatarColor: 'bg-success', icon: 'ti-clock', text1: 'Order Delayed', text2: 'Order Delayed Unfortunately', class: 'text-success', class1: ' ID: 7731116' }
      ];

    const [notifications, setNotifications] = useState([...initialNotifications]);

    const handleNotificationClose = (e, index) => {
        e.stopPropagation(); // Prevents the event from reaching the button click event
        const updatedNotifications = notifications.filter((_, i) => i !== index);
        setNotifications(updatedNotifications);
    };

    return (
        <div>
            {isOpen && (
                <div>
                    {/* Click overlay to close dropdown */}
                    <div
                        onClick={toggleDropdown}
                        className="fixed inset-0 h-full w-full z-10"
                    ></div>

                    {/* Dropdown menu */}
                    <div
                        className="main-header-dropdown !-mt-3 !p-0 hs-dropdown-menu ti-dropdown-menu bg-white !w-[22rem] border-0 border-defaultborder !m-0 block absolute right-2 rounded-md shadow-lg overflow-hidden z-20"
                        aria-labelledby="dropdown-notification"
                        style={{
                            position: 'fixed',
                            inset: '0px 0px auto auto',
                            margin: '0px',
                            transform: 'translate3d(-125px, 70px, 0px)',
                        }}
                        data-popper-placement="bottom-end"
                    >
                        {/* Header */}
                        <div className="ti-dropdown-header !m-0 !p-4 !bg-transparent flex justify-between items-center">
                            <p className="mb-0 text-[1.0625rem] text-defaulttextcolor font-semibold dark:text-[#8c9097] dark:text-white/50">
                                Notifications
                            </p>
                            <span className="text-xs py-[0.25rem/2] px-[0.45rem] rounded-sm bg-cyan-50 text-[var(--secondaries)] bg-[var(--bg-secondary)]" id="notification-data">
                                {notifications.length} unread
                            </span>
                        </div>
                        <div className='dropdown-divider'></div>

                        {/* Notification items */}
                        <div className="pt-2">
                            {notifications.map((notification, index) => {
                                const Icon = iconMap[notification.icon]; // Get the icon component
                                return (
                                    <div key={notification.id} className={`flex items-center px-4 py-3 border-b hover:bg-gray-100 -mx-2`}>
                                        <span 
                                            className="inline-flex justify-center items-center w-[2.5rem] h-[2.5rem] leading-[2.5rem] text-[0.8rem] rounded-full" style={{backgroundColor: `var(--${notification.avatarColor})`}}
                                        >
                                            <Icon
                                                style={{ color: `var(--${notification.color})` }}
                                                className="text-[1.2rem]"
                                            />
                                        </span>
                                        <div className="flex-1 mx-2">
                                            <p className={`mb-0 text-defaulttextcolor dark:text-[#8c9097] dark:text-white/50 text-[0.8125rem] font-semibold ${notification.color}`}>
                                                <Link to="#" className="">
                                                    {notification.text1}
                                                </Link>
                                                <br /> {/* Line break to ensure text2 appears on a new line */}
                                                <span className="text-[#8c9097] dark:text-white/50 font-normal text-[0.75rem] header-notification-text">{notification.text2}</span>
                                                <br /> {/* Optional: Another line break if needed for spacing */}
                                                <span className={notification.class}>
                                                    {notification.class1}
                                                </span>
                                            </p>
                                        </div>

                                        <button
                                            onClick={(e) => handleNotificationClose(e, index)}
                                            className="text-gray-400 hover:text-gray-600 text-[1.3rem] font-normal"
                                            aria-label="Close notification"
                                        >
                                             &times;
                                        </button>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Footer */}
                        <div className={`p-4 empty-header-item1 `}>
                            <div className="grid">
                                <Link to='#' className="ti-btn ti-btn-primary-full !m-0 w-full p-2">View All</Link>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default NotificationDropdown;
