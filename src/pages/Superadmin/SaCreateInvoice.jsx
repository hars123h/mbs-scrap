// import React, { useState } from 'react'
// import DropDowns from './DropDowns'
// import "../../styling/SaCreateInvoice.css"
// import { makeStyles, Table, TableBody, TableCell, TableRow } from '@material-ui/core'
// import { DropDownList } from '@progress/kendo-react-dropdowns'
// import common from '../../baseUrl'
// import axios from 'axios'
// import { useEffect } from 'react'
// import { toast } from 'react-toastify'
// const useStyle = makeStyles({

//     headRow: {
//         backgroundColor: "#8a28d9",
//         fontFamily: "montserrat",

//     },
//     headCell: {
//         color: "#fff",
//         fontWeight: "bold",
//         fontSize: "20px",
//         fontFamily: "montserrat",


//     },
//     row: {
//         color: "white",
//         boxShadow: "7px 4px 16px 0px #ccc",
//         cursor: "pointer",
//         marginTop: "30px",
//         border: "none",
//         tableLayout: "none",
//         gap: "20px",
//         fontFamily: "Montserrat",
//         "&:hover": {
//             backgroundColor: "whitesmoke",
//         }
//     },
//     cell: {
//         border: "none",
//         fontFamily: "Montserrat",
//         padding: "25px"

//     },
//     invoiceRow: {
//         border: "none",
//         padding: "20px"
//     }


// })
// const BankList = [
//     {
//         name: "RESONA BANK LTD"
//     },
//     {
//         name: "SUMITOMO MITSUI BANKING CORPORATION"
//     }
// ]
// const statusList = [
//     {
//         name: "Deposit Received",
//         data:"deposit_received"
//     },
//     {
//         name: "Paid in Full",
//         data:"paid_in_full"
//     }
// ]
// const SelectStatus = {
//     name: "select Status..."
// }

// // const Agents = [
// //     {
// //         id: 1,
// //         name: "Chloe Williams",
// //         occupation: "Developer",
// //         carModel:"9cf9f"
// //     },
// //     {
// //         id: 2,
// //         name: "Severus Snape",
// //         occupation: "Developer",
// //         carModel:"9cf9f"
// //     },
// //     {
// //         id: 3,
// //         name: "Mark Smith",
// //         occupation: "Tech Support",
// //         carModel:"9cf9f"
// //     },
// //     {
// //         id: 4,
// //         name: "Rosemary Adams",
// //         occupation: "Tech Support",
// //         carModel:"9cf9f"
// //     },
// //     {
// //         id: 5,
// //         name: "Joe McDonalds",
// //         occupation: "Designer",
// //         carModel:"9cf9f"
// //     },
// //     {
// //         id: 6,
// //         name: "Minerva McGonagall",
// //         occupation: "Designer",
// //         carModel:"9cf9f"
// //     },
// // ];
// const defaultItemAgent = {
//     name: "Select Agents..."
// }
// const defaultItemCust = {
//     name: "Select Customer..."
// }
// const defaultItemBank = {
//     name: "Select Bank..."
// }
// const DefaultCar = {
//     model: "Select Car Model..."
// }
// const carModel = []
// function SaCreateInvoice() {
//     const [BankName, SetBankName] = useState()
//     const [status, SetStatus] = useState()
//     const [clientPurchase, setClietPurchse] = useState()
//     const [SelecetdAegnet, SetSelecetdAegnet] = useState()
//     const [selectedCar, SelectedCar] = useState()
//     const [SelectedCustomer, SetSelectedCustomer] = useState()
//     const [chesisNumber, setChasisNo] = useState()
//     const [Tax, setTax] = useState()
//     const [price, setPrice] = useState()
//     const [purchaseDetails, setPurchasedetails] = useState()
//     const [customers, setCustomers] = useState()
//     const [Agents, setAgents] = useState()
//     const classes = useStyle()
//     const [invoiceData, setInvoiceData] = useState({
//         client: "",
//         agent: "",
//         bank_name: "",
//         price: 0,
//         taxes: 0,
//         car_model: "",
//         chassis: "",
//         payment_status: ""
//     })
// console.log("datat",invoiceData);
//     useEffect(async () => {
//         const url = 'Login/AllAgents/'
//         const allAgents = await axios({
//             method: "get",
//             url: `${common.baseUrl}${url}`,

