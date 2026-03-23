import React, { useEffect, useState } from 'react'
import { Link, useParams,useNavigate} from 'react-router-dom'
import axios from 'axios'
import style from "./Edit.module.css"

const Edit = () => {
    const{id}=useParams()
    const[details,setDetails]=useState({
       companyName:"",
       position:"",
       status:"",
       salary:"",
       jobtype:"",
       jobURL:"",
       location:"",
       appliedOn:"",
       deadline:"",
       description:""
    })
    const [originalDetails, setOriginalDetails] = useState({})
    const[jobs,setJobs]=useState([])
    const [showAddJob,setShowAddJob] = useState(false)
    const [errors, setErrors] = useState({});

    const navigate=useNavigate()

     async function fetchDetails(){
        try {
           let response=await axios.get("http://localhost:3000/viewall") 
           console.log(response.data.data);
           setJobs(response.data.data) 
        } catch (error) {
        }
    }
    useEffect(()=>{
        fetchDetails()
    },[])

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
    newErrors.location = "Location is required";
  }
  setErrors(newErrors);
  return Object.keys(newErrors).length === 0; // ✅ true if no errors
}

    function changeDetails(e){
      setDetails((prev)=>({...prev,[e.target.name]:e.target.value}))
    }
    console.log(details);
    
    async function updateDetails(){
      if (!validate()) return;
      try {
        let response=await axios.put(`http://localhost:3000/edit/${id}`,details)
        navigate("/board"); 
      } catch (error) {
        console.log(error);
      }
    }

    async function fetchDetailsSingle(){
      try {
        let response=await axios.get(`http://localhost:3000/view/${id}`)
        setDetails({
            companyName: response.data.data.companyName || "",
  position: response.data.data.position || "",
  status: response.data.data.status || "",
  salary: response.data.data.salary || "",
  jobtype: response.data.data.jobtype || "",
  jobURL: response.data.data.jobURL || "",
  location: response.data.data.location || "",
  appliedOn: response.data.data.appliedOn?.split("T")[0] || "",
  deadline: response.data.data.deadline?.split("T")[0] || "",
  description: response.data.data.description || ""
        })
         setOriginalDetails({
            companyName: response.data.data.companyName || "",
  position: response.data.data.position || "",
  status: response.data.data.status || "",
  salary: response.data.data.salary || "",
  jobtype: response.data.data.jobtype || "",
  jobURL: response.data.data.jobURL || "",
  location: response.data.data.location || "",
  appliedOn: response.data.data.appliedOn?.split("T")[0] || "",
  deadline: response.data.data.deadline?.split("T")[0] || "",
  description: response.data.data.description || ""
         })
      } catch (error) {
        console.log("Error in fetching data",error);
        
      }
    } 

    useEffect(()=>{
      fetchDetailsSingle()
    },[])

    function clearInputs(){
        setDetails(originalDetails)
    }
  return (
    <div> 
           <div className={style.header}>
    <h2>Job hunt 2026</h2>
    
    <input 
    type="text" 
    placeholder="Search company, tag, position..."
    className={style.search} 
    />
    
    <div className={style.headerbuttons}>
    <button onClick={() => setShowAddJob(true)}>Add job</button>
    </div>
    </div>
   <div className={style.overlay}>

  <div className={style.modalBox}>

    <div className={style.modalHeader}>
      <h2>Edit Job Details</h2>
     <Link to={"/board"} className={style.closeLink}> <span className={style.close}>✕</span></Link>
    </div>

    <div className={style.formGrid}>

      <div className={style.inputGroup}>
        <label>Company Name</label>
        <input type="text" name="companyName" value={details.companyName} onChange={changeDetails}  className={`${style.labelFix} ${errors.companyName ? style.errorInput : ""}`}/>
          {errors.companyName && (
                   <p className={style.errorText}>{errors.companyName}</p>
            )}
      </div>
    

      <div className={style.inputGroup}>
        <label>Position</label>
        <input type="text" name="position" value={details.position} onChange={changeDetails}  className={`${style.labelFix} ${errors.position ? style.errorInput : ""}`}/>
         {errors.position && (
               <p className={style.errorText}>{errors.position}</p>
         )}
      </div>

      <div className={style.inputGroup}>
        <label>Status</label>
        <select name="status" value={details.status} onChange={changeDetails}>
          <option  value="Wishlist">Wishlist</option>
          <option value="Applied">Applied</option>
          <option value="Interviewing">Interviewing</option>
          <option value="Offer">Offer</option>
          <option  value="Rejected">Rejected</option>
        </select>
      </div>

      <div className={style.inputGroup}>
        <label>Salary</label>
        <input type="number" name="salary" value={details.salary} onChange={changeDetails} className={`${style.labelFix} ${errors.salary ? style.errorInput : ""}`}/>
         {errors.salary && (
               <p className={style.errorText}>{errors.salary}</p>
         )}
      </div>

      <div className={style.inputGroup}>
        <label>Job Type</label>
        <select name="jobtype" value={details.jobtype} onChange={changeDetails}>
          <option>Full Time</option>
          <option>Part Time</option>
        </select>
      </div>
     
     <div className={style.inputGroup}>
  <label>Job URL</label>
  <input
    type="text"
    name="jobURL"
    value={details.jobURL}
    onChange={changeDetails}
    placeholder="https://example.com"
  />
</div>

      <div className={style.inputGroup}>
        <label>Location</label>
        <input type="text" name="location" value={details.location} onChange={changeDetails} className={`${style.labelFix} ${errors.location ? style.errorInput : ""}`}/>
         {errors.salary && (
               <p className={style.errorText}>{errors.salary}</p>
         )}
      </div>

      <div className={style.inputGroup}>
        <label>Applied On</label>
        <input type="date" name="appliedOn" value={details.appliedOn} onChange={changeDetails}/>
      </div>

      <div className={style.inputGroup}>
        <label>Deadline</label>
        <input type="date" name="deadline" value={details.deadline} onChange={changeDetails}/>
      </div>


    </div>
    <div className={`${style.inputGroup} ${style.descriptionBox}`}>
  <label >Description</label>
  <textarea 
    name="description"
    value={details.description}
    onChange={changeDetails}
    rows="3" className="form-control"
  />
</div>

    <div className={style.buttons}>
      <button onClick={clearInputs} className={style.reset}>Reset</button>
      <button className={style.save} onClick={updateDetails}>Save Changes</button>
    </div>

  </div>

</div>
<div className={style.board}>


<div className={style.column}>
<div className={style.jobcolumn}><p className={`${style.columnpara} ${style.box1}`}>Wishlist</p></div>
{
    jobs
    .filter(job=>(job.status=="Wishlist"))
    .map((job,idx)=>{
        return(
            <div key={idx} className={style.jobcard}>
            <h5>Company name : {job.companyName}</h5>
            <p>Position : {job.position}sfd</p>
            <p>Salary : {job.salary}</p>
            <p>Location : {job.location}</p>
            <p>appliedOn : {job.appliedOn?.split("T")[0]}</p>
            <p>Deadline : {job.deadline?.split("T")[0]}</p>
             <div className={style.buttongroups}>
                <Link to={`/edit/${job._id}`}><button className={style.editbtn}>edit</button></Link>  
              <button className={style.deletebtn} onClick={()=>deleteDetails(job._id)}>delete</button>
            </div>
            </div>
        )
    })
}
</div>

<div className={style.column}>
<div className={style.jobcolumn}><p className={`${style.columnpara} ${style.box2}`}>Applied</p></div>
{
    jobs
    .filter(job=>(job.status=="Applied"))
    .map((job,idx)=>{
        return(
            <div key={idx} className={style.jobcard}>
            <h5>companyName : {job.companyName}</h5>
            <p>Position : {job.position}</p>
            <p>Salary : {job.salary}</p>
            <p>Location : {job.location}</p>
             <p>appliedOn : {job.appliedOn?.split("T")[0]}</p>
            <p>Deadline : {job.deadline?.split("T")[0]}</p>
             <div className={style.buttongroups}>
              <Link to={`/edit/${job._id}`}><button className={style.editbtn}>edit</button></Link>  
              <button className={style.deletebtn} onClick={()=>deleteDetails(job._id)}>delete</button>
            </div>
            </div>
        )
    })
}
</div>

<div className={style.column}> 
<div className={style.jobcolumn}><p className={`${style.columnpara} ${style.box3}`}>Interviewing</p></div>
{
    jobs
    .filter(job=>(job.status=="Interviewing"))
    .map((job,idx)=>{
        return(
            <div key={idx} className={style.jobcard}> 
            
            <h5>Companyname : {job.companyName}</h5>
            <p>Position : {job.position}</p>
            <p>Salary : {job.salary}</p>
            <p>Location : {job.location}</p>
              <p>appliedOn : {job.appliedOn?.split("T")[0]}</p>
            <p>Deadline : {job.deadline?.split("T")[0]}</p>
             <div className={style.buttongroups}>
              <Link to={`/edit/${job._id}`}><button className={style.editbtn}>edit</button></Link>  
              <button onClick={()=>deleteDetails(job._id)} className={style.deletebtn}>delete</button>
            </div>
            </div>
           
        )
    })
}
</div>

<div className={style.column}>
<div className={style.jobcolumn}><p className={`${style.columnpara} ${style.box4}`}>Offer</p></div>
{
    jobs
    .filter(job=>(job.status=="Offer"))
    .map((job,idx)=>{
        return(
            <div key={idx} className={style.jobcard}>
            <h5>Company Name : {job.companyName}</h5>
            <p>Position : {job.position}</p>
            <p>Salary : {job.salary}</p>
            <p>Location : {job.location}</p>
              <p>appliedOn : {job.appliedOn?.split("T")[0]}</p>
            <p>Deadline : {job.deadline?.split("T")[0]}</p>
             <div className={style.buttongroups}>
              <Link to={`/edit/${job._id}`}><button className={style.editbtn}>edit</button></Link>  
              <button className={style.deletebtn} onClick={()=>deleteDetails(job._id)}>delete</button>
            </div>
            </div>
        )
    })
}
</div>

<div className={style.column}>
<div className={style.jobcolumn}><p className={`${style.columnpara} ${style.box5}`}>Rejected</p></div>
{
    jobs
    .filter(job=>(job.status=="Rejected" ))
    .map((job,idx)=>{
        return(
            <div key={idx} className={style.jobcard}>
            <h5>Company Name : {job.companyName}</h5>
            <p>Position : {job.position}</p>
            <p>Salary : {job.salary}</p>
            <p>Location : {job.location}</p>
              <p>appliedOn : {job.appliedOn?.split("T")[0]}</p>
            <p>Deadline : {job.deadline?.split("T")[0]}</p>
             <div className={style.buttongroups}>
                <Link to={`/edit/${job._id}`}><button className={style.editbtn}>edit</button></Link>             
                 <button className={style.deletebtn} onClick={()=>deleteDetails(job._id)}>delete</button>
            </div>
            </div>
        )
    })
}
</div>

{showAddJob && (

<div className={style.popupoverlay}>

<div className={style.popup}>

<Addjob closePopup={() => setShowAddJob(false)} refreshJobs={fetchDetails} />

</div>

</div>

)}
</div>
</div>
  )
}

export default Edit