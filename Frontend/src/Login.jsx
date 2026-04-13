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
             console.log("RESPONSE:", response.data); 
              if(response.status === 200){
                 const name = response.data.data.userName;

                  
                  localStorage.setItem("token", response.data.accesstoken)
                  localStorage.setItem("userId", response.data.userId);
                  localStorage.setItem("userName", name)

                    console.log("TOKEN:", localStorage.getItem("token"));

                  
                  alert("Token saved: " + localStorage.getItem("token"));
                  const token= localStorage.getItem("token")
                  localStorage.getItem("token")


                 if(!token){
                  console.log("No token found");
                  return
                  
                 }
                 console.log(localStorage.getItem("token"));
                   console.log("SAVED:", name);
               setPopup({
                show: true,
                message:response.data.message || "Login successful! Redirecting...",
                type:"success"
               })
               setTimeout(() => {
                console.log("Before navigate:", localStorage.getItem("userName"));
               navigate("/board");
               }, 1000);
               }
            console.log(response);
            console.log("BOARD USER:", localStorage.getItem("userName"));
          } catch (error) {
            
             const message = error?.response?.data?.message || "Login failed. Try again.";
             setPopup({
              show: true,
              message,
              type:"error"
             })

             setTimeout(() => setPopup({ show: false, message: "", type: "" }), 3000);
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