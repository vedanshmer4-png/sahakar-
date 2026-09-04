import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/Layout';
import RoleRoute from './components/RoleRoute';

// 1. Public Portal Pages
import Home from './pages/public/Home';
import HowItWorks from './pages/public/HowItWorks';
import ServicesDirectory from './pages/public/ServicesDirectory';
import AboutModel from './pages/public/AboutModel';
import ForCooperatives from './pages/public/ForCooperatives';
import Onboarding from './pages/public/Onboarding';
import AuthPage from './pages/public/AuthPage';

// 2. Customer Portal Pages
import CustomerBook from './pages/customer/CustomerBook';
import CustomerSearch from './pages/customer/CustomerSearch';
import CustomerBookings from './pages/customer/CustomerBookings';
import CustomerEmergency from './pages/customer/CustomerEmergency';
import CustomerInvoices from './pages/customer/CustomerInvoices';
import CustomerRatings from './pages/customer/CustomerRatings';
import CustomerProfile from './pages/customer/CustomerProfile';

// 3. Worker Portal Pages
import WorkerDashboard from './pages/worker/WorkerDashboard';
import WorkerJobs from './pages/worker/WorkerJobs';
import WorkerSchedule from './pages/worker/WorkerSchedule';
import WorkerSkills from './pages/worker/WorkerSkills';
import WorkerPassport from './pages/worker/WorkerPassport';
import WorkerEarnings from './pages/worker/WorkerEarnings';
import WorkerWelfare from './pages/worker/WorkerWelfare';
import WorkerMarketplace from './pages/worker/WorkerMarketplace';
import WorkerGovernance from './pages/worker/WorkerGovernance';
import WorkerProfile from './pages/worker/WorkerProfile';

// 4. Federation Admin Portal Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminWorkersQueue from './pages/admin/AdminWorkersQueue';
import AdminCertifications from './pages/admin/AdminCertifications';
import AdminDisputes from './pages/admin/AdminDisputes';
import AdminCustomerRisk from './pages/admin/AdminCustomerRisk';
import AdminForecasting from './pages/admin/AdminForecasting';
import AdminPricing from './pages/admin/AdminPricing';
import AdminReports from './pages/admin/AdminReports';

// 5. District Council Portal Pages
import CouncilDashboard from './pages/council/CouncilDashboard';
import CouncilProposals from './pages/council/CouncilProposals';
import CouncilMembers from './pages/council/CouncilMembers';
import CouncilDecisions from './pages/council/CouncilDecisions';
import CouncilSettings from './pages/council/CouncilSettings';

export default function App() {
  return (
    <AuthProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            {/* Public Accessible Routes */}
            <Route index element={<Home />} />
            <Route path="how-it-works" element={<HowItWorks />} />
            <Route path="services" element={<ServicesDirectory />} />
            <Route path="about" element={<AboutModel />} />
            <Route path="for-cooperatives" element={<ForCooperatives />} />
            <Route path="onboarding" element={<Onboarding />} />
            
            {/* All Auth, Google Sign In & Sign Up Routes */}
            <Route path="auth" element={<AuthPage />} />
            <Route path="login" element={<AuthPage />} />
            <Route path="signin" element={<AuthPage />} />
            <Route path="register" element={<AuthPage />} />
            <Route path="signup" element={<AuthPage />} />
            <Route path="auth/google" element={<AuthPage />} />
            <Route path="auth/callback" element={<AuthPage />} />

            {/* Customer Portal Routes */}
            <Route element={<RoleRoute allowedRoles={['Customer', 'Federation Admin', 'District Council Member', 'Worker']} />}>
              <Route path="customer/book" element={<CustomerBook />} />
              <Route path="customer/search" element={<CustomerSearch />} />
              <Route path="customer/bookings" element={<CustomerBookings />} />
              <Route path="customer/emergency" element={<CustomerEmergency />} />
              <Route path="customer/invoices" element={<CustomerInvoices />} />
              <Route path="customer/ratings" element={<CustomerRatings />} />
              <Route path="customer/profile" element={<CustomerProfile />} />
            </Route>

            {/* Worker Portal Routes */}
            <Route element={<RoleRoute allowedRoles={['Worker', 'Federation Admin']} />}>
              <Route path="worker/dashboard" element={<WorkerDashboard />} />
              <Route path="worker/jobs" element={<WorkerJobs />} />
              <Route path="worker/schedule" element={<WorkerSchedule />} />
              <Route path="worker/skills" element={<WorkerSkills />} />
              <Route path="worker/passport" element={<WorkerPassport />} />
              <Route path="worker/earnings" element={<WorkerEarnings />} />
              <Route path="worker/welfare" element={<WorkerWelfare />} />
              <Route path="worker/marketplace" element={<WorkerMarketplace />} />
              <Route path="worker/governance" element={<WorkerGovernance />} />
              <Route path="worker/profile" element={<WorkerProfile />} />
            </Route>

            {/* Federation Admin Portal Routes */}
            <Route element={<RoleRoute allowedRoles={['Federation Admin']} />}>
              <Route path="admin/dashboard" element={<AdminDashboard />} />
              <Route path="admin/workers" element={<AdminWorkersQueue />} />
              <Route path="admin/certifications" element={<AdminCertifications />} />
              <Route path="admin/disputes" element={<AdminDisputes />} />
              <Route path="admin/customer-risk" element={<AdminCustomerRisk />} />
              <Route path="admin/forecasting" element={<AdminForecasting />} />
              <Route path="admin/pricing" element={<AdminPricing />} />
              <Route path="admin/reports" element={<AdminReports />} />
            </Route>

            {/* District Council Portal Routes */}
            <Route element={<RoleRoute allowedRoles={['District Council Member', 'Federation Admin']} />}>
              <Route path="council/dashboard" element={<CouncilDashboard />} />
              <Route path="council/proposals" element={<CouncilProposals />} />
              <Route path="council/members" element={<CouncilMembers />} />
              <Route path="council/decisions" element={<CouncilDecisions />} />
              <Route path="council/settings" element={<CouncilSettings />} />
            </Route>

            {/* Compatibility Aliases */}
            <Route path="dashboard" element={<Navigate to="/worker/dashboard" replace />} />
            <Route path="passport" element={<Navigate to="/worker/passport" replace />} />
            <Route path="jobs" element={<Navigate to="/worker/jobs" replace />} />
            <Route path="community" element={<Navigate to="/worker/marketplace" replace />} />
            <Route path="governance" element={<Navigate to="/worker/governance" replace />} />
            <Route path="welfare" element={<Navigate to="/worker/welfare" replace />} />
            <Route path="customer" element={<Navigate to="/customer/book" replace />} />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </HashRouter>
    </AuthProvider>
  );
}
