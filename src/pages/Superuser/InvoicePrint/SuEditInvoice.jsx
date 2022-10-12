import React, { useEffect, useState } from 'react'
import "../../../styling/SaCreateInvoice.css"
import { makeStyles, Table, TableBody, TableCell, TableRow } from '@material-ui/core'
import { useLocation } from 'react-router-dom'
import { AutoComplete, DropDownList } from '@progress/kendo-react-dropdowns'
import { withRouter } from 'react-router-dom'
const assignees = [
    {
        InvNo: "UAD1",
        CustomerName: "Pravin",
        CarDetails: {
            carModal: "Nissan 350z",
            ChassisNo: "455ds"
        },
        agents: " Guy1",
        status: "Processing",
        carModal: "Nissan 350z",
        price: "43443"


    },
    {
        InvNo: "UAD2",
        CustomerName: "Harsh",
        CarDetails: {
            carModal: "Nissan 350z",
            ChassisNo: "455ds"
        },
        agents: " Guy1",
        status: "Processing",
        carModal: "Nissan 350z",
        price: "43443"


    },
    {
        InvNo: "UCB3",
        CustomerName: "Shreyash",
        CarDetails: {
            carModal: "Nissan 350z",
            ChassisNo: "455ds"
        },
        agents: " Guy3",
        status: "Paid",
        carModal: "Nissan 350z",
        price: "43443"

    },
    {
        InvNo: "UIB4",
        CustomerName: "Rehaan",
        CarDetails: {
            carModal: "Nissan 350z",
            ChassisNo: "455ds"
        },
        agents: " Guy4",
        status: "Awaiting Approval",
        carModal: "Nissan 350z",
        price: "43443"
    }
]
const BankList = [
    {
        name:"RESONA BANK LTD"
    },
    {
        name:"DEUTSCHE BANK TRUST COMPANY AMERICAS"
    }
]
const defaultItem ={
    name:"Select Bank"
}
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
function SuCreateInvoice(props) {
    const useStyle = makeStyles({
        invoiceRow: {
            border: "none"
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
        }
    })
    const [Data, setData] = useState()
    useEffect(() => {
        const ResultIndex = assignees.findIndex(item => item.InvNo === props.match.params.InvNo)

        setData(assignees[ResultIndex])
    }, [])
    const [BankName,SetBankName] = useState()
    const [Status,SetStatus] = useState()
    const [customer, SetCustomer] = useState();
    const [agents, SetAgents] = useState();
    const [carModal, setCarModal] = useState()
    const setcustVlaue = event => SetCustomer(event.value);
    const setcarVlaue = event => setCarModal(event.value);
    const setagentstVlaue = event => SetAgents(event.value);
    const classes = useStyle()
    const editInvc = useLocation();
    console.log(props.match.params.InvNo);
    return (
        <div className='createInvoceBody'>
            <div className='creaetInvoice'>
                <h3>Edit Invoice</h3>
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
                                <AutoComplete

                                    style={{ width: "310px", backgroundColor: "#fff", borderRadius: "10rem" }}
                                    placeholder="Search Customer"
                                    defaultValue={Data?.agents}
                                    data={assignees}
                                    value={agents}
                                    onChange={setagentstVlaue}
                                    textField="CustomerName"
                                    groupField="occupation"
                                    suggest




                                /></TableCell>
                        </TableRow>
                        <TableRow className={classes.row}>
                            <TableCell className={classes.invoiceRow} style={{ fontWeight: "600", fontSize: "20px" }}>Customer Name:</TableCell>
                            <TableCell className={classes.invoiceRow}>
                                <AutoComplete

                                    style={{ width: "310px", backgroundColor: "#fff", borderRadius: "10rem" }}
                                    placeholder="Search Customer"
                                    defaultValue={Data?.CustomerName}
                                    data={assignees}
                                    value={customer}
                                    onChange={setcustVlaue}
                                    textField="CustomerName"
                                    groupField="occupation"
                                    suggest




                                /></TableCell>
                        </TableRow>
                       
                        <TableRow className={classes.row}>
                            <TableCell className={classes.invoiceRow} style={{ fontWeight: "600", fontSize: "20px" }}>Car Model:</TableCell>
                            <TableCell className={classes.invoiceRow}>
                                <AutoComplete
                                    style={{ width: "310px", backgroundColor: "#fff", borderRadius: "10rem" }}
                                    placeholder="Search Car Modal"
                                    data={assignees}
                                    defaultValue={Data?.carModal}
                                    value={carModal}
                                    onChange={setcarVlaue}
                                    textField="carModal"
                                    groupField="occupation"
                                    suggest
                                /></TableCell>
                        </TableRow>
                        <TableRow className={classes.row}>
                            <TableCell className={classes.invoiceRow} style={{ fontWeight: "600", fontSize: "20px" }}>Chassis Number:</TableCell>
                            <TableCell className={classes.invoiceRow}>< input
                                defaultValue={Data?.CarDetails?.ChassisNo}
                                type="text" placeholder='Chassis Number' /></TableCell>
                        </TableRow>
                        <TableRow className={classes.row}>
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
                                    defaultItem={defaultItem}
                                    onChange={(e) => SetBankName(e.target.value.super_model_id)}

                                />
                            </TableCell>
                        </TableRow>
                        <TableRow className={classes.row} >
                            <TableCell className={classes.invoiceRow} style={{ fontWeight: "600", fontSize: "20px" }}>Payment Status:</TableCell>
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
                <button>Save Invoice</button>
            </div>

        </div>
    )
}

export default withRouter(SuCreateInvoice)