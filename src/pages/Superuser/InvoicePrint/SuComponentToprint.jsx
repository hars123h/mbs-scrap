import { makeStyles, Table, TableCell, TableHead, TableRow } from "@material-ui/core";
import { TableBody } from "@mui/material";
import * as React from "react";
import "../../../styling/InvoicePdf.css"
import HeadLogo from "../../../static/Rectangle 32.png"
import { fontSize } from "@mui/system";
const useStyle = makeStyles({
    headRow: {
        borderColor: "#8a28d9",
        fontWeight: "600",
        fontSize: "20px",
        borderBottom:"2px solid #8a28d9"

    },
    headCell: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: "20px"
    },
    row: {
        borderColor: "#8a28d9",
        fontFamily: "Montserrat",
        fontSize: "15px",
        borderBottom:"2px solid #8a28d9"
    }
})
const invoiceData = [
    {
        Description: "this is the description",
        Total: 456244,
        ChassisNo: "abs678",
        Price: 4587
    },
    {
        Description: "this is the description",
        Total: 456244,
        ChassisNo: "abs678",
        Price: 4587
    },
    {
        Description: "this is the description",
        Total: 456244,
        ChassisNo: "abs678",
        Price: 4587
    },
    {
        Description: "this is the description",
        Total: 456244,
        ChassisNo: "abs678",
        Price: 4587
    },
    {
        Description: "this is the description",
        Total: 456244,
        ChassisNo: "abs678",
        Price: 4587
    },
    {
        Description: "this is the description",
        Total: 456244,
        ChassisNo: "abs678",
        Price: 4587
    },
    {
        Description: "this is the description",
        Total: 456244,
        ChassisNo: "abs678",
        Price: 4587
    },
    {
        Description: "this is the description",
        Total: 456244,
        ChassisNo: "abs678",
        Price: 4587
    },
    {
        Description: "this is the description",
        Total: 456244,
        ChassisNo: "abs678",
        Price: 4587
    },
]
export const SuComponentToPrint = React.forwardRef((props, ref, data ) => {
    const classes = useStyle()
    return (
        <div ref={ref}>
            <div className="invoicePdf">
                <div className="invoicePdf__topContainer">
                    <div className="invoicePdf__top">
                        <img
                            className="NAVBARLOGO"
                        src={HeadLogo} alt="" />
                        
                    </div>
                    <div className="invoicePdf__dateSection">
                        <h3 style={{height:"50px", fontSize:"30px", fontWeight:"600", fontFamily:" font-family: Montserrat;"}}>INVOICE</h3>
                        <div>
                            <p>No. 123/456/7890</p>
                            <p>27/07/2022</p>
                        </div>
                    </div>
                    <div className="Horizontal_Line"></div>
                    <div className="invoicePdf__dateSection">
                        <div className="invoicePdf__dateSection__client">
                            <p>Invoice to:</p>
                            <h3>CLIENT NAME</h3>
                            <p>+123-456-7890</p>
                            <p>hello@gmail.com</p>
                        </div>
                        <div className="invoicePdf__dateSection__client">
                            <h3>PAYMENT TO</h3>
                            <div className="invoicePdf__dateSection__client__bank">
                                <p>Bank :</p>
                                <p>Canera Bank</p>
                            </div>
                            <div className="invoicePdf__dateSection__client__bank" >
                                <p>Acc Name:</p>
                                <p>XXXXXXXXXXX</p>
                            </div>
                        </div>
                    </div>
                    <div className="Horizontal_Line"></div>
                    <div className="invoicePdf__dateSection__table">
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell className={classes.headRow} style={{ fontFamily: "Montserrat" }}>
                                        Description
                                    </TableCell>
                                    <TableCell className={classes.headRow} style={{ fontFamily: "Montserrat" }}>
                                        Chassis No
                                    </TableCell>
                                    <TableCell className={classes.headRow} style={{ fontFamily: "Montserrat" }}>
                                        Price
                                    </TableCell>
                                    <TableCell className={classes.headRow} style={{ fontFamily: "Montserrat" }}>
                                        Total
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    invoiceData?.map((item) => {
                                        return (
                                            <TableRow>
                                                <TableCell className={classes.row} style={{ fontFamily: "Montserrat" }}>
                                                    {item.Description}
                                                </TableCell>
                                                <TableCell className={classes.row} style={{ fontFamily: "Montserrat" }}>
                                                    {item.ChassisNo}
                                                </TableCell>
                                                <TableCell className={classes.row} style={{ fontFamily: "Montserrat" }}>
                                                    {item.Price}
                                                </TableCell>
                                                <TableCell className={classes.row} style={{ fontFamily: "Montserrat" }}>
                                                    {item.Total}
                                                </TableCell>
                                            </TableRow>
                                        )
                                    })
                                }
                            </TableBody>
                        </Table>
                    </div>
                    <div className="invoicePdf__dateSection">
                        <div >

                            <div className="invoicePdf__dateSection__client__address">
                                <p >MBS office</p>
                            </div>
                            <div className="invoicePdf__dateSection__client__address">
                                <p>Address :</p>
                                <p>Osaka</p>
                            </div>
                            <div className="invoicePdf__dateSection__client__address">
                                <p>Phone no.:</p>
                                <p>xxxxxxxxxx</p>
                            </div>
                            <div className="invoicePdf__dateSection__client__address">
                                <p>Email id:</p>
                                <p>hello@gmail.com</p>
                            </div>

                        </div>
                        <div className="invoicePdf__dateSection__client__address">
                            <h3>TOTAL:</h3>
                            <h3>XYZ</h3>


                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
});
