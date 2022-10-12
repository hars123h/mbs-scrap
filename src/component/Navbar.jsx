import React, { useState, useEffect } from 'react'
import { useHistory, Link } from 'react-router-dom'
import Clock from "./Clock"
import { NavLink } from "react-router-dom"
import logo from "../static/Rectangle 32.png"
import DefaultUser from "../static/Ellipse 1.png"
import { Tooltip, Avatar } from "@material-ui/core"
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';


function Navbar({ searchActive }) {

  const [islogin, setIsLogin] = useState(false);
  // const [searchActive, setSearchActive] = useState("")


  useEffect(() => {
    if (localStorage.getItem("token") !== "null") {
      setIsLogin(true)
    }
  }, [])

  const history = useHistory()
  // console.log("URL", window.location.href)

  const logOut = () => {
    const userName = localStorage.getItem("username")

    // console.log(userName);
    if (userName === "Superuser") {
      var KEYS = ["token", "username", "superuser"]
    }
    else if (userName === "SuperHeadAdmin") {
      var KEYS = ["token", "username", "SuperHeadAdmin"]
    }
    else {
      var KEYS = ["token", "username", "superuser"]
    }
    KEYS.forEach((item) => {
      localStorage.removeItem(item)
    })
    history.replace("/")
  }
let userName = JSON.parse(localStorage.getItem("data"))
  return (
    <div className="navbarContainer fixwidth">
      <div className="navbarLogoTime">
        <Link to="/">
          <img
            className="NAVBARLOGO"
            style={{ cursor: "pointer", width: "6rem" }} src={logo} alt="Navigation Bar Company logo" />
        </Link>
        <Clock />
      </div>
      <div className="navbarLinks">
        <div>
          <NavLink to="/search_results/brand/null/name/null/model/null/min_year/1900/max_year/2100/min_engine/0/max_engine/10000000/odo_min/0/odo_max/100000/bid/true/one_price/true"

            exact className={`navbarLink  ${searchActive}`} activeClassName="activeLink">Auction</NavLink>
        </div>
        <div>
          <NavLink to="/howtobuy" className="navbarLink" activeClassName="activeLink">How to Buy</NavLink>
        </div>
        <div>
          <NavLink to="/aboutus" className="navbarLink" activeClassName="activeLink">About Us</NavLink>
        </div>
        <div>
          <NavLink to="/contact" className="navbarLink" activeClassName="activeLink">Contact</NavLink>
        </div>
      </div>
      {
        localStorage.getItem("token") !== null
          ?
          <div className="navbarProfile">
            <div className="avatar">{userName?.name?.[0].toUpperCase()}</div>
            <p style={{ textTransform: "capitalize" }}>Hi,<span>{userName?.name}</span></p>
            {
              localStorage.getItem("superuser") === "false"
                ?
                <div className="dropdown">

                  <ul>
                    <li><Link to="/a/bh">Bid History</Link></li>
                    <li><Link to="/a/ph">Recent Purchases</Link></li>
                    <li><Link to="/a/fl">Favourite List</Link></li>
                    <li><Link to="/a/c">Customers</Link></li>
                    <li><Link to="/a/f">Funds</Link></li>
                    <li><Link to="/a/s">Settings</Link></li>
                    <li><p onClick={logOut}>Logout</p></li>
                  </ul>
                </div>
                : localStorage.getItem("superuser") === "true" ?
                  <div className="dropdown">

                    <ul>
                      <li><Link to="/su/todays_bid">Today's Bids</Link></li>
                      <li><Link to="/su/bid_history">Agent Wise Bid History</Link></li>
                      <li><Link to="/su/solds/agents">Agent Wise Purchases</Link></li>
                      <li><Link to="/su/agents">Management</Link></li>
                      <li><Link to="/su/funds">Funds</Link></li>
                      {/* <li><Link to="/su/generate-invoice">Pending Approvals</Link></li> */}
                      <li><Link to="/su/settings">Settings</Link></li>
                      <li><p onClick={logOut}>Logout</p></li>
                    </ul>
                  </div> :
                  <div className="dropdown">
                    <ul>
                      <li><Link to="/sa/todays_bid">Today's Bids</Link></li>
                      <li><Link to="/sa/bid_history">Agent Wise Bid History</Link></li>
                      <li><Link to="/sa/purchases">Agent Wise Purchases</Link></li>
                      <li><Link to="/sa/agentsAdmins">Management</Link></li>
                      <li><Link to="/sa/funds">Funds</Link></li>
                      <li><Link to="/sa/generate-invoice">Pending Approvals</Link></li>
                      <li><Link to="/sa/settings">Settings</Link></li>
                      <li><p onClick={logOut}>Logout</p></li>
                    </ul>
                  </div>

            }

            <span><ArrowDropDownIcon /></span>
          </div>
          :
          <div style={{ display: "flex" }}>
            <button onClick={() => window.location.href = "/contact"} className="std-button-search" style={{ marginRight: "1rem", color: "white", fontSize: "1.2rem", padding: "0.5rem 2.5rem" }}>Signup</button>
            <button onClick={() => window.location.href = "/login"} className="std-button-2" style={{ fontSize: "1.2rem", padding: "0.5rem 2.5rem" }}>Login</button>

          </div>
      }
    </div>
  )
}

export default Navbar