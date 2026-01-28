import React from 'react'
import '../componentStyles/Footer.css'
import {
  Phone,
  Mail,
  GitHub,
  Twitter,
  LinkedIn,
  YouTube
} from '@mui/icons-material'

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* section - 1 */}
        <div className="footer-section contact">
          <h3>Contact Us</h3>
          <p><Phone fontSize="small" /> Phone: +91 8791532165</p>
          <p><Mail fontSize="small" /> Email: jhas67761@gmail.com</p>
        </div>
        {/* section - 2 */}
        <div className="footer-section social">
          <h3>Follow me</h3>
          <div className="social-links">
            <a href="" target="_blank"><GitHub className="social-icon" /></a>
            <a href="" target="_blank"><LinkedIn className="social-icon"/></a>
            <a href="" target="_blank"><YouTube className="social-icon" /></a>
            <a href="" target="_blank"><Twitter className="social-icon" /></a>
          </div>
        </div>
        {/*Section 3*/}
        <div className="footer-section about">
          <h3>About</h3>
          <p>Providing Best Items For you.</p>
        </div>
      </div>
      <div className='footer-bottom'>
        <p> &copy; 2026 EcoMart . All rights reserved</p>
      </div>
    </footer> 
  )
}

export default Footer