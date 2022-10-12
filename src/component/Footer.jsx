import React from 'react'
import CompanyLogo from "../static/Rectangle 32.png"
import {Link} from "react-router-dom"



function Footer() {
    return (
        <div className="footerContainer">

            <div className="footerMain">
              
              <div className="footerMainLeft">
                 <img style={{width:"7rem"}} src={CompanyLogo} alt="Company Logo Footer"/>
                 <p>
                   <b>MEIYO BOEKI SHOKAI</b>
                   <br/>
                   <br/>
                   <span>
                        ProPalace AzuchiMachi Bldg., 2nd Floor, 1-6-19, AzuchiMachi, Chuoku, Osaka 541-0052, Japan
                   </span>
                   <br/>
                   {/* WORKING HOURS */}
                   Working Hours : 9:30AM - 5:30PM,  Mon to Fri 
                 </p>

                 <p>
                    Tel: <a href="tel:+81 6 6264 0190"><i>+81 6 6264 0190</i></a><br/>
                    Fax: <i>+81 6 6264 0147</i><br/>
                    Whatsapp: <a href="tel:+81 80 4242 1511"><i>+81 80 4242 1511</i></a><br/>
                    Whatsapp/Viber: <a href="tel:+81 80 3818 2932"><i>+81 80 3818 2932</i></a><br/>
                 </p>
{/* 
                 <ul>
                 <li>
                   <Link><FacebookIcon/></Link>
                 </li>     
                 <li>
                  <Link><InstagramIcon/></Link>
                 </li>                 
                 <li>
                  <Link><TwitterIcon/></Link>
                 </li>     
               </ul> */}
              </div>

              <div className="footerMainCenter">
                {/* <ul>
                    <li>
                        <Link>Terms and Conditions</Link>
                    </li>     
                    <li>
                    <Link>Privacy Policy</Link>
                    </li>                 
                    <li>
                    <Link>About MBS</Link>
                    </li>     
                    <li>
                    <Link>Terms and Conditions</Link>
                    </li>     
                    <li>
                    <Link>Privacy Policy</Link>
                    </li>                 
                    <li>
                    <Link>About MBS</Link>
                    </li>     
                </ul> */}
              </div>
              
              <div className="footerMainRight">
                    <ul>
                        <li>
                        <a href="/terms-and-conditions">Terms and Conditions</a>
                        </li>     
                        <li>
                        <a href="/privacy-policy">Privacy Policy</a>
                        </li>                 
                        <li>
                          <a href="/aboutus">About MBS</a>
                        </li>
                    </ul>
{/* 
                    <Divider/>
                    <br/>
                    <input type="email" className="std-input2" placeholder="Drop your email."/>
                    <br/>
                    <br/>
                    <button className="std-button-sun">Subscribe</button> */}

              </div>

            </div>
         
            <p id="allrightres">© 2021 MEIYO BOEKI SHOKAI. ALL RIGHTS RESERVED</p>
            <div className="footerGradient">
            </div>

        </div>
    )
}

export default Footer
