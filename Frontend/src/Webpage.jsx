import React, { useEffect } from 'react'
import style from "./Webpage.module.css"
import Addjob from './Addjob.jsx'
import { useState } from 'react'
import axios from 'axios'
import { useParams,Link } from 'react-router-dom'

const Webpage = () => {
    const [showAddJob,setShowAddJob] = useState(false)
    const[jobs,setJobs]=useState([])
    const[search,setSearch]=useState("")
    

    const{id}=useParams()

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

    
    async function deleteDetails(id){
        try {
            let deletedata=await axios.delete(`http://localhost:3000/delete/${id}`)  
            console.log(deletedata);
            fetchDetails()
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
placeholder="Search company, tag, position..."
className={style.search} onChange={searchValue}
/>

<div className={style.headerbuttons}>
<button>Sort by</button>
<button onClick={() => setShowAddJob(true)}>Add job</button>
<button>Add column</button>
</div>
</div>

<div className={style.board}>


<div className={style.column}>
<div className={style.jobcolumn}><p className={style.columnpara}>Wishlist</p></div>
{
    jobs
    .filter(job=>(job.column=="Whishlist" && job.companyName.toLowerCase().includes(search.toLowerCase())))
    .map((job,idx)=>{
        return(
            <div key={idx} className={style.jobcard}>
            <h5>Company name: {job.companyName}</h5>
            <p>Position: {job.position}sfd</p>
            <p>Salary: {job.salary}</p>
            <p>appliedOn: {job.appliedOn}</p>
            <p>Deadline: {job.deadline}</p>
             <div className={style.buttongroups}>
                <Link to={`/edit/${job._id}`}><button className={style.btmbuttons}>edit</button></Link>  
              <button className={style.btmbuttons} onClick={()=>deleteDetails(job._id)}>delete</button>
            </div>
            </div>
        )
    })
}
</div>

<div className={style.column}>
<div className={style.jobcolumn}><p className={style.columnpara}>Applied</p></div>
{
    jobs
    .filter(job=>(job.column=="Applied" && job.companyName.toLowerCase().includes(search.toLowerCase())))
    .map((job,idx)=>{
        return(
            <div key={idx} className={style.jobcard}>
            <h5>companyName: {job.companyName}</h5>
            <p>Position :{job.position}</p>
            <p>Salary: {job.salary}</p>
             <p>appliedOn: {job.appliedOn}</p>
            <p>Deadline: {job.deadline}</p>
             <div className={style.buttongroups}>
              <Link to={`/edit/${job._id}`}><button className={style.btmbuttons}>edit</button></Link>  
              <button className={style.btmbuttons} onClick={()=>deleteDetails(job._id)}>delete</button>
            </div>
            </div>
        )
    })
}
</div>

<div className={style.column}> 
<div className={style.jobcolumn}><p className={style.columnpara}>Interviewing</p></div>
{
    jobs
    .filter(job=>(job.column=="Interviewing" && job.companyName.toLowerCase().includes(search.toLowerCase())))
    .map((job,idx)=>{
        return(
            <div key={idx} className={style.jobcard}> 
            
            <h5>Companyname :{job.companyName}</h5>
            <p>Position :{job.position}</p>
            <p>Salary :{job.salary}</p>
              <p>appliedOn: {job.appliedOn}</p>
            <p>Deadline: {job.deadline}</p>
             <div className={style.buttongroups}>
              <Link to={`/edit/${job._id}`}><button className={style.btmbuttons}>edit</button></Link>  
              <button onClick={()=>deleteDetails(job._id)} className={style.btmbuttons}>delete</button>
            </div>
            </div>
           
        )
    })
}
</div>

<div className={style.column}>
<div className={style.jobcolumn}><p className={style.columnpara}>Offer</p></div>
{
    jobs
    .filter(job=>(job.column=="Offer" && job.companyName.toLowerCase().includes(search.toLowerCase())))
    .map((job,idx)=>{
        return(
            <div key={idx} className={style.jobcard}>
            <h5>Company Name: {job.companyName}</h5>
            <p>Position :{job.position}</p>
            <p>Salary :{job.salary}</p>
              <p>appliedOn: {job.appliedOn}</p>
            <p>Deadline: {job.deadline}</p>
             <div className={style.buttongroups}>
              <Link to={`/edit/${job._id}`}><button className={style.btmbuttons}>edit</button></Link>  
              <button className={style.btmbuttons} onClick={()=>deleteDetails(job._id)}>delete</button>
            </div>
            </div>
        )
    })
}
</div>

<div className={style.column}>
<div className={style.jobcolumn}><p className={style.columnpara}>Rejected</p></div>
{
    jobs
    .filter(job=>(job.column=="Rejected" && job.companyName.toLowerCase().includes(search.toLowerCase())))
    .map((job,idx)=>{
        return(
            <div key={idx} className={style.jobcard}>
            <h5>Company Name: {job.companyName}</h5>
            <p>Position :{job.position}</p>
            <p>Salary: {job.salary}</p>
              <p>appliedOn: {job.appliedOn}</p>
            <p>Deadline: {job.deadline}</p>
             <div className={style.buttongroups}>
                <Link to={`/edit/${job._id}`}><button className={style.btmbuttons}>edit</button></Link>             
                 <button className={style.btmbuttons} onClick={()=>deleteDetails(job._id)}>delete</button>
            </div>
            </div>
        )
    })
}
</div>

{showAddJob && (

<div className={style.popupoverlay}>

<div className={style.popup}>

<Addjob closePopup={() => setShowAddJob(false)} />

</div>

</div>

)}
</div>
    </div>
  )
}

export default Webpage