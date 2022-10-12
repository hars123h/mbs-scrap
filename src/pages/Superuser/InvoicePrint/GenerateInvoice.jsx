import React, { useState } from 'react'
import "../../../styling/Invoice.css"
import SaInvvoicePrint from "../../../pages/Superadmin/SaInvoicePrint"
import { makeStyles, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core'
import { Link } from 'react-router-dom'
import axios from 'axios'
import common from '../../../baseUrl'
import { useEffect } from 'react'
function GenerateInvoice() {
  const [preniew, setPreview] = useState(false)
  const[allAgents, setAllAgents] = useState()
  const [setBg, setSetBg] = useState(true)
  const [adminAgent, setAdminAgent] = useState(true)
  const [Fund, setFund] = useState()
  const [allInvoice, setAllInvoice] = useState()

  const handleModel = (data) => {
    setFund(data)
    setPreview(true)
  }
  const useStyle = makeStyles({

    headRow: {
      backgroundColor: "#8a28d9",

    },
    headCell: {
      color: "#fff",
      fontWeight: "bold",
      fontSize: "20px",
      fontFamily: "montserrat",
      textAlign: "center"


    },
    row: {
      color: "white",
      boxShadow: "7px 4px 16px 0px #ccc",
      cursor: "pointer",
      marginTop: "30px",
      border: "none",
      tableLayout: "none",
      gap: "20px",
      textAlign: "center",
      fontFamily: "Montserrat",
      "&:hover": {
        backgroundColor: "whitesmoke",
      }
    },
    cell: {
      border: "none",
      fontFamily: "Montserrat",
      padding: "25px",
      textAlign: "center"

    }


  })
  const classes = useStyle()


  useEffect(async () => {
    const result = await axios({
      method: "get",
      url: `${common.baseUrl}/Invoicing/all-invoices/`,
      headers: {
        Authorization: `Token ${localStorage.getItem("token")}`
      }
    })
    setAllInvoice(result.data)
    console.log("allInvoice", result.data);
  }, [])


  return (
    <>
      {
        preniew &&
        <div className='previewMOdal' onClick={(e) => setPreview(false)}>

          <div >
            <div onClick={(e) => e.stopPropagation()} className='previewMOdal__body'>
              {
                preniew && <SaInvvoicePrint propsData={Fund} onClose={() => setPreview(false)} />
              }

            </div>
          </div>

        </div>
      }
      <div className='invoicefrom'>

        <div className="invoicefrom__genAndCreateButton">
          <button onClick={() => { setSetBg(true); setAdminAgent(true) }} className={setBg ? 'std-button-search' : 'std-button-2'}
          >C & F PRICE</button>
          <button onClick={() => { setSetBg(false); setAdminAgent(false) }} className={setBg ? 'std-button-2' : 'std-button-search'}>DEPOSIT</button>
        </div>
        <div className='invoicefrom__GenereateButton__table'>
          <Table>
            <TableHead className={classes.TableBodyStyle}>
              <TableRow className={classes.headRow}>
                <TableCell className={classes.headCell}>Purchase Id</TableCell>
                <TableCell className={classes.headCell}>Customer Name</TableCell>
                <TableCell className={classes.headCell}>Car Details</TableCell>
                <TableCell className={classes.headCell}>Agent</TableCell>
                <TableCell className={classes.headCell}>Current Price</TableCell>
                <TableCell className={classes.headCell}>Requested Price</TableCell>
              </TableRow>
            </TableHead>
            <TableBody className={classes.TableBodyStyle}>
              {
                allInvoice?.map(data => {
                  return (
                    <TableRow className={classes.row} onClick={() => handleModel(data)}>
                      <TableCell className={classes.cell}> {`${data?.invoice_number.slice(0, 10)}...`}</TableCell>
                      <TableCell className={classes.cell}> {data?.client?.name}</TableCell>
                      <TableCell className={classes.cell}> {`${data?.car_model?.car_name} ${data?.car_model?.chassis} `}</TableCell>
                      <TableCell className={classes.cell}> {data?.agent?.name}</TableCell>
                      <TableCell className={classes.cell}> {data?.payment_status}</TableCell>
                      <TableCell className={classes.cell}> {data?.status}</TableCell>
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

export default GenerateInvoice