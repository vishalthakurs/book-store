import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useFirebase } from "../context/Firebase";
import {useNavigate} from 'react-router-dom'

const Login = () => {
    const firebase=useFirebase();
    const [email,setEmail]=useState('');
    const [password,setpassword]=useState('');
    const navigate=useNavigate();
    useEffect(()=>{
        if(firebase.isLoggedIn)
        {
            navigate('/')
        }
    },[firebase,navigate])
    const handleLogin=async (e)=>{
        e.preventDefault();
        const result=await firebase.signwithEmailandPassword    (email,password);
        console.log(result);
    }
    const googleSignIn=async ()=>{
        const result=await firebase.signwithGoogle();

    }
    console.log(firebase);
  return (
    <div className="container">
      <Form onSubmit={handleLogin} style={{width:'800px'}}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" onChange={(e)=>setEmail(e.target.value)} value={email}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" onChange={(e)=>setpassword(e.target.value)} value={password}/>
        </Form.Group>
        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>
      <Button  variant="danger" style={{marginLeft:'30vw',marginTop:'60px'}} onClick={googleSignIn}>SignInWithGoogle</Button>
    </div>
  );
};

export default Login;
