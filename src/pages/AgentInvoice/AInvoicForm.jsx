import React from 'react'
import "../../styling/Invoice.css"
import { makeStyles, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core'
import { Link, useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useState } from 'react'
import AInvvoicePrint from "./AInvoicePrint"

const TableData = [
  {
    InvNo: "UID1",
    CustomerName: "Pravin",
    CarDetails: "Nissan 350z Chassis no.",
    agents: " Guy1",
    status: "Approved",
    Payment_status: "Paid"

  },
  {
    InvNo: "UID2",
    CustomerName: "Harsh",
    CarDetails: "Nissan 350z Chassis no.",
    agents: " Guy1",
    status: "Awaiting Approval",
    Payment_status: "Paid"

  },
  {
    InvNo: "UID3",
    CustomerName: "Shreyash",
    CarDetails: "Nissan 350z Chassis no.",
    agents: " Guy1",
    status: "Review",
    Payment_status: "Paid"

  },
  {
    InvNo: "UID4",
    CustomerName: "Rehaan",
    CarDetails: "Nissan 350z Chassis no.",
    agents: " Guy4",
    status: "Approved",
    Payment_status: "Deposit receive"

  }
]
function AInvoicForm() {

  const history = useHistory()
  const [preniew, setPreview] = useState(false)
  const [updateModal, SetUpdateModal] = useState(false)
  const [Fund, setFund] = useState()

  const handleModel = (data) => {
    setFund(data)
    console.log("data",data);
    if(data?.status === "Awaiting Approval")
    {
      // error("");
      toast.warning("Please wait while not Approved")
      return;
    }
    if(data?.status === "Review")
    {
         history.push(`/a/editInvoice/${data?.InvNo}`)
      
    }
    else
    {
      setPreview(true)
    }

  }
  const useStyle = makeStyles({

    headRow: {
      backgroundColor: "#8a28d9",
      textAlign:"center"

    },
    headCell: {
      color: "#fff",
      fontWeight: "bold",
      fontSize: "20px",
      fontFamily: "montserrat",
      textAlign:"center"


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
      padding: "25px",
      textAlign:"center"

    }


  })
  const classes = useStyle()
  return (
    <>
      {
        preniew &&
        <div className='previewMOdal' onClick={(e) => setPreview(false)}>

          <div >
            <div onClick={(e) => e.stopPropagation()} className='previewMOdal__body'>
              {
                preniew && <AInvvoicePrint propsData={Fund} onClose ={()=>setPreview(false)} />
              }
             
            </div>
          </div>

        </div>
      }
      <div className='invoicefrom'>

        <div className="invoicefrom__genAndCreateButton">
          <Link to="/a/invoiceDetails" ><div className='invoicefrom__createButton'>
            <button >Create Invoice</button>
          </div></Link>
          <Link to="/a/viewInvoice"> <div className='invoicefrom__GenereateButton'>
            <button>View Invoice</button>
          </div></Link>
        </div>
        <div className='invoicefrom__GenereateButton__table'>
          <Table>
            <TableHead className={classes.TableBodyStyle}>
              <TableRow className={classes.headRow}>
                <TableCell className={classes.headCell}>Inv. No</TableCell>
                <TableCell className={classes.headCell}>Customer Name</TableCell>
                <TableCell className={classes.headCell}>Car Details</TableCell>
                <TableCell className={classes.headCell}>Agent</TableCell>
                <TableCell className={classes.headCell}>Payment Status</TableCell>
                <TableCell className={classes.headCell}>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody className={classes.TableBodyStyle}>
              {
                TableData && TableData.map(data => {
                  return (
                    <TableRow className={classes.row} onClick={() => handleModel(data)}>
                      <TableCell className={classes.cell}> {data.InvNo}</TableCell>
                      <TableCell className={classes.cell}> {data.CustomerName}</TableCell>
                      <TableCell className={classes.cell}> {data.CarDetails}</TableCell>
                      <TableCell className={classes.cell}> {data.agents}</TableCell>
                      <TableCell className={classes.cell}> {data.Payment_status}</TableCell>
                      <TableCell className={classes.cell}> {data.status}</TableCell>
                    </TableRow >
                  )
                })
              }
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  )
}

export default AInvoicForm