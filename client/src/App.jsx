import About from "./assets/pages/About"
import Registration from "./assets/pages/Registration"
import Home from "./assets/pages/Home"
import { Routes, Route } from "react-router-dom"
import Layout from "./assets/layout/Layout"
import ScrollToTop from "./assets/components/ScrollToTop"

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/about" element={<About />} />
        </Route>

      </Routes>
    </>
  )
}

export default App