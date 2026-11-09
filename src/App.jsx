import { useEffect } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import TabBar from './components/TabBar.jsx'
import { LightsProvider } from './components/Lights.jsx'
import Home from './pages/Home.jsx'
import Weddings from './pages/Weddings.jsx'
import Wedding from './pages/Wedding.jsx'
import Films from './pages/Films.jsx'
import About from './pages/About.jsx'
import ServicesPage from './pages/ServicesPage.jsx'
import Inquire from './pages/Inquire.jsx'
import NotFound from './pages/NotFound.jsx'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

export default function App() {
  const { pathname } = useLocation()
  const dark = pathname.startsWith('/films')
  useEffect(() => {
    document.documentElement.dataset.room = dark ? 'dark' : 'light'
    document.querySelector('meta[name=theme-color]')?.setAttribute('content', dark ? '#000000' : '#ffffff')
  }, [dark])

  return (
    <LightsProvider>
      <ScrollToTop />
      <a className="skip" href="#main">Skip to content</a>
      <Header />
      <main id="main" key={pathname} className="page">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/weddings" element={<Weddings />} />
          <Route path="/weddings/:slug" element={<Wedding />} />
          <Route path="/films" element={<Films />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/packages" element={<Navigate to="/services" replace />} />
          <Route path="/inquire" element={<Inquire />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <TabBar />
    </LightsProvider>
  )
}
