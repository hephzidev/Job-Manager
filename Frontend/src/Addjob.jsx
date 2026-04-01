import React, { useState } from 'react'
import axios from 'axios'
import style from "./Addjob.module.css"

const Addjob = ({closePopup,refreshJobs }) => {
  
  const [errors, setErrors] = useState({});

    const[details,setDetails]=useState({
       companyName:"",
       position:"",
       status:"Applied",
       salary:"",
       jobtype:"",
       jobURL:"",
       location:"",
       appliedOn:"",
       deadline:"",
       description:"",
    })
    console.log(details);
    
   const userId = localStorage.getItem("userId");
   
    function changeDetails(e){
        setDetails((prev)=>({...prev,[e.target.name]:e.target.value}))
    }

    async function updateDetails(){
        try {
          const token = localStorage.getItem("token");
          console.log("TOKEN AT SAVE:", token);

           if (!validate()) return;
            let response=await axios.post("http://localhost:3000/create",details,{
              headers:{Authorization:`Bearer ${localStorage.getItem("token")}`}
            })
            console.log(response.data);
            setDetails({
       companyName:"",
       position:"",
       status:"Applied",
       salary:"",
       jobtype:"",
       jobURL:"",
       location:"",
       appliedOn:"",
       deadline:"",
       description:""
            })
        closePopup()
        refreshJobs()
            
        } catch (error) {
            
        }
    }
      function validate() {
       let newErrors = {};

  if (!details.companyName.trim()) {
    newErrors.companyName = "Company name is required";
  }
  if (!details.position.trim()) {
    newErrors.position = "Position is required";
  }
  if (!details.salary) {
    newErrors.salary = "Salary is required";
  }
  if (!details.location) {
    newErrors.location = "Salary is required";
  }
  setErrors(newErrors);
  return Object.keys(newErrors).length === 0; // ✅ true if no errors
}

  return (
    <div>
    <div className="container mt-1">
  <div className="row g-3">

    <div className="col-md-4">
      <label className="form-label">Company Name*</label>
      <input type="text" name="companyName" value={details.companyName}  className={`form-control ${style.labelFix} ${errors.companyName ? style.errorInput : ""}`} placeholder="Company Name" onChange={changeDetails} />
      {errors.companyName && (
           <p className={style.errorText}>{errors.companyName}</p>
    )}
    </div>
   

    <div className="col-md-4">
      <label className="form-label">Position*</label>
      <input type="text" name="position" value={details.position} className={`form-control ${style.labelFix} ${errors.position ? style.errorInput : ""}`}  placeholder="Position" onChange={changeDetails} />
     {errors.position && (
       <p className={style.errorText}>{errors.position}</p>
        )}
      </div>
    
        
    <div className="col-md-4">
      <label className="form-label">Status</label>
      <select name="status" value={details.status} className="form-select" onChange={changeDetails}>
        <option value="Applied">Applied</option>
        <option value="Interviewing">Interviewing</option>
        <option value="Offer">Offer</option>
        <option value="Rejected">Rejected</option>
        <option value="Wishlist">Wishlist</option>
      </select>
    </div>

    <div className="col-md-4">
      <label className="form-label">Salary</label>
      <input type="number"  name="salary" value={details.salary} className={`form-control ${style.labelFix} ${errors.salary ? style.errorInput : ""}`} placeholder="Salary" onChange={changeDetails}/>
       {errors.salary && (
       <p className={style.errorText}>{errors.salary}</p>
        )}
    </div>

    <div className="col-md-4">
      <label className="form-label">Job Type</label>
      <select name="jobtype" value={details.jobtype} className= "form-control"  onChange={changeDetails}>
        <option>Choose</option>
        <option>Full Time</option>
        <option>Part Time</option>
      </select>
    </div>
    <div className="col-md-4">
  <label className="form-label">Job URL</label>
  <input type="text" name="jobURL" value={details.jobURL} onChange={changeDetails} placeholder="https://example.com" className="form-control"/>
</div>

    <div className="col-md-4">
      <label className="form-label">Location</label>
      <input type="text" name="location" value={details.location} className={`form-control ${style.labelFix} ${errors.location ? style.errorInput : ""}`}  placeholder="Location" onChange={changeDetails}/>
     {errors.location && (
       <p className={style.errorText}>{errors.location}</p>
        )}
    </div>

    <div className="col-md-4">
      <label className="form-label">Applied On</label>
      <input type="date" name="appliedOn" value={details.appliedOn} className="form-control" onChange={changeDetails}/>
    </div>

    <div className="col-md-4">
      <label className="form-label">Deadline</label>
      <input type="date" name="deadline" value={details.deadline} className="form-control" onChange={changeDetails}/>
    </div>

     <div className="col-md-12">
  <label>Description</label>
  <textarea
    name="description"
    className="form-control"
    value={details.description}
    onChange={changeDetails}
    rows="4"
  />
</div>
   
   <div className="col-12 d-flex justify-content-end mt-3">
    <button type="button" className="btn btn-primary" onClick={updateDetails}>save</button>
    <button type="button" className="btn btn-secondary ms-2" onClick={closePopup}>Close</button>
   </div>


  </div>

</div>
    </div>
  )
}

export default Addjob