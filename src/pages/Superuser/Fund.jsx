import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import common from "../../baseUrl"
import dateFormat from "dateformat"
import { error, success } from '../../component/Toast'
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Divider, Pagination, Tooltip } from '@mui/material'
import { CodeSharp } from '@mui/icons-material'

const Fund = () => {

    const [fundsList, setFundsList] = useState([])
    const [resultCount, setResultCount] = useState(0)
    const { id } = useParams()
    useEffect(() => {
        const getFund = async () => {
            const response = await axios({
                method: "POST",
                url: `${common.baseUrl}Funds/ShowReceivables/`,
                headers: {
                    Authorization: `Token ${localStorage.getItem("token")}`
                },
                data: {
                    agent_id: id
                }
            })
            if (response.status === 200) {
                setResultCount(response.data.count)
                setFundsList(response.data.results)
            } else {
                error("Something went wrong")
            }

        }
        getFund()
    }, [])
    const markPurchaseComplete = async (client_id, car_id, payby, forcar) => {
        const accept = window.confirm(`Once you choose this bid as winning bid. You can't revert it. So select it carefully. \n\nFor now, You have choosed ${payby} for ${forcar}`)
        if (accept) {
            const response = await axios({
                method: "post",
                url: `${common.baseUrl}Funds/MarkPurchaseComplete/`,
                headers: {
                    Authorization: `Token ${localStorage.getItem("token")}`
                },
                data: {
                    car_id,
                    client_id
                }
            })
            if (response.status === 200) {
                success(`Hurray! Client ${client_id} is choosed as winner for car ${car_id} `)
            }
            else {
                error("Something went wrong !")
            }
        } else {
            console.log("No problem. You have cancelled the confirmation box.")
        }

    }
    const markPaymentComplete = async (client_id, car_id, payby, forcar) => {
        const accept = window.confirm(`Once you choose this bid as winning bid. You can't revert it. So select it carefully. \n\nFor now, You have choosed ${payby} for ${forcar}`)
        if (accept) {
            const response = await axios({
                method: "post",
                url: `${common.baseUrl}Funds/MarkPaymentComplete/`,
                headers: {
                    Authorization: `Token ${localStorage.getItem("token")}`
                },
                data: {
                    car_id,
                    client_id
                }
            })
            if (response.status === 200) {
                success(`Hurray! Client ${client_id} is choosed as winner for car ${car_id} `)
            }
            else {
                error("Something went wrong !")
            }
        } else {
            console.log("No problem. You have cancelled the confirmation box.")
        }

    }
    const generateTracker = async (client_id, car_id, key) => {
        const response = await axios({
            method: "post",
            url: `${common.baseUrl}Funds/GenerateTracker/`,
            headers: {
                Authorization: `Token ${localStorage.getItem("token")}`
            },
            data: {
                client_id,
                car_id
            }
        })
        if (response.status === 200) {
            document.getElementById("generateTracker" + key).display = "none";
        } else {
            error("Something went wrong.")
        }
    }

    const nextPage = async (pageNumber) => {

        const response = await axios({
            method: "post",
            headers: {
                Authorization: `Token ${localStorage.getItem("token")}`
            },
            url: `${common.baseUrl}Funds/ShowReceivables/?page=${pageNumber}`,
            data: {
                agent_id: id
            }
        })
        if (response.status === 200) {
            setFundsList(response.data.results)
        } else {
            error("Something went wrong!")
        }
    }

    return (
        <div className="fundsContainer">
            {/* fund */}
            <div className="header">
                <h2>Funds for Agent Id {id}</h2>
            </div>
            <Divider />
            <div className="funds">
                <div className="fund">
                    <b>Buyer</b>
                    <b>Car Details</b>
                    <b>Created At</b>
                    <b>Down Payment</b>
                    <b>Payment Complete</b>
                    <b>Purchase Complete</b>
                    <b>Updated At</b>
                </div>
                {/* {console.log(typeof (fundsList), fundsList.length)} */}
                {fundsList.map((item, key) => {
                    return (
                        <div className="fund" key={key}>
                            <Tooltip placement="left" title={item.buyer.name}>
                                <p>{item.buyer.name.split(" ")[0]}</p>
                            </Tooltip>
                            <Tooltip placement="left" title={item.cardetails.car_name}>
                                <p>{item.cardetails.car_name.slice(0, 15) + "..."}</p>
                            </Tooltip>
                            {/* {console.log(typeof (item))} */}
                            <p>{dateFormat(item.created_at, " mmm dS, yyyy")}</p>
                            <p>{item.downpayment}</p>
                            <p>{item.payment_complete ?
                                <div style={{ display: "flex", alignItems: "Center" }}>
                                    <CheckCircleIcon style={{ color: "springgreen" }} />
                                    <button
                                        id={"generateTracker" + key}
                                        onClick={() => generateTracker(item.buyer.id, item.cardetails.id, key)}
                                    >Generate Tracker</button>
                                </div>
                                :
                                <div style={{ display: "flex", alignItems: "Center" }}>
                                    <CancelIcon style={{ color: "red" }} />
                                    <button
                                        onClick={() => markPaymentComplete(item.buyer.id, item.cardetails.id, item.buyer.name, item.cardetails.car_name)}>
                                        Mark Complete</button>
                                </div>
                            }</p>

                            <p>{item.purchase_complete ? <CheckCircleIcon style={{ color: "springgreen" }} /> :
                                <div style={{ display: "flex", alignItems: "Center" }}>
                                    <CancelIcon style={{ color: "red" }} />
                                    <button
                                        onClick={() => markPurchaseComplete(item.buyer.id, item.cardetails.id, item.buyer.name, item.cardetails.car_name)}
                                    >Mark Complete</button>
                                </div>
                            }</p>
                            <p>{dateFormat(item.update_at, " mmm dS, yyyy")}</p>
                        </div>
                    )
                })}
            </div>

            {/* buyer: 1
cardetails: 3
created_at: "2021-11-07T10:04:39.525808Z"
downpayment: 0
due_amount: 0
id: 6
payment_complete: false
purchase_complete: false
updated_at: "2021-11-07T10:04:39.525808Z" */}

            {Math.ceil(resultCount / 16) > 1 ?
                <Pagination count={Math.ceil(resultCount / 16)} sx={{ mb: 1 }} onChange={(e, pageNumber) => nextPage(pageNumber)} /> :
                ''
            }
        </div>
    )
}

export default Fund
