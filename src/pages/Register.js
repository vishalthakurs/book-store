import React, { useState,useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useFirebase } from "../context/Firebase";
import {useNavigate} from 'react-router-dom'

const Register = () => {
    const firebase=useFirebase();
    const [email,setEmail]=useState();
    const [password,setpassword]=useState();
    const navigate=useNavigate()
    useEffect(()=>{
        if(firebase.isLoggedIn)
        {
            navigate('/')
        }
    },[firebase,navigate])

    const handleSubmit=  async (e)=>
    {
        e.preventDefault();
        console.log('signing in ...');
        const result=await firebase.signupuserwithemailandpassword(email,password)
        if(result)
        {
            alert('Account creation successfull')
            navigate('/')
        }
       
    }
  return (
    <div>
      <Form className="container" onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" onChange={(e)=>setEmail(e.target.value)}/>
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" onChange={(e)=>setpassword(e.target.value)} />
        </Form.Group>
        
        <Button variant="primary" type="submit">
          Create
        </Button>
      </Form>
    </div>
  );
};

export default Register;
