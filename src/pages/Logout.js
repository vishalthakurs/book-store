import React, { useEffect } from 'react'
import { useFirebase } from '../context/Firebase'
import {useNavigate} from 'react-router-dom'

const Logout = () => {
    const firebase=useFirebase();
    const navigate=useNavigate()
    useEffect(()=>{
        firebase.logOut();
        navigate('/')
    })
  return (
    <div></div>
  )
}

export default Logout