import React from "react"
import Heading from "../../common/heading/Heading"
import "./Hero.css"

const Hero = () => {
  return (
    <>
      <section className='hero'>
        <div className='container'>
          <div className='row'>
            <Heading subtitle='NIELIT leading the way.' title='Where Aspirations Find their Best Digital Future' />
            <p>Empowering India through Digital Literacy</p>
            <div class='buttons'>

  <button class='secondary-btn'>
    <a href='course_page_url_here'>VIEW COURSE <i class='fa fa-long-arrow-alt-right'></i></a>
  </button>
</div>

          </div>
        </div>
      </section>
      
    </>
  )
}

export default Hero
