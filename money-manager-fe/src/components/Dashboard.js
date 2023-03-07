import React,{useState,useEffect} from 'react'
import {url} from '../App'
import Button from 'react-bootstrap/Button';
import { toast } from 'react-toastify';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import Navbar from './Navbar'
import Card from 'react-bootstrap/Card';
import Popup from './Popup';
import Form from 'react-bootstrap/Form';
import TableFilter from 'react-table-filter';

function Dashboard() {
    let token = sessionStorage.getItem('token')
    let [manages,setManages] = useState([])
    let [types,setTypes] = useState([])
    let [selectedStatus,setSelectedStatus] = useState("")

    let [type,setType] = useState('')
    let [categories,setCategories] = useState('')
    let [division,setDivision] = useState('')
    let [datetime,setDateTime] = useState('')
    let [description,setDesc] = useState('')
    
    let navigate = useNavigate();

    const [isOpen, setIsOpen] = useState();
 
    const togglePopup = () => {
        setIsOpen(!isOpen);
    }

    let getData = async()=>{
        try {
            let res = await axios.get(`${url}/dashboard`,{
                headers:{
                    authorization:`Bearer ${token}`
                }
            })
            if(res.status===200)
            {
                setTypes(res.data.MoneyManages)
            }
        } catch (error) {
            toast.error(error.response.data.message)
            if(error.response.status===401)
                handleLogout()
        }
    }

    let loadStatusData = async(status)=>{
        try {
            setSelectedStatus(status)
            let res = await axios.get(`${url}/dashboard-list-items/${status}`,{
                headers:{
                    authorization:`Bearer ${token}`
                }
            })
            if(res.status===200)
            {
                setManages(res.data.manages)
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
            getData()
        else
            handleLogout()
    },[])

    let onAddManage = async () => {
        try {
            let res = await axios.post(`${url}/add-manage`,{type,categories,division,datetime,description},{
                headers:{
                    authorization:`Bearer ${token}`
                }
            })
            if(res.status===201){
                console.log(res)
                toast.success(res.data.message)
                navigate('/dashboard')
                setTimeout(() => {
                    window.location.reload();
                }, 3000);
            }
            
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }

  return <div className='container-fluid wrapper'>
    <Navbar/>
    <div><h1 class="text-center">Income & Expenditure List</h1></div>
    <div className='nav-buttons'>
        
    <input type="button" value="Add Income / Expense" className="btn btn-success" onClick={togglePopup} />
    {isOpen && <Popup
      content={<>
        <h3 class="text-center">Add Income / Expenditure</h3>
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
            <Button variant="primary"onClick={() => onAddManage()}>Submit</Button>
        </Form>
      </>}
      handleClose={togglePopup}
    />}
    </div>
    <div className='card-wrapper'>
    {
        types.map((e,i)=>{
            return <Card style={{ width: '15rem', cursor:"pointer" }} onClick={()=>{loadStatusData(e._id)}}>
                        <Card.Body>
                        <Card.Title style={{textAlign:"center",fontSize:"25px"}}>{e._id} ({e.count})</Card.Title>
                        </Card.Body>
                    </Card>
        })
    }
    </div>
    <div className='table-wrapper'>
        <Table table table-striped table-bordered table-hover>
        <thead>
            <tr>
                <th>#</th>
                <th>Type</th>
                <th>Division</th>
                <th>Categories</th>
                <th>Datetime</th>
                <th>Created At</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
            {
                manages.map((e,i)=>{
                    const HOUR = 12000 * 60 * 60;
                    const datediff = Date.now() - HOUR;
                    console.log(datediff+'-'+Date.parse(e.createdAt))
                    return <tr key={i} style={{cursor:"pointer"}}>
                        <td>{i+1}</td>
                        <td>{e.type}</td>
                        <td>{e.division}</td>
                        <td>{e.categories}</td>
                        <td>{new Date(e.datetime).toLocaleDateString('en-UK')}</td>
                        <td>{new Date(e.createdAt).toLocaleDateString('en-UK')}</td>
                        {(Date.parse(e.createdAt) > datediff) ? <td><Button variant='primary' onClick={()=>navigate(`/edit-manage/${e._id}`)}><i className="fas fa-pen-to-square"></i>Edit</Button></td> : <td><Button variant='primary' disabled><i className="fas fa-pen-to-square"></i>Edit</Button></td> }
                    </tr>
                })
            }
            
        </tbody>
        </Table>
    </div>
  </div>
}

export default Dashboard