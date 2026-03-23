import React, { useState } from 'react'
import axios from 'axios';
import style from "./Login.module.css"
import { Link,useNavigate } from 'react-router-dom';

const Login = () => {
    const[details,setDetails]=useState({
             userEmail:"",
             userPassword:""
    })
    const[popup,setPopup]=useState({
      show: false,
      message:"",
      type:""
    })
    const navigate=useNavigate()
    console.log(details);
    
     function changeDetails(e){
        setDetails((prev)=>({...prev,[e.target.name]:e.target.value}))
     }
    async function updateDetails(){
             if(!details.userEmail || !details.userPassword){
             setPopup({
              show: true,
              message:"Please enter email and password",
              type:"error"
             })
             return;
             }
          try {
            let response=await axios.post("http://localhost:3000/signin",details)
              if(response.status === 200){
                  localStorage.setItem("userId", response.data.userId);
               setPopup({
                show: true,
                message:response.data.message || "Login successful! Redirecting...",
                type:"success"
               })
               setTimeout(() => {
               navigate("/board");
               }, 1000);
               }
            console.log(response);
          } catch (error) {
             
             setPopup({
              show: true,
              message:error.response.data.message ||  "Login failed. Try again.",
              type:"error"
             })

               setTimeout(() => {
            setPopup({
            show: false,
             message: "",
           type: ""
            });

             }, 1000);
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

    {popup.show && (
  <div className={style.popupOverlay}>
    <div className={`${style.popupBox} ${
      popup.type === "success" ? style.success : style.error}`}>
      <p>{popup.message}</p>
      <button onClick={() => {navigate("/board");   
    setPopup({ ...popup, show: false }) }}> </button>
    </div>

  </div>
)}
    </div>
  )
}

export default Login