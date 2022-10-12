import React, { useEffect, useState } from 'react'
import { Route, Switch, NavLink, useHistory, Link, useLocation } from 'react-router-dom'
import LOGO from "../static/Rectangle 32.png"
import Dashboard from "./main/Dashboard"
import Allbids from './main/Allbids'
import ReceiptIcon from '@mui/icons-material/Receipt'
import Reminders from './main/Reminders'
import { success, error } from '../component/Toast'
import Settings from "./main/Settings"
import Customers from './main/Customers'
import PhSpecific from "../component/PhSpecific"
import PurchaseHistory from './main/PurchaseHistory'
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import axios from 'axios'
import common from "../baseUrl"
import GavelIcon from '@mui/icons-material/Gavel';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PersonIcon from '@mui/icons-material/Person';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AInvoicForm from "../pages/AgentInvoice/AInvoicForm"
import AViewInvoice from "../pages/AgentInvoice/AViewInvoice"
import ACreateInvoice from "../pages/AgentInvoice/ACreateInvoice"
import AEditInvoice from "../pages/AgentInvoice/AEditInvoice"
import AInvoiceSearch from "../pages/AgentInvoice/AInvoiceSearch"
import { motion } from "framer-motion"

function AfterLogin() {

  const history = useHistory()
  const [open, setOpen] = useState(false)
  const [favList, setFavList] = useState([])
  const [clientList, setClientList] = useState([])
  const [bidHistory, setBidHistory] = useState([])

  useEffect(() => {

    const response = async () => {
      const result = await axios({
        method: "post",
        url: `${common.baseUrl + "Wishlist/ShowWishlist/"}`,
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`
        }
      })
      setFavList(result.data)
    }
    response()


    const clientsList = async () => {
      const result = await axios({
        method: "post",
        url: `${common.baseUrl + "Login/AllClients/"}`,
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`
        }
      })
      if (result.status === 200) {
        setClientList(result.data)
      }
      else {
        error("Something went wrong")
      }
    }
    clientsList()

    const bidHistory = async () => {
      const response = await axios({
        method: "post",
        url: `${common.baseUrl}Bidding/AllBids/`,
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`
        }
      })
      if (response.status === 200) {
        setBidHistory(response.data)
      }
      else {
        error("There is some error with loading your bid history")
      }
    }
    bidHistory()

  }, [])

  const logOut = () => {
    let KEYS = ["token", "username", "superuser"]
    KEYS.forEach((item) => {
      localStorage.removeItem(item)
    })
    history.replace("/")
  }
  const { pathname } = useLocation();

  const animateLink = {}
  return (
    <>
      <div
        className="dashboardContainer">
        <motion.div
          // animate={{width:open?"20vw":"5rem"}}
          className="dashboardNav">
          <Link to="/">
            <img
              className="NAVBARLOGO"
              src={LOGO} alt="HEAD LOGO" />
          </Link>
          <div className="dashboardNavBody">
            <ul>
              <li><NavLink exact activeClassName="afterLoginActiveLink" to="/a/bh"><GavelIcon /><motion.span animate={animateLink}>Bid History</motion.span></NavLink></li>
              <li><NavLink exact activeClassName="afterLoginActiveLink"
                isActive={() => pathname.includes("/a/ph") || pathname.includes("/sac/alldetails")}
                to="/a/ph"
              >
                <ShoppingCartIcon /><motion.span animate={animateLink}> Recent Purchases</motion.span>
              </NavLink></li>
              <li><NavLink exact activeClassName="afterLoginActiveLink" to="/a/fl"><FavoriteIcon /><motion.span animate={animateLink}> Favourite List</motion.span></NavLink></li>
              <li><NavLink exact activeClassName="afterLoginActiveLink" to="/a/c"><PersonIcon /><motion.span animate={animateLink}> Customers</motion.span></NavLink></li>
              <li><NavLink exact activeClassName="afterLoginActiveLink" to="/a/f"><AttachMoneyIcon /><motion.span animate={animateLink}> Funds</motion.span></NavLink></li>
              {/* <li><NavLink exact activeClassName="afterLoginActiveLink" to="/a/generate-invoice"><ReceiptIcon /><span>Generate Invoice</span></NavLink></li>                     */}
                  {/* <li><NavLink exact activeClassName="afterLoginActiveLink" to="/r"> Account Settings</NavLink></li> */}
            </ul>
          </div>
          <div className="dashboardNavFooter">
            <NavLink exact activeClassName="afterLoginActiveLink" to="/a/s"><SettingsIcon style={{ marginRight: "0.5rem" }} /><motion.span animate={animateLink}>Settings</motion.span></NavLink>
            <div className="logOutLink" onClick={logOut}><LogoutIcon style={{ marginRight: "0.5rem" }} /> <motion.span animate={animateLink}> Logout</motion.span></div>
          </div>
        </motion.div>
        <div className="dashboardMain">
          <Switch>
            <Route exact path="/a/f" component={Reminders} />
            <Route exact path="/a/fl">
              <Dashboard favList={favList} />
            </Route>
            <Route exact path="/a/bh">
              <Allbids bidHistory={bidHistory} />
            </Route>
            <Route exact path={["/a/ph", "/a/ph/:id"]} component={PurchaseHistory} />
            <Route exact path="/a/generate-invoice" component={AInvoicForm} />
            <Route exact path="/a/invoiceDetails" component={ACreateInvoice} />
            <Route exact path="/a/editInvoice/:InvNo" component={AEditInvoice} />
            <Route exact path="/a/viewSearchInvoice" component={AInvoiceSearch} />
            <Route exact path="/a/viewInvoice" component={AViewInvoice} />
            <Route exact path="/a/s" component={Settings} />
            <Route exact path="/a/c">
              <Customers customers={clientList} />
            </Route>
            <Route exact path={"/sac/alldetails/:id"} component={PhSpecific} />
          </Switch>
        </div>
      </div>
    </>
  )
}

export default AfterLogin
