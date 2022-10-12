import React, { useEffect } from 'react'
import { TableBody, TableRow, TableHead, TableCell, Table, colors, } from '@mui/material'
import { tableCellClasses } from '@mui/material/TableCell';
import { makeStyles } from '@material-ui/core'
import "../../styling/saViewInvoice.css"
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { AutoComplete, DropDownList } from '@progress/kendo-react-dropdowns';
import axios from 'axios';
import common from '../../baseUrl';

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
    padding: "20px"

  }
})
const AgentsList = [
  {
    id: 1,
    name: "Chloe Williams",
    occupation: "Developer",
    carModel: "9cf9f"
  },
  {
    id: 2,
    name: "Severus Snape",
    occupation: "Developer",
    carModel: "9cf9f"
  },
  {
    id: 3,
    name: "Mark Smith",
    occupation: "Tech Support",
    carModel: "9cf9f"
  },
  {
    id: 4,
    name: "Rosemary Adams",
    occupation: "Tech Support",
    carModel: "9cf9f"
  },
  {
    id: 5,
    name: "Joe McDonalds",
    occupation: "Designer",
    carModel: "9cf9f"
  },
  {
    id: 6,
    name: "Minerva McGonagall",
    occupation: "Designer",
    carModel: "9cf9f"
  },
];
const defaultItemAgent = {
  name: "Select Agents..."
}
const defaultCustomer = {
  name: "Select Customer..."
}
const DefaultCar = {
  model: "Select Car Model..."
}
function SaViewInvoice() {
  const classes = useStyle()

  const [invSearch, setInvSearch] = useState('')
  const [carModal, setCarModal] = useState()
  const [invoiceDetail, setInvoiceDetails] = useState([]);
  const [customer, SetCustomer] = useState();
  const [SelecetdAegnet, SetSelecetdAegnet] = useState()
  const [searchResult, setSearchResult] = useState()
  const [selectedCar, SelectedCar] = useState()
  const [clientPurchase, setClietPurchse] = useState()
  const [BankName, SetBankName] = useState();
  const [Agents, setAgents] = useState();
  const [customers, setCustomers] = useState()
  const [SelectedCustomer, SetSelectedCustomer] = useState()
  const history = useHistory()
  const [invSearchflag, setInvoiceDetail] = useState(false)
  var index;
  const handleSearch = (e) => {
    setInvoiceDetail(true)
    setInvSearch(e.target.value)

    index = assignees.findIndex(item => item.InvNo.toLowerCase() === invSearch)

    setInvoiceDetails(assignees[index])



  }
  const handleCarSearch = (e) => {
    setCarModal(e.target.value)

    const carmodalSearch = assignees.filter((item) => {
      return (
        carModal ? item.carModal?.toLowerCase().includes(carModal) : item
      )
    })
    setInvoiceDetails(carmodalSearch)
  }




  const setcustVlaue = event => SetCustomer(event.value);
  const carModel = []
  useEffect(async () => {
    const url = 'Login/AllAgents/'
    const allAgents = await axios({
      method: "get",
      url: `${common.baseUrl}${url}`,

    })
    setAgents(allAgents.data)
  }, [])
  useEffect(async () => {
    const AgentId = SelecetdAegnet?.agent_id
    const url = `/Login/AllClients/`
    const allCustomers = await axios({
      method: "post",
      url: `${common.baseUrl}${url}`,
      headers: {
        Authorization: `Token ${localStorage.getItem("token")}`
      },
      data: {
        agent_id: AgentId
      }
    })
    setCustomers(allCustomers.data)
  }, [SelecetdAegnet])

  useEffect(async () => {
    const AgentId = SelecetdAegnet?.agent_id
    const url = `/Funds/client-purchases/${SelectedCustomer?.id}`
    const AllPurchase = await axios({
      method: "get",
      url: `${common.baseUrl}${url}`,
      headers: {
        Authorization: `Token ${localStorage.getItem("token")}`
      }
    })

    setClietPurchse(AllPurchase.data?.results)
    // setReciavable(AllFunds.data?.total_receivables)

  }, [SelectedCustomer])
  useEffect(() => {
    clientPurchase?.map(item => {
      carModel.push(item?.cardetails)
    })
  }, [clientPurchase])


  useEffect(async () => {
    // const AgentId = SelecetdAegnet?.agent_id
    const SearchInvoice = await axios({
      method: "post",
      url: `${common.baseUrl}/Invoicing/ViewBill/`,
      headers: {
        Authorization: `Token ${localStorage.getItem("token")}`
      },
      data: {
        agent_id:parseInt(SelecetdAegnet?.agent_id),
        client_id:parseInt(SelectedCustomer?.id),
        car_model_id: parseInt(selectedCar?.id)
      }
    })
    setSearchResult(SearchInvoice.data)
  }, [selectedCar])

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
                      onChange={(e) => SetSelecetdAegnet(e.target.value)}

                    />
                  </TableCell>
                </TableRow>

                <TableRow className={classes.row}>
                  <TableCell className={classes.invoiceRow} style={{ fontWeight: "600", fontSize: "20px" }}>Customer Name:</TableCell>
                  <TableCell className={classes.invoiceRow}>
                    <DropDownList

                      style={{
                        backgroundColor: "#fff", height: "30px", color: "#000", outline: "none",
                        border: "1px solid grey",

                        borderRadius: "10rem",
                        width: "310px"
                      }}
                      placeholder="Customer"
                      data={customers}
                      textField="name"
                      defaultItem={defaultCustomer}
                      onChange={(e) => SetSelectedCustomer(e.target.value)}






                    /></TableCell>
                </TableRow>



                <TableRow className={classes.row}>
                  <TableCell className={classes.invoiceRow} style={{ fontWeight: "600", fontSize: "20px" }}>Car Model:</TableCell>
                  <TableCell>
                    <DropDownList

                      style={{
                        backgroundColor: "#fff", height: "30px", color: "#000", outline: "none",
                        border: "1px solid grey",

                        borderRadius: "10rem",
                        width: "310px"
                      }}
                      data={carModel}
                      textField="model"
                      defaultItem={DefaultCar}
                      onChange={(e) => SelectedCar(e.target.value)}

                    /></TableCell>
                </TableRow>

                <TableRow className={classes.row}>
                  <TableCell className={classes.invoiceRow} style={{ fontWeight: "600", fontSize: "20px" }}>Inv. Number:</TableCell>
                  <TableCell className={classes.invoiceRow}> <input type="text" placeholder='Inv. Number' value={searchResult?.invoice_number} /></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
          <div className="sapurchase__table__container__searchBy__button">
            <button onClick={() => { invoiceDetail && history.push('/sa/viewSearchInvoice', { searchResult, invSearchflag }) }} >View Invoice</button>
          </div>
        </div>

      </div>
    </div >
  )
}

export default SaViewInvoice