import React, { useState } from 'react'
import { TableBody, TableRow, TableHead, TableCell, Table, colors, Pagination, } from '@mui/material'
import { styled } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';
import EditIcon from '@material-ui/icons/Edit';
import CheckIcon from '@material-ui/icons/Check';
import SaInvvoicePrint from "../../pages/Superadmin/SaInvoicePrint"
import "../../styling/saPurchase.css"
import "../../styling/SapurchaseModal.css"
import "../../styling/Invoice.css"
import ApurchaseModal from '../AgentPurchase/ApurchaseModal';
import { makeStyles } from '@material-ui/core';
import { useHistory, withRouter } from 'react-router-dom';
import { useEffect } from 'react';
import CancelIcon from '@mui/icons-material/Cancel';
import axios from 'axios';
import common from '../../baseUrl';
import { set, update } from 'lodash';
// import SapurchaseModalNot from './SapurchaseModalNot';
import { DropDownList } from '@progress/kendo-react-dropdowns';
import { toast } from 'react-toastify';
import moment from 'moment';
import Heading from '../../component/Heading';

const BankList = [
  {
    name: "RESONA BANK LTD"
  },
  {
    name: "SUMITOMO MITSUI BANKING CORPORATION"
  }
]
const defaultItemBank = {
  name: "Select Bank..."
}
const selectClinet = {
  name: "Select Client"
}
const defaultCarrier = {
  shipment: "Select Carrier"
}
const carreir = [
  {
    shipment: "Hoegh Autoliners AS"
  },
  {
    shipment: "Eastern Car Liner Ltd."
  },
  {
    shipment: "YCS"
  },
  {
    shipment: "MOL"
  },
  {
    shipment: "NYK"
  },
  {
    shipment: "K-Line"
  },
  {
    shipment: "Armacup"
  },
  {
    shipment: "Kyowa Shipping Co. Ltd."
  },
  {
    shipment: "Others"
  }
]
const ship = [
  {
    shipname: "RO-RO"
  },
  {
    shipname: "CONTAINER"
  }
]
const defaultShip = {
  shipname: "Select Shipment"
}
function PurchaseHistory(props) {
  const data = JSON.parse(localStorage.getItem('data'))
  const agent_id = data?.agent_id
  const navigate = useHistory()
  const [MasterChecked, setMasterChecked] = useState(false)
  const [List, setList] = useState()
  const [flagmodal, setFlagmodal] = useState(false)
  const [ischecked, setisCheked] = useState([])
  const [preniew, setPreview] = useState(false)
  const [page, setPage] = useState(1)
  const [resultCount, setResultCount] = useState(0)
  const [purchaseDetails, setPurchasedetails] = useState([])
  const [bankSelect, setbankSelect] = useState(false)
  const [BankName, SetBankName] = useState()
  const [tracker, setTracker] = useState()
  const [invioceData, setINvoiceData] = useState()
  const [editable, setEditable] = useState()
  const [SelectedList, setSelectedList] = useState([])
  const [editCnf, setEditCnf] = useState()
  const [othersCarrier, setOthersCarrier] = useState()
  const [editDepo, setEditDepo] = useState()
  const [cnfPrice, SetcnfPrice] = useState()
  const [depoPrice, setDeposit] = useState()
  const [allclients, setAllClients] = useState()
  const [showModal, setShowModal] = useState(false)
  const [purchaseId, setPurchaseId] = useState()
  const [ShowSortModal, setShowSortModal] = useState(false)
  const [Search, setSearch] = useState({
    purchaseDate: "",
    buyer_name: "",
    tracker_shipping_carrier: "",
    shipment: ""
  })
  // console.log("search", Search);
  const useStyles = makeStyles({
    row: {
      color: "white",
      boxShadow: "7px 4px 16px 0px #ccc",
      cursor: "pointer",
      paddingLeft: "3rem",
      border: "none",
      fontFamily: "Montserrat",
      "&:hover": {
        backgroundColor: "whitesmoke",
        "& $showHid ": {
          opacity: "1"
        }
      }
    },
    rowNot: {
      color: "white",
      boxShadow: "7px 4px 16px 0px #fff",
      cursor: "pointer",
      backgroundColor: "#ccc",
      paddingLeft: "3rem",
      border: "none",
      fontFamily: "Montserrat",
      "&:hover": {
        backgroundColor: "whitesmoke",
        "& $showHidDelverdNotComplete ": {
          opacity: "1"
        }
      }
    },
    rowdeliverd: {
      color: "white",
      boxShadow: "7px 4px 16px 0px #fff",
      cursor: "pointer",
      paddingLeft: "3rem",
      backgroundColor: "#ccc",
      border: "none",
      fontFamily: "Montserrat",
      "&:hover": {
        backgroundColor: "whitesmoke",
        "& $showHidDelverd": {
          opacity: "1",
        }
      }
    },
    showHid: {
      position: "absolute",
      display: "flex",
      textAlign: "left",
      alignItems: "center",
      height: "75px",
      right: "0",
      opacity: "0",
      background: "linear-gradient(90deg, transparent, grey)",
      backdropFilter: "blur(2px)",
      borderTopLeftRadius: "30px",
      borderBottomLeftRadius: "30px",
      transition: ".5s all, ease-out"

    },
    showHidDelverd: {
      position: "absolute",
      display: "flex",
      textAlign: "left",
      alignItems: "center",
      height: "75px",
      right: "2px",
      opacity: "0",
      background: "linear-gradient(90deg, transparent, grey)",
      backdropFilter: "blur(2px)",
      borderTopLeftRadius: "30px",
      borderBottomLeftRadius: "30px",
      transition: ".5s all, ease-out"

    },
    showHidDelverdNotComplete: {
      position: "absolute",
      display: "flex",
      textAlign: "left",
      alignItems: "center",
      height: "75px",
      right: "0",
      opacity: "0",
      background: "linear-gradient(90deg, transparent, grey)",
      backdropFilter: "blur(2px)",
      borderTopLeftRadius: "30px",
      borderBottomLeftRadius: "30px",
      transition: ".5s all, ease-out"

    },
    invoiceRow: {
      border: "none"
    },
    printBUtton: {
      border: "none",
      background: "transparent",
      fontSize: "13px",
      color: "#8a28d9",
      marginLeft: "1rem",
      cursor: "pointer",
      fontWeight: "700",

    },
    printBUttonDisp: {
      display: "none"
    },
    cell: {
      border: "none",
      fontFamily: "Montserrat",
      textAlign: "center",
      height: "15px",

    }


  });
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#8a28d9",
      color: theme.palette.common.white,
      textAlign: "center"
    },
  }));
  const classes = useStyles()

  const onMasterCheck = (e) => {
    let tempList = List;
    tempList.map((user) => (user.selected = e.target.checked));
    setMasterChecked(e.target.checked,)
    setSelectedList(List.filter((e) => e.selected))
    setList(tempList)
    setFlagmodal(true)
  }
  const onItemCheck = (e) => {
    const { value, checked } = e.target
    if (checked) {
      setisCheked([...ischecked, value])
    }
    else {
      setisCheked(ischecked.filter((e) => e !== value))
    }
  }


  useEffect(() => {
    setSelectedList(purchaseDetails?.filter(item => ischecked.includes((item.id).toString())))

  }, [ischecked])

  // console.log(SelectedList);
  const updateCfPrice = (id, where) => {

  }
  const handleINvoice = (purchase) => {
    setINvoiceData(purchase)
    setPurchaseId(purchase?.id)
    if (purchase?.bank_name != null) {

      navigate.push('/invoicepreview', purchase, purchaseId)
    }
    else {
     toast.error("bank is not selected for this invoice")
     return
    }

  }
  const sendPayRemider = async (purchase) => {
    const purchaseId = purchase?.id
    const url = `Funds/remind-payment/`
    const payReminder = await axios({
      method: "post",
      url: `${common.baseUrl}${url}`,
      headers: {
        Authorization: `Token ${localStorage.getItem("token")}`
      },
      data: {
        purchase_id: purchaseId,
        should_remind_agent: false
      }
    })
    if (payReminder.status == 200) {
      toast.success("Remider sent successfully")
    }

  }

  const handleInpovicePrint = async (purchase) => {
    // console.log("bank update handle", purchase);
    setPurchaseId(purchase?.id)
    setbankSelect(true)
    if (BankName?.length >= 1) {

      const url = `Funds/update-bank-name/${purchaseId}`
      const bankUpdate = await axios({
        method: "post",
        url: `${common.baseUrl}${url}`,
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`
        },
        data: {
          bank_name: BankName
        }
      })
      // console.log("bank update", bankUpdate);
      if (bankUpdate.status == 200) {
        toast.success("bank name updated successfully")
        window.location.reload()
      }
    }
    else {

      return

    }
  }

  useEffect(async () => {
    handleShort()
  }, [page])
  useEffect(async () => {

    const url2 = `Funds/get-editable-status/${agent_id}`
    const purchaseEdit = await axios({
      method: "get",
      url: `${common.baseUrl}${url2}`,
      headers: {
        Authorization: `Token ${localStorage.getItem("token")}`
      },

    })
    setEditable(purchaseEdit.data)

  }, [])
  // console.log("purchase", editable);


  const handleCnf = (id) => {
    setEditCnf(id)
  }
  const handleDepo = (id) => {
    setEditDepo(id)
  }
  const handleCnfSubmit = async (id) => {

    if (!cnfPrice) {
      toast.error("No Input")
      return
    }
    let url = `Funds/update-cnf-price/${id}`
    const updateCnf = await axios({
      method: "post",
      url: `${common.baseUrl}${url}`,
      headers: {
        Authorization: `Token ${localStorage.getItem("token")}`
      },
      data: {
        amount: cnfPrice
      }
    })
    if (updateCnf.status == 200) {
      toast.success("Sucessfully requested")
      window.location.reload()
    }

  }
  const handleDepoSubmit = async (id, data) => {
    const cnf = data?.cnf_price
    // console.log("cnf", cnf);
    if (parseInt(depoPrice) > parseInt(cnf)) {
      toast.error("The deposit entered is greater than the CNF price which is not possible.")
      setTimeout(() => {
        window.location.reload()
      }, 3000);
      return
    }
    if (!cnf) {
      toast.error("Deposits can only be updated once cnf price is available.")
      setTimeout(() => {
        window.location.reload()
      }, 3000);
      return
    }
    if (!depoPrice) {
      toast.error("No Input")
      // console.log("depo Price");
      return
    }
    let url = `Funds/update-deposits/${id}`
    const updatedepo = await axios({
      method: "post",
      url: `${common.baseUrl}${url}`,
      headers: {
        Authorization: `Token ${localStorage.getItem("token")}`
      },
      data: {
        amount: depoPrice
      }
    })
    // console.log(updatedepo, ".........");
    if (updatedepo.status == 200) {
      toast.success("Sucessfully requested")
      window.location.reload()
    }



  }
  useEffect(async () => {
    const result = await axios({
      method: "post",
      url: `${common.baseUrl}Login/AllClients/`,
      headers: {
        Authorization: `Token ${localStorage.getItem("token")}`
      },
      data: {
        agent_id: agent_id
      }
    })

    if (result.status === 200) {
      setAllClients(result.data)
    } else {
      toast.error("Something went wrong while fetching information!")
    }

  }, [])
  // console.log("allclients", allclients);
  const handleDate = (e) => {
    let date = e.target.value
    date = moment(date).format('YYYY-MM-DD')
    setSearch({ ...Search, purchaseDate: date })

  }
  const handleShort = async () => {
    if (Search.tracker_shipping_carrier == "Others") {
      setSearch({ ...Search, tracker_shipping_carrier: othersCarrier })
    }
    const url = `Funds/agent-purchases/${agent_id}?page=${Search.purchaseDate || Search.buyer_name || Search.shipment || Search?.tracker_shipping_carrier ? 1 : page}&page_size=${5}&start_purchase_date=${Search?.purchaseDate === "null" ? "" : Search.purchaseDate}&shipment=${Search?.shipment === "null" ? "" : Search?.shipment}&tracker__shipping_carrier=${Search?.tracker_shipping_carrier === "null" ? "" : Search?.tracker_shipping_carrier}&buyer__name=${Search?.buyer_name === "null" ? "" : Search?.buyer_name}&end_purchase_date=${Search.purchaseDate === "null" ? "" : Search?.purchaseDate}`
    const AllPurchase = await axios({
      method: "get",
      url: `${common.baseUrl}${url}`,
      headers: {
        Authorization: `Token ${localStorage.getItem("token")}`
      },
    })
    if (AllPurchase.status == 200) {
      setResultCount(AllPurchase.data?.count)
      setPurchasedetails(AllPurchase.data?.results)
      setShowSortModal(false)

    }
    else {
      toast.error("Something went wrong")
    }

  }

  return (
    <div>
      <>
        <Heading />
      </>
      {
        showModal && <ApurchaseModal onClose={() => setShowModal(false)} SelectedList={SelectedList} flagmodal={flagmodal} class='visibilityMOdal' />
      }
      {/* {
        bankSelect &&
        <div className='previewMOdal' onClick={(e) => setbankSelect(false)}>

          <div>
            <div onClick={(e) => e.stopPropagation()} className='bankSelect'>
              <h3 style={{ color: "#8a28d9", marginBottom: "10px" }}>Select Bank</h3>
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
                onChange={(e) => SetBankName(e.target.value.name)}

              />
              <div className='sapurchase__dateSearch__Right__generate' style={{ width: "15rem" }}><button onClick={handleInpovicePrint}>Generate Invoice</button></div>
            </div>
          </div>

        </div>
      } */}
      {/* {
        preniew &&
        <div className='previewMOdal' onClick={(e) => setPreview(false)}>

          <div >
            <div onClick={(e) => e.stopPropagation()} className='previewMOdal__body'>
              {
                preniew && <SaInvvoicePrint propsData={invioceData} BankName={BankName} onClose={() => setPreview(false)} />
              }

            </div>
          </div>

        </div>  
      } */}
      {
        ShowSortModal && <div className=''>
          <div onClick={() => setShowSortModal(!ShowSortModal)} className={`sapurchaseModal ${props.class ? props.class : ""}`} >
            <div onClick={(e) => e.stopPropagation()} className='sapurchaseModal__sort'>
              <div className='sapurchaseModal__sort__title'>
                <h2>Tracking</h2>

              </div>
              <div className='sapurchaseModal__sort__table'>
                <Table>
                  <TableBody>
                    <TableRow >
                      <TableCell className={classes.invoiceRow} style={{ fontWeight: "600", fontSize: "20px" }}>Customer Wise</TableCell>
                      <DropDownList

                        style={{
                          backgroundColor: "#fff", height: "33px", color: "#000", outline: "none",
                          border: "1px solid grey",
                          boxShadow: "7px 4px 16px 0px #ccc",
                          padding: "10px",
                          paddingLeft: "15px",
                          marginTop: "10px",
                          marginLeft: "17px",
                          borderRadius: "10rem",
                          width: "210px"
                        }}
                        data={allclients}
                        textField="name"
                        defaultItem={selectClinet}
                        onChange={(e) => setSearch({ ...Search, buyer_name: e.target.value.name })}

                      />
                    </TableRow>
                    <TableRow>
                      <TableCell className={classes.invoiceRow} style={{ fontWeight: "600", fontSize: "20px" }}>Date</TableCell>
                      <TableCell className={classes.invoiceRow}><input style={{
                        backgroundColor: "#fff", height: "33px", color: "#000", outline: "none",
                        border: "1px solid grey",
                        paddingLeft: "15px",
                        borderRadius: "10rem",
                        width: "210px"
                      }} type="date" onChange={handleDate} /></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className={classes.invoiceRow} style={{ fontWeight: "600", fontSize: "20px" }}>Carrier</TableCell>
                      <DropDownList

                        style={{
                          backgroundColor: "#fff", height: "33px", color: "#000", outline: "none",
                          border: "1px solid grey",
                          boxShadow: "7px 4px 16px 0px #ccc",
                          padding: "10px",
                          marginTop: "10px",
                          paddingLeft: "15px",
                          marginLeft: "17px",
                          borderRadius: "10rem",
                          width: "210px"
                        }}
                        data={carreir}
                        textField="shipment"
                        defaultItem={defaultCarrier}
                        onChange={(e) => { setTracker(e.target.value.shipment); setSearch({ ...Search, tracker_shipping_carrier: e.target.value.shipment }) }}

                      />

                    </TableRow>
                    <TableRow>
                      {
                        tracker == "Others" && <TableCell className={classes.invoiceRow} style={{ fontWeight: "600", fontSize: "20px" }}></TableCell>
                      }
                      {
                        tracker == "Others" && <input style={{

                          marginLeft: "17px",
                          backgroundColor: "#fff", height: "33px", color: "#000", outline: "none",
                          border: "1px solid grey",
                          paddingLeft: "15px",
                          borderRadius: "10rem",
                          width: "210px"
                        }} type="text" placeholder='Shipment'
                          onChange={(e) => setOthersCarrier(e.target.value)}
                        />
                      }
                    </TableRow>
                    <TableRow>
                      <TableCell className={classes.invoiceRow} style={{ fontWeight: "600", fontSize: "20px" }}>Shipment</TableCell>
                      <TableCell className={classes.invoiceRow}>
                        <DropDownList
                          data={ship}
                          textField="shipname"
                          defaultItem={defaultShip}
                          style={{
                            backgroundColor: "#fff", height: "33px", color: "#000", outline: "none",
                            border: "1px solid grey",
                            paddingLeft: "15px",
                            borderRadius: "10rem",
                            width: "210px"
                          }}
                          onChange={(e) => setSearch({ ...Search, shipment: e.target.value.shipname })}
                        /></TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
                <div className='sapurchaseModal__sort__submit__button'>
                  <button onClick={handleShort}>
                    Sort
                  </button>
                </div>
              </div>

            </div>

          </div>
        </div>

      }
      <div className='sapurchase'>
        <h1 className='sapurchase__header'>Purchases</h1>
        <div className="sapurchase__dateSearch">

          <div className="sapurchase__dateSearch__conatiner">
            <h2>Date Search</h2>
            <div className="sapurchase__dateSearch__left">
              <h3>Start Date</h3>
              <input type="date" placeholder="yyyy-mm-dd" />
            </div>
            <div className="sapurchase__dateSearch__left">
              <h3>End Date</h3>
              <input style={{ marginLeft: '10px' }} type="date" placeholder="dd-mm-yyyy" />
            </div>
          </div>
          <div className="sapurchase__dateSearch__Right__botton">
            {
              ischecked.length >= 1 ? <button onClick={() => { setShowModal(true) }} >Track</button> : <button onClick={() => { setShowSortModal(true) }} >Track</button>
            }
          </div>
        </div>
        <div className='sapurchase__table__container__main'>
          <div className="sapurchase__table__container">
            <Table>
              <TableHead>
                <TableRow>
                  <StyledTableCell>
                    <input
                      type="checkbox"
                      className="form-check-input"
                      checked={MasterChecked}
                      id="mastercheck"
                      onChange={(e) => onMasterCheck(e)}
                    /></StyledTableCell>
                  <StyledTableCell>Customer Name</StyledTableCell>
                  <StyledTableCell>Chassis No.</StyledTableCell>
                  <StyledTableCell>Auction House</StyledTableCell>
                  <StyledTableCell>Lot No.</StyledTableCell>
                  <StyledTableCell>Purchase Date</StyledTableCell>

                  <StyledTableCell> <div style={{ marginLeft: '30px' }}>C&F Price</div> </StyledTableCell>
                  <StyledTableCell>Deposit</StyledTableCell>
                  {/* <StyledTableCell>Vessel</StyledTableCell> */}
                  <StyledTableCell>Yard Destination</StyledTableCell>
                  <StyledTableCell>Inspection</StyledTableCell>
                  {/* <StyledTableCell>Upload Docs</StyledTableCell> */}
                </TableRow>
              </TableHead>
              <TableBody className='sapurchase__table__body'>
                {
                  purchaseDetails?.map((purchase, i) => (
                    <TableRow className={purchase?.tracker?.is_delivered &&purchase?.is_completed ? classes.rowdeliverd :purchase?.tracker?.is_delivered&& !purchase?.is_completed?classes.rowNot: classes.row} key={purchase.id}>

                      <TableCell className={classes.cell}>
                        <input
                          type="checkbox"
                          checked={purchase?.ischecked}
                          className="form-check-input"
                          id="rowcheck{user.id}"
                          value={purchase?.id}
                          onChange={(e) => onItemCheck(e)}

                        /></TableCell>
                      <TableCell className={classes.cell} > {purchase?.buyer?.name}</TableCell>
                      <TableCell className={classes.cell}> {purchase?.cardetails?.chassis}</TableCell>
                      <TableCell className={classes.cell}> {purchase?.cardetails?.auction_place}</TableCell>
                      <TableCell className={classes.cell}> {purchase?.cardetails?.lot_no}</TableCell>
                      <TableCell className={classes.cell}> {purchase?.purchase_date}</TableCell>

                      <TableCell >
                        <div className='cAndFPrice' style={{ width: "10rem", overflow: "hidden" }}>

                          {
                            editCnf == purchase?.id ? <input type="text" name=""
                              style={{ paddingLeft: "2px" }}
                              value={cnfPrice}
                              defaultValue={purchase?.cnf_price}
                              onChange={(e) => SetcnfPrice(e.target.value)}
                            /> : <div style={{ marginRight: "5px" }}>{purchase?.cnf_price}</div>
                          }
                          {
                            !purchase?.tracker?.is_delivered ?
                              <>
                                {editable?.[purchase?.id]?.cnf_price ?

                                  <>{editCnf !== purchase?.id ?
                                    <EditIcon onClick={() => handleCnf(purchase.id)} style={{ fontSize: "20px", cursor: "pointer", color: "#8a28d9" }} />
                                    :
                                    <CheckIcon onClick={() => handleCnfSubmit(purchase?.id)} style={{ fontSize: "20px", cursor: "pointer", color: "#8a28d9" }} />

                                  }
                                  </> :
                                  <button>Req</button>}

                              </> : ""

                            // !purchase?.tracker?.is_delivered && <>{editable?.[purchase?.id]?.cnf_price ? <EditIcon onClick={() => handleCnfSubmit(purchase?.id)} style={{ fontSize: "20px", cursor: "pointer", color: "#8a28d9" }} /> : <button style={{ fontSize: "10px", cursor: "pointer", color: "#8a28d9" }} >Req</button>}</>


                          }


                        </div>
                      </TableCell>
                      <TableCell className={classes.cell}>
                        <div className='cAndFPrice' style={{ width: "10rem", overflow: "hidden" }}>
                          {
                            editDepo == purchase?.id ? <input type="text" name=""
                              style={{ paddingLeft: "2px" }}
                              value={depoPrice}
                              defaultValue={purchase?.deposits}
                              onChange={(e) => setDeposit(e.target.value)}
                            /> : <div style={{ marginRight: "5px" }}>{purchase?.deposits}</div>
                          }
                          {
                            !purchase?.tracker?.is_delivered ?
                              <>
                                {editable?.[purchase?.id]?.deposits ?

                                  <>{editDepo !== purchase?.id ?
                                    <EditIcon onClick={() => handleDepo(purchase.id)} style={{ fontSize: "20px", cursor: "pointer", color: "#8a28d9" }} />
                                    :
                                    <CheckIcon onClick={() => handleDepoSubmit(purchase?.id, purchase)} style={{ fontSize: "20px", cursor: "pointer", color: "#8a28d9" }} />

                                  }
                                  </> :
                                  <button>Req</button>}

                              </> : ""

                            // !purchase?.tracker?.is_delivered && <>{editable?.[purchase?.id]?.cnf_price ? <EditIcon onClick={() => handleCnfSubmit(purchase?.id)} style={{ fontSize: "20px", cursor: "pointer", color: "#8a28d9" }} /> : <button style={{ fontSize: "10px", cursor: "pointer", color: "#8a28d9" }} >Req</button>}</>


                          }
                        </div>

                      </TableCell>

                      {/* <TableCell className={classes.cell}>{purchase?.tracker?.dept_vessel}</TableCell> */}
                      <TableCell className={classes.cell}> {purchase?.tracker?.arrival_port}</TableCell>
                      <TableCell className={classes.cell}> {purchase?.tracker?.inspection_status}</TableCell>

                      <div className={purchase?.is_completed&&purchase?.tracker?.is_delivered?classes.showHidDelverd:purchase?.tracker?.is_delivered&& !purchase?.is_completed?classes.showHidDelverdNotComplete:classes.showHid}>
                        {
                          purchase?.tracker?.is_delivered && <button

                            className={classes.printBUtton} style= {{marginRight:'8px'}}> Car <br /> Delivered</button>
                        }
                        {
                          purchase?.is_completed && <button

                            className={classes.printBUtton} style= {{marginRight:'8px'}}> Payment<br /> Complete</button>
                        }
                        {
                          !purchase?.is_completed && !purchase?.tracker?.is_delivered && <button
                            onClick={() => sendPayRemider(purchase)}
                            className={classes.printBUtton} style= {{marginRight:'8px'}}>Payment <br />Reminder</button>
                        }
                        <button
                          onClick={() => handleINvoice(purchase)}
                          className={classes.printBUtton} style= {{marginRight:'8px'}}>{
                            purchase?.bank_name == null ?<p> Generate <br /> Invoice</p>:<p>Download <br /> Invoice</p>
                          } </button>
                      </div>

                    </TableRow>

                  )

                  )
                }
              </TableBody>
            </Table>

          </div>
        </div>
      </div>
      {Math.ceil(resultCount / 5) > 1 ?
        <Pagination count={Math.ceil(resultCount / 5)} sx={{ mb: 1 }} onChange={(e, pageNumber) => setPage(pageNumber)} /> :
        ''
      }
    </div>
  )
}

export default withRouter(PurchaseHistory)