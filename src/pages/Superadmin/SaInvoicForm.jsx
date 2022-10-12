import React, { useState } from 'react'
import "../../styling/Invoice.css"
import SaInvvoicePrint from "../../pages/Superadmin/SaInvoicePrint"
import { makeStyles, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core'
import { Link } from 'react-router-dom'
import axios from 'axios'
import common from '../../baseUrl'
import { useEffect } from 'react'
import { height } from '@mui/system'
import { reject } from 'lodash'
import { toast } from 'react-toastify'
import { get } from 'jquery'



function SaInvoicForm() {
  const [preniew, setPreview] = useState(false)
  const [setBg, setSetBg] = useState(true)
  const [adminAgent, setAdminAgent] = useState(true)
  const [statuMessage, setStatuMessage] = useState()
  const [AllRequests, setAllRequest] = useState()
  const [handlePopup, setHandlePopup] = useState(false)
  const [CnfRequest, setCnfRequest] = useState()
  const [DepoRequest, setDepoRequest] = useState()
  const [Fund, setFund] = useState()
  const [approve, setApprovalPid] = useState({
    apid:"",
    aStatus:"",
    id:""
  })

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


    }, row: {
      color: "white",
      boxShadow: "7px 4px 16px 0px #ccc",
      cursor: "pointer",
      marginTop: "30px",
      paddingLeft: "3rem",
      border: "none",
      position: "relative",
      fontFamily: "Montserrat",
      "&:hover": {
        backgroundColor: "whitesmoke",
        "& $showHid": {
          maxWidth: "12rem",
        }
      }
    },
    rowdeliverd: {
      color: "white",
      backgroundColor: "#ccc",
      boxShadow: "7px 4px 16px 0px #ccc",
      cursor: "pointer",
      marginTop: "30px",
      paddingLeft: "3rem",
      border: "none",
      position: "relative",
      fontFamily: "Montserrat",
      "&:hover": {
        backgroundColor: "whitesmoke",
        "& $showHid": {
          maxWidth: "12rem",
        }
      }
    },
    showHid: {
      position: "absolute",
      display: "flex",
      textAlign: "left",
      alignItems: "center",
      height: "100%",
      right: "0",
      maxWidth: "0",
      width: "12rem",
      background: "linear-gradient(90deg, transparent, grey)",
      backdropFilter: "blur(2px)",
      borderTopLeftRadius: "30px",
      borderBottomLeftRadius: "30px",
      transition: ".5s all, liniar"

    },
    TableBodyStyle: {
      height: "5rem",
      overflowY: "auto",
      maxHeight: "2rem"
    },
    invoiceRow: {
      border: "none"
    },
    printBUtton: {
      border: "none",
      background: "transparent",
      fontSize: "13px",
      color: "#8a28d9",
      marginLeft: "2rem",
      cursor: "pointer",
      fontWeight: "700",
      position: "relative"
    },
    cell: {
      border: "none",
      fontFamily: "Montserrat",
      textAlign: "center",
      position: "relative",
      height: "5rem"

    }



  })
  const classes = useStyle()

  //   "cnf_price"
  //   value_type
  // : 
  // "deposits"
  useEffect( () => {
    getAllRequest()
  }, [])
  const getAllRequest = async () => {
    const result = await axios({
      method: "get",
      url: `${common.baseUrl}Funds/get-approval-requests`,
      headers: {
        Authorization: `Token ${localStorage.getItem("token")}`
      }
    })
    setAllRequest(result.data)
  }
  useEffect(() => {

    let tempCopy = AllRequests;

    setCnfRequest(tempCopy?.filter(item => item.value_type === "cnf_price"))
    setDepoRequest(tempCopy?.filter(item => item.value_type === "deposits"))


  }, [AllRequests])
  const ApproveRequest = async (pId, Id, status) => {
    const result = await axios({
      method: "post",
      url: `${common.baseUrl}Funds/respond-approval-request/${Id}`,
      headers: {
        Authorization: `Token ${localStorage.getItem("token")}`
      },
      data: {
        is_approved: status,
        purchase_id:pId,
        message:statuMessage

      }

    })
    if (result.status == 200) {

      if(status == true)
      {
        toast.success('Approved',{
          autoClose: 1000,
        })
        
      }
      if(status == false)
      {
        toast.error('Rejected',{
          autoClose: 1000,
        })
      }
      getAllRequest()

      setPreview(false)
    }
  }
