import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import common from "../../baseUrl"
import { error, info, success } from '../../component/Toast'
import dateFormat from 'dateformat'
import { Tooltip } from '@mui/material'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import SuTop from "../../component/Heading/SuTop"
import { AnimatePresence, motion } from 'framer-motion'
import currency from 'currency.js'
function SaBidHistoryAgent() {
    const [bids, setBids] = useState([])
    const [agent, setAgent] = useState("")
    // const [filterBy,setFilterBy]=useState({car:"",bidder:"",bidamt:0,status:"",updatedAt:""})
    const [filterBy, setFilterBy] = useState({ agent: "", auctionHouse: "", customer: "", car: "", bid_amount: "", status: "", result: "", createdAt: "" })

    const [filterBar, setFilterBar] = useState(false)

    const { id } = useParams()
    useEffect(() => {
        const getAllBids = async () => {
            const response = await axios({
                method: "post",
                url: `${common.baseUrl}Bidding/AllBids/`,
                headers: {
                    Authorization: `Token ${localStorage.getItem("token")}`
                },
                data: {
                    agent_id: id
                }
            })
            if (response.status === 200) {
                setBids(response.data)
                setAgent(response.data[0]?.agent.name)


            } else {
                error("Something went wrong.")
            }
        }
        getAllBids()
    }, [])

    // const handleApproval=async(e)=>{


    //     console.log(bids[key])
    //     const response=await axios({
    //         method:"POST",
    //         url:`${common.baseUrl}Bidding/ApproveBid/`,
    //         headers:{
    //             Authorization:`Token ${localStorage.getItem("token")}`
    //         },
    //         data:{
    //              car_id:bids[key].cardetails.id, 
    //              client_id:bids[key].bidder.id,
    //              is_approved:!temp[key]
    //         }
    //     })
    //     if(response.status===200){
    //         let msg=!temp[key]?"Bid is approved for Car Id "+bids[key].cardetails.id + " and Client Id "+bids[key].bidder.id
    //         :
    //         "Bid is cancelled for Car Id "+bids[key].cardetails.id + " and Client Id "+bids[key].bidder.id;
    //         success(msg)
    //     }
    //     else{
    //         error("Something went wrong while approving.")
    //     }
    // }

    return (
        <div className="allbidsContainer">

            <div className="bidHistoryContainer">
                <SuTop title={`All Bids for ${agent}`} />
                <div className="all">
                    <div className="individual"
                        style={{ marginTop: "4rem", gridTemplateColumns: "repeat(8,1fr)" }}
                        onClick={() => setFilterBar(!filterBar)}
                    >
                        <p>Agent </p>
                        <p>Auction House</p>
                        <p>Lot No.</p>
                        <p>Car</p>
                        <p>Chassis ID</p>
                        <p>Bid Amount (¥)</p>
                        {/* <p>Results (¥)</p> */}
                        <p>Status</p>
                    </div>
                    {
                        filterBar &&
                        <AnimatePresence exitBeforeEnter>
                            <motion.div
                                className="individual" style={{ gridTemplateColumns: "repeat(8,1fr)" }}
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
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
                                {/* <input
                                  type="text"
                                  className="filter-input"
                                  placeholder="Result  (¥)"
                                  value={filterBy.result}
                                  onChange={e => setFilterBy({ ...filterBy, result: e.target.value.toLowerCase() })}
                              /> */}
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
                            </motion.div>
                        </AnimatePresence>
                    }
                    {
                        bids.filter((item) => item.cardetails.car_name.toLowerCase().includes(filterBy.car) &&
                            item.agent.name.toLowerCase().includes(filterBy.agent) &&
                            item.cardetails.auction_place.toLowerCase().includes(filterBy.auctionHouse) &&
                            item.bidder.name.toLowerCase().includes(filterBy.customer) &&
                            item.cardetails.car_name.toLowerCase().includes(filterBy.car) &&
                            item.bid_amount >= filterBy.bid_amount &&
                            item.bid_status.includes(filterBy.status) &&
                            item.cardetails.model.includes(filterBy.createdAt)).map((item, key) => {
                                return (
                                    <div
                                        style={{ gridTemplateColumns: "repeat(8,1fr)" }}
                                        className="individual"
                                        key={key}>
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


                                        {/* {<p>N/A</p>} */}
                                    
                                        {
                                            item.bid_status === "PENDING" ? <p style={{ color: "#EFB700", fontWeight: "bold" }}>PENDING</p> : item.bid_status === "WON" ? <p style={{ color: "#009822", fontWeight: "bold" }}>WON</p> : item.bid_status === "CANCELLED" ? <p style={{ color: "RED", fontWeight: "bold" }}>CANCELLED</p> : <p style={{ color: "RED", fontWeight: "bold" }}>LOST</p>

                                        }                                </div>
                                )
                            })
                    }
                </div>
            </div>
        </div>
    )
}

export default SaBidHistoryAgent