import React, { useEffect } from 'react'
import { TableBody, TableRow, TableHead, TableCell, Table, colors, } from '@mui/material'
import { tableCellClasses } from '@mui/material/TableCell';
import { makeStyles } from '@material-ui/core'
import "../../../styling/saViewInvoice.css"
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { AutoComplete, DropDownList } from '@progress/kendo-react-dropdowns';

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
    carModal: "Nissan 350z"


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
    carModal: "Nissan 350z"

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
    carModal: "Nissan 350z"
  }
]

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
  },
  cell: {
    border: "none",
    fontFamily: "Montserrat",
    padding: "25px"

  },
  invoiceRow: {
    border: "none",
    padding:"20px"

  }
})


function SuViewInvoice() {
  const classes = useStyle()

  const [invSearch, setInvSearch] = useState('')
  const [carModal, setCarModal] = useState()
  const [invoiceDetail, setInvoiceDetails] = useState([]);
  const [customer, SetCustomer] = useState();
  const [Agents, setAgent] = useState();
  const history = useHistory()
  const [invSearchflag, setInvoiceDetail] = useState(false)
  var index;
  const handleSearch = (e) => {
    setInvoiceDetail(true)
    setInvSearch(e.target.value)

    index = assignees.findIndex(item => item.InvNo.toLowerCase() === invSearch)

    setInvoiceDetails(assignees[index])



  }
  console.log(index);
  const handleCarSearch = (e) => {
    setCarModal(e.target.value)

    const carmodalSearch = assignees.filter((item) => {
      return (
        carModal ? item.carModal?.toLowerCase().includes(carModal) : item
      )
    })
    console.log(carmodalSearch);
    setInvoiceDetails(carmodalSearch)
  }




  const setcustVlaue = event => SetCustomer(event.value);
  const setAgentValue = event => setAgent(event.value);
  return (
    <div className='sapurchase'>
      <h1 className='sapurchase__header' style={{ margin: '1rem 0 2rem 0' }}>View Invoice</h1>

      <div className="">
        <div className="sapurchase__table__container__head">
          <h3>View Invoice</h3>
        </div>
        <div className="sapurchase__table__container__searchBy">
          <p>Search By</p>
          <div className='sapurchase__table__container__searchBy__fields' >
            <Table>
              <TableBody>
                <TableRow className= {classes.row}>
                  <TableCell className={classes.invoiceRow} style={{ fontWeight: "600", fontSize: "20px" }}>Inv. Number:</TableCell>
                  <TableCell className={classes.invoiceRow}> <input onKeyDown={(e) => e.key == 'Enter' ? handleSearch(e) : ""} type="text" placeholder='Inv. Number' /></TableCell>
                </TableRow>
                <TableRow className= {classes.row}>
                  <TableCell className={classes.invoiceRow} style={{ fontWeight: "600", fontSize: "20px" }}>Customer Name:</TableCell>
                  <TableCell className={classes.invoiceRow}>
                    <AutoComplete

                      style={{ width: "310px", borderRadius: "10px", backgroundColor: "#fff", }}
                      placeholder = "Customer"
                      data={assignees}
                      value={invoiceDetail !== null ? invoiceDetail?.CustomerName : customer}
                      onChange={setcustVlaue}
                      textField="CustomerName"
                      groupField="occupation"
                      suggest




                    /></TableCell>
                </TableRow>
                <TableRow className= {classes.row}>
                  <TableCell className={classes.invoiceRow} style={{ fontWeight: "600", fontSize: "20px" }}>Agent Name:</TableCell>
                  <TableCell className={classes.invoiceRow}>
                    <AutoComplete

                      style={{ width: "310px", borderRadius: "10px" }}
                      placeholder='Select/Search'
                      data={assignees}
                      value={invoiceDetail !== null ? invoiceDetail?.agents : Agents}
                      onChange={setAgentValue}
                      textField="agents"
                      groupField="occupation"
                      suggest


                    />
                  </TableCell>
                </TableRow>
                <TableRow className= {classes.row}>
                  <TableCell className={classes.invoiceRow} style={{ fontWeight: "600", fontSize: "20px" }}>Car Model:</TableCell>
                  <TableCell className={classes.invoiceRow}><input type="text" placeholder='Car Model' value={invoiceDetail !== null ? invoiceDetail?.carModal : carModal} onChange={(e) => handleCarSearch(e)} /></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
          <div className="sapurchase__table__container__searchBy__button">
            <button onClick={() => { invoiceDetail && history.push("/su/viewSearchInvoice", { invoiceDetail, invSearchflag }) }} >View Invoice</button>
          </div>
        </div>

      </div>
    </div>
  )
}

export default SuViewInvoice