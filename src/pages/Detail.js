import React, { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'
import { useFirebase } from '../context/Firebase'
import {Button} from 'react-bootstrap'
import Form from "react-bootstrap/Form";
import {useNavigate} from 'react-router-dom'


const Detail = () => {
    const params=useParams()
    const firebase=useFirebase();
    const [data,setData]=useState(null);
    const [url,setUrl]=useState();
    const [qty,setQty]=useState(1);
    const navigate=useNavigate();
    //console.log(params)
    useEffect(()=>{
        firebase.getBookById(params.bookid).then((result)=>setData(result.data()))
        console.log(data)
    },[])
    useEffect(()=>{
        if(data)
        {
            firebase.getImageUrl(data.imageURL).then((url)=>setUrl(url))
        }
    },[data])

    const placeOrder=async ()=>{
        const result=await firebase.placeOrders(params.bookid,qty);
        if(result) 
        {
            alert('Book added Succesfully')
        }
        navigate('/')
    }
    if(data == null) return <h1>Loading...</h1>
  return (
    <div className='container mt-5'>
        <h1 style={{color:'blueviolet'}}>{data.bookName}</h1>
        <img src={url} alt='' width='200px'></img>
        <div style={{border:'1px solid',width:'300px'}}>
        <h2>Details</h2>
        <hr></hr>
        <p>Price si Rs {data.price}</p>
        <p>IsBN Number : {data.isbn}</p>
        </div>
        <div style={{border:'1px solid',width:'300px'}}>
        <h2>Owner Details</h2>
        <hr></hr>
        <p>Name :{data.displayName}</p>
        <p>Email : {data.userEmail}</p>
        </div>
        <div>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Quantity</Form.Label>
          <Form.Control type="number" placeholder="Enter quantity" onChange={(e)=>setQty(e.target.value)} value={qty}/>
        </Form.Group>
        <Button onClick={placeOrder}>BuyNow</Button>
        </div>
    </div>
  )
}

export default Detail