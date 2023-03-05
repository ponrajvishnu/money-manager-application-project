import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import EditMoneyManage from "./components/EditMoneyManage";
export const url = 'http://localhost:8000'

function App() {
  return <>
  <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login/>}/>
      <Route path='/dashboard' element ={<Dashboard/>}/>
      <Route path='/edit-manage/:id' element={<EditMoneyManage />} />
      <Route path='*' element={<Navigate to='/login'/>}/>
    </Routes>
  </BrowserRouter>
  </>
}

export default App;