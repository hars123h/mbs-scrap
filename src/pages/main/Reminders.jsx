import CancelIcon from '@mui/icons-material/Cancel'
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import ACustomerModel from '../ACustomerMOdel'
import { Divider, Pagination, Tooltip } from "@mui/material"
import axios from 'axios'
import currency from 'currency.js'
import dateFormat from 'dateformat'
import { makeStyles } from '@material-ui/core';
import { AnimatePresence, motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import common from '../../baseUrl'
import Heading from '../../component/Heading'
import { error } from '../../component/Toast'
import ATotalFundsAgent from '../ATotalFundsAgent'
import "../../styling/remider.css"
const useStyles = makeStyles({
    headCell: {
        backgroundColor: "#8a28d9",
        color: "#fff",
        fontSize: "18px",
        fontFamily: 'Montserrat'
    },
    rowCell: {
        fontSize: "15px",
        paddingLeft: "20px"

    },
    row: {
        cursor: "pointer",
        marginTop: "30px",
        paddingLeft: "3rem",
        border: "none",
        fontFamily: "Montserrat",
        transition: "all, .5s ease",
        "&:hover": {
            backgroundColor: "whitesmoke",
            transition: "all, .5s ease"
        }

    }
})

// const data = [
//     {
//         id: 1,
//         name: "Harsh",
//         Fund: 600,
//         listofCust: [
//             {
//                 customername: "Customer A",
//                 deposit: 100,
//                 recievable: 100

//             },
//             {
//                 customername: "Customer B",
//                 deposit: 100,
//                 recievable: 100
//             },
//             {
//                 customername: "Customer C",
//                 deposit: 100,
//                 recievable: 100
//             }
//         ]

//     },
//     {
//         id: 3,
//         name: "Pravin",
//         Fund: 8000,
//         listofCust: [
//             {
//                 customername: "Customer A",
//                 deposit: 1000,
//                 recievable: 1000

//             },
//             {
//                 customername: "Customer B",
//                 deposit: 1000,
//                 recievable: 1000
//             },
//             {
//                 customername: "Customer B",
//                 deposit: 1000,
//                 recievable: 1000
//             },
//             {
//                 customername: "Customer C",
//                 deposit: 1000,
//                 recievable: 1000
//             }
//         ]
//     },
//     {
//         id: 3,
//         name: "Pravin",
//         Fund: 8000,
//         listofCust: [
//             {
//                 customername: "Customer A",
//                 deposit: 1000,
//                 recievable: 1000

//             },
//             {
//                 customername: "Customer B",
//                 deposit: 1000,
//                 recievable: 1000
//             },
//             {
//                 customername: "Customer B",
//                 deposit: 1000,
//                 recievable: 1000
//             },
//             {
//                 customername: "Customer C",
//                 deposit: 1000,
//                 recievable: 1000
//             }
//         ]
//     },
//     {
//         id: 3,
//         name: "Pravin",
//         Fund: 8000,
//         listofCust: [
//             {
//                 customername: "Customer A",
//                 deposit: 1000,
//                 recievable: 1000

//             },
//             {
//                 customername: "Customer B",
//                 deposit: 1000,
//                 recievable: 1000
//             },
//             {
//                 customername: "Customer B",
//                 deposit: 1000,
//                 recievable: 1000
//             },
//             {
//                 customername: "Customer C",
//                 deposit: 1000,
//                 recievable: 1000
//             }
//         ]
//     },
//     {
//         id: 3,
//         name: "Pravin",
//         Fund: 8000,
//         listofCust: [
//             {
//                 customername: "Customer A",
//                 deposit: 1000,
//                 recievable: 1000

//             },
//             {
//                 customername: "Customer B",
//                 deposit: 1000,
//                 recievable: 1000
//             },
//             {
//                 customername: "Customer B",
//                 deposit: 1000,
//                 recievable: 1000
//             },
//             {
//                 customername: "Customer C",
//                 deposit: 1000,
//                 recievable: 1000
//             }
//         ]
//     },
//     {
//         id: 4,
//         name: "mnent Name3",
//         Fund: 18000,
//         listofCust: [
//             {
//                 customername: "Customer A",
//                 deposit: 3000,
//                 recievable: 3000

//             },
//             {
//                 customername: "Customer B",
//                 deposit: 3000,
//                 recievable: 3000
//             },
//             {
//                 customername: "Customer C",
//                 deposit: 3000,
//                 recievable: 3000
//             }
//         ]
//     },
//     {
//         id: 5,
//         name: "Agent Name4",
//         Fund: 24000,
//         listofCust: [
//             {
//                 customername: "Customer A",
//                 deposit: 4000,
//                 recievable: 4000

//             },
//             {
//                 customername: "Customer B",
//                 deposit: 4000,
//                 recievable: 4000
//             },
//             {
//                 customername: "Customer C",
//                 deposit: 4000,
//                 recievable: 4000
//             }
//         ]
//     }
// ]
const Reminders = () => {
    const details = JSON.parse(localStorage.getItem('data'))
    const agent_id = details?.agent_id
    const [showModal, setShowCustomerModal] = useState()
    const [getList, setGetList] = useState([])
    const [filterBy, setFilterBy] = useState({ buyer: "", carname: "", remaining: 0, status: "", updatedAt: "" })
    const [filterBar, setFilterBar] = useState(false)
    const [carDetail, setCarDetails] = useState()
    const [customerDetail, setCustomerDetail] = useState()
    const [Totalrecievable, setTotalrecievable] = useState()
    const [showMOdel, setShoModel] = useState(false)
    const [data, setData] = useState([])
    const classes = useStyles()
    const handelModal = (data) => {
        setCustomerDetail(data)
        setShoModel(true)

    }
    console.log(carDetail);
    const [resultCount, setResultCount] = useState(0)
    document.title = "Funds - Agent - MBS Auto Avenue"
 
    
    useEffect(() => {

        const getAllFunds = async () => {
            const response = await axios({
                method: "post",
                headers: {
                    Authorization: `Token ${localStorage.getItem("token")}`
                },
                url: `${common.baseUrl}Funds/ShowReceivables/`
            })
            if (response.status === 200) {
                setResultCount(response.data.count)
                setGetList(response.data.results)
            }
            else {
                error("Something went wrong")
            }
        }
        getAllFunds()
    }, [])

    const nextPage = async (pageNumber) => {

        const response = await axios({
            method: "post",
            headers: {
                Authorization: `Token ${localStorage.getItem("token")}`
            },
            url: `${common.baseUrl}Funds/ShowReceivables/?page=${pageNumber}`
        })
        if (response.status === 200) {
            setGetList(response.data.results)
        } else {
            error("Something went wrong!")
        }
    }

    useEffect(async () => {
        const agentWisepurchase = await axios({
            method: 'get',
            url: `${common.baseUrl}Funds/getAllFundsData`,
            headers: {
                Authorization: `Token ${localStorage.getItem("token")}`
            },
        })
        setTotalrecievable(agentWisepurchase.data?.total_receivables)
        setData(agentWisepurchase.data?.all_data?.[0]?.clients)

        console.log(agentWisepurchase);
    }, [])
    return (
        <div
            className="reminderContainer"
        >

            <Heading title="Funds" />
            <div className="fundsTitle">
                <div>
                    <p>Total Receivables</p>
                    <h1 style={{ fontSize: "2vw" }}>{currency(Totalrecievable, { precision: 0 }).format()} </h1>

                </div>

            </div>
            <Divider />
            <div className="fundsContainer">

                {
                    showMOdel && <ACustomerModel customerPurchase={customerDetail}  onClose={() => setShoModel(false)} />
                }
                <div div className='saTotalFunda' >
                    <div className="saTotalFunds__card">
                        <div className="saTotalFunds__card__head">

                            {/* <h4 style={{ fontSize: "2vw" ,color:"#8a28d9"}}>{currency(totalFund, { precision: 0 }).format()} </h4> */}
                            <div className='saTotalFunds__card__content'>

                                <div className='saTotalFunds__card__content__body'>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell className={classes.headCell}>List of Customer</TableCell>
                                                <TableCell className={classes.headCell}>C&F Price</TableCell>
                                                <TableCell className={classes.headCell}>Deposit</TableCell>
                                                <TableCell className={classes.headCell}>Receivable</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {
                                                data?.map((item, i) => (
                                                    <TableRow className={classes.row} key={i} onClick={(e) => handelModal(item)}>
                                                        <TableCell className={classes.rowCell}>{item?.client_name}</TableCell>
                                                        <TableCell className={classes.rowCell}>{item?.cnf_price}</TableCell>
                                                        <TableCell className={classes.rowCell}>{item?.deposits}</TableCell>
                                                        <TableCell className={classes.rowCell}>{item?.receivables}</TableCell>
                                                    </TableRow>
                                                ))
                                            }
                                        </TableBody>

                                    </Table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
            {Math.ceil(resultCount / 16) > 1 ?
                <Pagination count={Math.ceil(resultCount / 16)} sx={{ mb: 1 }} onChange={(e, pageNumber) => nextPage(pageNumber)} /> :
                ''
            }
        </div>
    )
}

export default Reminders
