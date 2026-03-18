import React from 'react'
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import Homepage from './Homepage'
import Signup from './Signup'
import Login from './Login'
import Addjob from './Addjob'
import Edit from './Edit.jsx'
import Boardpage from './Boardpage.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route element={<Homepage/>} path="/"/>
      <Route element={<Signup/>} path="/signup"/>
      <Route element={<Login/>} path="/login"/>
      <Route element={<Addjob/>} path="/addjob"/>
      <Route element={<Edit/>} path="/edit/:id"/>
      <Route element={<Boardpage/>} path="/board"/>
    </Routes>
    </BrowserRouter>
  )
}

export default App