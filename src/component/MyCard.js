import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useFirebase } from '../context/Firebase';
import {useNavigate} from 'react-router-dom'



const MyCard = (props) => {
    const [url,setUrl]=useState(null)
    const firebase=useFirebase();
    const navigate=useNavigate()
    useEffect(()=>{
        firebase.getImageUrl(props.imageURL).then(url=>setUrl(url))
    },[])
    const detailspage=()=>{
        navigate(props.link)
    }
  return (
    <div className='container' >
        <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={url} style={{height:'200px'}} />
      <Card.Body>
        <Card.Title>{props.title}</Card.Title>
        <Card.Text>
          This Book is has a title {props.bookName} and this book is sold by {props.displayName} and this books cost {props.price}
        </Card.Text>
        <Button variant="primary" onClick={detailspage}>view</Button>
      </Card.Body>
    </Card>
    </div>
  )
}

export default MyCard