import React, { useEffect } from 'react'
import style from "./Boardpage.module.css"
import Addjob from './Addjob.jsx'
import { useState } from 'react'
import axios from 'axios'
import { useParams,Link } from 'react-router-dom'


const Webpage = () => {
    const [showAddJob,setShowAddJob] = useState(false)
    const[jobs,setJobs]=useState([])
    const[search,setSearch]=useState("")
    const [showDeletePopup,setShowDeletePopup] = useState(false)
    const [deleteId,setDeleteId] = useState(null)
    const [viewJob, setViewJob] = useState();
    

    const{id}=useParams()

    async function fetchDetails(){
        try {
           let response=await axios.get("http://localhost:3000/viewall") 
           console.log(response.data.data);
           setJobs(response.data.data)
           
        } catch (error) {
            console.log(error);  
        }
    }
    useEffect(()=>{
        fetchDetails()
    },[])

    
    async function deleteDetails(id){
        try {
            let deletedata=await axios.delete(`http://localhost:3000/delete/${id}`)  
            console.log(deletedata);
            fetchDetails()
            setShowDeletePopup(false)
        } catch (error) { 
            console.log(error);
        }
    }

    function searchValue(e){
       setSearch(e.target.value)
    }


  return (
    <div>
        <div className={style.header}>
<h2>Job hunt 2026</h2>

<input 
type="text" 
placeholder="Search company, position..."
className={style.search} onChange={searchValue}
/>

<div className={style.headerbuttons}>
    <Link to={"/login"}><button>Logout</button></Link>
<button onClick={() => setShowAddJob(true)}>Add job</button>
</div>
</div>

<div className={style.board}>


<div className={style.column}>
<div className={style.jobcolumn}><p className={`${style.columnpara} ${style.box1}`}>Wishlist</p></div>
{
    jobs
    .filter(job=>(job.status=="Wishlist" && (job.companyName.toLowerCase().includes(search.toLowerCase()) || job.position.toLowerCase().includes(search.toLowerCase()) ||
                                              job.location.toLowerCase().includes(search.toLowerCase()))))
    .map((job,idx)=>{
        return(
            <div key={idx} className={`${style.jobcard} ${style.cardone}`}>
            <h5>Company Name : {job.companyName}</h5>
            <p>Position : {job.position}</p>
            <p>Salary : {job.salary}</p>
            <p>
                <strong>Location: </strong>{""}
                <a  className={style.link} href={`http://www.google.com/maps/search/${job.location}`}>{job.location}</a>
            </p>

             <div className={style.buttongroups}>
                <Link to={`/edit/${job._id}`}><button className={style.editbtn}>edit</button></Link>  
              <button className={style.deletebtn} onClick={()=>{setShowDeletePopup(true) 
                setDeleteId(job._id)}}>delete</button>
                <button className={style.viewbtn} onClick={()=>{setViewJob(job)}}>view</button>
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
    .filter(job=>(job.status=="Applied" && (job.companyName.toLowerCase().includes(search.toLowerCase()) || job.position.toLowerCase().includes(search.toLowerCase())
                                            || job.location.toLowerCase().includes(search.toLowerCase()))))
    .map((job,idx)=>{
        return(
            <div key={idx} className={`${style.jobcard} ${style.cardtwo}`}>
            <h5>companyName : {job.companyName}</h5>
            <p>Position : {job.position}</p>
            <p>Salary : {job.salary}</p>
            <p>
                <strong>Location: </strong>{""}
                <a  className={style.link} href={`http://www.google.com/maps/search/${job.location}`}>{job.location}</a>
            </p>
             <div className={style.buttongroups}>
              <Link to={`/edit/${job._id}`}><button className={style.editbtn}>edit</button></Link>  
              <button className={style.deletebtn} onClick={()=>{setShowDeletePopup(true)
              setDeleteId(job._id)}}>delete</button>
               <button className={style.viewbtn} onClick={()=>{setViewJob(job)}}>view</button>
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
    .filter(job=>(job.status=="Interviewing" && (job.companyName.toLowerCase().includes(search.toLowerCase()) || job.position.toLowerCase().includes(search.toLowerCase())
                                                 || job.location.toLowerCase().includes(search.toLowerCase()))))
    .map((job,idx)=>{
        return(
            <div key={idx} className={`${style.jobcard} ${style.cardthree}`}> 
            <h5>Company Name : {job.companyName}</h5>
            <p>Position : {job.position}</p>
            <p>Salary : {job.salary}</p>
           <p>
                <strong>Location: </strong>{""}
                <a  className={style.link} href={`http://www.google.com/maps/search/${job.location}`}>{job.location}</a>
            </p>
             <div className={style.buttongroups}>
              <Link to={`/edit/${job._id}`}><button className={style.editbtn}>edit</button></Link>  
              <button onClick={()=>{setShowDeletePopup(true)
              setDeleteId(job._id)}} className={style.deletebtn}>delete</button>
                 <button className={style.viewbtn} onClick={()=>{setViewJob(job)}}>view</button>
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
    .filter(job=>(job.status=="Offer" && (job.companyName.toLowerCase().includes(search.toLowerCase()) || job.position.toLowerCase().includes(search.toLowerCase())
                                           || job.location.toLowerCase().includes(search.toLowerCase()))))
    .map((job,idx)=>{
        return(
            <div key={idx} className={`${style.jobcard} ${style.cardfour}`}>
            <h5>Company Name : {job.companyName}</h5>
            <p>Position : {job.position}</p>
            <p>Salary : {job.salary}</p>
            <p>
                <strong>Location: </strong>{""}
                <a  className={style.link} href={`http://www.google.com/maps/search/${job.location}`}>{job.location}</a>
            </p>
             <div className={style.buttongroups}>
              <Link to={`/edit/${job._id}`}><button className={style.editbtn}>edit</button></Link>  
              <button className={style.deletebtn} onClick={()=>{setShowDeletePopup(true)
              setDeleteId(job._id)}}>delete</button>
                 <button className={style.viewbtn} onClick={()=>{setViewJob(job)}}>view</button>
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
    .filter(job=>(job.status=="Rejected" && (job.companyName.toLowerCase().includes(search.toLowerCase()) || job.position.toLowerCase().includes(search.toLowerCase())
                                              || job.location.toLowerCase().includes(search.toLowerCase()))))
    .map((job,idx)=>{
        return(
            <div key={idx} className={`${style.jobcard} ${style.cardfive}`}>
            <h5>Company Name : {job.companyName}</h5>
            <p>Position : {job.position}</p>
            <p>Salary : {job.salary}</p>
            <p>
                <strong>Location: </strong>{""}
                <a  className={style.link} href={`http://www.google.com/maps/search/${job.location}`}>{job.location}</a>
            </p>
             <div className={style.buttongroups}>
                <Link to={`/edit/${job._id}`}><button className={style.editbtn}>edit</button></Link>             
                 <button className={style.deletebtn} onClick={()=>{setShowDeletePopup(true)
                 setDeleteId(job._id)}}>delete</button>
                 <button className={style.viewbtn} onClick={()=>{setViewJob(job)}}>view</button>
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
{showDeletePopup && (

<div className={style.popupOverlay}>

  <div className={style.deletePopup}>

    <h3>You are about to delete this job</h3>
    <p>Are you sure?</p>

    <div className={style.popupButtons}>

      <button
      className={style.cancelBtn}
      onClick={()=>setShowDeletePopup(false)}
      >
      Cancel
      </button>

      <button
      className={style.deleteBtn}
      onClick={()=>deleteDetails(deleteId)}
      >
      Delete
      </button>

    </div>

  </div>

</div>

)}

{viewJob && (
  <div className={style.popupOverlayView}>
    <div className={style.viewPopupView}>
      
      <button 
        className={style.close}
        onClick={() => setViewJob(null)}>✕
      </button>
      

      <h2 className={style.viewTitle}>
        {viewJob.companyName}
      </h2>

      <p className={style.viewText}>
        <span>Position:</span> {viewJob.position}
      </p>

      <p className={style.viewText}>
        <span>Status:</span>
        <span className={`${style.statusBadge} ${style.interview}`}>
          {viewJob.status}
        </span>
      </p>

      <p className={style.viewText}>
        <span>Salary:</span> {viewJob.salary}
      </p>

       <p className={style.viewText}>
        <span>JobURL: </span> 
                <a className={style.link+ " " + style.wordBreak}  href={viewJob.jobURL.startsWith("http") ? viewJob.jobURL : `https://${viewJob.jobURL}`}>{viewJob.jobURL}</a>
      </p>
      
      <p className={style.viewText}>
        <span>Location:</span> 
                <a className={style.link+ " " + style.wordBreak} href={`http://www.google.com/maps/search/${viewJob.location}`}>{viewJob.location}</a>
      </p>

      <p className={style.viewText}>
        <span>Applied On:</span> {viewJob.appliedOn?.split("T")[0]}
      </p>

      <p className={style.viewText}>
        <span>Deadline:</span> {viewJob.deadline?.split("T")[0]}
      </p>

      <div className={style.descriptionBox}>
       <span>Description:  </span> {viewJob.description}
      </div>

    </div>
  </div>
)}
</div>
    </div>
  )
}

export default Webpage