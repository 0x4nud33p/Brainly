import React from 'react'
import { Routes,Route, BrowserRouter } from 'react-router-dom'
import Layout from "./Layout.jsx";
import Home from './components/Home.jsx'
import Content from './pages/Content.jsx'
import Login from './auth/Login.jsx';
import Signup from './auth/Signup.jsx'
import PublicCollection from './pages/PublicCollection.jsx';
import {SidebarProvider} from "./components/ui/sidebar.jsx";


function App() {

  return (
    <SidebarProvider>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
        <Route index element={<Home />} />
        <Route path='/content' element={<Content />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/content/:id' element={<PublicCollection />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </SidebarProvider>
  )
}

export default App