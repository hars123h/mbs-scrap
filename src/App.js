import { Switch, Route, useLocation } from "react-router-dom"
import Home from "./pages/Home"
import "./App.css"
import AfterLogin from "./pages/AfterLogin"
import Signin from "./pages/Signin"
import PNF from "./pages/PNF"
import HowToBuy from "./pages/HowToBuy"
import BankingInfo from "./pages/BankingInfo"
import Contact from "./pages/Contact"
import Search_Results from "./pages/Search_Results"
import ByLotNumber from "./pages/Results/ByLotNumber"
import BrandSearch from "./pages/Results/BrandSearch"
import SpecificCar from "./pages/Results/SpecificCar"
import HowToBuy2 from "./pages/Results/HowToBuy2"
import SDashboard from "./pages/Superuser/Dashboard"
import SaDashborad from "./pages/Superadmin/SaDashborad"
import { AnimatePresence, AnimateSharedLayout } from "framer-motion"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Tracker from "./pages/Tracker"
import OnlineStatus from "./component/OnlineStatus"
import Terms from "./pages/TermsAndConditions"
import PrivacyPolicy from "./pages/PrivacyPolicy"
import Invoice from "./component/Invoice/invoice"
import SigninAsSuperAdmin from "./pages/SigninAsSuperAdmin"
import InvoicForm from "./pages/InvoicForm"
import { useState } from "react";
import Notification from "./component/Notification";
import ComponentToPrint from "./pages/Superadmin/ComponentToPrint"

function App() {
  const location = useLocation()

  const superuser = localStorage.getItem("superuser")
  const superHeadAdmin = localStorage.getItem("SuperHeadAdmin")




  return (
    <>

      <OnlineStatus />
      <AnimateSharedLayout>
        <ToastContainer />
        <AnimatePresence exitBeforeEnter initial={false}>
          <Switch location={location} key={location.key}>
            <Route exact path="/" component={Home} />
            {/* <Route path="/x" component={Home} /> */}
            {/* <Route path="/y" component={Home} /> */}
            <Route path="/invoice" component={InvoicForm} />
            <Route path="/howtobuy" component={HowToBuy2} />
            <Route path="/search_results/brand/:brand/name/:name/model/:model/min_year/:min_year/max_year/:max_year/min_engine/:min_engine/max_engine/:max_engine/odo_min/:odo_min/odo_max/:odo_max/bid/:bid/one_price/:oneprice" component={Search_Results} />
            <Route path="/results/lotnumber/:lotNumber" component={ByLotNumber} />
            <Route path="/brand_search/:brand" component={BrandSearch} />
            <Route exact path="/specific_car/:id" component={SpecificCar} />
            <Route exact path="/invoicepreview" component={ComponentToPrint} />
            <Route path="/login" component={Signin} />
            <Route path="/Salogin" component={SigninAsSuperAdmin} />
            <Route path="/aboutus" component={HowToBuy} />
            <Route path="/contact" component={Contact} />
            <Route path="/terms-and-conditions" component={Terms} />
            <Route path="/privacy-policy" component={PrivacyPolicy} />
            {/* <Route exact path="/sa/Tracker/:id" component={Tracker} /> */}
            <Route exact path="/tracker/:trackId">
              <Tracker />
            </Route>
            <Route exact path="/banking_information">
              <BankingInfo />
            </Route>
            {/* <Route path={["/sac/alldetails/:id", "/sa/shipment", "/sa/purchases", "/sa/solds/all/:id", "/sa/editInvoice/:InvNo", "/sa/admin/:agent_id", "/sa/todays_bid", "/sa/settings","/sa/purchases/purchase", "/sa/agentsAdmins", "/sa/agent/:agent_id", "/sa/bid_history", "/sa/bid_history/:id", "/sa/funds", "/sa/fund/:id", "/sa/viewSearchInvoice", "/sa/viewInvoice", "/sa/invoiceDetails", "/sa/generate-invoice", "/sa/invoice/all/:id", "/sa/tasks"]} component={SaDashborad} /> */}

            {
              superuser === "false" ?
                <>
                  <Route path={["/sac/alldetails/:id", "/a/f", "/a/ph", "/a/fl", "/a/bh", "/current_bids", "/a/s", "/a/c","/a/generate-invoice","/a/viewInvoice","/a/invoiceDetails","/a/editInvoice/:InvNo",'/a/viewSearchInvoice']} component={AfterLogin} />
                </>
                :
                superuser === "true"
                  ?
                  <Route path={["/sac/alldetails/:id", "/su/tasks","/su/purchases/purchase/:agent_id", "/su/shipment", "/su/solds/agents", "/su/solds/all/:id", "/su/todays_bid", "/su/settings", "/su/agents", "/su/agent/:agent_id", "/su/bid_history", "/su/bid_history/:id", "/su/funds", "/su/fund/:id", "/su/invoice/all/:id"]} component={SDashboard} />
                  :
                  null
            }
            {
              superHeadAdmin === "true" ?
                <>
                  <Route path={["/sac/alldetails/:id", "/sa/shipment", "/sa/Tracker/:id","/sa/purchases","/sa/purchases/purchase", "/sa/solds/all/:id","/sa/editInvoice/:InvNo", "/sa/admin/:agent_id","/sa/todays_bid", "/sa/settings", "/sa/agentsAdmins", "/sa/agent/:agent_id", "/sa/bid_history", "/sa/bid_history/:id", "/sa/funds", "/sa/fund/:id", "/sa/viewSearchInvoice", "/sa/viewInvoice", "/sa/invoiceDetails", "/sa/generate-invoice", "/sa/invoice/all/:id", "/sa/tasks"]} component={SaDashborad} />

                </>
                :
                null
            }
            <Route path="*" component={PNF} />
          </Switch>
        </AnimatePresence>
      </AnimateSharedLayout>

    </>
  );
}

export default App;
