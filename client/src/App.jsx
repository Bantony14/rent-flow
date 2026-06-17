import About from "./assets/pages/About"
import Registration from "./assets/pages/AdminPages/Registration"
import Home from "./assets/pages/Home"
import { Routes, Route } from "react-router-dom"
import Layout from "./assets/layout/Layout"
import ScrollToTop from "./assets/components/ScrollToTop"
import Login from "./assets/pages/login"
import TenantDashboard from "./assets/pages/TenantPages/TenantDashboard"
import ProtectedRoute from "./assets/routes/ProtectedRoute"
import AdminDashboard from "./assets/pages/AdminPages/AdminDashboard"
import AllTenants from "./assets/pages/AdminPages/AllTenants"
import UserInfoCard from "./assets/pages/AdminPages/UserInfo"
import PaymentSuccess from "./assets/components/paymentPage/PaymentSuccess.jsx"
import PaymentFailed from "./assets/components/paymentPage/PaymentFailed"

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/tenant/dashboard" element={<ProtectedRoute><TenantDashboard /></ProtectedRoute>} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/all-tenants" element={<AllTenants />} />
          <Route path="/view-tenant-detail/:tenantid" element={<UserInfoCard />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
          <Route path="/payment-failed" element={<PaymentFailed />} />

        </Route>


      </Routes>
    </>
  )
}

export default App