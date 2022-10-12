import React,{useState} from 'react';
import common from "../../baseUrl"
import Dialog from '@mui/material/Dialog';
import axios from "axios"
import DialogTitle from '@mui/material/DialogTitle';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import { success,warning } from '../Toast';
import StyledEngineProvider from "@mui/material/StyledEngineProvider";
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AddIcon from '@mui/icons-material/Add';

export default function AddWallet({client_id}) {
  const [open, setOpen] = React.useState(false);
  const [newCustomer,setNewCustomer]=useState({
      amount:"",
      currency:"usd",
      conversion_rate:"1"
  })
   
  const handleUpdateWallet=async()=>{

        const result=await axios({
            method:"post",
            url:`${common.baseUrl}Funds/LoadWallet/`,
            headers:{
                Authorization:`Token ${localStorage.getItem("token")}`
            },
            data:{
              ...newCustomer,client_id
            }
        })
        if(result.status===200)
        {
            // success("The wallet balance has been updated!")
            // handleClose();
            window.location.reload()
        }
        else{
            alert("Something went wrong")
        }

}
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <button onClick={handleClickOpen}><AttachMoneyIcon/></button>
      <StyledEngineProvider injectFirst>
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <h2 style={{margin:"1rem 1rem 0rem 1rem"}}><span style={{color:"#8a28d9"}}>Update Wallet</span></h2>
            <div className="dialogEditBoxContainer">
                    <div>
                        <span>Amount ($) </span>
                        <input type="text" 
                        className="std-input2"
                        type="number"
                        value={newCustomer.amount}
                        onChange={(e)=>setNewCustomer({...newCustomer,amount:e.target.value})}
                        />
                    </div>
                    <button 
                    className="std-button-sun"
                    onClick={handleUpdateWallet}
                    style={{paddingLeft:"0.5rem",paddingRight:"0.5rem"}}
                    >
                        <AddIcon/>
                        <span>Add to Wallet</span>

                    </button>
                </div>    
        </Dialog>
      </StyledEngineProvider>
    </>
  );
}
