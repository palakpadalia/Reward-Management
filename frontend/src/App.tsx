
import { Fragment, useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { FrappeProvider } from 'frappe-react-sdk';
import '@radix-ui/themes/styles.css';
import { Theme } from '@radix-ui/themes';
import Header from './components/common/header';
import Sidebar from './components/common/sidebar';

function App() {
  const location = useLocation();
  const [isSidebarActive, setIsSidebarActive] = useState(false);

  const toggleSidebar = () => {
   
    setIsSidebarActive(!isSidebarActive);
    
  };
 

  useEffect(() => {
    console.log(`Route changed to: ${location.pathname}`);
    // Implement your logic based on route changes
  }, [location.pathname]);

  const getSiteName = () => {
    if (window.frappe?.boot?.versions?.frappe &&
        (window.frappe.boot.versions.frappe.startsWith('15') ||
         window.frappe.boot.versions.frappe.startsWith('16'))) {
      return window.frappe?.boot?.sitename ?? import.meta.env.VITE_SITE_NAME;
    }
    return import.meta.env.VITE_SITE_NAME;
  };

  return (
    <div className="App">
      <Theme appearance="light" accentColor="iris" panelBackground="translucent">
        <FrappeProvider
          socketPort={import.meta.env.VITE_SOCKET_PORT}
          siteName={getSiteName()}
        >
          <div className={`page layout ${isSidebarActive ? 'sidebar-narrow' : 'sidebar-wide'}`}>
            <Header toggleSidebar={toggleSidebar} isSidebarActive={isSidebarActive} />
            <Sidebar isSidebarActive={isSidebarActive} />
            <div className='content main-index' style={{ marginInlineStart: isSidebarActive ? '5rem' : '15rem' }}>
              <div className='main-content bg-body-bg'>
                <Outlet />
              </div>
            </div>
          </div>
        </FrappeProvider>
      </Theme>
    </div>
  );
}

export default App;
