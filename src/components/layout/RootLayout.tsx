import { Outlet } from 'react-router-dom'
import { Toaster } from '../ui/sonner'

function RootLayout() {
  return (
    <>
      <header>헤더</header>
      <main>
        <Outlet />
      </main>
      <footer>푸터</footer>
      <Toaster position="top-center" />
    </>
  )
}

export default RootLayout
