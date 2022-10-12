import { IconButton, Menu, Tooltip } from '@material-ui/core'
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar'
import DownloadIcon from '@mui/icons-material/Download'
import GavelRoundedIcon from '@mui/icons-material/GavelRounded'
import axios from 'axios'
import currency from 'currency.js'
import { AnimatePresence, motion } from 'framer-motion'
import moment from 'moment'
import React, { useState } from 'react'
import common from '../../baseUrl'
import Heading from '../../component/Heading'
import { error } from '../../component/Toast'

var fileDownload = require('js-file-download');


const Allbids = ({ bidHistory }) => {

    document.title = "Bid History - Agent - MBS Auto Avenue"
    const [showby, setShowBy] = useState(false)


    const downloadBidsList = async (format = "csv") => {
        axios({
            method: "post",
            url: `${common.baseUrl}Bidding/AllBids/`,
            headers: {
                Authorization: `Token ${localStorage.getItem("token")}`
            },
            data: {
                download: true,
                filetype: format
            },
            responseType: "blob"
        }).then(res => {

            fileDownload(res.data, `BidDetails-${moment().format("YYYY-MM-DD")}${"." + format}`);
        }).catch(err => {
            error(err)
        })
    }

    const [anchorEl, setAnchorEl] = useState(null);
    const [filterBy, setFilterBy] = useState({ buyer: "", carname: "", bid_amount: 0, status: "", auctionHouse: "", lotNo: "", chassis: "", results: "" })
    const [filterBar, setFilterBar] = useState(false)

    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };


    return (
        <div
            className="allbidsContainer"
        >
            <Heading title={"All Bids"} />
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
                        {/* <MenuItem onClick={() => downloadBidsList("xlsx")}>As xlsx</MenuItem> */}
                        {/* <MenuItem onClick={() => downloadBidsList("csv")}>As CSV</MenuItem> */}
                    </Menu>
                    <div>
                        <IconButton
                            onClick={() => downloadBidsList("xlsx")}
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

                <div className="all">
                    <div className="individual"
                        onClick={() => setFilterBar(!filterBar)}>
                        <p>Customer</p>
                        <p>Auction House</p>
                        <p>Lot No.</p>
                        <p>Chassis ID</p>
                        <p>Car</p>
                        <p>Bid Amount (¥)</p>
                        <p>Results</p>
                        <p>Status</p>
                    </div>
                    {
                        filterBar &&
                        <AnimatePresence exitBeforeEnter>
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                className="individual">
                                <input
                                    className="filter-input"
                                    type="text"
                                    placeholder="Customer"
                                    value={filterBy.buyer}
                                    onChange={e => setFilterBy({ ...filterBy, buyer: e.target.value.toLowerCase() })}
                                />
                                <input
                                    type="text"
                                    className="filter-input"
                                    placeholder="Auction House"
                                    value={filterBy.auctionHouse}
                                    onChange={e => setFilterBy({ ...filterBy, auctionHouse: e.target.value.toLowerCase() })}
                                />
                                <input
                                    type="text"
                                    className="filter-input"
                                    placeholder="Lot No:"
                                    value={filterBy.lotNo}
                                    onChange={e => setFilterBy({ ...filterBy, lotNo: e.target.value })}
                                />
                                <input
                                    type="text"
                                    className="filter-input"
                                    placeholder="Chassis ID"
                                    value={filterBy.chassis}
                                    onChange={e => setFilterBy({ ...filterBy, chassis: e.target.value })}
                                />
                                <input
                                    type="text"
                                    className="filter-input"
                                    placeholder="Car"
                                    value={filterBy.carname}
                                    onChange={e => setFilterBy({ ...filterBy, carname: e.target.value })}
                                />
                                <input
                                    type="number"
                                    className="filter-input"
                                    placeholder="Bid Amount ($)"
                                    value={filterBy.bid_amount}
                                    onChange={e => setFilterBy({ ...filterBy, bid_amount: e.target.value })}
                                />
                                <input
                                    type="text"
                                    className="filter-input"
                                    placeholder="Results"
                                    value={filterBy.results}
                                    onChange={e => setFilterBy({ ...filterBy, results: e.target.value })}
                                />
                                <select type="text"
                                    className="filter-input"
                                    placeholder="Status"
                                    value={filterBy.status}
                                    onChange={e => setFilterBy({ ...filterBy, status: e.target.value })}
                                >
                                    <option value="">ANY</option>
                                    <option value="PENDING">PENDING</option>
                                    <option value="LOST">LOST</option>
                                    <option value="WIN">WIN</option>
                                </select>
                            </motion.div>
                        </AnimatePresence>
                    }
                    {
                        bidHistory.filter(item =>
                            item.cardetails?.one_price === showby &&
                            item.bidder.name.toLowerCase().includes(filterBy.buyer) &&
                            item.cardetails.auction_place.toLowerCase().includes(filterBy.auctionHouse) &&
                            item.cardetails.car_name.toLowerCase().includes(filterBy.carname) &&
                            item.cardetails.model.toLowerCase().includes(filterBy.chassis) &&
                            item.cardetails.lot_no.includes(filterBy.lotNo) &&
                            item.bid_status.includes(filterBy.status) &&
                            item.bid_amount > filterBy.bid_amount
                        ).map((item, key) => {
                            console.log(item)
                            return (
                                <div className="individual" key={key}>
                                    <Tooltip placement="left" title={item.bidder.name}>
                                        <p>{item.bidder.name.split(" ")[0]}</p>
                                    </Tooltip>
                                    <Tooltip placement="left" title={item.cardetails.auction_place}>
                                        <p>{item.cardetails.auction_place}</p>
                                    </Tooltip>
                                    <p>{item.cardetails.lot_no}</p>
                                    <p>{item.cardetails.model}</p>
                                    <Tooltip placement="left" title={item.cardetails.car_name}>
                                        <p style={{ cursor: "pointer" }} onClick={() => window.open("/specific_car/" + item.cardetails.id)}>{item.cardetails.car_name.slice(0, 10) + "..."}</p>
                                    </Tooltip>
                                    <p>{currency(item.bid_amount, { symbol: '¥', precision: 0 }).format()}</p>
                                    <p>{item.purchase_price ? currency(item.purchase_price, { symbol: '¥', precision: 0 }).format() : 'N/A'}</p>
                                    {
                                        item.bid_status === "PENDING" ? <p style={{ color: "#EFB700", fontWeight: "bold" }}>PENDING</p> : item.bid_status === "WON" ? <p style={{ color: "#009822", fontWeight: "bold" }}>WON</p> : item.bid_status === "CANCELLED" ? <p style={{ color: "RED", fontWeight: "bold" }}>CANCELLED</p> : <p style={{ color: "RED", fontWeight: "bold" }}>LOST</p>

                                    }
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Allbids
