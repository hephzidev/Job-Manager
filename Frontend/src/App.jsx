import React from 'react'
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import Homepage from './Homepage'
import Signup from './Signup'
import Login from './Login'
import Addjob from './Addjob'
import Viewall from './Viewall.jsx'
import Edit from './Edit.jsx'
import Webpage from './Webpage.jsx'

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route element={<Homepage/>} path="/"/>
      <Route element={<Signup/>} path="/signup"/>
      <Route element={<Login/>} path="/login"/>
      <Route element={<Addjob/>} path="/addjob"/>
      <Route element={<Viewall/>} path="/viewall"/>
      <Route element={<Edit/>} path="/edit/:id"/>
      <Route element={<Webpage/>} path="/web"/>
    </Routes>
    </BrowserRouter>
  )
}

export default App