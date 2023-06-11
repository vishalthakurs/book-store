import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useFirebase } from '../context/Firebase';

const ListingPage = () => {
  const [bookName,setBookName]=useState('');
  const [isbn,setIsbn]=useState('');
  const [price,setprice]=useState('');
  const [coverPic,setCoverPic]=useState('');
  const firebase=useFirebase()
  const handlebook=(e)=>{
    e.preventDefault();
    firebase.handleCreateNewListing(bookName,isbn,price,coverPic).then((res)=>{
      alert('Book Added SuccesFully')
      setBookName('');
      setIsbn('');
      setprice('');
      setCoverPic(null)
    }).catch((error)=>console.log(error.msg))

  }
  return (
    <div>
      <Form onSubmit={handlebook}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Book Name</Form.Label>
        <Form.Control type="text" placeholder="Enter BookName" onChange={(e)=>setBookName(e.target.value)} value={bookName}/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>ISBN</Form.Label>
        <Form.Control type="number" placeholder="ISBN Number" onChange={(e)=>setIsbn(e.target.value)} value={isbn}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Price</Form.Label>
        <Form.Control type="number" placeholder="Enter Price" onChange={(e)=>setprice(e.target.value)} value={price}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Cover Pic</Form.Label>
        <Form.Control type="file" placeholder="choose File" onChange={(e)=>setCoverPic(e.target.files[0])} />
      </Form.Group>
      
      <Button variant="primary" type="submit">
        Add Book
      </Button>
    </Form>
    </div>
  )
}

export default ListingPage