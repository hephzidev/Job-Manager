import React, { useState } from 'react'
import axios from 'axios'
import style from "./Signup.module.css"
import { useNavigate,Link } from 'react-router-dom'

const Signup = () => {

    const[details,setDetails]=useState({
        userName:"",
        userEmail:"",
        userPassword:""
    })
    const [popup, setPopup] = useState({ show: false, message: "",type: "",});

    const navigate=useNavigate()

     function changeDetails(e){
        setDetails((prev)=>({...prev,[e.target.name]:e.target.value}))
     }
     console.log(details);

     async function updateDetails(){
         if(!details.userName || !details.userEmail || !details.userPassword){
           setPopup({ show: true, message: "Please fill all fields", type: "error", });
           return
          }
        try {
            let response=await axios.post("http://localhost:3000/signup",details)
            console.log(response);
              if (response.status === 201) {
             setPopup({ show: true, message: "Signup successful! Redirecting to login..." ,type: "success",});
            setDetails({ userName: "", userEmail: "", userPassword: "" });
             setTimeout(() => {
           navigate("/login");
          }, 1500);
            }
          }catch (error) {
  if (error.response) {
    setPopup({
      show: true,
      message: error.response.data.message || "Signup failed. Please try again.",
      type: "error",   
    });
  } else {
    setPopup({
      show: true,
      message: "Signup failed. Please try again.",
      type: "error",   
    });
    console.error("Error in creating account:", error);
  }
   setTimeout(() => {
      setPopup({ show: false, message: "", type: "" });
    }, 3000);
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

        {popup.show && (
  <div className={`${style.toast} ${popup.type === "success" ? style.success : style.error}`}>
    <div className={style.toastcontent}>
      <span className={style.toastmessage}>{popup.message}</span>
      <button
        className={style.toastclose}
        onClick={() => setPopup({ show: false, message: "", type: "" })}>✕</button>
    </div>
  </div>
)}
    </div>
    </div>
  )
}

export default Signup