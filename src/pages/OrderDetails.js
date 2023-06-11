import React, { useEffect,useState } from 'react'
import {useParams} from 'react-router-dom'
import { useFirebase } from '../context/Firebase';

const OrderDetails = () => {
    const params=useParams();
    const [orders,setOrders]=useState([])
    console.log()
    const firebase=useFirebase()
    useEffect(()=>{
        firebase.getOrderDetails(params.orderid).then((order)=>setOrders(order.docs))
    },[])
  return (
    <div>
        <h1>Order Details</h1>
        {orders.map((order)=>{
            return (
                <div className='mt-5' key={order.id} style={{border:'1px solid',background:'grey'}}>
                   <h5> Order By :{ order.data().displayName}</h5>
                   <h6>Quantity: {order.data().qty}</h6>
                   <p>Email:{order.data().userEmail}</p>

                </div>
            )
        })}
    </div>
  )
}

export default OrderDetails