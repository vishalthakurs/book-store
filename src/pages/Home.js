import React, { useEffect, useState } from 'react'
import { useFirebase } from '../context/Firebase'
import MyCard from '../component/MyCard'
import CardGroup from 'react-bootstrap/CardGroup';
import {useNavigate} from 'react-router-dom'


const Home = () => {
    const[books,setBooks]=useState([])
    const firebase=useFirebase()
    const navigate=useNavigate()
    useEffect(()=>{
      if(firebase.isLoggedIn)
      firebase.getAllBooks().then((book)=>setBooks(book.docs))
    },[])
    if(!firebase.isLoggedIn) return <div>{navigate('/login')}</div>
  return (
    <div className='container mt-3' style={{display:'flex',backgroundColor:'pink'}}>
      
      {books.map((book)=> <MyCard {...book.data()} id={book.id} key={book.id} link={`/book/view/${book.id}`}/>)}
    </div>
  )
}

export default Home 