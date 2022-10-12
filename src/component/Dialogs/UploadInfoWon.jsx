import React,{useState,useEffect} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import axios from 'axios';
import GavelRoundedIcon from '@mui/icons-material/GavelRounded';
import { error, success, warning } from '../Toast';
import StyledEngineProvider from "@mui/material/StyledEngineProvider";
import "../makeBidDialog.css"
import EditIcon from '@mui/icons-material/Edit';
import common from '../../baseUrl';

export default function MakeBidDialog({id,purchasePrice, description, chassis}) {
  const [open, setOpen] = useState(false);
  const [required,setRequired]=useState({
      downpayment:"",
      cf:"",
      purchaseprice:purchasePrice,
      chassis:chassis,
      desc:description
  })

  useEffect(() => {
    setRequired({...required, desc:description, chassis:chassis})
  }, [])

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  


  const addDetails=async()=>{
        const response=await axios(
            {
                method:"put",
                url:`${common.baseUrl}Funds/PurchaseDetails/`,
                headers:{
                    Authorization:`Token ${localStorage.getItem("token")}`
                },
                data:{
                    description:required.desc,
                    chassis:required.chassis,
                    purchase_price:required.purchaseprice,
                    cnf_price:required.cf,
                    down_payment:required.downpayment,
                    id
                }
            }
        )
        if(response.status===200){
            success("Your details have been saved successfully")
            handleClose()
            window.location.reload()
        }
        else{
            error("Something went wrong. Try again")
        }
  }


  return (
    <>
      <button 
      style={{marginTop:"2rem"}}
      className="std-button-sun"
      onClick={handleClickOpen}>
        <EditIcon/><span style={{marginLeft:"0.5rem"}}>Edit Details</span>
      </button>
      <StyledEngineProvider injectFirst>
      <Dialog
        open={open}
        onClose={handleClose}
      >
         <h2 style={{margin:"1rem 1rem 0rem 1rem"}}><span style={{color:"#8a28d9"}}>Add Car Details</span></h2>
        <DialogContent>
                    <div className="dialogEditBoxContainer" style={{padding:"0"}}>
                        <div>
                            <span>Downpayment ($) <b style={{color : 'red'}}> * </b> </span>
                            <input type="text" 
                            className="std-input2"
                            value={required.downpayment}
                            onChange={(e)=>setRequired({...required,downpayment:e.target.value})}
                            />
                        </div>
                        <div>
                            <span>C&F ($) <b style={{color : 'red'}}> * </b> </span>
                            <input type="text" 
                            className="std-input2"
                            value={required.cf}
                            onChange={(e)=>setRequired({...required,cf:e.target.value})}
                            />
                        </div>
                        <div>
                            <span>Chassis </span>
                            <input type="text" 
                            className="std-input2"
                            value={required.chassis}
                            onChange={(e)=>setRequired({...required,chassis:e.target.value})}
                            />
                        </div>
                        <div>
                            <span>Description </span>
                            <textarea type="text" 
                            className="std-input2"
                            style={{resize:"none",fontFamily:"Montserrat"}}
                            value={required.desc}
                            onChange={(e)=>setRequired({...required,desc:e.target.value})}
                            />
                        </div>
                    </div> 


        </DialogContent>
        <DialogActions style={{display:"flex",justifyContent:"flex-start",padding:"0 1rem 1rem 1rem"}}>
         <button 
            style={{border:"2px solid #8a28d9"}}
            className="std-button-sun" 
            onClick={addDetails}
            autoFocus>
            Submit
          </button>
          <button 
          style={{background:"transparent",color:"#8a28d9",border:"2px solid #8a28d9"}}
          className="std-button-sun" onClick={handleClose}>Close</button>

        </DialogActions>
      </Dialog>
      </StyledEngineProvider>
    </>
  );
}
