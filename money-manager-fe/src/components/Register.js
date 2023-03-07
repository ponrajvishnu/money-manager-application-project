import React,{useState} from 'react'
import {url} from '../App'
import Button from 'react-bootstrap/Button';
import { toast } from 'react-toastify';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';

function Register() {
    let [firstName,setFirstname] = useState('')
    let [lastName,setLastname] = useState('')
    let [email,setEmail] = useState('')
    let [password,setPassword] = useState('')

    let navigate = useNavigate()

    let handleRegister = async () => {
        try {
            let res = await axios.post(`${url}/users/signup`,{firstName,lastName,email,password})
            if(res.status===201){
                console.log(res)
                toast.success(res.data.message)
                navigate('/login')
            }
            
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }

  return <div  className='container-fluid'>
    <h3 className="text-center">Registration</h3>
    <Form>
      <Form.Group className="mb-3">
        <Form.Label>First Name</Form.Label>
        <Form.Control type="input" placeholder="Enter Firstname" onChange={(e)=>setFirstname(e.target.value)}/>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Last Name</Form.Label>
        <Form.Control type="input" placeholder="Enter Lastname" onChange={(e)=>setLastname(e.target.value)}/>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" onChange={(e)=>setEmail(e.target.value)}/>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)}/>
      </Form.Group>
      <Button variant="primary" onClick={()=> handleRegister()}>
        Register
      </Button>
    </Form>
  </div>
}

export default Register
