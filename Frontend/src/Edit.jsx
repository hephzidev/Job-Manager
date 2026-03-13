import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'

const Edit = () => {
    const{id}=useParams()
    const[details,setDetails]=useState({
       companyName:"",
       position:"",
        column:"",
       salary:"",
       jobtype:"",
       location:"",
       appliedOn:"",
        deadline:""
    })

    function changeDetails(e){
      setDetails((prev)=>({...prev,[e.target.name]:e.target.value}))
    }
    console.log(details);
    
    async function updateDetails(){
      try {
        let response=await axios.put(`http://localhost:3000/edit/${id}`,details)
      } catch (error) {
        console.log(error);
      }
    }

    async function fetchDetailsSingle(){
      try {
        let response=await axios.get(`http://localhost:3000/view/${id}`)
        setDetails(response.data.data)
      } catch (error) {
        console.log("Error in fetching data",error);
        
      }
    } 

    useEffect(()=>{
      fetchDetailsSingle()
    },[])
  return (
    <div>
        <div className="container mt-5">
  <div className="row g-3">

    <div className="col-md-4">
      <label className="form-label">Company Name*</label>
      <input type="text" name="companyName" value={details.companyName} className="form-control" placeholder="CompanyName" onChange={changeDetails}/>
    </div>

    <div className="col-md-4">
      <label className="form-label">Position*</label>
      <input type="text" name="position" value={details.position} className="form-control" placeholder="Position" onChange={changeDetails}/>
    </div>

    <div className="col-md-4">
      <label className="form-label">Column</label>
      <select name="column" value={details.column} className="form-select" onChange={changeDetails}>
        <option>Applied</option>
        <option>Interviewing</option>
        <option>Offer</option>
        <option>Rejected</option>
        <option>Whishlist</option>
      </select>
    </div>

    <div className="col-md-4">
      <label className="form-label">Salary</label>
      <input type="number"  name="salary" value={details.salary} className="form-control" placeholder="Salary" onChange={changeDetails}/>
    </div>

    <div className="col-md-4">
      <label className="form-label">Job Type</label>
      <select name="jobtype" value={details.jobtype} className="form-select" onChange={changeDetails}>
        <option>Choose</option>
        <option>Full Time</option>
        <option>Part Time</option>
      </select>
    </div>

    <div className="col-md-4">
      <label className="form-label">Location</label>
      <input type="text" name="location" value={details.location} className="form-control" placeholder="Location" onChange={changeDetails}/>
    </div>

    <div className="col-md-4">
      <label className="form-label">Applied On</label>
      <input type="date" name="appliedOn" value={details.appliedOn} className="form-control" onChange={changeDetails}/>
    </div>

    <div className="col-md-4">
      <label className="form-label">Deadline</label>
      <input type="date" name="deadline" value={details.deadline} className="form-control" onChange={changeDetails}/>
    </div>
   
   <div className="col-md-4">
    <br />
    
    <Link to={"/web"}><button type="button" className="btn btn-primary" onClick={updateDetails}>save</button></Link>

   </div>
    

  </div>

</div>
    </div>
  )
}

export default Edit