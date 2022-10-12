import React, { useState } from 'react'
import range from "../static/HeroContainer.jpg"
import Link from '@mui/material/Link';
import axios from 'axios';
import { useHistory } from 'react-router';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { error } from "../component/Toast"
import common from "../baseUrl"
import LOGOBG from "../static/MBS Auto Avenue Icon Purple.png"
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useLocation } from 'react-router';
import _ from 'lodash';
import { Login } from '@mui/icons-material';

const SigninAsSuperAdmin = () => {

  const { search } = useLocation()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [asWhat, setAsWhat] = useState(false)
  // false for normal agents and true for superuser

  const history = useHistory()
  document.title = "Login - MBS Auction Avenue";

  const submitSignin = async () => {
    try {
      if (email !== "" && password !== "") {
        let urlForRequest;
       
          urlForRequest = `${common.baseUrl}Login/SuperHeadAdminLogin/`
        
        
        
        const result = await axios({
          method: "post",
          url: urlForRequest,
          data: {
            username: email,
            password,
          },
          
        })
        if (result) {
         
            let url = "Login/SuperHeadAdminDetails/"
          
          const response = await axios({
            method: "get",
            url: `${common.baseUrl}${url}`,
            headers: {
              Authorization: `Token ${result?.data.token}`
            }
          })
          localStorage.setItem("username", "SuperHeadAdmin")
          localStorage.setItem("token", result.data.token)
          localStorage.setItem("data", JSON.stringify(response?.data))
            localStorage.setItem("SuperHeadAdmin", true);
            if (search.length !== 0) {
              history.replace(`/specific_car/${search.slice(1,).split("=")[1]}`)
            }
            else {
              history.replace("/sa/todays_bid")

            }
        }
        else
          error("You have entered something wrong!")
      }
      else {
        error("Please enter all details")
      }

    } catch (e) {
      error("Unable to Login with this credential")
    }

  }



  return (
    <div className="signinContainer">
      <div className="signinMain">
        <Link href="/" className="backIcon">
          <ArrowBackIosNewIcon />
        </Link>
        <div>
          <img src={LOGOBG} alt="MBS LOGO" />
          <h1>Login</h1>
          <div>
            <input
              className="std-input1"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Username"
              type="email" />
            <input
              className="std-input1"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Password"
              type="password" />
            {/* <div>
              <div>
                <input
                  value={asWhat}
                  onChange={() => setAsWhat(!asWhat)}
                  id="checkbox" className="std-input1" type="checkbox" />
                <label for="checkbox">As an Super Admin</label>
              </div>
              <Link style={{ cursor: "pointer" }} onClick={() => { document.getElementById("mobileImg").classList.add("extraclassonImg") }}>Forgot Password ?</Link>
            </div> */}
            <button
              onClick={submitSignin}
              className="std-button-sun">
              <span>Login</span>
              <ArrowForwardIcon />
            </button>
          </div>
        </div>
      </div>
      <div className="signinMain">
        <div>
          <h1>Forgot Password</h1>
          <div>
            <input className="std-input1"
              placeholder="Username/Email"
              type="text" />
            <div style={{ marginTop: "1rem" }}>
              <Link style={{ cursor: "pointer" }} onClick={() => { document.getElementById("mobileImg").classList.remove("extraclassonImg") }}>Back To SignIn ?</Link>
            </div>
            <button className="std-button-sun">Send Link</button>
          </div>
        </div>
      </div>
      <div className="signinImage" id="mobileImg">
        <img src={range} alt="range.png" />
        {/* <div>
                  
                  <h3>Range Rover Westminster Edition</h3>
                  <p>A truly first-class travel experience. Range Rover's sublime and beautifully appointed interior features executive four seat comfort with five seat versatility.</p>
                </div> */}
      </div>

    </div>
  )
}

export default SigninAsSuperAdmin
