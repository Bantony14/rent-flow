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
          <Route path="/tenantdashboard" element={<ProtectedRoute><TenantDashboard /></ProtectedRoute>} />
          <Route path="/admindashboard" element={<AdminDashboard />} />
          <Route path="/alltenants" element={<AllTenants />} />
          <Route path="/viewtenantdetail/:tenantid" element={<UserInfoCard />} />
        </Route>

      </Routes>
    </>
  )
}

export default App