import About from "./assets/pages/About"
import Registration from "./assets/pages/Registration"
import Home from "./assets/pages/Home"
import { Routes, Route } from "react-router-dom"
import Layout from "./assets/layout/Layout"
import ScrollToTop from "./assets/components/ScrollToTop"
import Login from "./assets/pages/login"
import TenantDashboard from "./assets/pages/TenantDashboard"
import ProtectedRoute from "./assets/routes/ProtectedRoute"

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
        </Route>

      </Routes>
    </>
  )
}

export default App