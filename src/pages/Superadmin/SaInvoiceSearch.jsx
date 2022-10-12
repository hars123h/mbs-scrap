import { makeStyles, styled, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import { tableCellClasses } from '@mui/material';
import React from 'react'
import { useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom'
import "../../styling/SaInvoiceSearch.css"
import EditIcon from '@material-ui/icons/Edit';
import SaInvoicePrint from './SaInvoicePrint';
import { borderRadius } from '@mui/system';
import axios from 'axios';
import { useEffect } from 'react';
import common from '../../baseUrl';
const useStyle = makeStyles({
    headRow: {
        backgroundColor: "#8a28d9",
  
      },
    row: {
        color: "white",
        boxShadow: "7px 4px 16px 0px #ccc",
        cursor: "pointer",
        marginTop: "40px",
        // paddingLeft: "3rem",
        border: "none",
        fontFamily: "Montserrat",
        "&:hover": {
            backgroundColor: "whitesmoke",
        }
    },
    cell: {
        paddingTop: "25px",
        paddingBottom: "25px"
    },
    headCell: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: "16px",
        fontFamily: "montserrat",


    },
    button: {
        padding: "5px",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#8a28d9",
        color: "#fff",
        border: "1px solid #8a28d9",
        outline: "none",
        transition: "all .7s ease",
        borderRadius: "5px",
        "&:hover": {
            backgroundColor: "#fff",
            color: "#8a28d9",
            transition: "all .7s ease"
        }

    }
})
const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: "#8a28d9",
        color: theme.palette.common.white,
    },
}));
function SaInvoiceSearch() {
    const history = useHistory();
    const data = useLocation();
    const [searcheditem, setSearchedItem] = useState(data.state.searchResult)
    // console.log("location item",searcheditem);

    const [Agents, setAgents] = useState()
    const [propsData, setPropsData] = useState()
    const [editInvoiceData, setedItInvoiceData] = useState("")
    // console.log(data);

    const onShowInvoice = () => {

        setPropsData(searcheditem)
    }

   

    const editInvoice = (InvNumber) => {

        // if (data.state.invSearchflag === false) {
        //     let dataIndex = searcheditem.findIndex(item => item.InvNo == InvNumber)
        //     setedItInvoiceData(searcheditem[dataIndex]);
        // }
        // else {
        //     setedItInvoiceData(data.state.invoiceDetail)
        // }

        history.push('/sa/editInvoice/' + InvNumber)
    }
    const classes = useStyle()
   


    useEffect(async () => {
        const url = 'Login/AllAgents/'
        const allAgents = await axios({
            method: "get",
            url: `${common.baseUrl}${url}`,

        })
        setAgents(allAgents.data)
    }, [])
    return (
        <div className='saInvoiceSearchBody'>
            <div className='saInvoiceSearchBody__Heading'>
                <h3>View Invoice</h3>
            </div>
            <div className='saInvoiceSearchBody__container'>
                <div className='saInvoiceSearch__left'>
                    <Table>
                        <TableHead>
                            <TableRow className={classes.headRow} >
                                <TableCell className={classes.headCell}>List of Customer</TableCell>
                                <TableCell className={classes.headCell}>Status</TableCell>
                                <TableCell className={classes.headCell}>Car Model</TableCell>
                                <TableCell className={classes.headCell}>Edit</TableCell>
                                
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {/* {
                                data.state?.invSearchflag === false ? (
                                    searcheditem?.map((item, i) => (
                                        <TableRow className={classes.row} key={i} onClick={() => onShowInvoice(item.InvNo)}>
                                            <TableCell className={classes.cell}>{item.CustomerName}</TableCell>
                                            <TableCell className={classes.cell}>{item.status}</TableCell>
                                            <TableCell className={classes.cell}>{item.CarDetails?.carModal}</TableCell>
                                            <TableCell className={classes.cell}> <EditIcon onClick={(e) => { e.stopPropagation(); editInvoice(item.InvNo) }} style={{ fontSize: "17px", color: "#8a28d9", cursor: "pointer" }} /></TableCell>
                                        </TableRow>
                                    ))
                                ) : */}
                                    
                                        <TableRow className={classes.row} key={searcheditem.id} onClick={onShowInvoice}>
                                            <TableCell>{searcheditem?.client?.name}</TableCell>
                                            <TableCell>{searcheditem?.status}</TableCell>
                                            <TableCell>{searcheditem?.car_model?.model}</TableCell>
                                            <TableCell><button className={classes.button} onClick={(e) => { e.stopPropagation(); editInvoice(searcheditem.InvNo) }}>Edit</button></TableCell>
                                        </TableRow>
                                    
                            
                        </TableBody>

                    </Table>
                </div>
                <div className='saInvoiceSearch__right'>
                    <SaInvoicePrint propsData={propsData} />
                </div>
            </div>
        </div>
    )


}

export default SaInvoiceSearch