import React, { useEffect } from "react";
import style from "./Boardpage.module.css";
import Addjob from "./Addjob.jsx";
import { useState } from "react";
import axios from "axios";
import { useParams, Link , useNavigate} from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const Webpage = () => {
  const [showAddJob, setShowAddJob] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [viewJob, setViewJob] = useState();
  const userId = localStorage.getItem("userId");
  const [searchText, setSearchText] = useState("");
  const [filterType, setFilterType] = useState("companyName");
  const [userName, setUserName] = useState("User");

  const { id } = useParams();
  const navigate=useNavigate()

  async function fetchDetails() {
    try {
      const token=  localStorage.getItem("token")
      let response = await axios.get( "http://localhost:3000/viewall",
        {headers:{
          Authorization: `Bearer ${token}`
        }}
      );
        
       console.log("RAW RESPONSE:", response.data);

        const jobsWithLike = response.data.data.map((job) => ({...job, liked: job.likedBy?.some((id) => id && String(id) === String(userId)) || false }));
        setJobs(jobsWithLike);
          console.log("UPDATED JOBS:", jobsWithLike);
      console.log(response.data.data);
      console.log("TOKEN IN BOARD:", token);
      console.log("USER ID:", userId);
    } catch (error) {
      console.log(error);
    } 
  }
  useEffect(() => {
    fetchDetails();
  }, []);


  console.log(localStorage.getItem("userName"));

  async function deleteDetails(id) {
    try {
      const token = localStorage.getItem("token");
      let deletedata = await axios.delete(`http://localhost:3000/delete/${id}`,
        {
          headers :{
            Authorization: `Bearer ${token}`
          }
        }
      );
      console.log(deletedata);
      fetchDetails();
      setShowDeletePopup(false);
    } catch (error) {
      console.log(error);
    }
  }

  function searchValue(e) {
    setSearch(e.target.value);
  }
  const filteredJobs = jobs.filter((job) => {
    return job[filterType]?.toLowerCase().includes(searchText.toLowerCase());
  });

  useEffect(() => {
    const name = localStorage.getItem("userName");
    if (name) {
      setUserName(name);
    }
  }, []);

  async function toggleLike(jobId){
     console.log("Sending:", { userId, jobId }); 
    try {
       const token = localStorage.getItem("token");
      //  console.log("TOKEN:", token);

      let liked=await axios.post("http://localhost:3000/like",{jobId},{headers:{Authorization:`Bearer ${token}`}})
        fetchDetails(); 
    } catch (error) {
      console.log("liked error:",error); 
    }
  }

  function handleLogout(){
    localStorage.clear()
    navigate("/")
  }

  return (
    <div>
      <div className={style.header}>
        <h2>Job hunt 2026</h2>

        <input
          type="text"
          placeholder={`Search ${filterType}...`}
          className={style.search}
          onChange={(e) => setSearchText(e.target.value)}
        />

        <div className={style.headerbuttons}>
          <div className={style.container}>
            <img
              src="profile.png"
              className={style.profileimage}
              alt="user avatar"
            />
            <span className={style.badge}>
              Welcome, {userName || "User"} 👋
            </span>
          </div>

          <div class="btn-group">
            <button
              type="button"
              class="btn  btn-primary btn-custom dropdown-toggle"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              ☰ Filter
            </button>
            <ul class="dropdown-menu">
              <li>
                <a
                  class="dropdown-item"
                  onClick={() => setFilterType("companyName")}
                  href="#"
                >
                  Company
                </a>
              </li>
              <li>
                <a class="dropdown-item" onClick={() => setFilterType("position")} href="#"> Position</a>
              </li>
              <li>
                <a
                  class="dropdown-item"
                  onClick={() => setFilterType("location")}
                  href="#"
                >
                  Location
                </a>
              </li>
              <li>
                <a
                  className="dropdown-item"
                  onClick={() => setFilterType("all")}
                  href="#"
                >
                  All
                </a>
              </li>
            </ul>
          </div>

         
            <button onClick={handleLogout}>Logout</button>
       
          <button onClick={() => setShowAddJob(true)}>Add job</button>
        </div>
      </div>

      <div className={style.board}>
        <div className={style.column}>
          <div className={style.jobcolumn}>
            <p className={`${style.columnpara} ${style.box1}`}>Wishlist</p>
          </div>
          {jobs
            .filter((job) => job.status == "Wishlist")
            .filter((job) => {
              const value = searchText.toLowerCase();

              if (!value) return true;

              if (filterType === "all") {
                return (
                  job.companyName?.toLowerCase().includes(value) ||
                  job.position?.toLowerCase().includes(value) ||
                  job.location?.toLowerCase().includes(value)
                );
              }

              return job[filterType]?.toLowerCase().includes(value);
            })
            .map((job, idx) => {
              return (
                <div key={idx} className={`${style.jobcard} ${style.cardone}`}>
                  <div className={style.card}>
  <div className={`${style.heartBox} ${job.liked ? style.liked : ""}`} onClick={(e) => { e.stopPropagation(); toggleLike(job._id)}} style={{ cursor: "pointer" }}>{job.liked ? <FaHeart  style={{ color: "red" }}/> : <FaRegHeart style={{ color: "gray" }}/>}</div>
  <h4>{job.companyName}</h4>
    <p>Position : {job.position}</p>
                  <p>Salary : {job.salary}</p>
                    <p>
                    <strong>Location: </strong>
                    {""}
                    <a
                      className={style.link}
                      href={`http://www.google.com/maps/search/${job.location}`}
                    >
                      {job.location}
                    </a>
                  </p>
                  
                  <div className={style.buttongroups}>
                    <Link to={`/edit/${job._id}`}>
                      <button className={style.editbtn}>edit</button>
                    </Link>
                    <button
                      className={style.deletebtn}
                      onClick={() => {
                        setShowDeletePopup(true);
                        setDeleteId(job._id);
                      }}
                    >
                      delete
                    </button>
                    <button
                      className={style.viewbtn}
                      onClick={() => {
                        setViewJob(job);
                      }}
                    >
                      view
                    </button>
                  </div>
</div>
              

                </div>
              );
            })}
        </div>

        <div className={style.column}>
          <div className={style.jobcolumn}>
            <p className={`${style.columnpara} ${style.box2}`}>Applied</p>
          </div>
          {jobs
            .filter((job) => job.status == "Applied")
            .filter((job) => {
              const value = searchText.toLowerCase();

              if (!value) return true;

              if (filterType === "all") {
                return (
                  job.companyName?.toLowerCase().includes(value) ||
                  job.position?.toLowerCase().includes(value) ||
                  job.location?.toLowerCase().includes(value)
                );
              }

              return job[filterType]?.toLowerCase().includes(value);
            })
            .map((job, idx) => {
              return (
                <div key={idx} className={`${style.jobcard} ${style.cardtwo}`}>
                                 <div className={style.card}>
  <div className={`${style.heartBox} ${job.liked ? style.liked : ""}`} onClick={(e) => { e.stopPropagation(); toggleLike(job._id)}} style={{ cursor: "pointer" }}>{job.liked ? <FaHeart style={{ color: "red" }} /> : <FaRegHeart style={{ color: "gray" }}/>}</div>
  <h4>{job.companyName}</h4>
      <h5>companyName : {job.companyName}</h5>
                  <p>Position : {job.position}</p>
                  <p>Salary : {job.salary}</p>
                  <p>
                    <strong>Location: </strong>
                    {""}
                    <a
                      className={style.link}
                      href={`http://www.google.com/maps/search/${job.location}`}
                    >
                      {job.location}
                    </a>
                  </p>
                  <div className={style.buttongroups}>
                    <Link to={`/edit/${job._id}`}>
                      <button className={style.editbtn}>edit</button>
                    </Link>
                    <button
                      className={style.deletebtn}
                      onClick={() => {
                        setShowDeletePopup(true);
                        setDeleteId(job._id);
                      }}
                    >
                      delete
                    </button>
                    <button
                      className={style.viewbtn}
                      onClick={() => {
                        setViewJob(job);
                      }}
                    >
                      view
                    </button>
                  </div>
</div>
              
                </div>
              );
            })}
        </div>

        <div className={style.column}>
          <div className={style.jobcolumn}>
            <p className={`${style.columnpara} ${style.box3}`}>Interviewing</p>
          </div>
          {jobs
            .filter((job) => job.status == "Interviewing")
            .filter((job) => {
              const value = searchText.toLowerCase();

              if (!value) return true;

              if (filterType === "all") {
                return (
                  job.companyName?.toLowerCase().includes(value) ||
                  job.position?.toLowerCase().includes(value) ||
                  job.location?.toLowerCase().includes(value)
                );
              }

              return job[filterType]?.toLowerCase().includes(value);
            })
            .map((job, idx) => {
              return (
                <div
                  key={idx}
                  className={`${style.jobcard} ${style.cardthree}`}
                >
                                 <div className={style.card}>
  <div className={`${style.heartBox} ${job.liked ? style.liked : ""}`} onClick={(e) => { e.stopPropagation(); toggleLike(job._id)}} style={{ cursor: "pointer" }}>{job.liked ? <FaHeart style={{ color: "red" }}/> : <FaRegHeart style={{ color: "gray" }}/>}</div>
  <h4>{job.companyName}</h4>
    <h5>Company Name : {job.companyName}</h5>
                  <p>Position : {job.position}</p>
                  <p>Salary : {job.salary}</p>
                  <p>
                    <strong>Location: </strong>
                    {""}
                    <a
                      className={style.link}
                      href={`http://www.google.com/maps/search/${job.location}`}
                    >
                      {job.location}
                    </a>
                  </p>
                  <div className={style.buttongroups}>
                    <Link to={`/edit/${job._id}`}>
                      <button className={style.editbtn}>edit</button>
                    </Link>
                    <button
                      onClick={() => {
                        setShowDeletePopup(true);
                        setDeleteId(job._id);
                      }}
                      className={style.deletebtn}
                    >
                      delete
                    </button>
                    <button
                      className={style.viewbtn}
                      onClick={() => {
                        setViewJob(job);
                      }}
                    >
                      view
                    </button>
                  </div>
</div>
               
                
                </div>
              );
            })}
        </div>

        <div className={style.column}>
          <div className={style.jobcolumn}>
            <p className={`${style.columnpara} ${style.box4}`}>Offer</p>
          </div>
          {jobs
            .filter((job) => job.status == "Offer")
            .filter((job) => {
              const value = searchText.toLowerCase();

              if (!value) return true;

              if (filterType === "all") {
                return (
                  job.companyName?.toLowerCase().includes(value) ||
                  job.position?.toLowerCase().includes(value) ||
                  job.location?.toLowerCase().includes(value)
                );
              }

              return job[filterType]?.toLowerCase().includes(value);
            })
            .map((job, idx) => {
              return (
                <div key={idx} className={`${style.jobcard} ${style.cardfour}`}>
                                 <div className={style.card}>
  <div className={`${style.heartBox} ${job.liked ? style.liked : ""}`} onClick={(e) => { e.stopPropagation(); toggleLike(job._id)}} >{job.liked ? <FaHeart style={{ color: "red" }}/> : <FaRegHeart style={{ color: "gray" }}/>}</div>
  <h4>{job.companyName}</h4>
   <h5>Company Name : {job.companyName}</h5>
                  <p>Position : {job.position}</p>
                  <p>Salary : {job.salary}</p>
                  <p>
                    <strong>Location: </strong>
                    {""}
                    <a
                      className={style.link}
                      href={`http://www.google.com/maps/search/${job.location}`}
                    >
                      {job.location}
                    </a>
                  </p>
                  <div className={style.buttongroups}>
                    <Link to={`/edit/${job._id}`}>
                      <button className={style.editbtn}>edit</button>
                    </Link>
                    <button
                      className={style.deletebtn}
                      onClick={() => {
                        setShowDeletePopup(true);
                        setDeleteId(job._id);
                      }}
                    >
                      delete
                    </button>
                    <button
                      className={style.viewbtn}
                      onClick={() => {
                        setViewJob(job);
                      }}
                    >
                      view
                    </button>
                  </div>
</div>
                 
                </div>
              );
            })}
        </div>

        <div className={style.column}>
          <div className={style.jobcolumn}>
            <p className={`${style.columnpara} ${style.box5}`}>Rejected</p>
          </div>
          {jobs
            .filter((job) => job.status == "Rejected")
            .filter((job) => {
              const value = searchText.toLowerCase();

              if (!value) return true;

              if (filterType === "all") {
                return (
                  job.companyName?.toLowerCase().includes(value) ||
                  job.position?.toLowerCase().includes(value) ||
                  job.location?.toLowerCase().includes(value)
                );
              }

              return job[filterType]?.toLowerCase().includes(value);
            })
            .map((job, idx) => {
              return (
                <div key={idx} className={`${style.jobcard} ${style.cardfive}`}>
                                 <div className={style.card}>
  <div className={`${style.heartBox} ${job.liked ? style.liked : ""}`} onClick={(e) => { e.stopPropagation(); toggleLike(job._id)}}>{job.liked ? <FaHeart style={{ color: "red" }}/> : <FaRegHeart style={{ color: "gray" }} />}</div>
  <h4>{job.companyName}</h4>
  <h5>Company Name : {job.companyName}</h5>
                  <p>Position : {job.position}</p>
                  <p>Salary : {job.salary}</p>
                  <p>
                    <strong>Location: </strong>
                    {""}
                    <a
                      className={style.link}
                      href={`http://www.google.com/maps/search/${job.location}`}
                    >
                      {job.location}
                    </a>
                  </p>
                  <div className={style.buttongroups}>
                    <Link to={`/edit/${job._id}`}>
                      <button className={style.editbtn}>edit</button>
                    </Link>
                    <button
                      className={style.deletebtn}
                      onClick={() => {
                        setShowDeletePopup(true);
                        setDeleteId(job._id);
                      }}
                    >
                      delete
                    </button>
                    <button
                      className={style.viewbtn}
                      onClick={() => {
                        setViewJob(job);
                      }}
                    >
                      view
                    </button>
                  </div>
</div>
                  
                </div>
              );
            })}
        </div>

        {showAddJob && (
          <div className={style.popupoverlay}>
            <div className={style.popup}>
              <Addjob
                closePopup={() => setShowAddJob(false)}
                refreshJobs={fetchDetails}
              />
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
                  onClick={() => setShowDeletePopup(false)}
                >
                  Cancel
                </button>

                <button
                  className={style.deleteBtn}
                  onClick={() => deleteDetails(deleteId)}
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
              <button className={style.close} onClick={() => setViewJob(null)}>
                ✕
              </button>

              <h2 className={style.viewTitle}>{viewJob.companyName}</h2>

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
                <a
                  className={style.link + " " + style.wordBreak}
                  href={
                    viewJob.jobURL.startsWith("http")
                      ? viewJob.jobURL
                      : `https://${viewJob.jobURL}`
                  }
                >
                  {viewJob.jobURL}
                </a>
              </p>

              <p className={style.viewText}>
                <span>Location:</span>
                <a
                  className={style.link + " " + style.wordBreak}
                  href={`http://www.google.com/maps/search/${viewJob.location}`}
                >
                  {viewJob.location}
                </a>
              </p>

              <p className={style.viewText}>
                <span>Applied On:</span> {viewJob.appliedOn?.split("T")[0]}
              </p>

              <p className={style.viewText}>
                <span>Deadline:</span> {viewJob.deadline?.split("T")[0]}
              </p>

              <div className={style.descriptionBox}>
                <span>Description: </span> {viewJob.description}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Webpage;
