import React from 'react'
import { Routes,Route, BrowserRouter } from 'react-router-dom'
import Layout from "./Layout.jsx";
import Home from './components/Home.jsx'
import Content from './pages/Content.jsx'
import Login from './auth/Login.jsx';
import Signup from './auth/Signup.jsx'


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
        <Route index element={<Home />} />
        <Route path='/content' element={<Content />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App