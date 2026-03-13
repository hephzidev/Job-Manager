import React, { useState } from 'react'
import axios from 'axios';
import style from "./Login.module.css"
import { Link,useNavigate } from 'react-router-dom';

const Login = () => {
    const[details,setDetails]=useState({
             userEmail:"",
             userPassword:""
    })
    const navigate=useNavigate()
    console.log(details);
    
     function changeDetails(e){
        setDetails((prev)=>({...prev,[e.target.name]:e.target.value}))
     }
    async function updateDetails(){
             if(!details.userEmail || !details.userPassword){
             alert("Please enter email and password")
             return
             }
          try {
            let response=await axios.post("http://localhost:3000/signin",details)
              if(response.status === 200){
               alert(response.data.message)
               navigate("/web")
               }
            console.log(response);
          } catch (error) {
              if(error.response && error.response.status === 401){
             alert(error.response.data.message)
              } else {
             alert("Login Failed")
               }
            console.log("Error in login",error);
          }
    }

  return (
    <div className={style.logincontainer}>
      <div className={style.loginright}>
      <h1>Login</h1>
        <input type="email" name="userEmail" value={details.userEmail} placeholder="Enter email" onChange={changeDetails}/>
        <input type="password" name="userPassword" value={details.userPassword} placeholder="Enter password" onChange={changeDetails}/>
        <button onClick={updateDetails}>Login</button>
        <br />
        <Link to={"/signup"}><p className="signin">Create Account →</p></Link>
    </div>
    </div>
  )
}

export default Login