//         })
//         setAgents(allAgents.data)
//     }, [])

//     // console.log("agent list",SelecetdAegnet);
//     // useEffect(async () => {
//     //     const url = `/Funds/agent-purchases/${SelecetdAegnet?.agent_id}`
//     //     const AllPurchase= await axios({
//     //       method: "get",
//     //       url: `${common.baseUrl}${url}`,
//     //       headers: {
//     //         Authorization: `Token ${localStorage.getItem("token")}`
//     //       },
//     //     })

//     //     setPurchasedetails(AllPurchase.data?.results)
//     //     // setReciavable(AllFunds.data?.total_receivables)
//     //   }, [SelecetdAegnet])

//     useEffect(async () => {
//         const AgentId = SelecetdAegnet?.agent_id
//         // console.log("AgentId", AgentId);
//         const url = `/Login/AllClients/`
//         const AllClients = await axios({
//             method: "post",
//             url: `${common.baseUrl}${url}`,
//             headers: {
//                 Authorization: `Token ${localStorage.getItem("token")}`
//             },
//             data: {
//                 agent_id: AgentId
//             }
//         })

//         setCustomers(AllClients.data)
//         // setReciavable(AllFunds.data?.total_receivables)
//     }, [SelecetdAegnet])
//     useEffect(async () => {
//         const AgentId = SelecetdAegnet?.agent_id
//         // console.log("AgentId", AgentId);
//         const url = `/Funds/client-purchases/${SelectedCustomer?.id}`
//         const AllPurchase = await axios({
//             method: "get",
//             url: `${common.baseUrl}${url}`,
//             headers: {
//                 Authorization: `Token ${localStorage.getItem("token")}`
//             }
//         })

//         setClietPurchse(AllPurchase.data?.results)
//         // setReciavable(AllFunds.data?.total_receivables)

//     }, [SelectedCustomer])

//     clientPurchase?.map(item => {
//         carModel.push(item?.cardetails)
//     })
//     const createInvoice = async () => {
       

//         // console.log('data invoice', data);
//         const url = `/Invoicing/CreateBill/`
//         const response = await axios({
//             method: "post",
//             url: `${common.baseUrl}${url}`,
//             headers: {
//                 Authorization: `Token ${localStorage.getItem("token")}`
//             },
//             data: invoiceData

//         })
//         if(response.status === 200)
//         {
//             toast.success("Invoice Created successfully")

//         }
//         else
//         {
//             toast.warning("Something Wrong")
//         }
//     }
//     // console.log("purchaseModel", carModel);
//     return (
//         <div className='createInvoceBody'>
//             <div className='creaetInvoice'>
//                 <h3>Create Invoice</h3>
//             </div>
//             <div className="createinvoice__heading">
//                 <h3>Invoice Details</h3>
//             </div>
//             <div className='createInvoice__detailsFill'>
//                 <Table>
//                     <TableBody>

//                         <TableRow className={classes.row}>
//                             <TableCell className={classes.invoiceRow} style={{ fontWeight: "600", fontSize: "20px" }}>Agent Name:</TableCell>
//                             <TableCell className={classes.invoiceRow}>
//                                 <DropDownList

//                                     style={{
//                                         backgroundColor: "#fff", height: "30px", color: "#000", outline: "none",
//                                         border: "1px solid grey",

//                                         borderRadius: "10rem",
//                                         width: "310px"
//                                     }}
//                                     data={Agents}
//                                     textField="name"
//                                     // value={}
//                                     defaultItem={defaultItemAgent}
//                                     onChange={(e) => { SetSelecetdAegnet(e.target.value); setInvoiceData({ ...invoiceData, agent: parseInt(e.target.value.agent_id) }) }}
//                                 /></TableCell>
//                         </TableRow>
//                         <TableRow className={classes.row} >
//                             <TableCell className={classes.invoiceRow} style={{ fontWeight: "600", fontSize: "20px" }}>Customer Name:</TableCell>
//                             <TableCell className={classes.invoiceRow}>
//                                 <DropDownList

//                                     style={{
//                                         backgroundColor: "#fff", height: "30px", color: "#000", outline: "none",
//                                         border: "1px solid grey",

//                                         borderRadius: "10rem",
//                                         width: "310px"
//                                     }}
//                                     data={customers}
//                                     textField="name"
//                                     defaultItem={defaultItemCust}
//                                     onChange={(e) => { SetSelectedCustomer(e.target.value); setInvoiceData({ ...invoiceData, client:parseInt( e.target.value.id )}) }}

