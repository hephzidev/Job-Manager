import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

const Viewall = () => {
    const[details,setDetails]=useState([])
    const{id}=useParams()

    async function fetchDetails(){
        try {
            let response=await axios.get("http://localhost:3000/viewall")
            console.log(response.data.data);
            setDetails(response.data.data)
            
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
        } catch (error) { 
            console.log(error);
        }
    }
  return (
    <div>
     {
        details.map((detail,idx)=>{
          return(
            <div key={idx}>
                <p>Name:{detail.companyName}</p>
                <p>Position:{detail.position}</p>
                <p>column:{detail.column}</p>
                <p>salary:{detail.salary}</p>
                <p>jobtype:{detail.jobtype}</p>
                <p>location:{detail.location}</p>
                <p>appliedOn:{detail.appliedOn}</p>
                <p>deadline:{detail.deadline}</p>
                <button onClick={()=>deleteDetails(detail._id)}>delete</button>
                <Link to={`/edit/${detail._id}`}><button>edit</button></Link>
            </div>
            
          )
        })
     }
    </div>
  )
}

export default Viewall