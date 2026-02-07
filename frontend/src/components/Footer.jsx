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
            <a href="https://github.com/manishjha10" target="_blank"><GitHub className="social-icon" /></a>
            <a href="https://www.linkedin.com/in/manish-jha-2ab78a290/" target="_blank"><LinkedIn className="social-icon"/></a>
            <a href="https://www.youtube.com/" target="_blank"><YouTube className="social-icon" /></a>
            <a href="https://x.com/ManishJha141778" target="_blank"><Twitter className="social-icon" /></a>
          </div>
        </div>
        {/*Section 3*/}
        <div className="footer-section about">
          <h3>About</h3>
          <p>Providing Best Items For you.</p>
        </div>
      </div>
      <div className='footer-bottom'>
        <p> &copy; 2026 𝔈co Mart . All rights reserved</p>
      </div>
    </footer> 
  )
}

export default Footer