//                                 /></TableCell>
//                         </TableRow>

//                         <TableRow className={classes.row}>
//                             <TableCell className={classes.invoiceRow} style={{ fontWeight: "600", fontSize: "20px" }}>Car Model:</TableCell>
//                             <TableCell className={classes.invoiceRow}>
//                                 <DropDownList

//                                     style={{
//                                         backgroundColor: "#fff", height: "30px", color: "#000", outline: "none",
//                                         border: "1px solid grey",

//                                         borderRadius: "10rem",
//                                         width: "310px"
//                                     }}
//                                     data={carModel}
//                                     textField="model"
//                                     defaultItem={DefaultCar}
//                                     onChange={(e) => { SelectedCar(e.target.value); setInvoiceData({ ...invoiceData, car_model: parseInt(e.target.value.id) }) }}

//                                 /></TableCell>
//                         </TableRow>
//                         <TableRow className={classes.row}>
//                             <TableCell className={classes.invoiceRow} style={{ fontWeight: "600", fontSize: "20px" }}>Chassis Number:</TableCell>
//                             <TableCell className={classes.invoiceRow}>< input type="text" placeholder='Chassis Number' value={selectedCar?.chassis} onChange={(e) => {setChasisNo(e.target.value);setInvoiceData({...invoiceData, chassis:e.target.value})}} /></TableCell>
//                         </TableRow>

//                         <TableRow className={classes.row} >
//                             <TableCell className={classes.invoiceRow} style={{ fontWeight: "600", fontSize: "20px" }}>Bank Name:</TableCell>
//                             <TableCell className={classes.invoiceRow}>
//                                 <DropDownList

//                                     style={{
//                                         backgroundColor: "#fff", height: "30px", color: "#000", outline: "none",
//                                         border: "1px solid grey",

//                                         borderRadius: "10rem",
//                                         width: "310px"
//                                     }}
//                                     data={BankList}
//                                     textField="name"
//                                     defaultItem={defaultItemBank}
//                                     onChange={(e) =>{ SetBankName(e.target.value.name);setInvoiceData({...invoiceData, bank_name:e.target.value.name})}}

//                                 />
//                             </TableCell>
//                         </TableRow>
//                         <TableRow className={classes.row} >
//                             <TableCell className={classes.invoiceRow} style={{ fontWeight: "600", fontSize: "20px" }}>Payment Status:</TableCell>
//                             <TableCell className={classes.invoiceRow}>
//                                 <DropDownList

//                                     style={{
//                                         backgroundColor: "#fff", height: "30px", color: "#000", outline: "none",
//                                         border: "1px solid grey",

//                                         borderRadius: "10rem",
//                                         width: "310px"
//                                     }}
//                                     data={statusList}
//                                     textField="name"
//                                     defaultItem={SelectStatus}
//                                     onChange={(e) => { SetStatus(e.target.value.name); setInvoiceData({ ...invoiceData, payment_status: e.target.value.data }) }}

//                                 />
//                             </TableCell>
//                         </TableRow>


//                         <TableRow className={classes.row}>
//                             <TableCell className={classes.invoiceRow} style={{ fontWeight: "600", fontSize: "20px" }}>Price:</TableCell>
//                             <TableCell className={classes.invoiceRow}><input type="text" placeholder='Price' value={price} onChange={(e) => { setPrice(e.target.value); setInvoiceData({ ...invoiceData, price: parseInt(e.target.value) }) }} /></TableCell>
//                         </TableRow>
//                         <TableRow className={classes.row}>
//                             <TableCell className={classes.invoiceRow} style={{ fontWeight: "600", fontSize: "20px" }}>Taxes:</TableCell>
//                             <TableCell className={classes.invoiceRow}>< input type="text" placeholder='Taxes' value={Tax} onChange={(e) => { setTax(e.target.value); setInvoiceData({ ...invoiceData, taxes: parseInt(e.target.value) }) }} /></TableCell>
//                         </TableRow>

//                     </TableBody>
//                 </Table>
//             </div>
//             <div className='creaetInvoice__submit'>
//                 <button onClick={createInvoice} >Create Invoice</button>
//             </div>

//         </div>
//     )
// }

// export default SaCreateInvoice