const handleApproval = (Pid, id,status)=>{
        setApprovalPid({
          apid:Pid,
          id:id,
          aStatus:status
        })
        setPreview(true)
      
  
}

  return (
    <>
      {
        preniew &&
        <div className='previewMOdal' onClick={(e) => setPreview(false)}>

          <div >
            <div onClick={(e) => e.stopPropagation()} className='previewMOdal__body'>
                <h3>Message</h3>
                <textarea type="text"  onChange={(e)=> setStatuMessage(e.target.value)} />
                <button onClick={()=> ApproveRequest(approve.apid, approve.id, approve.aStatus)}>Submit</button>
            </div>
          </div>

        </div>
      }
      <div className='invoicefrom'>

        <div className="invoicefrom__genAndCreateButton">
          <button onClick={() => { setSetBg(true); setAdminAgent(true) }} className={setBg ? 'std-button-search' : 'std-button-2'}
          >C&F PRICE</button>
          <button onClick={() => { setSetBg(false); setAdminAgent(false) }} className={setBg ? 'std-button-2' : 'std-button-search'}>DEPOSIT</button>
        </div>
        <div className='invoicefrom__GenereateButton__table'>
          <Table  >
            <TableHead>
              <TableRow className={classes.headRow}>
                <TableCell className={classes.headCell}>Purchase Id</TableCell>
                <TableCell className={classes.headCell}>Customer Name</TableCell>
                <TableCell className={classes.headCell}>Current Price</TableCell>
                <TableCell className={classes.headCell}>Requested Price</TableCell>
                <TableCell className={classes.headCell}>Car Details</TableCell>

                <TableCell className={classes.headCell}>Agent</TableCell>


              </TableRow>
            </TableHead>
            <TableBody className={classes.TableBodyStyle}>
              {
                adminAgent ?
                  <>
                    {
                      CnfRequest?.map(req => {
                        return (
                          <TableRow className={classes.row} key={req?.purchase?.id}>
                            <TableCell className={classes.cell} > {req?.purchase?.id}</TableCell>
                            <TableCell className={classes.cell}> {req?.purchase?.buyer?.name}</TableCell>
                            <TableCell className={classes.cell}> {req?.purchase?.cnf_price}</TableCell>
                            <TableCell className={classes.cell}> {req?.value_amount}</TableCell>
                            <TableCell className={classes.cell}> {`${req?.purchase?.cardetails?.car_name} ${req?.purchase?.cardetails?.model}`}</TableCell>
                            <TableCell className={classes.cell}> {req?.request_by?.username}</TableCell>




                            <div className={classes.showHid}>
                              <button className={classes.printBUtton} onClick={() => handleApproval(req?.purchase?.id, req?.id, true)}>Approve</button>
                              <button className={classes.printBUtton} onClick={() => handleApproval(req?.purchase?.id, req?.id, false)}>Reject</button>
                            </div>

                          </TableRow>
                        )
                      })
                    }

                  </> :

                  <>
                    {
                      DepoRequest?.map(req => {
                        return (
                          <TableRow className={classes.row} key={req?.purchase?.id}>
                            <TableCell className={classes.cell} > {req?.purchase?.id}</TableCell>
                            <TableCell className={classes.cell}> {req?.purchase?.buyer?.name}</TableCell>
                            <TableCell className={classes.cell}> {req?.purchase?.cnf_price}</TableCell>
                            <TableCell className={classes.cell}> {req?.value_amount}</TableCell>
                            <TableCell className={classes.cell}> {`${req?.purchase?.cardetails?.car_name} ${req?.purchase?.cardetails?.model}`}</TableCell>
                            <TableCell className={classes.cell}> {req?.request_by?.username}</TableCell>



                            <div className={classes.showHid}>
                              <button className={classes.printBUtton} onClick={() => { handleApproval(req?.purchase?.id, req?.id, true) }}>Approve</button>
                              <button className={classes.printBUtton} onClick={() => handleApproval(req?.purchase?.id, req?.id, false)}>Reject</button>

                            </div>

                          </TableRow>
                        )
                      })
                    }
                  </>
              }
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  )
}

export default SaInvoicForm