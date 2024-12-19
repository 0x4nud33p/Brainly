import React from 'react'
import { Routes,Route, BrowserRouter } from 'react-router-dom'
import Layout from "./Layout.jsx";
import {SidebarProvider} from "./components/ui/sidebar.jsx";
import {
  Home,
  Content,
  Signup,
  Login,
  PublicCollection,
  InstaLinks,
  TwitterLinks,
  YTlinks
} from "../Export.js"


function App() {

  return (
    <SidebarProvider>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
        <Route index element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/content' element={<Content />} />
        <Route path='/instacollection' element={<InstaLinks />} />
        <Route path='/xcollection' element={<TwitterLinks />} />
        <Route path='/ytcollection' element={<YTlinks />} />
        <Route path='/content/:id' element={<PublicCollection />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </SidebarProvider>
  )
}

export default App