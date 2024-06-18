import HomePage from './Components/HomePage.jsx'
import LandingPage from './Components/LandingPage.jsx';

import {useState} from 'react'

import  {auth,db} from './DB/FireBase.js'

import {createUserWithEmailAndPassword,signInWithEmailAndPassword,signOut} from 'firebase/auth'
import {GoogleAuthProvider,signInWithPopup} from 'firebase/auth'

import { collection, getDocs, query, where ,addDoc} from 'firebase/firestore'






function App() {
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [isLogged,setIsLogged] = useState(false)




  const provider = new GoogleAuthProvider();

  function handleSignUpClick(){
      createUserWithEmailAndPassword(auth,email,password).then(()=>{
          createNewUser(auth.currentUser.uid,auth.currentUser.email)
          setIsLogged(true)
          }).catch(()=>{
            console.log('User Already Exists')
          })
  }

  function  handleLogInClick(){
     signInWithEmailAndPassword(auth,email,password).then(()=>{
        if(containsUser(auth.currentUser.uid)){
          createNewUser(auth.currentUser.uid,auth.currentUser.email)
        }
        setIsLogged(true)
    })  
  }



  function handleGoogleSignInClick(){
      signInWithPopup(auth, provider).then(()=>{
        if(containsUser(auth.currentUser.uid)){
          createNewUser(auth.currentUser.uid,auth.currentUser.email)
        }
        setIsLogged(true)
      }
      ).catch((err)=>{console.log(err)})
  }


  function handleLogOut(){
      signOut(auth)
      setIsLogged(false)
  }

  function containsUser(userId){
      const collectionRef = collection(db,'users')
      const q = query(collectionRef,where('userId','==',userId))
      const querySnapshot =  getDocs(q);
      return  querySnapshot.empty?true:false
  }


    function createNewUser(userId,email){
      const collectionRef = collection(db,'users')
      console.log('stage-1')
      async function addUser(userId,email){
          console.log('stage-2')
          await addDoc(collectionRef,{
            email:email,
            userId:userId
          })
      }
      addUser(userId,email)
    }
  return(
    <div>
    {!isLogged && <LandingPage 
                          setEmail = {setEmail} 
                          setPassword = {setPassword}
                          handleSignUpClick = {handleSignUpClick}
                          handleLogInClick={handleLogInClick}
                          handleGoogleSignInClick={handleGoogleSignInClick}
                          />}
    {isLogged && <HomePage 
                          userId={auth.currentUser.uid} 
                          Logout={handleLogOut}/>}
    </div>
    
  )
}

export default App
