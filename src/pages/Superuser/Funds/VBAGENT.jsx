import React, { useState, useEffect, useRef } from 'react'
import _ from "lodash";
import currency from 'currency.js'
import { Drawer } from '@material-ui/core';
import axios from 'axios';
import common from '../../../baseUrl'
import { error, success } from '../../../component/Toast';
import Cancel from '@mui/icons-material/Cancel';
import { Tooltip } from '@mui/material';
import NotificationsActive from '@mui/icons-material/NotificationsActive';
import AccountBalanceWallet from '@mui/icons-material/AccountBalanceWallet';
import Check from '@mui/icons-material/Check';
import {Pagination} from '@mui/material'

const VBAGENT = ({ allFunds }) => {

    const [vbagent, setVBAgent] = useState([])
    const [resultCount, setResultCount] = useState(0)

    useEffect(async () => {
        const response = await axios({
            method: "post",
            url: `${common.baseUrl}Funds/ShowReceivables/`,
            headers: {
                Authorization: `Token ${localStorage.getItem("token")}`
            }
        })
        if (response.status === 200) {
            setResultCount(response.data.count)
            setVBAgent(response.data.results)
        } else {
            error("Failed to fetch information")
        }

    }, [])

    const nextPage = async (pageNumber) => {

        const response = await axios({
            method: "post",
            headers: {
                Authorization: `Token ${localStorage.getItem("token")}`
            },
            url: `${common.baseUrl}Funds/ShowReceivables/?page=${pageNumber}`,
        })
        if (response.status === 200) {

            setVBAgent(response.data.results)
        } else {
            error("Something went wrong!")
        }
    }

    //To be reviewed
    const [paymentObj, setPaymentObj] = useState({
        exchangeRate: "",
        amount: "",
        clientId: "",
        carId: "",
        currency: "USD",
        remarks: "",
        walletAmt: ""
    })
    const [chassis, setChassis] = useState("")
    const [state, setState] = useState(false);

    const toggleDrawer = (open, bidderid, carid, chassispassed, walletamt) => async (event) => {
        setPaymentObj({ ...paymentObj, clientId: bidderid, carId: carid, walletAmt: walletamt })
        setChassis(chassispassed)
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setState(open);
    };

    const makeYourPayment = async () => {
        try {
            const response = await axios({
                method: "post",
                url: `${common.baseUrl}Funds/MakeCarPayment/`,
                headers: {
                    Authorization: `Token ${localStorage.getItem("token")}`
                },
                data: {
                    car_id: paymentObj.carId,
                    client_id: paymentObj.clientId,
                    amount: paymentObj.amount,
                    remarks: paymentObj.remarks.length === 0 ? "." : paymentObj.remarks,
                    currency: paymentObj.currency,
                    conversion_rate: paymentObj.exchangeRate.length === 0 ? "1" : paymentObj.exchangeRate,
                    mode: "direct"
                }
            })
            if (response.status === 200) {
                success("Payment has been successfully added")
                setState(false)
                window.location.reload()
            } else {
                error("There was some error in Payment API")
            }
        } catch (e) {
            error(e.response.data)
        }

    }

    const markPaymentComplete = async (id) => {
        const confirm = window.confirm("Are you sure you want to mark the payment as complete? Click on 'Ok' to confirm")
        if (confirm === true) {
            const response = await axios({
                method: "post",
                url: `${common.baseUrl}Funds/PaymentComplete/`,
                headers: {
                    Authorization: `Token ${localStorage.getItem("token")}`
                },
                data: {
                    id
                }
            })
            if (response.status === 200) {
                window.location.reload()
            }
            else {
                error("Something went wrong")
            }
        } else {
            console.log("Plan Dropped")
        }

    }

    const sendNotification = async (fund_id) => {
        const response = await axios({
            method: "post",
            url: `${common.baseUrl}Funds/DueNotification/`,
            headers: {
                Authorization: `Token ${localStorage.getItem("token")}`
            },
            data: {
                id: fund_id
            }
        })
        if (response.status === 201) {
            success("Sent")
        } else {
            error("There was some error in Notification API")
        }
    }

    return (
        <>
            <Drawer
                anchor={"left"}
                open={state}
                onClose={toggleDrawer(false)}
            >
                <div className="paymentDrawer">
                    <div>
                        <div className="head">
                            <h1>Add a Payment</h1>
                            {/* <p>Lorem ipsum dolor sit.</p> */}
                        </div>
                        <div className="body">

                            <div>
                                <p>Currency ($)</p>
                                <select
                                    className="std-input2"
                                    style={{ width: "12rem" }}
                                    value={paymentObj.currency}
                                    defaultValue="USD"
                                    onChange={e => setPaymentObj({ ...paymentObj, currency: e.target.value })}
                                >
                                    <option value="USD">USD</option>
                                    <option value="JPY">JPY</option>
                                </select>
                            </div>
                            {
                                paymentObj.currency === "JPY"
                                &&
                                <div>
                                    <p>Conversion Rate ($ to ¥)</p>
                                    <input
                                        value={paymentObj.exchangeRate}
                                        onChange={e => setPaymentObj({ ...paymentObj, exchangeRate: e.target.value })}
                                        className="std-input2"
                                        type="text" />
                                </div>
                            }
                            <div>
                                <p>Amount</p>
                                <input
                                    value={paymentObj.amount}
                                    onChange={e => setPaymentObj({ ...paymentObj, amount: e.target.value })}
                                    className="std-input2"
                                    type="text" />
                            </div>
                            <div>
                                <p>Wallet Balance ($)</p>
                                <input
                                    disabled
                                    className="std-input2"
                                    value={paymentObj.walletAmt}

                                />
                            </div>
                            <div>
                                <p>Chassis</p>
                                <input
                                    disabled
                                    value={chassis}
                                    className="std-input2"
                                    type="text" />
                            </div>
                            <div>
                                <p>Remarks</p>
                                <input
                                    className="std-input2"
                                    value={paymentObj.remarks}
                                    onChange={e => setPaymentObj({ ...paymentObj, remarks: e.target.value })}

                                />
                            </div>
                            <button
                                onClick={makeYourPayment}
                                className="std-button-sun" style={{ marginTop: "2rem" }}>
                                Add Payment
                            </button>
                        </div>
                        <div className="footer">
                        </div>
                    </div>
                </div>
            </Drawer>

            <div className="fundsSubContainer">
                <div className="vbaIndividual" style={{ gridTemplateColumns: "repeat(6,1fr)" }}>
                    <b>Agent</b>
                    <b>Customer</b>
                    <b>Chassis No.</b>
                    <b>C&F</b>
                    <b style={{ justifySelf: "center" }}>Due Amount ($)</b>
                    <b style={{ justifySelf: "center" }}>Wallet Balance ($)</b>
                </div>
                {vbagent.map((item, key) => {
                    if (item.payment_complete)
                        return ''
                    else
                        return (
                            <div key={key} className="vbaIndividual" style={{ gridTemplateColumns: "repeat(6,1fr)" }}>
                                <p>{item.buyer.agent.name}</p>
                                <p>{item.buyer.name}</p>
                                <p>{item.chassis ? item.chassis : 'N/A'}</p>
                                <p>{item.cnf_price ? currency(item.cnf_price, { precision: 0 }).format() : 'N/A'}</p>
                                <p style={{ justifySelf: "center" }}>{currency(item.cnf_price - item.amount_paid, { precision: 0 }).format()}</p>
                                <p>{currency(item.buyer.wallet.amount, { precision: 0 }).format()}</p>


                                {/* Hover Menu */}
                                <div className="vbcarcontrol" style={{ justifySelf: "flex-end" }}>
                                    <Tooltip title="Send Notification">
                                        <button
                                            onClick={() => sendNotification(item.id)}
                                        >
                                            <NotificationsActive />
                                        </button>
                                    </Tooltip>
                                    <Tooltip title="Add a Payment">
                                        <button
                                            onClick={toggleDrawer(true, item.buyer.id, item.cardetails.id, item.chassis, item.buyer.wallet.amount)}
                                        >
                                            <AccountBalanceWallet />
                                        </button>
                                    </Tooltip>
                                    <Tooltip title="Mark Payment Complete">
                                        <button
                                            onClick={() => markPaymentComplete(item.id)}
                                        >
                                            <Check />
                                        </button>
                                    </Tooltip>
                                </div>
                            </div>
                        )
                })}
                {Math.ceil(resultCount / 16) > 1 ?
                    <Pagination count={Math.ceil(resultCount / 16)} sx={{ mb: 1 }} onChange={(e, pageNumber) => nextPage(pageNumber)} /> :
                    ''
                }
            </div>
        </>
    )
}

export default VBAGENT
