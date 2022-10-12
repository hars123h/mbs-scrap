import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import axios from 'axios';
import GavelRoundedIcon from '@mui/icons-material/GavelRounded';
import { error, success } from './Toast';
import StyledEngineProvider from "@mui/material/StyledEngineProvider";
import "./makeBidDialog.css"
import common from '../baseUrl';
import currency from 'currency.js';
import NumberFormat from "react-number-format";
import { toast } from 'react-toastify';
import moment from 'moment';


export default function MakeBidDialog({ allBids,AuctionDate, make, carName, lotNo, carId, highestBidTillNow, isSold }) {
  const [open, setOpen] = useState(false);
  const [bidAmount, setBidAmount] = useState(" ")
  const [allClients, setAllClients] = useState([])
  const [allAgents, setAllAgents] = useState([])
  
  const [selectedAgent, setSelectedAgent] = useState(-1)
  const [selectedCustomerId, setSelectedCustomerId] = useState(-1)
  const [shipmentType, setShipmentType] = useState(-1)
  const [market, setMarket] = useState("")
  const [remarks, setRemarks] = useState("")
  const [fvalue, setFvalue] = useState("");
  const [isSA, setIsSa] = useState(() => window.localStorage.getItem('username'))
  let date = moment(Date.now()).format("YYYY-MM-DD")
  const [acutionBUtton, setAcutionBUtton] = useState(()=>AuctionDate < date?true:false);
//   // useEffect(() => {
    
//   //   if () {

//   //     setAcutionBUtton(true)
//   //     console.log("helllllll");

//   //   }
//   // },[])
// console.log("auctionnnn", AuctionDate < date);
// console.log("dateAuction",AuctionDate);
// console.log("Date",date);

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

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
  }, [])

  useEffect(async () => {
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
      // console.log()
      let temp = response.data.map((item) => item.name + "$$" + item.id)
      setAllClients(temp)
    }
    else {
      toast.error(response.status + " Something went wrong.", {
        autoClose: 1000,
      })
    }

  }, [selectedAgent])
  // console.log("BBBB", bidAmount*1000)

  const checkAndSubmitBid = async () => {
    let newBid = bidAmount * 1000;
    if (selectedAgent.length <= 0) {
      toast.error("Select Agent")
      return
    }
    if (newBid > highestBidTillNow) {
      if (isSA == "Superuser" || isSA == "SuperHeadAdmin" ? selectedAgent >= 0 : true) {
        if (selectedCustomerId >= 0) {
          if (shipmentType.length >=0) {
            try {
              const response = await axios(
                {
                  method: "post",
                  url: `${common.baseUrl}Bidding/PlaceBid/`,
                  headers: {
                    Authorization: `Token ${localStorage.getItem("token")}`
                  },
                  data: {
                    car_id: carId,
                    bid_amount: newBid,
                    bidder_id: selectedCustomerId,
                    agent_id: selectedAgent,
                    container: shipmentType,
                    market,
                    remarks,
                  }
                }
              )
              if (response.status === 200) {
                toast.success("Your bid has been successfully placed.", {
                  autoClose: 1000,
                })
                handleClose()
              }
              else {
                toast.error("Something went wrong. Try again", {
                  autoClose: 1000,
                })
              }
            } catch (err) {

              // console.log(err.message)
            }
          }
          else {
            error("please select a shipment type")
          }
        }
        else {
          error("Please select the customer you are placing the bid for")
        }

      }
      else {
        error("Please select select a Agent")
      }

    } else {
      error("Please outbid the current bid amount to have a chance to win the auction")
    }

  }
  const bidChange = (e) => {

    let value = (e.target.value);

    setBidAmount(value)


  }
  console.log("isSold", isSold);

  return (
    <div>
      <button
        disabled={acutionBUtton || isSold}
        style={acutionBUtton || isSold ? { background: '#eee', cursor: 'not-allowed' } : {}}
        className="std-button-sun"
        onClick={handleClickOpen}>
        <GavelRoundedIcon /> Place Bid
      </button>
      <StyledEngineProvider injectFirst>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <p style={{ margin: "1rem 1rem 0 1rem" }}>Bid for </p>
          <h2 style={{ margin: "0rem 1rem 1rem 1rem" }}>{make} / <span style={{ color: "#8a28d9" }}>{carName}</span></h2>
          <DialogContent>
            <div className="minimumMakeDialogAmount">
              <p className="warningText">Your bid is subject to approval, because it is after 09:00hrs</p><br />
              <p>Lot Number : {lotNo}</p>
              <div className="cardetails">
                <p>Minimum Bid Amount : </p>
                <b>{currency(highestBidTillNow, { symbol: '¥', precision: 0 }).format()}</b>
              </div>
              <div className="formForBidding">
                {/* <input
                  type="number"
                  className="std-input2"
                  placeholder="Enter your bid amount"
                  value={(parseInt(bidAmount)) * 100}
                  // onChange={e => setBidAmount(e.target.value)}
                  onChange={bidChange}
                /> */}
                <NumberFormat
                  thousandsGroupStyle="thousand"
                  value={bidAmount}
                  onValueChange={(values) => {
                    const { formattedValue, value } = values;
                    // formattedValue = $2,223
                    // value ie, 2223
                    setBidAmount(value);
                  }}
                  placeholder="Enter your bid amount"
                  //  onChange={e => setBidAmount((e.target.value))}
                  className="std-input2"
                  // decimalSeparator="."
                  displayType="input"
                  type="text"
                  thousandSeparator={true}

                  suffix=",000"
                  defaultValue="" />

                {isSA == "Superuser" || isSA == "SuperHeadAdmin" ?
                  (<select
                    className="std-input2"
                    value={selectedAgent}
                    required
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

                  </select>) :
                  <p></p>
                }

                <select
                  className="std-input2"
                  value={selectedCustomerId}
                  required
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
                  {[{ type: "RO-RO", value: "roro" }, { type: "CONTAINER", value: "CONTAINER" }].map((item, key) => {
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
                  required
                  onChange={e => setMarket(e.target.value)}
                />
                <input
                  type="text"
                  className="std-input2"
                  placeholder="Remarks"
                  value={remarks}
                  required
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
              className="std-button-sun" onClick={handleClose}>Close</button>

          </DialogActions>
        </Dialog>
      </StyledEngineProvider>
    </div>
  );
}
