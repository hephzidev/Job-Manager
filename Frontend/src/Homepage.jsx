import React from 'react'
import style from "./Homepage.module.css"
import { Link } from 'react-router-dom'

const Homepage = () => {
  return (
    <div className={style.mainContainer}>
        {/* //nav section--- */}
        <div className={style.navbar} >
            <div className={style.logoSection}>
                <h2 className={style.logo}>Job Tracker Application</h2>

            </div>
            <div className={style.navLinks}>
                <p className={style.navItem}>Job Tracker</p>
                <p className={style.navItem}>Free AI Tools</p>
                <p className={style.navItem}>For Organization</p>
            </div>
            <div className={style.navButtons}>
                <Link to={"/signup"}><p className={style.loginBtn}>Login</p></Link>
              
              <Link to={"/signup"}><button className={style.startBtn}>Get started</button></Link>
            </div>
        </div>

    
    {/* hero section */}
    <div className={style.heroSection}>
        <div className={style.mainHeading}>
            <h1 className={style.mainHeading}> Stay Organized on your job hunt</h1>
        </div>
        <p className={style.subHeading}>Track your job applications effortlessly, gain valuable insights, all in one place</p>
        <div className={style.heroButtons}>
            <Link to={"/signup"}><button className={style.getStartedBtn}>Get Started - It's free</button></Link>
           <button className={style.chromeBtn}>chrome extension</button>
        </div>
    </div>
           

           {/*para section  */}
           <div className={style.parasection}>
            <div className={style.subpara}>
                 <p className={style.paraName} >Job Tracker</p>
                 <h2 className={style.paraHeading}>Focus more on applying jobs, not managing them</h2>
                 <p className={style.paraexplanation}> Track jobs from across the web with our Chrome Extension.</p>
                 <p className={style.parapoints}><span className={style.right}>✓</span> One-click save job details on all popular job boards</p>
                 <p className={style.parapoints}> <span className={style.right}>✓</span> Move jobs between columns as you progress through the application process</p>
                 <p className={style.parapoints}><span className={style.right}>✓</span> See your overall job hunt statistics and insight</p>
                 <div className={style.startbutton}>
                    <Link to={"/signup"}><button className={style.getStartedBtn}>Start Tracting</button></Link>
                 </div>
            </div>
           </div>
    </div>
  )
}

export default Homepage