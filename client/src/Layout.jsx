import React from 'react'
import { Outlet } from 'react-router-dom'
import Nav from './components/Nav.jsx'
import Footer from "./components/Footer.jsx"

function Layout() {
  return (
    <>
    <Nav />
    <Outlet />
    <Footer />
    </>
  )
}

export default Layout