import { TabRounded } from '@material-ui/icons'
import { Table, TableBody, TableCell, tableCellClasses, TableHead, TableRow } from '@mui/material'
import React from 'react'
import "../../styling/SaCustomerModel.css"
import { makeStyles, styled } from '@material-ui/core';
import common from '../../baseUrl';
import { motion } from "framer-motion";
import axios from 'axios';
import { toast } from 'react-toastify';
function SaCustomerModel(props) {
    const useStyles = makeStyles({
        row: {
            color: "white",
            cursor: "pointer",
            marginTop: "30px",
            border: "none",
            height: "35px",
            fontFamily: "Montserrat",
            "&:hover": {
                "& $showHid": {
                    opacity: "1"
                }
            }
        },
        showHid: {
            display: "flex",
            textAlign: "right",
            alignItems: "center",
            height: "75px",
            paddingRight: "2px",
            opacity: "0",
            background: "linear-gradient(90deg, transparent, grey)",
            backdropFilter: "blur(2px)",
            borderTopLeftRadius: "30px",
            borderBottomLeftRadius: "30px",
            transition: ".5s all, ease-out"

        }

    });
    const classes = useStyles()


    const isSA = localStorage.getItem('SuperHeadAdmin')

    const sendPaymentStatus = async (data) => {
        if (isSA) {
            const pId = data?.purchase_id
            const url = `Funds/update-payment-status/${pId}`
            const payReminder = await axios({
                method: "post",
                url: `${common.baseUrl}${url}`,
                headers: {
                    Authorization: `Token ${localStorage.getItem("token")}`
                }
            })
            if (payReminder.status == 200) {
                toast.success("Remider sent successfully")
                window.location.reload()
            }
        }
        else {
            toast.error("Only superHeadAdmin has this access")
        }
    }


    return (
        <div className='SaCustomerModel' onClick={() => props.onClose ? props.onClose() : ""} >
            <div className='SaCustomerModel__body' onClick={(e) => e.stopPropagation()}>
                <div className='SaCustomerModel__body__title'>

                    <h3>{props?.carDetail?.client_name}</h3>
                    <p>{props?.carDetail?.client_email}</p>
                </div>
                <div className='SaCustomerModel__body__bidDetails'>

                    <h3>Car List</h3>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell style={{ fontWeight: "bold", textAlign:"center" }}>Cars</TableCell>
                                <TableCell style={{ fontWeight: "bold" , textAlign:"center" }}>Car Name</TableCell>
                                <TableCell style={{ fontWeight: "bold" , textAlign:"center" }}>C & F Price</TableCell>
                                <TableCell style={{ color: "#8a28d9", fontWeight: "bold", textAlign:"center"  }}>Deposit</TableCell>
                                <TableCell style={{ fontWeight: "bold" , textAlign:"center" }}>Receivable</TableCell>
                                {isSA &&<TableCell style={{ fontWeight: "bold" ,color: "#8a28d9", textAlign:"center" }}>Payment Status</TableCell>}
                            </TableRow>
                        </TableHead>
                        {
                            props.carDetail?.purchases?.length >= 1 ?
                                <TableBody>
                                    {
                                        props.carDetail?.purchases?.map(item => {
                                            return (
                                                <TableRow className={classes.row}>
                                                    <TableCell style={{padding:"0px", textAlign:"center" }} className='SaCustomerModel__body__bidDetails__img'>
                                                        {/* <img className='' src={item?.image_urls} alt="" /> */}

                                                        <motion.img
                                                            layoutId={"SPECIFIC_VEHICLE_IMG" + item?.id}
                                                            src={item?.image_urls}
                                                            alt={"car image"}

                                                        />
                                                    </TableCell>
                                                    <TableCell style={{padding:"0px", textAlign:"center" }}>{item?.car_name}</TableCell>
                                                    <TableCell style={{ color: "#8a28d9",padding:"0px", textAlign:"center"  }}>{item?.cnf_price}</TableCell>
                                                    <TableCell style={{ color: "#8a28d9",padding:"0px" , textAlign:"center" }}>{item?.deposits}</TableCell>
                                                    <TableCell  style={{padding:"0px" , textAlign:"center" }}>{item?.receivables}</TableCell>
                                                   {isSA&&<TableCell style={{ color: "#8a28d9" ,padding:"0px", textAlign:"center" }} onClick = {()=>sendPaymentStatus(item) } ><span  style={{paddingLeft:"5px"}} className={classes.showHid}>Payment Completed</span></TableCell>}
                                                  
                                                </TableRow>
                                            )
                                        })
                                    }
                                </TableBody> : <> <p style={{ opacity: ".3", fontWeight: "500", fontSize: "13px", marginTop: "5px", position: "absolute" }}>Selected Customer Has no Purchase History</p></>
                        }
                    </Table>
                </div>
            </div>
        </div>
    )
}

export default SaCustomerModel