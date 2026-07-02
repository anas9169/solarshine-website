import { Route, Routes } from 'react-router-dom'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import StickyEarnButton from './components/StickyEarnButton'
import EarnWithUs from './pages/EarnWithUs'
import Home from './pages/Home'

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/earn" element={<EarnWithUs />} />
        </Routes>
      </main>
      <Footer />
      <StickyEarnButton />
    </>
  )
}

export default App
