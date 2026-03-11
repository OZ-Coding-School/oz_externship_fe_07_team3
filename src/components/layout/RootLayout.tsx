import { Outlet } from 'react-router-dom'
import { Toaster } from '../ui/sonner'
import Header from './Header'
import Footer from './Footer'

function RootLayout() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
      <Toaster position="top-center" />
    </>
  )
}

export default RootLayout
