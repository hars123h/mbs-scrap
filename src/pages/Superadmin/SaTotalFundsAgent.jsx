import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import currency from 'currency.js'
import React from 'react'
import { useState } from 'react'
import "../../styling/saAgents.css"
import { makeStyles } from '@material-ui/core';
import SaCustomerModel from './SaCustomerModel'
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
    textAlign:"center",
    fontFamily: "Montserrat",
    transition: "all, .5s ease",
    "&:hover": {
      backgroundColor: "whitesmoke",
      transition: "all, .5s ease"
    }

  }
})


function SaTotalFundsAgent({ propsData, onShow, agentName, setCarData,setCutomerName}) {
  const classes = useStyles()
  const getCustomer = (id) => {

  }
  const handleCarinfo = (data) => {
    setCarData(data)
    if (onShow) {
      onShow()
    }
    // setAgentName(data[index].agent_name)
    // setPropsData(data[index].clients)
  }
  return (
    <>
      {propsData ?
        <div div className='saTotalFunda' >
          <div className="saTotalFunds__card">
            <div className="saTotalFunds__card__head">
              <h2>{propsData?.agent_name}</h2>
              <h4 style={{ fontSize: "1vw" }}>{currency(propsData?.agent_receivables, { precision: 0 }).format()} </h4>
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
                    {
                      propsData?.clients?.length >= 1 ?
                        <TableBody style={{textAlign:"center"}}>
                          {
                            propsData?.clients?.map((item, i) => (
                              <TableRow className={classes.row} key={i} onClick={(e) => handleCarinfo(item)}>
                                <TableCell className={classes.rowCell}>{item?.client_name}</TableCell>
                                <TableCell className={classes.rowCell}>{item?.cnf_price}</TableCell>
                                <TableCell className={classes.rowCell}>{item?.deposits}</TableCell>
                                <TableCell className={classes.rowCell}>{item?.receivables}</TableCell>
                              </TableRow>
                            ))
                          }
                        </TableBody> : <>
                          <p style={{ opacity: ".3", fontWeight: "500", fontSize: "13px", marginTop:"5px" }}>Selected Agent Has no Customers</p>
                        </>
                    }

                  </Table>
                </div>
              </div>
            </div>
          </div>
        </div> : <>
          <p style={{ opacity: ".3", fontWeight: "600", fontSize: "20px" }}>Click On Agent Card</p>
        </>


      }
    </>
  )
}

export default SaTotalFundsAgent