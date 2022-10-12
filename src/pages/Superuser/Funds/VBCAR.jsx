import React, { useState, useEffect } from 'react'
import { Drawer } from '@material-ui/core';
import axios from 'axios';
import common from "../../../baseUrl"
import { success, error } from '../../../component/Toast';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import CheckIcon from '@mui/icons-material/Check';
import { Tooltip } from "@mui/material"

const VBCAR = ({ allFunds }) => {

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
                <div className="vbaIndividual">
                    <b style={{ justifySelf: "center" }}>Chassis No.</b>
                    <b>Car Name</b>
                    <b style={{ justifySelf: "center" }}>Due Amount ($)</b>
                </div>
                {allFunds.map((item, key) => {
                    if (!item.payment_complete) {
                        return (
                            <div key={key} className="vbaIndividual">
                                <p style={{ justifySelf: "center" }}>{item.chassis}</p>
                                <p >{item.cardetails.car_name}</p>
                                <p style={{ justifySelf: "center" }}>{(item.cnf_price - item.amount_paid).toFixed(2)}</p>
                                <div className="vbcarcontrol" style={{ justifySelf: "flex-end" }}>
                                    <Tooltip title="Send Notification">
                                        <button
                                            onClick={() => sendNotification(item.id)}><NotificationsActiveIcon /></button>
                                    </Tooltip>
                                    {/* <Tooltip title="Tracking">
                                <button
                                    onClick={toggleDrawer(true,item.buyer.id,item.cardetails.id)}><ScreenSearchDesktopIcon/></button>
                                </Tooltip> */}
                                    <Tooltip title="Add a Payment">
                                        <button
                                            onClick={toggleDrawer(true, item.buyer.id, item.cardetails.id, item.chassis, item.buyer.wallet.amount)}><AccountBalanceWalletIcon /></button>
                                    </Tooltip>
                                    <Tooltip title="Mark Payment Complete">
                                        <button onClick={() => markPaymentComplete(item.id)}><CheckIcon /></button>
                                    </Tooltip>
                                </div>
                            </div>
                        )
                    }

                })}
            </div>
        </>
    )
}

export default VBCAR
