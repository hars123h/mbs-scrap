import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import currency from 'currency.js'
import React from 'react'
import { useState } from 'react'
import "../styling/saAgents.css"
import { makeStyles } from '@material-ui/core';
import ACustomerModel from './ACustomerMOdel'
const useStyles = makeStyles({
    headCell: {
        backgroundColor: "#8a28d9",
        color: "#fff",
        fontSize: "22px",
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

const data = [

    {
        id: 1,
        customername: "Customer A",
        deposit: 3000,
        recievable: 3000,
        Cardetails:[
            {
                carUrl:"https://media.istockphoto.com/photos/photorealistic-illustration-of-blue-car-picture-id170110046?k=20&m=170110046&s=612x612&w=0&h=MwtP62O6JftuOYxuqfTXp0WrQPWTodOtQucGzg1p1Kc=",
                deposit:2323,
                recievable:8493,
                carName:"Jaguar"

            },
            {
                carUrl:"https://media.istockphoto.com/photos/photorealistic-illustration-of-blue-car-picture-id170110046?k=20&m=170110046&s=612x612&w=0&h=MwtP62O6JftuOYxuqfTXp0WrQPWTodOtQucGzg1p1Kc=",
                deposit:223,
                recievable:493,
                carName:"Tata Bolero"

            },
        ]


    },
    {
        id: 2,
        customername: "Customer B",
        deposit: 3000,
        recievable: 3000,
        Cardetails: [
            {
                carUrl: "https://media.istockphoto.com/photos/photorealistic-illustration-of-blue-car-picture-id170110046?k=20&m=170110046&s=612x612&w=0&h=MwtP62O6JftuOYxuqfTXp0WrQPWTodOtQucGzg1p1Kc=",
                deposit: 2323,
                recievable: 8493,
                carName: "Audi"

            },
            {
                carUrl: "https://media.istockphoto.com/photos/photorealistic-illustration-of-blue-car-picture-id170110046?k=20&m=170110046&s=612x612&w=0&h=MwtP62O6JftuOYxuqfTXp0WrQPWTodOtQucGzg1p1Kc=",
                deposit: 223,
                recievable: 493,
                carName: "Safari"

            },
        ]


    },
    {
        id: 3,
        customername: "Customer C",
        deposit: 3000,
        recievable: 3000,
        Cardetails: [
            {
                carUrl: "https://media.istockphoto.com/photos/photorealistic-illustration-of-blue-car-picture-id170110046?k=20&m=170110046&s=612x612&w=0&h=MwtP62O6JftuOYxuqfTXp0WrQPWTodOtQucGzg1p1Kc=",
                deposit: 2323,
                recievable: 8493,
                carName: "Audi"

            },
            {
                carUrl: "https://media.istockphoto.com/photos/photorealistic-illustration-of-blue-car-picture-id170110046?k=20&m=170110046&s=612x612&w=0&h=MwtP62O6JftuOYxuqfTXp0WrQPWTodOtQucGzg1p1Kc=",
                deposit: 2323,
                recievable: 8493,
                carName: "Audi"

            },
            {
                carUrl: "https://media.istockphoto.com/photos/photorealistic-illustration-of-blue-car-picture-id170110046?k=20&m=170110046&s=612x612&w=0&h=MwtP62O6JftuOYxuqfTXp0WrQPWTodOtQucGzg1p1Kc=",
                deposit: 2323,
                recievable: 8493,
                carName: "Audi"

            },
            {
                carUrl: "https://media.istockphoto.com/photos/photorealistic-illustration-of-blue-car-picture-id170110046?k=20&m=170110046&s=612x612&w=0&h=MwtP62O6JftuOYxuqfTXp0WrQPWTodOtQucGzg1p1Kc=",
                deposit: 223,
                recievable: 493,
                carName: "Safari"

            },
        ]


    },
]
function ATotalFundsAgent({ onShow }) {
    let totalFund = 0
    data?.forEach(customer => {
        totalFund += customer.recievable + customer.deposit
    })
    const [carDetail, setCarDetails] = useState()
    const [customerDetail, setCustomerDetail] = useState()
    const [showMOdel, setShoModel] = useState(false)
    const classes = useStyles()
    const handelModal = (id) => {
        let index = data?.findIndex(item => item.id == id)

        setCarDetails(data[index].Cardetails)
        setCustomerDetail(data[index])
        setShoModel(true)
       
    }
    return (
        <>
        {
            showMOdel&&<ACustomerModel customerDetail = {customerDetail} carDetail = {carDetail}  onClose = {()=>setShoModel(false)}/>
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
                                            <TableCell className={classes.headCell}>Deposit</TableCell>
                                            <TableCell className={classes.headCell}>Receivable</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {
                                            data?.map((item, i) => (
                                                <TableRow className={classes.row} key={i} onClick={(e) => handelModal(item.id)}>
                                                    <TableCell className={classes.rowCell}>{item.customername}</TableCell>
                                                    <TableCell className={classes.rowCell}>{item.deposit}</TableCell>
                                                    <TableCell className={classes.rowCell}>{item.recievable}</TableCell>
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


        </>
    )
}

export default ATotalFundsAgent