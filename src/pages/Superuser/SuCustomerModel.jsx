import { TabRounded } from '@material-ui/icons'
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import React from 'react'
import { motion } from "framer-motion";
import "../../styling/SaCustomerModel.css"
function SuCustomerModel(props) {
    return (
        <div className='SaCustomerModel' onClick={() => props.onClose ? props.onClose() : ""} >
            <div className='SaCustomerModel__body' onClick={(e) => e.stopPropagation()}>
                <div className='SaCustomerModel__body__title'>

                    <h3>{props?.CustomerName}</h3>
                    <p>customer@gmail.com</p>
                </div>
                <div className='SaCustomerModel__body__bidDetails'>

                    <h3>Car List</h3>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell style={{ fontWeight: "bold" }}>Cars</TableCell>
                                <TableCell style={{ fontWeight: "bold" }}>Car Name</TableCell>
                                <TableCell style={{ color: "#8a28d9", fontWeight: "bold" }}>Deposit</TableCell>
                                <TableCell style={{ fontWeight: "bold" }}>Receivable</TableCell>
                            </TableRow>
                        </TableHead>
                        {
                            props.carDetail?.length >= 1 ?
                                <TableBody>
                                    {
                                        props.carDetail?.map(item => {
                                            return (
                                                <TableRow>
                                                    <TableCell className='SaCustomerModel__body__bidDetails__img'>
                                                        {/* <img className='' src={item?.image_urls?item?.image_urls:""} alt="" /> */}
                                                        <motion.img
                                                            layoutId={"SPECIFIC_VEHICLE_IMG" +item?.id}
                                                            src={item?.image_urls}
                                                            alt={"car image"}

                                                        />
                                                    </TableCell>
                                                    <TableCell>{item?.car_name}</TableCell>
                                                    <TableCell style={{ color: "#8a28d9" }}>{item?.deposits}</TableCell>
                                                    <TableCell>{item?.receivables}</TableCell>
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

export default SuCustomerModel