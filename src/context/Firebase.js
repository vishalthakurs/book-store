import {createContext, useContext, useEffect,useState} from 'react'
import {initializeApp} from 'firebase/app'
import {getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
    onAuthStateChanged,
    signOut} from 'firebase/auth'
import {addDoc, collection, getFirestore,getDocs, getDoc, doc, query, where,} from 'firebase/firestore'
import {getStorage, ref, uploadBytes,getDownloadURL} from 'firebase/storage'


const FirebaseContext= createContext(null)

export const useFirebase=()=>useContext(FirebaseContext)

const firebaseConfig = {
    apiKey: "AIzaSyDXJtfGHF1WURScc610yrlNqfKTc8JJVkY",
    authDomain: "book-store-3730c.firebaseapp.com",
    projectId: "book-store-3730c",
    storageBucket: "book-store-3730c.appspot.com",
    messagingSenderId: "918389103868",
    appId: "1:918389103868:web:f375e39ebc95ad4e874b79"
  };
  


const firebaseapp=initializeApp(firebaseConfig);
const firebaseauth=getAuth(firebaseapp)
const firebaseGoogleAuthProvider=new GoogleAuthProvider()
const firestoredb=getFirestore(firebaseapp);
const storagedb=getStorage(firebaseapp);
export const FirebaseProvider = (props)=>{
    const [user,setUser]=useState(null);

    useEffect(()=>{
        onAuthStateChanged(firebaseauth,(data)=>{
            data?setUser(data):setUser(null)
        })
    },[])

    const signupuserwithemailandpassword=(email,password)=>createUserWithEmailAndPassword(firebaseauth,email,password)

    const signwithEmailandPassword=(email,password)=>signInWithEmailAndPassword(firebaseauth,email,password);

    const signwithGoogle=()=>signInWithPopup(firebaseauth,firebaseGoogleAuthProvider)

    const logOut=()=>signOut(firebaseauth)

    const handleCreateNewListing= async (bookName,isbn,price,coverPic)=>{
        const imageRef=ref(storagedb,`uploads/images/${Date.now()}-${coverPic.name}`);
        const uploadResult=await uploadBytes(imageRef,coverPic);
        const collectionRef=collection(firestoredb,'books');
       return  await addDoc(collectionRef,{
            bookName,
            isbn,
            price,
            imageURL:uploadResult.ref.fullPath,
            userId:user.uid,
            userEmail:user.email,
            displayName:user.displayName,
            userphotoURL:user.photoURL

        })

    }

    const getAllBooks=async ()=>{
        const collectionRef=collection(firestoredb,'books');
        return await getDocs(collectionRef)
    }

    const getBookById=async (id)=>{
        const docRef=doc(firestoredb,'books',id);
        return await getDoc(docRef);
    }

    const getImageUrl=(path)=> {
        return getDownloadURL(ref(storagedb,path))}

    const placeOrders=async (bookid,qty)=>{
        const collectionRef=collection(firestoredb,'books',bookid,'orders');
        return await addDoc(collectionRef,{
            userId:user.uid,
            userEmail:user.email,
            displayName:user.displayName,
            userphotoURL:user.photoURL,
            qty:Number(qty)
        })
    }
    const fetchMyBooks= async (userid)=>{
        const collectionref=collection(firestoredb,'books');
        const q=query(collectionref,where('userId','==',userid));
        const result=await getDocs(q);
        return result;
    }

    const getOrderDetails= async (id)=>{
        const collectionRef=collection(firestoredb,`books/${id}/orders`);
        const result = await getDocs(collectionRef);
        return result;
    }
    

  




    const isLoggedIn=user?true:false;

   





    return <FirebaseContext.Provider value={{
        signupuserwithemailandpassword,
        signwithEmailandPassword,
        signwithGoogle,
        isLoggedIn,
        user,
        logOut,
        handleCreateNewListing,
        getAllBooks,
        getImageUrl,
        getBookById,
        placeOrders,
        fetchMyBooks,
        getOrderDetails,
        
    }}>{props.children}</FirebaseContext.Provider>
}