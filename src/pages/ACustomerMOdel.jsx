import { TabRounded } from '@material-ui/icons'
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import React from 'react'
import { motion } from "framer-motion";
import "../styling/SaCustomerModel.css"
function ACustomerModel(props) {
    return (
        <div className='SaCustomerModel Atmodel' onClick={() => props.onClose ? props.onClose() : ""} >
            <div className='SaCustomerModel__body AtmodelBody' onClick={(e) => e.stopPropagation()}>
                <div className='SaCustomerModel__body__title'>

                    <h3>{props.customerPurchase?.client_name}</h3>
                    <p>{props?.customerPurchase?.client_email}</p>
                </div>
                <div className='SaCustomerModel__body__bidDetails'>

                    <h3>Car List</h3>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell style={{ fontWeight: "bold" }}>Cars</TableCell>
                                <TableCell style={{ fontWeight: "bold" }}>Car Name</TableCell>
                                <TableCell style={{ fontWeight: "bold" }}>C&F Price</TableCell>
                                <TableCell style={{ color: "#8a28d9", fontWeight: "bold" }}>Deposit</TableCell>
                                <TableCell style={{ fontWeight: "bold" }}>Receivable</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                props?.customerPurchase?.purchases.map(item => {
                                    return (
                                        <TableRow>
                                            <TableCell className='SaCustomerModel__body__bidDetails__img'>
                                                {/* <img className='' src={item?.image_urls} alt="" /> */}
                                                <motion.img
                                                    layoutId={"SPECIFIC_VEHICLE_IMG" + item?.id}
                                                    src={item?.image_urls}
                                                    alt={"car image"}

                                                />
                                            </TableCell>
                                            <TableCell>{item?.car_name}</TableCell>
                                            <TableCell>{item?.cnf_price}</TableCell>
                                            <TableCell style={{ color: "#8a28d9" }}> {item?.deposits}</TableCell>
                                            <TableCell> {item?.receivables}</TableCell>
                                        </TableRow>
                                    )
                                })
                            }


                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    )
}

export default ACustomerModel