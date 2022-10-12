import React, { useEffect, useState } from 'react'
import { Tooltip, Menu, MenuItem, Dialog, DialogContent, DialogActions, IconButton, Input } from '@material-ui/core'
import dateFormat from 'dateformat'
import CancelIcon from '@mui/icons-material/Cancel';
import axios from 'axios'
import { error, success, info } from '../../component/Toast'
import common from '../../baseUrl'
import EditIcon from '@mui/icons-material/Edit';
import SuTop from "../../component/Heading/SuTop"
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import GavelRoundedIcon from '@mui/icons-material/GavelRounded';
import { motion, AnimatePresence } from 'framer-motion'
import DownloadIcon from '@mui/icons-material/Download';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import StyledEngineProvider from "@mui/material/StyledEngineProvider";
import { repeat } from 'lodash';
import currency from 'currency.js'
import moment from 'moment';
import NumberFormat from "react-number-format";


var fileDownload = require('js-file-download');

const SaTodaysBid = () => {


    const [bidHistory, setBidHistory] = useState([])
    const [filterValue, setFilterValue] = useState("")
    const [anchorEl, setAnchorEl] = useState(null);
    const [showby, setShowBy] = useState(false)
    const [filterBy, setFilterBy] = useState({ agent: "", auctionHouse: "", customer: "", car: "", bid_amount: "", status: "", result: "", createdAt: "" })
    const [filterBar, setFilterBar] = useState(false)
    const [winner, setWinner] = useState(true)
    const open = Boolean(anchorEl);
    const [required1, setRequired1] = useState({
        results: " ", clientId: "", car_id: ""
    })

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const [open2, setOpen2] = useState(false);
    const [open3, setOpen3] = useState(false);
    const handleClose3 = () => {
        setOpen3(false)
    }
    const handleClickOpen3 = (carid, clientId) => {
        setRequired1({ ...required1, clientId: clientId, car_id: carid })
        setOpen3(true);
    }
    const [required, setRequired] = useState({
        results: " ", clientId: "", car_id: ""
    })

    const handleClickOpen2 = (clientId, carid) => {
        setRequired({ ...required, clientId: clientId, car_id: carid })
        setOpen2(true);

    };

    const handleClose2 = () => {
        setOpen2(false);
    };

    // console.log("BBBBBBBBBB", required.results)


    const handleWinningBid = async (car_id, client_id) => {
        const accept = window.confirm(`Once the winning bid has been chosen, this action cannot be reverted. Click on 'Ok' to confirm `)
        if (accept) {
            const response = await axios({
                method: "post",
                url: `${common.baseUrl}Bidding/DeclareWinner/`,
                headers: {
                    Authorization: `Token ${localStorage.getItem("token")}`
                },
                data: {
                    car_id,
                    client_id
                }
            })
            if (response.status === 200) {
                success(`Winner has been confirmed`)
            }
            else {
                error("Something went wrong !")
            }
        } else {
            info("No problem. You have cancelled the confirmation box.")
        }
    }

    const handleLosingBid = async (car_id, client_id) => {
        const accept = window.confirm(`Once lost has been chosen, this action cannot be reverted. Click on 'Ok' to confirm `)
        if (accept) {
            const response = await axios({
                method: "delete",
                url: `${common.baseUrl}Bidding/PlaceBid/`,
                headers: {
                    Authorization: `Token ${localStorage.getItem("token")}`
                },
                data: {
                    car_id,
                    bidder_id: client_id,
                    change_status: true
                }
            })
            if (response.status === 200) {

                success(`Bid has been confirmed`)
                // window.location.reload()
            }
            else {
                error("Something went wrong !")
            }
        } else {
            info("No problem. You have cancelled the confirmation box.")
        }
    }



    const updateStatus = async () => {

        winner ?
            await handleWinningBid(required.car_id, required.clientId) :
            await handleLosingBid(required.car_id, required.clientId)

        const response = await axios(
            {
                method: "post",
                url: `${common.baseUrl}Bidding/PurchasePrice/ `,
                headers: {
                    Authorization: `Token ${localStorage.getItem("token")}`
                },
                data: {
                    car_id: required.car_id,
                    client_id: required.clientId,
                    purchase_price: required.results * 1000,
                }
            }
        )
        if (response.status === 200) {
            window.location.reload()
        }
        else {
            error("Something went wrong. Try again")
        }
    }


    useEffect(() => {
        const tbids = async () => {
            const response = await axios({
                method: "post",
                url: `${common.baseUrl}Bidding/AllBids/`,
                headers: {
                    Authorization: `Token ${localStorage.getItem("token")}`
                },
                data: {
                    all_bids: true
                }
            })
            if (response.status === 200) {
                setBidHistory(response.data)
            } else {
                error("Something went wrong")
            }
        }
        tbids();

    }, [])




    const handleCancelBid = async () => {
        if (required1.results.length >= 10) {
            const response = await axios({
                method: "delete",
                url: `${common.baseUrl}Bidding/PlaceBid/`,
                headers: { Authorization: `Token ${localStorage.getItem("token")}` },
                data: {
                    car_id: required1.car_id,
                    bidder_id: required1.clientId,
                    change_status: false,
                    message: required1.results
                }
            })
            if (response.status === 200) {
                window.location.reload()
            } else {
                error("Something went wrong while deleting.")
            }
        }
        else {
            error("message field should not Empty")
        }
    }

    const handleDownload = async (format = "csv") => {
        axios({
            method: "post",
            url: `${common.baseUrl}Bidding/AllBids/`,
            headers: {
                Authorization: `Token ${localStorage.getItem("token")}`
            },
            data: {
                download: true,
                filetype: format,
                all_bids: true
            },
            responseType: "blob"
        }).then(res => {

            fileDownload(res.data, `BidDetails-${moment().format("YYYY-MM-DD")}${"." + format}`);
        }).catch(err => {
            error(err)
        })
    }


    return (
        <>
            <SuTop title="Today's Bids" />
            <div
                className="allbidsContainer"
            >

                <div className="bidHistoryContainer">
                    <div className="header" >
                        <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                                'aria-labelledby': 'basic-button',
                            }}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                        >
                            {/* <MenuItem onClick={()=>handleDownload("xlsx")}>As xlsx</MenuItem> */}
                            {/* <MenuItem onClick={()=>handleDownload("csv")}>As CSV</MenuItem> */}
                        </Menu>
                        <div>
                            <IconButton
                                onClick={() => handleDownload("xlsx")}
                            >
                                <DownloadIcon />
                            </IconButton>
                        </div>
                    </div>
                    <div className="allfundsBody">
                        <div className="routes" style={{ gridTemplateColumns: "1fr 1fr", padding: "0" }}>
                            <p onClick={() => setShowBy(false)} className={showby === false && "fundsActiveLink"}><GavelRoundedIcon style={{ fontSize: "2rem" }} /><span>Auction Vehicles</span></p>
                            <p onClick={() => setShowBy(true)} className={showby === true && "fundsActiveLink"}><DirectionsCarIcon style={{ fontSize: "2rem" }} /><span>One Price Vehicles</span></p>
                        </div>
                    </div>
                    <div className="all" >
                        <div className="todaysBidIndContainer" style={{ display: "grid", gridTemplateColumns: "10px 1fr", gridGap: "1rem", alignItems: "Center" }}>
                            <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "transparent", userSelect: "none" }}>
                            </div>
                            <div className="todaysBidsIndividual"
                                style={{ background: "transparent", fontWeight: "bold" }}
                                onClick={() => setFilterBar(!filterBar)}
                            >
                                <p>Agent </p>
                                <p>Auction House</p>
                                <p>Lot No.</p>
                                <p>Car</p>
                                <p>Chassis ID</p>
                                <p>Bid Amount (¥)</p>
                                <p>Results (¥)</p>
                                <p>Status</p>
                                {/* <p>Created At</p> */}
                            </div>
                        </div>
                        {
                            filterBar &&
                            <AnimatePresence exitBeforeEnter>
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    style={{ display: "grid", gridTemplateColumns: "10px 1fr", gridGap: "1rem", alignItems: "Center" }}
                                >
                                    <div></div>
                                    <div className="todaysBidsIndividual"
                                    //  style={{gridTemplateColumns:showby&&"repeat(6,1fr)"}}
                                    >
                                        <input
                                            className="filter-input"
                                            type="text"
                                            placeholder="Agent"
                                            value={filterBy.agent}
                                            onChange={e => setFilterBy({ ...filterBy, agent: e.target.value.toLowerCase() })}
                                        />
                                        <input
                                            className="filter-input"
                                            type="text"
                                            placeholder="Auction House"
                                            value={filterBy.auctionHouse}
                                            onChange={e => setFilterBy({ ...filterBy, auctionHouse: e.target.value.toLowerCase() })}
                                        />
                                        <input
                                            className="filter-input"
                                            type="text"
                                            placeholder="Lot No"
                                            value={filterBy.customer}
                                            onChange={e => setFilterBy({ ...filterBy, customer: e.target.value.toLowerCase() })}
                                        />
                                        <input
                                            type="text"
                                            className="filter-input"
                                            placeholder="Car"
                                            value={filterBy.car}
                                            onChange={e => setFilterBy({ ...filterBy, car: e.target.value.toLowerCase() })}
                                        />
                                        <input
                                            type="text"
                                            className="filter-input"
                                            placeholder="Chassis ID"
                                            value={filterBy.createdAt}
                                            onChange={e => setFilterBy({ ...filterBy, createdAt: e.target.value })}
                                        />
                                        <input
                                            type="text"
                                            className="filter-input"
                                            placeholder="Bid Amount (¥)"
                                            value={filterBy.bid_amount}
                                            onChange={e => setFilterBy({ ...filterBy, bid_amount: e.target.value.toLowerCase() })}
                                        />
                                        <input
                                            type="text"
                                            className="filter-input"
                                            placeholder="Result  (¥)"
                                            value={filterBy.result}
                                            onChange={e => setFilterBy({ ...filterBy, result: e.target.value.toLowerCase() })}
                                        />
                                        <select
                                            className="filter-input"
                                            placeholder="Status"
                                            value={filterBy.status}
                                            onChange={e => setFilterBy({ ...filterBy, status: e.target.value })}
                                        >
                                            <option value="">ANY</option>
                                            <option value="PENDING">PENDING</option>
                                            <option value="LOST">LOST</option>
                                            <option value="WON">WON</option>
                                        </select>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        }
                        {
                            bidHistory.filter((item) =>
                                item.agent.name.toLowerCase().includes(filterBy.agent) &&
                                item.cardetails.auction_place.toLowerCase().includes(filterBy.auctionHouse) &&
                                item.bidder.name.toLowerCase().includes(filterBy.customer) &&
                                item.cardetails.car_name.toLowerCase().includes(filterBy.car) &&
                                item.bid_amount >= filterBy.bid_amount &&
                                item.bid_status.includes(filterBy.status) &&
                                item.cardetails.one_price === showby &&
                                item.created_at.includes(filterBy.createdAt) &&
                                item.agent.name.toLowerCase().includes(filterValue.toLowerCase())).map((item, key) => {
                                    return (
                                        <div key={key}
                                            className="todaysBidIndContainer"
                                            style={{ display: "grid", gridTemplateColumns: "10px 1fr", gridGap: "1rem", alignItems: "Center" }}>
                                            <div style={{
                                                width: "10px",
                                                height: "10px",
                                                borderRadius: "50%",
                                                background: item.late_bid ? "RED" : "transparent",
                                                userSelect: "none"
                                            }}></div>
                                            <div
                                                // style={{gridTemplateColumns:showby&&"repeat(6,1fr)"}}
                                                className="todaysBidsIndividual"
                                            >
                                                <Tooltip placement="left" title={item.agent.name}>
                                                    <p>{item.agent.name.split(" ")[0]}</p>
                                                </Tooltip>
                                                <Tooltip placement="left" title={item.cardetails.auction_place}>
                                                    <p>{item.cardetails.auction_place.slice(0, 10) + "..."}</p>
                                                </Tooltip>
                                                <Tooltip placement="left" title={item.cardetails.car_name}>
                                                    <p style={{ cursor: "pointer" }}>{item.cardetails.lot_no}</p>
                                                </Tooltip>
                                                <div onClick={() => window.open(`/specific_car/${item.cardetails.id}`)}>
                                                    <Tooltip placement="left" title={item.cardetails.car_name}>
                                                        <p>{item.cardetails.car_name.slice(0, 10) + "..."}</p>
                                                    </Tooltip>
                                                </div>

                                                <p>{item.cardetails.model}</p>
                                                <p>{currency(item.bid_amount, { symbol: '¥', precision: 0 }).format()}</p>
                                                {console.log(item.purchase_price)}
                                                <p>{item.purchase_price ? currency(item.purchase_price, { symbol: '¥', precision: 0 }).format() : 'N/A'}</p>

                                                {
                                                    item.bid_status === "PENDING" ? <p style={{ color: "#EFB700", fontWeight: "bold" }}>PENDING</p> : item.bid_status === "WON" ? <p style={{ color: "#009822", fontWeight: "bold" }}>WON</p> : item.bid_status === "CANCELLED" ? <p style={{ color: "RED", fontWeight: "bold" }}>CANCELLED</p> : <p style={{ color: "RED", fontWeight: "bold" }}>LOST</p>

                                                }
                                                {
                                                    item.bid_status === "PENDING"
                                                        ?
                                                        <div className="controlsTBI">
                                                            <button
                                                                onClick={() => {
                                                                    setWinner(true);
                                                                    handleClickOpen2(item.bidder.id, item.cardetails.id)
                                                                }}
                                                                className="winner">Won</button>
                                                            <button
                                                                onClick={() => {
                                                                    setWinner(false)
                                                                    handleClickOpen2(item.bidder.id, item.cardetails.id)
                                                                }}
                                                                className="winner" style={{ color: "red" }}>Lost</button>
                                                            <button
                                                            ><CancelIcon
                                                                    onClick={() => handleClickOpen3(item.cardetails.id, item.bidder.id)}
                                                                    style={{ color: "orange" }} /></button>
                                                        </div>
                                                        :
                                                        null
                                                    // (!item.cardetails.one_price && item.bid_status==="WON")
                                                    // &&
                                                    // <div className="controlsTBI">
                                                    //     <button  onClick={()=>handleClickOpen2(item.bidder.id,item.cardetails.id)}>
                                                    //       <LocalAtmIcon /> 
                                                    //     </button>
                                                    // </div>    
                                                }
                                            </div>
                                        </div>
                                    )
                                })
                        }
                    </div>
                </div>
            </div>
            <StyledEngineProvider injectFirst>
                <Dialog
                    open={open2}
                    onClose={handleClose2}
                >
                    <h2 style={{ margin: "1rem 1rem 0rem 1rem" }}><span style={{ color: "#8a28d9" }}>Update Results</span></h2>
                    <DialogContent>
                        <div className="dialogEditBoxContainer" style={{ padding: "0" }}>
                            <div>
                                <span>Purchase Price (¥)</span>
                                {/* <input type="text"
                                    className="std-input2"
                                    style={{ width: "12rem" }}
                                    value={required.results}
                                    onChange={(e) => setRequired({ ...required, results: e.target.value })}
                                /> */}
                                <NumberFormat
                                    thousandsGroupStyle="thousand"
                                    value={required.results}
                                    onValueChange={(values) => {
                                        const { formattedValue, value } = values;
                                        // formattedValue = $2,223
                                        // value ie, 2223
                                        setRequired({ ...required, results: value })
                                    }}
                                    className="std-input2"
                                    // decimalSeparator="."
                                    displayType="input"
                                    type="text"
                                    thousandSeparator={true}

                                    suffix=",000"
                                    defaultValue="" />
                            </div>
                        </div>


                    </DialogContent>
                    <DialogActions style={{ display: "flex", justifyContent: "flex-start", padding: "0 1rem 1rem 1rem" }}>
                        <button
                            style={{ border: "2px solid #8a28d9" }}
                            className="std-button-sun"
                            onClick={updateStatus}
                            autoFocus>
                            Submit
                        </button>
                        <button
                            style={{ background: "transparent", color: "#8a28d9", border: "2px solid #8a28d9" }}
                            className="std-button-sun" onClick={handleClose2}>Close</button>

                    </DialogActions>
                </Dialog>
            </StyledEngineProvider>
            <StyledEngineProvider injectFirst>
                <Dialog
                    open={open3}
                    onClose={handleClose3}
                >
                    <h2 style={{ margin: "1rem 1rem 0rem 1rem" }}><span style={{ color: "#8a28d9" }}>Cancellation Reason</span></h2>
                    <DialogContent>
                        <div className="dialogEditBoxContainer" style={{ padding: "0" }}>
                            <div>
                                <span>Message</span>
                                {/* <input type="text"
                                    className="std-input2"
                                    style={{ width: "12rem" }}
                                    value={required.results}
                                    onChange={(e) => setRequired({ ...required, results: e.target.value })}
                                /> */}
                                <input
                                    thousandsGroupStyle="thousand"
                                    value={required1.results}
                                    onChange={(e) =>
                                        setRequired1({ ...required1, results: e.target.value })
                                    }
                                    className="std-input2"
                                    // decimalSeparator="."
                                    displayType="input"
                                    type="text"
                                    thousandSeparator={true}

                                    suffix=",000"
                                    defaultValue="" />
                            </div>
                        </div>


                    </DialogContent>
                    <DialogActions style={{ display: "flex", justifyContent: "flex-start", padding: "0 1rem 1rem 1rem" }}>
                        <button
                            style={{ border: "2px solid #8a28d9" }}
                            className="std-button-sun"
                            onClick={handleCancelBid}
                            autoFocus>
                            Submit
                        </button>
                        <button
                            style={{ background: "transparent", color: "#8a28d9", border: "2px solid #8a28d9" }}
                            className="std-button-sun" onClick={handleClose2}>Close</button>

                    </DialogActions>
                </Dialog>
            </StyledEngineProvider>
        </>
    )
}

export default SaTodaysBid