import React from 'react';
import {CgMail} from 'react-icons/cg';
import {AiFillInstagram, AiFillFacebook} from 'react-icons/ai';
import {FaWhatsappSquare} from 'react-icons/fa';
import {BsYoutube} from 'react-icons/bs';

const Footer = () => {
  return (
    <>
    <footer className='py-4'>
      <div className='container-xxl'>
        <div className='row align-items-center'>
          <div className='col-5'>
            <div className='footer-top-data d-flex gap-30 align-items-center'>
              <img src="/images/CMLogo.png" height="90" alt='CMlogo' />
              <h2 className='mb-0 text-white'>
                CHATHURA spare parts
              </h2>
            </div>
          </div>
          <div className='col-7'>
            <p className='mb-0 text-white'>Get the freshest offers and promotion from us</p>
            <div className='input-group'>
              <input type='text' className='form-control py-1' placeholder='Your email address...' aria-label='Your email address...' aria-describedby='basin-addon2' />
              <span className='input-group-text p-2' id="basic-addon2">
                Subscribe
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
    <footer className='py-4'>
      <div className='container-xxl'>
        <div className='row'>
          <div className='col-2'>
            <h4 className='mb-4 text-white'>Contact Us</h4>
            <div>
              <address className='text-white fs-6'>Chathura spare parts,<br/>
              Dambulla road, <br/> Ibbagamuwa<br/>
              </address>
              <a className='text-white' href="tel:+94 912245891">(+94)91 2245891</a><br/>
              <a className='text-white' href="mailto:chathuraspares@gmail.com">chathuraspares@gmail.com</a>
            </div>
          </div>
          <div className='col-2'>
            <h4 className='mb-4 text-white'> </h4>
            <div></div>
          </div>
          <div className='col-2'>
           <h4 className='mb-4 text-white'>Our Brands</h4>
           <div className='brand_icons d-flex align-items-center gap-3'>
              
                <img src="/images/HeroHonda.png" alt="brand_icons" height="50"></img>
              <br />
              
              <img src="/images/Bajajlogo.png" alt="brand_icons" height="50"></img>
              <br />
              
              <img src="/images/Yamaha.png" alt="brand_icons" height="50"></img>
              
            </div>
          </div>
          <div className='col-2'>
            <h4 className='mb-4 text-white'>.</h4>
            <div></div>
          </div>
          <div className='col-2'>
            <h4 className='mb-4 text-white'>.</h4>
            <div></div>
          </div>
          <div className='col-2'>
            <h4 className='mb-4 text-white'>Follow us</h4>
            <div className='social_icons d-flex align-items-center gap-3'>
              <a href = "https://mail.google.com/mail/">
                <CgMail className='text-white fs-2'/>
              </a>
              <a href = "https://mail.google.com/mail/">
              <AiFillInstagram className='text-white fs-2'/>
              </a>
              <a href = "https://mail.google.com/mail/">
              <AiFillFacebook className='text-white fs-2'/>
              </a>
              <a href = "https://mail.google.com/mail/">
              <FaWhatsappSquare className='text-white fs-2'/>
              </a>
              <a href = "https://mail.google.com/mail/">
              <BsYoutube className='text-white fs-2'/>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
    <footer className='py-1'>
      <div className='container-xxl'>
        <div className='row'>
          <div className='col-12'>
            <p className='text-center mb-0 text-white'>&copy; { new Date().getFullYear} 2023: Powered by IT_WD_B01_G12 Developers</p>
          </div>
        </div>
      </div>
    </footer>
    </>
 );
};
export default Footer;