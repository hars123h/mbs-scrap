import React, { useEffect, useState } from 'react'
import { Route, Switch, NavLink, useHistory, Link, useLocation } from 'react-router-dom'
import LOGO from "../../static/Rectangle 32.png"
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import Agents from "../Superuser/Agents"
import SaAgent from '../../pages/Superadmin/SaAgent'
import SaAdmins from '../../pages/Superadmin/SaAdmins'
import axios from 'axios'
import BidHistory from '../Superuser/BidHistory';
import BidHistoryAgent from '../Superuser/BidHistoryAgent';
import RecentSold from "../Superuser/RecentSold";
import SoldsAgents from "../Superuser/SoldsAgents";
import AllFunds from "../Superuser/AllFunds";
import Fund from "../Superuser/Fund";
import common from "../../baseUrl"
import Settings from '../Superuser/Settings';
import TodaysBid from '../Superuser/TodaysBid';
import GavelIcon from '@mui/icons-material/Gavel';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import HistoryIcon from '@mui/icons-material/History';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import CheckIcon from '@mui/icons-material/Check';
import ReceiptIcon from '@mui/icons-material/Receipt'
import PhSpecific from '../../component/PhSpecific';
import Shipment from '../Superuser/Shipment';
import GenerateInvoiceRS from '../Superuser/GenerateInvoiceRS';
import SaAgentsAdmins from './SaAgentsAdmins';
import SaTodaysBid from './SaTodaysBid';
import SaBidHistoryAgent from './SaBidHistoryAgent';
import SaPurchase from './SaPurchase';
import SaViewInvoice from './SaViewInvoice'
import SaEditInvoice from './SaEditInvoice'
import SaPurchaseMain from "../Superadmin/SaPurchaseMain"
import SaFund from './SaFund';
import SaAllFunds from './SaAllFunds';
import saTotalFundsAgent from './SaTotalFundsAgent';
import NotificationsIcon from '@material-ui/icons/Notifications';
import TaskIcon from '@mui/icons-material/Task';
import SaInvoicForm from './SaInvoicForm';
import SaCreateInvoice from './SaCreateInvoice';
import SaInvoiceSearch from './SaInvoiceSearch';
import Kanban from './taskManagement/components/kanban/Kanban';

import Notification from '../../component/Notification';
import { stepClasses } from '@mui/material';
import Tracker from '../Tracker';

function SaDashborad() {
  const history = useHistory()
  const { pathname } = useLocation()
  const [agentList, setAgentList] = useState([])
  const [isNotificatoinViewed, setIsNotificatoinViewed] = useState(false)
  const [showNotification, setShowNotification] = useState(false)
  const [calsss, setClasses] = useState()
  const [Notifications, setNotifications] =
    useState([
      {
        biding: [
          {
            notification: "notification 1"
          },
          {
            notification: "notification 2"
          },
          {
            notification: "notification 3"
          }
        ],
        invoiceGeneration: [
          {
            notification: "notification 1"
          },
          {
            notification: "notification 2"
          },
          {
            notification: "notification 3"
          }
        ]
      },

    ])
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
    let KEYS = ["token", "username", "SuperHeadAdmin"]
    KEYS.forEach((item) => {
      localStorage.removeItem(item)
    })
    history.replace("/salogin")



  }

  return (

    <>

      {
        showNotification && <Notification onClose={() => { setShowNotification(false); setClasses("") }} />
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
                to="/sa/todays_bid"
              ><GavelIcon /><span>Today's Bids</span></NavLink></li>
              <li><NavLink
                exact
                activeClassName="afterLoginActiveLink"
                to="/sa/bid_history"
                isActive={() => pathname.includes('/sa/bid_history')}
              ><HistoryIcon /><span>Bid History</span></NavLink></li>
              <li><NavLink exact
                activeClassName="afterLoginActiveLink"
                to="/sa/purchases"
                isActive={() => pathname.includes("/sa/purchases") || pathname.includes("/sac/alldetails")}
              ><CheckIcon /><span>Purchases</span></NavLink></li>
              <li><NavLink exact activeClassName="afterLoginActiveLink"
                to="/sa/agentsAdmins"
                isActive={() => pathname.includes("/sa/agentsAdmins")}
              ><ManageAccountsIcon /><span>Management</span></NavLink></li>
              <li><NavLink exact activeClassName="afterLoginActiveLink"
                to="/sa/funds"
                isActive={() => pathname.includes("/sa/fund")}
              ><AttachMoneyIcon /><span>Funds</span></NavLink></li>
              <li><NavLink exact activeClassName="afterLoginActiveLink"
                to="/sa/tasks"
                isActive={() => pathname.includes("/sa/tasks")}
              ><TaskIcon /><span>Tasks Management</span></NavLink></li>
              {/* <li><NavLink exact activeClassName="afterLoginActiveLink" to="/su/shipment"><LocalShippingIcon/><span>Shipments</span></NavLink></li> */}
              <li><NavLink exact activeClassName="afterLoginActiveLink" to="/sa/generate-invoice"><ReceiptIcon /><span>Pending Approvals</span></NavLink></li>
            </ul>
          </div>
          <div className="dashboardNavFooter">
            <NavLink exact activeClassName="afterLoginActiveLink" to="/sa/settings"> <SettingsIcon style={{ marginRight: "0.5rem" }} /> Settings</NavLink>
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
            <Route exact path="/sa/agentsAdmins">
              <SaAgentsAdmins agentList={agentList} />
            </Route>
            <Route exact path="/sa/agent/:agent_id" component={SaAgent} />
            <Route exact path="/sa/admin/:agent_id" component={SaAdmins} />
            <Route exact path="/sa/bid_history">
              <BidHistory agentList={agentList} Admin />
            </Route>
            <Route exact path="/sa/todays_bid" component={SaTodaysBid} />

            <Route exact path="/sa/bid_history/:id" component={SaBidHistoryAgent} />
            <Route exact path={["/sa/funds"]} component={SaAllFunds} />
            <Route exact path="/sa/fund/10" component={saTotalFundsAgent} />
            <Route exact path="/sa/settings" component={Settings} />
            <Route exact path="/sac/alldetails/:id" component={PhSpecific} />
            <Route exact path="/sa/shipment" component={Shipment} />
            <Route exact path='/sa/viewSearchInvoice' component={SaInvoiceSearch} />
            <Route exact path="/sa/purchases">
              <SaPurchaseMain agentList={agentList} />
            </Route>
            <Route exact path="/sa/purchases/purchase/:agentId">
              <SaPurchase />
            </Route>

            <Route exact path="/sa/solds/all/:id" component={RecentSold} />
            <Route exact path="/sa/generate-invoice" component={SaInvoicForm} />
            <Route exact path="/sa/invoiceDetails" component={SaCreateInvoice} />
            <Route exact path="/sa/editInvoice/:InvNo" component={SaEditInvoice} />
            <Route exact path="/sa/viewInvoice" component={SaViewInvoice} />



            <Route exact path="/sa/invoice/all/:id" component={GenerateInvoiceRS} />
            <Route exact path="/sa/tasks" component={Kanban} />
          </Switch>
        </div>
      </div>
    </>
  )
}

export default SaDashborad