import React,{useState} from 'react';
import common from "../../baseUrl"
import Dialog from '@mui/material/Dialog';
import axios from "axios"
import DialogTitle from '@mui/material/DialogTitle';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import { success,warning } from '../Toast';
import StyledEngineProvider from "@mui/material/StyledEngineProvider";


export default function AlertDialog() {
  const [open, setOpen] = React.useState(false);
  // /Login/ClientRegister/
  // name', 'mobile_no', 'address', 'country', 'consignee_address'
  const [newCustomer,setNewCustomer]=useState({
    name:"",mobile_no:"",address:"",country:"",consignee_address:"",email:""
  })
   
  const addNewCustomer=async()=>{

    if(newCustomer.name.length > 1){
       if(newCustomer.email.length>11)
       {
        const result=await axios({
          method:"post",
          url:`${common.baseUrl}Login/ClientRegister/`,
          headers:{
              Authorization:`Token ${localStorage.getItem("token")}`
          },
          data:newCustomer
      })
      if(result.status===200)
      {
        window.location.reload()
          // success("Your information is updated successfully.")
          // handleClose();
      }
      else{
          alert("Something went wrong")
      }
       }
       else
       {
        warning("Please enter  Email")
       }
    }
    else{
        warning("Please enter a name")
    }

}
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <AddCircleRoundedIcon  onClick={handleClickOpen} style={{color:"#8a28d9",cursor:"pointer"}}/>
      <StyledEngineProvider injectFirst>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <h2 style={{margin:"1rem 1rem 0rem 1rem"}}><span style={{color:"#8a28d9"}}>Add Customer</span></h2>

        <div className="dialogEditBoxContainer">
                <div>
                <span>Name <span style={{ color: "red" }}>*</span></span>
                    <input type="text" 
                    className="std-input2"
                    value={newCustomer.name}
                    onChange={(e)=>setNewCustomer({...newCustomer,name:e.target.value})}
                    />
                </div>
                <div>
                <span>Email <span style={{ color: "red" }}>*</span></span>
                    <input type="text" 
                    className="std-input2"
                    value={newCustomer.email}
                    required
                    onChange={(e)=>setNewCustomer({...newCustomer,email:e.target.value})}
                    />
                </div>
                <div>
                    <span>Mobile Number</span>
                    <input type="text" 
                    className="std-input2"
                    value={newCustomer.mobile_no}
                    onChange={(e)=>setNewCustomer({...newCustomer,mobile_no:e.target.value})}
                    />
                </div>
                
                <div>
                    <span>Consignee Address</span>
                    <input type="text" 
                    className="std-input2"
                    value={newCustomer.consignee_address}
                    onChange={(e)=>setNewCustomer({...newCustomer,consignee_address:e.target.value})}
                  />
                </div>
                <div>
                    <span>Address</span>
                    <input type="text" 
                    className="std-input2"
                    value={newCustomer.address}
                    onChange={(e)=>setNewCustomer({...newCustomer,address:e.target.value})}
                  />
                </div>
                <div>
                    <span>Country</span>
                    <input type="text"
                    className="std-input2"
                    value={newCustomer.country}
                    onChange={(e)=>setNewCustomer({...newCustomer,country:e.target.value})}/>
                    </div>
                <button 
                className="std-button-sun"
                onClick={addNewCustomer}
                >Register</button>
            </div>    
      </Dialog>
      </StyledEngineProvider>
    </div>
  );
}
