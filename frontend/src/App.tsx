
import { useState } from 'react';
import { Outlet, Route, RouterProvider, createBrowserRouter, createRoutesFromElements, Routes, Navigate } from 'react-router-dom'
import { FrappeProvider } from 'frappe-react-sdk';
import '@radix-ui/themes/styles.css';
import { Theme } from '@radix-ui/themes';
import Header from './components/common/header';
import Sidebar from './components/common/sidebar';
import Login from './pages/auth/Login';
import CusromerProducts from './pages/customer/CustomerProduct.tsx'
import PrivateRoutes from './routes/private-routes';
import AdminProfile from './pages/admin/admindashboards/AdminProfile';
import AdminDashboard from './pages/admin/admindashboards/AdminDashboard.tsx';
import ProductMaster from './pages/admin/productdashboards/ProductMaster.tsx';
import ProductQRHistory from './pages/admin/productdashboards/ProductQRHistory.tsx';
import DownloadQRCode from './pages/admin/productdashboards/DownloadQR.tsx';
import CarpenterRegistration from './pages/admin/carpenterdashboard/CarpenterRegistration.tsx';
import CarpenterDetails from './pages/admin/carpenterdashboard/CarpenterDetails.tsx';
import CarpenterRewardRequest from './pages/admin/rewardrequest/RewardRequest.tsx';
import RedeemptionHistory from './pages/admin/rewardrequest/RedeemptionHistory.tsx';
import AdminAnnouncement from './pages/admin/announcement/AnnouncementDashboard.tsx';
import TransactionHistory from './pages/admin/transactions/TransactionHistroy.tsx';
import FAQDashboard from './pages/admin/faq/FAQDashboard.tsx';
import AddUserDashboard from './pages/admin/admindashboards/AddUser.tsx';
import SetRewardPoint from './pages/admin/setrewardpoint/SetRewardPoint.tsx';
import CarpenterDashboard from './pages/carpenter/CarpenterDashboard.tsx';
import CarpenterBankingHistory from './pages/carpenter/BankingHistory.tsx'
import PointHistory from './pages/carpenter/PointHistory.tsx';
import QRCodeScanner from './pages/carpenter/QRScanner.tsx'
import RedeemRequest from './pages/carpenter/RewardRequest.tsx';
import HelpAndSupport from './pages/carpenter/HelpAndSupport.tsx';


function App() {
  const [isSidebarActive, setIsSidebarActive] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarActive(!isSidebarActive);
    
  };

  const getSiteName = () => {
    // @ts-ignore
    if (window.frappe?.boot?.versions?.frappe && (window.frappe.boot.versions.frappe.startsWith('15') || window.frappe.boot.versions.frappe.startsWith('16'))) {
      // @ts-ignore
      return window.frappe?.boot?.sitename ?? import.meta.env.VITE_SITE_NAME
    }
    return import.meta.env.VITE_SITE_NAME

  }

  const AppLayout = () => (
    <>
      <div className={`page layout ${isSidebarActive ? 'sidebar-narrow' : 'sidebar-wide'}`}>
              <Header toggleSidebar={toggleSidebar} isSidebarActive={isSidebarActive} />
              <Sidebar isSidebarActive={isSidebarActive} />
              <div className='content main-index' style={{ marginInlineStart: isSidebarActive ? '5rem' : '15rem' }}>
                <div className='main-content bg-body-bg'>
                  <Outlet />
                </div>
              </div>
            </div>
    </>
  );

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path='/' element={<Login />} />
        <Route path='/customer-product' element={<CusromerProducts />} />
        <Route element={<AppLayout/>}>
        <Route path='/' element={<PrivateRoutes/>}>
          <Route path='/admin-profile' element={<AdminProfile />} />
          <Route path='/admin-dashboard' element={<AdminDashboard />} />
          <Route path='/product-master' element={<ProductMaster />} />
          <Route path='/product-qr-history' element={<ProductQRHistory />} />
          <Route path='/download-qr-code' element={<DownloadQRCode />} />
          <Route path='/carpenter-registration' element={<CarpenterRegistration />} />
          <Route path='/carpenter-details' element={<CarpenterDetails/>} />
          <Route path='/redeem-request' element={<CarpenterRewardRequest />} />
          <Route path='/redeem-history' element={<RedeemptionHistory />} />
          <Route path='/announcement' element={<AdminAnnouncement />} />
          <Route path='/transaction-history' element={<TransactionHistory />} />
          <Route path='/frequently-asked-questions' element={<FAQDashboard />} />
          <Route path='/add-user' element={<AddUserDashboard />} />
          <Route path='/set-reward-points' element={<SetRewardPoint/>} />
          <Route path='/carpenter-dashboard' element={<CarpenterDashboard/>} />
          <Route path='/banking-history' element={<CarpenterBankingHistory/>} />
          <Route path='/point-history' element={<PointHistory/>} />
          <Route path='/qr-scanner' element={<QRCodeScanner/>} />
          <Route path='/redeem-request' element={<RedeemRequest/>} />
          <Route path='/help-and-support' element={<HelpAndSupport/>} />
          <Route path='*' element={<Navigate to="/" replace />} />
        </Route>
        </Route>
        
      </>
    ), {
    // basename: `/${import.meta.env.VITE_BASE_NAME}` ?? '',
    basename: '/rewards',
  }
  )
  


  return (
    <div className="App">
      <Theme appearance="light" accentColor="iris" panelBackground="translucent">
        <FrappeProvider
        enableSocket={false}
          socketPort={import.meta.env.VITE_SOCKET_PORT}
          siteName={getSiteName()}
        >
          <RouterProvider router={router} />
        </FrappeProvider>
      </Theme>
    </div>
  );
}

export default App;
