import React, {useState, useEffect} from 'react'
import {url} from '../App'
import Button from 'react-bootstrap/Button';
import { toast } from 'react-toastify';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import { useParams } from 'react-router-dom';

function EditMoneyManage() {
    let {id} = useParams();

    let navigate = useNavigate();

    let token = sessionStorage.getItem('token')
    let [types,setTypes] = useState([])
    let [selectedStatus,setSelectedStatus] = useState("")

    let [type,setType] = useState('')
    let [categories,setCategories] = useState('')
    let [division,setDivision] = useState('')
    let [datetime,setDateTime] = useState('')
    let [description,setDesc] = useState('')

    let getData = async(id)=>{
        try {
            let res = await axios.get(`${url}/dashboard-edit/${id}`,{
                headers:{
                    authorization:`Bearer ${token}`
                }
            })
            if(res.status===200)
            {
                setType(res.data.manages.type)
                setDesc(res.data.manages.description)
            }
        } catch (error) {
            toast.error(error.response.data.message)
            if(error.response.status===401)
                handleLogout()
        }
    }

    let handleLogout = async()=>{
        sessionStorage.clear()
        navigate('/login')
    }

    useEffect(()=>{
        if(token)
            if(id){
                getData(id);
            }
        else
            handleLogout()
    },[])

    let onEditManage = () => {

    }

  return <div className='container-fluid'>
    <h1>Edit Money Manage</h1>
    <Form>
        <Form.Group className="mb-3">
            <Form.Label>Type</Form.Label>
            <Form.Select aria-label="Type" onChange={(e) => setType(e.target.value)}>
                <option value="">Please Select</option>
                <option value="Income">Income</option>
                <option value="Expense">Expense</option>
            </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3">
            <Form.Label>Categories</Form.Label>
            <Form.Select aria-label="Categories" onChange={(e) => setCategories(e.target.value)}>
                <option value="">Please Select</option>
                <option value="Rent">Rent</option>
                <option value="Loan">Loan</option>
                <option value="Salary">Salary</option>
                <option value="Food">Food</option>
                <option value="Fuel">Fuel</option>
                <option value="Loan">Loan</option>
                <option value="Medical">Medical</option>
            </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3">
            <Form.Label>Division</Form.Label>
            <Form.Select aria-label="Division" onChange={(e) => setDivision(e.target.value)}>
                <option value="">Please Select</option>
                <option value="Personal">Personal</option>
                <option value="Office">Office</option>
            </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3">
            <Form.Label>Date</Form.Label>
            <Form.Control type="date" placeholder="" onChange={(e) => setDateTime(e.target.value)}/>
        </Form.Group>
        <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" rows={3} placeholder="Enter Description" onChange={(e) => setDesc(e.target.value)}/>
        </Form.Group>
        <Button variant="primary"onClick={() => onEditManage()}>Submit</Button>
    </Form>
  </div>
}

export default EditMoneyManage
