import React from 'react'
import Whatsapp from './icon/whatsapp.png'
import Telegram from './icon/telegram.png'

function AboutUs() {
  return (
    <div className="aboutpage">
    <div className="firstcolumn">
        <div className="row1">
        <div className="column1">
            <h1>About Us</h1>
        <div>
            <p>Welcome to MECTEN website, the centralized platform for textbook resell platform for student in UNITEN under SRC UNITEN.With one click you can see the details about textbooks and list of offered textbook in the website.</p>
        </div>
        </div>
        <div className="column1">
            <h1>Provided Service</h1>
        <div>
            <p>We are providing collecting second hand textbook service, where dealing can be done physically or online through Whatsapp/Telegram business chat platform.
            If dealing is successful. We will buy the textbook from the students, and resell them in this website.
            Transaction only can be done in UNITEN area.</p>
        </div>
        </div>
        </div>
    <div/>


    <div className="contactus">
            <h1>Contact Us</h1>
        </div>

        <div className="row2">
        <div className="column2">
            <img src ={Whatsapp} alt ="" width="100"/>
            <div  id="whatsapp">
            <a href='https://wa.me/message/NBQA3QXGJO23I1'>Whatsapp Us!</a>
            </div>
        </div>

        <div class="column2">
        <img src ={Telegram} alt ="" width="100"/>
        <div  id="telegram">
        <a href='https://t.me/HL_Milk'>Telegram Us!</a>
            </div>
        </div>

        </div>
    

    
    </div>
    </div>
  )
}

export default AboutUs