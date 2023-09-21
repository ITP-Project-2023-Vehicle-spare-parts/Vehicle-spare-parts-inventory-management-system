import React from 'react'
import Helmet from 'react-helmet';
import {AiOutlineHome, AiOutlineMail, AiOutlineInfoCircle} from 'react-icons/ai'
import {BiPhoneCall} from 'react-icons/bi'

const Contact = () => {
  return (
    <>
     <Helmet>
      <meta charSet="utf-8" />
      <title>Contact us</title>
    </Helmet>
    <div className='home-wrapper-2'>
      <center><h4><br/>.....Contact us.....<br/><br/></h4></center>
    </div>
    <div className='contact-wrapper py-5 home-wrapper-2'>
      <div className='container-xxl'>
        <div className='row'>
          <div className='col-12'>
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3955.2924940236257!2d80.44355767617266!3d7.543046568871133!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae337d17b32999f%3A0x8c334ecb06173fdb!2sBank%20of%20Ceylon!5e0!3m2!1sen!2slk!4v1695323648129!5m2!1sen!2slk" width="600" height="450" className="border-0 w-100" title="cntctusage" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
          </div>
          <div className='col-12 mt-5'>
            <div className='contact-inner-wrapper d-flex justify-content-between'>
              <div>
                <h3 className='contact-title'>....Get in touch with us....</h3><br/>
                <div>
                  <ul className='ps-0'>
                    <li className='mb-3 d-flex gap-15 align-items-center'>
                      <AiOutlineHome className='fs-5'/>
                      <address className='mb-0'>
                      Chathura spare parts, Dambulla road, Ibbagamuwa, 60500, Sri Lanka.
                      </address>
                    </li>
                    <li className='mb-3 d-flex gap-15 align-items-center'>
                      <BiPhoneCall className='fs-5'/>
                      <a href='tel:0912245891'>(+94)91 2245891</a>
                    </li>
                    <li className='mb-3 d-flex gap-15 align-items-center'>
                      <AiOutlineMail className='fs-5'/>
                      <a href='mailto:chathuraspares@gmail.com'>chathuraspares@gmail.com</a>
                    </li>
                    <li className='mb-2 d-flex gap-15 align-items-center'>
                      <AiOutlineInfoCircle className='fs-5'/>
                      <p className='mb-0'>Monday - Friday : 8.00 AM - 5.00 PM</p><br/>
                    </li>
                    <li className='mb-2 d-flex gap-15 align-items-center'>
                      
                      <p className='mb-0 px-5'>Saturday : 8.00 AM - 1.00 PM</p><br/>
                    </li>
                    <li className='mb-2 d-flex gap-15 align-items-center'>
                      
                      <p className='mb-0 px-5'>Sunday & HoliDays : <b>CLOSED</b></p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Contact;