import React, { useState, useEffect } from 'react';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import axios from 'axios';
import GavelRoundedIcon from '@mui/icons-material/GavelRounded';
import { error, success } from '../Toast';
import StyledEngineProvider from "@mui/material/StyledEngineProvider";
import common from "../../baseUrl"
import currency from 'currency.js'
import moment from 'moment';

export default function MakeBidDialog({ allBids,AuctionDate, make, carName, lotNo, carId, onePrice, isSold }) {

  const [open, setOpen] = useState(false);
  const [acutionBUtton, setAcutionBUtton] = useState(false);
  const [allClients, setAllClients] = useState([])
  const [selectedCustomerId, setSelectedCustomerId] = useState(-1)
  const [shipmentType, setShipmentType] = useState("")
  const [market, setMarket] = useState("")
  const [remarks, setRemarks] = useState("")
  const [isSA, setIsSa] = useState(() => window.localStorage.getItem('username'))
  const [allAgents, setAllAgents] = useState([])
  const [selectedAgent, setSelectedAgent] = useState(-1)

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  
  useEffect(async () => {    
    if (isSA == "Superuser" || isSA == "SuperHeadAdmin")
      axios({
        method: "post",
        url: `${common.baseUrl}Login/AllAgents/`,
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`
        },
        data: {
          all_agents: false
        }
      }).then(res => {
        setAllAgents(res.data);
      })
  }, [isSA])

  useEffect(() => {
    const getAllClients = async () => {
      const response = await axios({
        method: "post",
        url: `${common.baseUrl}Login/AllClients/`,
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`
        },
        data: {
          agent_id: selectedAgent
        }
      })
      if (response.status === 200) {
        let temp = response.data.map((item) => item.name + "$$" + item.id)
        setAllClients(temp)
      }
      else {
        error(response.status + " Something went wrong.")
      }
    }
    getAllClients()
  }, [selectedAgent])

  const checkAndSubmitBid = async () => {
    try {
      if (selectedCustomerId >= 0) {
        const response = await axios(
          {
            method: "post",
            url: `${common.baseUrl}Bidding/PlaceBid/`,
            headers: {
              Authorization: `Token ${localStorage.getItem("token")}`
            },
            data: {
              agent_id: selectedAgent,
              car_id: carId,
              bid_amount: onePrice * 1000,
              bidder_id: selectedCustomerId,
              market,
              remarks,
              container: shipmentType
            }
          }
        )
        if (response.status === 200) {
          success("Your order has been successfully placed.")
          handleClose()
        }
        if (response.status === 422) {
          success("Bid Amount is lower than existing highest bid amount")
          handleClose()
        }
        else {
          error("Something went wrong. Try again")
        }
      }
      else {
        error("Select a customer")
      }

    } catch (err) {
      error("Unable to place a bid")
    }
  }
  
  useEffect(() => {
    let date = moment(Date.now()).format("YYYY-MM-DD")
    if (AuctionDate < date) {

      setAcutionBUtton(true)
      console.log("helllllll");

    }
  },[])
console.log("isSold", isSold);
  return (
    <div>
      <button
       disabled={acutionBUtton || isSold}
        style={ acutionBUtton || isSold? {background: '#eee', cursor: 'not-allowed'}: {}}
        className="std-button-sun"
        onClick={handleClickOpen}>
        <ShoppingCartIcon /> Place Order
      </button>
      <StyledEngineProvider injectFirst>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >

          <p style={{ margin: "1rem 1rem 0 1rem" }}>Place order </p>

          <h2 style={{ margin: "0rem 1rem 1rem 1rem" }}>{make} / <span style={{ color: "#8a28d9" }}>{carName}</span></h2>
          {/* </DialogTitle> */}
          <DialogContent>
            <div className="minimumMakeDialogAmount">
              <p>Lot Number : {lotNo}</p>
              <div className="cardetails">
                <p>Amount : </p>
                <b>{currency(onePrice*1000, { symbol: '¥', precision: 0 }).format()}</b>
              </div>
              <div className="formForBidding">

              {isSA == "Superuser" || isSA == "SuperHeadAdmin"?
                (<select
                  className="std-input2"
                  value={selectedAgent}
                  onChange={e => setSelectedAgent(e.target.value)}
                >
                  <option hidden>Select Agent</option>
                  {allAgents.map((item, key) => {
                    return (
                      <option
                        key={key}
                        style={{ padding: "0.5rem" }}
                        value={item.agent_id}
                      >
                        {item.name}
                      </option>
                    )
                  })}

                </select>):
                 <p></p> 
                }            

                <select
                  className="std-input2"
                  value={selectedCustomerId}
                  onChange={e => setSelectedCustomerId(e.target.value)}
                >
                  <option hidden>Select Client</option>
                  {allClients.map((item, key) => {
                    return (
                      <option
                        key={key}
                        style={{ padding: "0.5rem" }}
                        value={item.split("$$")[1]}>
                        {item.split("$$")[0]}
                      </option>
                    )
                  })}
                </select>
                <select
                  className="std-input2"
                  value={shipmentType}
                  defaultValue="RO-RO"
                  onChange={e => setShipmentType(e.target.value)}
                >
                  <option hidden>Select Shipment Type</option>
                  {[{ type: "RO-RO", value: "roro" }, { type: "Container", value: "container" }].map((item, key) => {
                    return (
                      <option
                        key={key}
                        style={{ padding: "0.5rem" }}
                        value={item.type}>
                        {item.type}
                      </option>
                    )
                  })}
                </select>
                <input
                  type="text"
                  className="std-input2"
                  placeholder="Market"
                  value={market}
                  onChange={e => setMarket(e.target.value)}
                />
                <input
                  type="text"
                  className="std-input2"
                  placeholder="Remarks"
                  value={remarks}
                  onChange={e => setRemarks(e.target.value)}
                />
              </div>
            </div>

          </DialogContent>
          <DialogActions style={{ margin: "0.5rem" }}>
            <button
              style={{ border: "2px solid #8a28d9" }}
              className="std-button-sun" onClick={checkAndSubmitBid} autoFocus>
              Submit
            </button>
            <button
              style={{ background: "transparent", color: "#8a28d9", border: "2px solid #8a28d9" }}
              className="std-button-sun" onClick={handleClose}>
              Close
            </button>
          </DialogActions>
        </Dialog>
      </StyledEngineProvider>
    </div>
  );
}
