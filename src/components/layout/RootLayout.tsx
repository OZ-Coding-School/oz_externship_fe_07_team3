import { Outlet } from 'react-router-dom'

function RootLayout() {
  return (
    <>
      <header>헤더</header>
      <main>
        <Outlet />
      </main>
      <footer>푸터</footer>
    </>
  )
}

export default RootLayout
