import React, { useEffect, useState } from 'react'
import { Route, Switch, NavLink, useHistory, Link, useLocation } from 'react-router-dom'
import LOGO from "../../static/Rectangle 32.png"
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import Agents from "./Agents"
import Agent from './Agent';
import axios from 'axios'
import BidHistory from './BidHistory';
import BidHistoryAgent from './BidHistoryAgent';
import RecentSold from "./RecentSold";
import SoldsAgents from "./SoldsAgents";
import AllFunds from "./AllFunds";
import Fund from "./Fund";
import common from "../../baseUrl"
import Settings from './Settings';
import TodaysBid from './TodaysBid';
import TaskIcon from '@mui/icons-material/Task';
import GavelIcon from '@mui/icons-material/Gavel';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import HistoryIcon from '@mui/icons-material/History';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import CheckIcon from '@mui/icons-material/Check';
import ReceiptIcon from '@mui/icons-material/Receipt'
import PhSpecific from '../../component/PhSpecific';
import Shipment from './Shipment';
import NotificationsIcon from '@material-ui/icons/Notifications';
import SuKanban from "./taskManagement/components/kanban/Kanban"
import SuNotification from './Notifiction/SuNotification';
import SuPurchaseMain from './SuPurchaseMain';

const Dashboard = () => {
  const [showNotification, setShowNotification] = useState(false)
  const [calsss, setClasses] = useState()
  const history = useHistory()
  const { pathname } = useLocation()
  const [agentList, setAgentList] = useState([])
  useEffect(() => {
    const getAllAgents = async () => {
      const response = await axios({
        method: "post",
        url: `${common.baseUrl}Login/AllAgents/`,
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`
        },
        data: {
          all_agents: true,
        }
      })
      setAgentList(response.data)

    }
    getAllAgents()
  }, [])

  const logOut = () => {
    let KEYS = ["token", "username", "superuser"]
    KEYS.forEach((item) => {
      localStorage.removeItem(item)
    })
    history.replace("/")
  }

  return (

    <div>
      <div className='NotificationMain'>
      </div>
      {
        showNotification && <SuNotification onClose={() => { setShowNotification(false); setClasses("") }} />
      }
      <div className="dashboardContainer">
        <div className="dashboardNav">
          <Link to="/">
            <img
              className="NAVBARLOGO"
              src={LOGO} alt="mbs logo" />
          </Link>
          <div className="dashboardNavBody">
            <ul>
              <li><NavLink exact activeClassName="afterLoginActiveLink"
                to="/su/todays_bid"
              ><GavelIcon /><span>Today's Bids</span></NavLink></li>
              <li><NavLink
                exact
                activeClassName="afterLoginActiveLink"
                to="/su/bid_history"
                isActive={() => pathname.includes('/su/bid_history')}
              ><HistoryIcon /><span>Bid History</span></NavLink></li>
              <li><NavLink exact
                activeClassName="afterLoginActiveLink"
                to="/su/solds/agents"
                isActive={() => pathname.includes("/su/solds") || pathname.includes("/su/purchases/purchase/")}
              ><CheckIcon /><span>Purchases</span></NavLink></li>
              <li><NavLink exact activeClassName="afterLoginActiveLink"
                to="/su/agents"
                isActive={() => pathname.includes("/su/agent")}
              ><ManageAccountsIcon /><span>Management</span></NavLink></li>
              <li><NavLink exact activeClassName="afterLoginActiveLink"
                to="/su/funds"
                isActive={() => pathname.includes("/su/fund")}
              ><AttachMoneyIcon /><span>Funds</span></NavLink></li>
              <li><NavLink exact activeClassName="afterLoginActiveLink"
                to="/su/tasks"
                isActive={() => pathname.includes("/su/tasks")}
              ><TaskIcon /><span>Tasks Management</span></NavLink></li>
              {/* <li><NavLink exact activeClassName="afterLoginActiveLink" to="/su/shipment"><LocalShippingIcon/><span>Shipments</span></NavLink></li> */}
              {/* <li isActive={() => pathname.includes("/su/generate-invoice")}><NavLink exact activeClassName="afterLoginActiveLink" to="/su/generate-invoice"><ReceiptIcon /><span>Pending Approvals</span></NavLink></li> */}
            </ul>
          </div>
          <div className="dashboardNavFooter">
            <NavLink exact activeClassName="afterLoginActiveLink" to="/su/settings"> <SettingsIcon style={{ marginRight: "0.5rem" }} /> Settings</NavLink>
            <div className="logOutLink" onClick={logOut}><LogoutIcon style={{ marginRight: "0.5rem" }} /> Logout</div>
          </div>
        </div>
        <div className="dashboardMain">
          <div className='NotificationMain'>
            <div className={`notificationIcon ${calsss}`}
              onClick={() => { setShowNotification(!showNotification ? true : false); setClasses(calsss === "NotificationiconColo" ? "" : "NotificationiconColo") }}
            >

              <NotificationsIcon />
              <span></span>
            </div>
          </div>
          <Switch>
            <Route exact path="/su/agents">
              <Agents agentList={agentList} />
            </Route>
            <Route exact path="/su/agent/:agent_id" component={Agent} />
            <Route exact path="/su/bid_history">
              <BidHistory agentList={agentList} />
            </Route>
            <Route exact path="/su/todays_bid" component={TodaysBid} />
            <Route exact path="/su/bid_history/:id" component={BidHistoryAgent} />
            <Route exact path={["/su/funds"]} component={AllFunds} />
            <Route exact path="/su/fund/:id" component={Fund} />
            <Route exact path="/su/settings" component={Settings} />
            <Route exact path="/sac/alldetails/:id" component={PhSpecific} />
            <Route exact path="/su/shipment" component={Shipment} />
            <Route exact path="/su/tasks" component={SuKanban} />
            <Route exact path="/su/solds/agents">
              <SuPurchaseMain agentList={agentList} />
            </Route>
            <Route exact path="/su/purchases/purchase/:agent_id">
              <SoldsAgents agentList={agentList} />
            </Route>
            <Route exact path="/su/solds/all/:id" component={RecentSold} />
          </Switch>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
