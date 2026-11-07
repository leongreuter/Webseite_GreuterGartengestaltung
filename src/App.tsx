import { Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import About from './pages/About'
import Contact from './pages/Contact'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import Services from './pages/Services'

export function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="ueber-uns" element={<About />} />
        <Route path="dienstleistungen" element={<Services />} />
        <Route path="kontakt" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
