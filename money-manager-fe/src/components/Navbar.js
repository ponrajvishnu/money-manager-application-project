import React from 'react'
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
function Navbar() {
    let navigate = useNavigate()
    let handleLogout = async()=>{
        sessionStorage.clear()
        navigate('/login')
    }
  return <>
    <div className='nav-buttons'>
        <Button variant='danger' onClick={()=>handleLogout()}>Logout</Button>
    </div>
  </>
}

export default Navbar