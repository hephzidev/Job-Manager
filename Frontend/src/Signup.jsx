import React, { useState } from 'react'
import axios from 'axios'
import style from "./Signup.module.css"
import { Link } from 'react-router-dom'

const Signup = () => {

    const[details,setDetails]=useState({
        userName:"",
        userEmail:"",
        userPassword:""
    })

     function changeDetails(e){
        setDetails((prev)=>({...prev,[e.target.name]:e.target.value}))
     }
     console.log(details);

     async function updateDetails(){
         if(!details.userName || !details.userEmail || !details.userPassword){
         alert("Please fill all fields")
           return
          }
        try {
            let response=await axios.post("http://localhost:3000/signup",details)
            console.log(response);
            if(response.status==201){
                alert("signup successfully")
            }
        } catch (error) {
            console.log("Error in creating account",error)   
        }
     }
     
  return (
    <div className={style.signupcontainer}>
         <div className={style.signupeft}></div>
         <div className={style.signupright}>
             <h1>Sign Up</h1>
        <input type="text" name="userName" value={details.userName} placeholder="Enter your name" onChange={changeDetails}/>
        <input type="text" name="userEmail" value={details.userEmail} placeholder="Enter your email" onChange={changeDetails} />
        <input type="password" name="userPassword" value={details.userPassword} placeholder="Password" onChange={changeDetails} />
        <button onClick={updateDetails}>Signup</button>
        
        <Link to={"/login"}><p className="signin">Sign in →</p></Link>

    </div>
    </div>
  )
}

export default Signup