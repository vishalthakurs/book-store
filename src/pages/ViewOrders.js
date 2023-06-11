import React, { useEffect, useState } from 'react'
import {useFirebase} from '../context/Firebase'
import MyCard from '../component/MyCard';

const ViewOrders = () => {
  const firebase=useFirebase();
  const [books,setBooks]=useState([])
  useEffect(()=>{
   if(firebase.isLoggedIn)
    firebase.fetchMyBooks(firebase.user.uid)?.then((books)=>setBooks(books.docs))
  },[firebase])

  if(!firebase.isLoggedIn) return <h1>Please Login</h1>
  return (
    <div>
      {books.map((book)=> <MyCard {...book.data()} id={book.id} key={book.id} link={`/book/orders/${book.id}`} />)}
    </div>
  )
}

export default ViewOrders