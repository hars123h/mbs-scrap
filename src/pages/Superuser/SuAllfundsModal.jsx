import { TableBody } from '@material-ui/core'
import { Table, TableCell, TableRow } from '@mui/material'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import React from 'react'
import "../../styling/SaAllfundsModal.css"
import { DropDownList } from '@progress/kendo-react-dropdowns';
import { useState } from 'react';
const currenncy = [
  {
    curr :"USD"
  },
  {
    curr :"JPY"
  }
  
]
const defaultItem = {
  curr:"Select.."
}
function SuAllfundsModal(props) {
  const [currency, Setcurrency] = useState()
  return (
    <div onClick={() => props.onClose ? props.onClose() : ""} className='SaAllfundsModal'>

      <div onClick={(e) => e.stopPropagation()} className='SaAllfundsModal__body'>
        <div className="SaAllfundsModal__body___top">
          <h3>Load Fund</h3>
        </div>
        <div className="SaAllfundsModal__body__custDeatils">
          <div className='SaAllfundsModal__body__custDeatils__name'>
            <input type="text" placeholder='Customer Name' />
          </div>
          <div className='SaAllfundsModal__body__amount' >
            <input type="text" name="" id="" placeholder='Amount' />
            <div className='SaAllfundsModal__body__amount__select'>
              <DropDownList

                style={{ backgroundColor: "#fff", height: "45px", color: "#000",   outline: "none",
                border: "none",
                boxShadow: "2px 5px 12px 5px #ccc",
                borderRadius: "10rem"}}
                data={currenncy}
                textField="curr"
                defaultItem={defaultItem}
                onChange={(e) => Setcurrency(e.target.value.super_model_id)}





              />
            </div>
          </div>
          <div className='SaAllfundsModal__body__amount__change'>
            <input  placeholder='Conversion rate' />
          </div>
          <div className='SaAllfundsModal__body__aprovalbutton' >
            <button>Load Fund</button>
          </div>
        </div>

      </div>
    </div>
  )
}

export default SuAllfundsModal