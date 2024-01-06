import React from "react"
import "./footer.css"

const Footer = () => {
  return (
    <>
      <section className='newletter'>
        <div className='container flexSB'>
          <div className='left row'>
            <h1>Write to us here</h1>
            <span></span>
          </div>
          <div className='right row'>
            <input type='text' placeholder='Enter email address' />
            <i className='fa fa-paper-plane'></i>
          </div>
        </div>
      </section>
      <footer>
        <div className='container padding'>
          <div className='box logo'>
            <h1>NIELIT</h1>
            <span>EDUCATION & LEARNING</span>
            <p>National Institute of Electronics and Information Technology, formerly known as the DOEACC Society, is a society that offers Information Technology and Electronics training at different levels.</p>

            <a href="https://www.facebook.com/NIELITIndia/" target="_blank" rel="noopener noreferrer">
        <i className='fab fa-facebook-f icon'></i>
      </a>
      <a href="https://twitter.com/NIELITIndia?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor" target="_blank" rel="noopener noreferrer">
        <i className='fab fa-twitter icon'></i>
      </a>
      <a href="https://www.instagram.com/kol_nielit/" target="_blank" rel="noopener noreferrer">
        <i className='fab fa-instagram icon'></i>
      </a>
          </div>
          <div className='box link'>
            <h3>Explore</h3>
            <ul>
              <li>About Us</li>
              <li>Services</li>
              <li>Courses</li>
              <li>Blog</li>
              <li>Contact us</li>
            </ul>
          </div>
          <div className='box link'>
            <h3>Quick Links</h3>
            <ul>
              <li>Contact Us</li>
              <li>Terms & Conditions</li>
              <li>Privacy</li>
              <li>Feedbacks</li>
            </ul>
          </div>
          
          <div className='box last'>
            <h3>Have a Questions?</h3>
            <ul>
              <li>
                <i className='fa fa-map'></i>
                Jadavpur University Campus, Kolkata-700032
              </li>
              <li>
                <i className='fa fa-phone-alt'></i>
                (033) 2414 - 6054/ 6081
              </li>
              <li>
                <i className='fa fa-paper-plane'></i>
                dir-kolkata@nielit.gov.in kolkata@nielit.gov.in
              </li>
            </ul>
          </div>
        </div>
      </footer>
      <div className='legal'>
        <p>
          Copyright ©2023 All rights reserved by NIELIT
        </p>
      </div>
    </>
  )
}

export default Footer
