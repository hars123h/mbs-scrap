import React, { useState } from 'react'
import "../../styling/SaCreateInvoice.css"
import { makeStyles, Table, TableBody, TableCell, TableRow } from '@material-ui/core'
import { DropDownList } from '@progress/kendo-react-dropdowns'
const useStyle = makeStyles({

    headRow: {
        backgroundColor: "#8a28d9",
        fontFamily: "montserrat",

    },
    headCell: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: "20px",
        fontFamily: "montserrat",


    },
    row: {
        color: "white",
        boxShadow: "7px 4px 16px 0px #ccc",
        cursor: "pointer",
        marginTop: "30px",
        border: "none",
        tableLayout: "none",
        gap: "20px",
        fontFamily: "Montserrat",
        "&:hover": {
            backgroundColor: "whitesmoke",
        }
    },
    cell: {
        border: "none",
        fontFamily: "Montserrat",
        padding: "25px"

    },
    invoiceRow: {
        border: "none",
        padding: "20px"
    }


})
const BankList = [
    {
        name: "RESONA BANK LTD"
    },
    {
        name: "SUMITOMO MITSUI BANKING CORPORATION"
    }
]
const statusList = [
    {
        name:"Paid"
    },
    {
        name:"Awaiting Approval"
    }
]
const SelectStatus ={
        name:"select Status..."
    }

const Agents = [
    {
        id: 1,
        name: "Chloe Williams",
        occupation: "Developer",
        carModel:"9cf9f"
    },
    {
        id: 2,
        name: "Severus Snape",
        occupation: "Developer",
        carModel:"9cf9f"
    },
    {
        id: 3,
        name: "Mark Smith",
        occupation: "Tech Support",
        carModel:"9cf9f"
    },
    {
        id: 4,
        name: "Rosemary Adams",
        occupation: "Tech Support",
        carModel:"9cf9f"
    },
    {
        id: 5,
        name: "Joe McDonalds",
        occupation: "Designer",
        carModel:"9cf9f"
    },
    {
        id: 6,
        name: "Minerva McGonagall",
        occupation: "Designer",
        carModel:"9cf9f"
    },
];
const defaultItemAgent = {
    name: "Select Agents..."
}
const defaultItemCust = {
    name: "Select Customer..."
}
const defaultItemBank = {
    name: "Select Bank..."
}
const DefaultCar = {
    carModel:"Select Car Model..."
}
function ACreateInvoice() {
    const [BankName, SetBankName] = useState()
    const [status, SetStatus] = useState()
    const classes = useStyle()
    return (
        <div className='createInvoceBody'>
            <div className='creaetInvoice'>
                <h3>Create Invoice</h3>
            </div>
            <div className="createinvoice__heading">
                <h3>Invoice Details</h3>
            </div>
            <div className='createInvoice__detailsFill'>
                <Table>
                    <TableBody>

                        <TableRow className={classes.row}>
                            <TableCell className={classes.invoiceRow} style={{ fontWeight: "600", fontSize: "20px" }}>Agent Name:</TableCell>
                            <TableCell className={classes.invoiceRow}> 
                             <DropDownList

                                style={{
                                    backgroundColor: "#fff", height: "30px", color: "#000", outline: "none",
                                    border: "1px solid grey",

                                    borderRadius: "10rem",
                                    width: "310px"
                                }}
                                data={Agents}
                                textField="name"
                                defaultItem={defaultItemAgent}
                                onChange={(e) => SetBankName(e.target.value.super_model_id)}

                            /></TableCell>
                        </TableRow>
                        <TableRow className={classes.row} >
                            <TableCell className={classes.invoiceRow} style={{ fontWeight: "600", fontSize: "20px" }}>Customer Name:</TableCell>
                            <TableCell className={classes.invoiceRow}>
                                <DropDownList

                                    style={{
                                        backgroundColor: "#fff", height: "30px", color: "#000", outline: "none",
                                        border: "1px solid grey",

                                        borderRadius: "10rem",
                                        width: "310px"
                                    }}
                                    data={Agents}
                                    textField="name"
                                    defaultItem={defaultItemCust}
                                    onChange={(e) => SetBankName(e.target.value.super_model_id)}

                                /></TableCell>
                        </TableRow>

                        <TableRow className={classes.row}>
                            <TableCell className={classes.invoiceRow} style={{ fontWeight: "600", fontSize: "20px" }}>Car Model:</TableCell>
                            <TableCell className={classes.invoiceRow}>
                                <DropDownList

                                    style={{
                                        backgroundColor: "#fff", height: "30px", color: "#000", outline: "none",
                                        border: "1px solid grey",

                                        borderRadius: "10rem",
                                        width: "310px"
                                    }}
                                    data={Agents}
                                    textField="carModel"
                                    defaultItem={DefaultCar}
                                    onChange={(e) => SetBankName(e.target.value.super_model_id)}

                                /></TableCell>
                        </TableRow>
                        <TableRow className={classes.row}>
                            <TableCell className={classes.invoiceRow} style={{ fontWeight: "600", fontSize: "20px" }}>Chassis Number:</TableCell>
                            <TableCell className={classes.invoiceRow}>< input type="text" placeholder='Chassis Number' /></TableCell>
                        </TableRow>

                        <TableRow className={classes.row} >
                            <TableCell className={classes.invoiceRow} style={{ fontWeight: "600", fontSize: "20px" }}>Bank Name:</TableCell>
                            <TableCell className={classes.invoiceRow}>
                                <DropDownList

                                    style={{
                                        backgroundColor: "#fff", height: "30px", color: "#000", outline: "none",
                                        border: "1px solid grey",

                                        borderRadius: "10rem",
                                        width: "310px"
                                    }}
                                    data={BankList}
                                    textField="name"
                                    defaultItem={defaultItemBank}
                                    onChange={(e) => SetBankName(e.target.value.super_model_id)}

                                />
                            </TableCell>
                        </TableRow>
                        <TableRow className={classes.row} >
                            <TableCell className={classes.invoiceRow} style={{ fontWeight: "600", fontSize: "20px" }}>Status:</TableCell>
                            <TableCell className={classes.invoiceRow}>
                                <DropDownList

                                    style={{
                                        backgroundColor: "#fff", height: "30px", color: "#000", outline: "none",
                                        border: "1px solid grey",

                                        borderRadius: "10rem",
                                        width: "310px"
                                    }}
                                    data={statusList}
                                    textField="name"
                                    defaultItem={SelectStatus}
                                    onChange={(e) => SetStatus(e.target.value.super_model_id)}

                                />
                            </TableCell>
                        </TableRow>


                        <TableRow className={classes.row}>
                            <TableCell className={classes.invoiceRow} style={{ fontWeight: "600", fontSize: "20px" }}>Price:</TableCell>
                            <TableCell className={classes.invoiceRow}><input type="text" placeholder='Price' /></TableCell>
                        </TableRow>
                        <TableRow className={classes.row}>
                            <TableCell className={classes.invoiceRow} style={{ fontWeight: "600", fontSize: "20px" }}>Taxes:</TableCell>
                            <TableCell className={classes.invoiceRow}>< input type="text" placeholder='Taxes' /></TableCell>
                        </TableRow>

                    </TableBody>
                </Table>
            </div>
            <div className='creaetInvoice__submit'>
                <button>Create Invoice</button>
            </div>

        </div>
    )
}

export default ACreateInvoice