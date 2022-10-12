import React,{useEffect,useState} from 'react'
import {motion } from "framer-motion"
import {Avatar,Divider} from "@mui/material"
import { dashboardVariants } from '../../framer'
import {useHistory} from "react-router-dom"
import axios from "axios"
import EditIcon from '@mui/icons-material/Edit';
import Dialog from '@mui/material/Dialog';
import common from '../../baseUrl'
import StyledEngineProvider from "@mui/material/StyledEngineProvider";
import Heading from "../../component/Heading"


const Settings = () => {
    document.title="Settings - MBS Auto Avenue"
    const [userData,setUserData]=useState({})
    const [editable,setEditable]=useState({})
    const [newPassword,setNewPassword]=useState({old_password:"",new_password:"",confirm:""})
    const [open, setOpen] = useState(false);
    const [open2,setOpen2] = useState(false)
    const history=useHistory()

    useEffect(()=>{
        const agentDetail=async()=>{
           const response=await axios({
               method:"get",
               url:`${common.baseUrl}Login/AgentDetails/1`,
               headers:{
                   Authorization:`Token ${localStorage.getItem("token")}`
               }
           })
           setUserData({...response.data,...response.data.user})
           setEditable({country:response.data.country,mobile_no:response.data.mobile_no,address:response.data.address,company_name:response.data.company_name})
        }
        agentDetail()
    },[])
  
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const logOut=()=>{
        let KEYS=["token","username","superuser"]
        KEYS.forEach((item)=>{
          localStorage.removeItem(item)
        })
        history.replace("/login")
      }
   
    const editPersonalDetails=async()=>{

        // if(editable.mobile_no.length > 7){
            const result=await axios({
                method:"post",
                url:`${common.baseUrl}Login/AgentDetails/1`,
                headers:{
                    Authorization:`Token ${localStorage.getItem("token")}`
                },
                data:editable
            })
            if(result.status===200)
            {
                window.location.reload();
                handleClose();
            }
            else{
                alert("Something went wrong")
            }
        // }
        // else{
        //     alert("Please give proper mobile Number")
        // }

    }


    const resetPassword=async()=>{
        if(newPassword.new_password===newPassword.confirm){
            if(newPassword.new_password.length>=8){
                const result=await axios({
                    method:"post",
                    url:`${common.baseUrl}Login/ChangePassword/`,
                    headers:{
                        Authorization:`Token ${localStorage.getItem("token")}`
                    },
                    data:{
                        new_password:newPassword.new_password,
                        old_password:newPassword.old_password
                    }
                })
                if(result.status===200){
                    logOut();
                }
                else{
                    alert("Something went wrong while updating password")
                }
            }
            else{
                alert("Your password is too short. Input atleast 8 characters.")
            }

        }
        else{
            alert("Password Mismatch")
        }
    }


  
    const handleClickOpen2 = () => {
        setOpen2(true);
      };
    
      const handleClose2 = () => {
        setOpen2(false);
      };
     


    return (
        <div 
         className="phContainer"
         >
           <Heading title="Settings"/>

           <div className="profileContainer">
               <div className="head">
                    <Avatar src={userData.username} 
                                alt={userData.name}
                                sx={{ width: 100, height: 100,bgcolor: "#8a28d9"  }}
                                />
                    <div>
                        <h1 style={{textTransform:"capitalize"}}>{userData.name}</h1> 
                    </div>
                </div>
                <Divider/>
                <div className="body">
                    <p><span>agent id</span> {userData.agent_id}</p>
                    <p><span>company name</span> {userData.company_name}</p>
                    <p><span>country</span> {userData.country}</p>
                    <p><span>mobile no</span> {userData.mobile_no}</p>
                    <p><span>address</span> {userData.address} </p>
                    {/* <div style={{marginTop:"1rem"}}><span>Address</span> <p id="addressAgent">{userData.address}</p></div> */}
                    <div>
                        <div>
                            <button 
                            className="std-button-sun"
                            onClick={handleClickOpen}><EditIcon/></button>
                            <button
                            className="std-button-2"
                            onClick={handleClickOpen2}
                            >
                                Reset Password
                            </button>
                        </div>
                    </div>
                </div>
           </div>
           <StyledEngineProvider injectFirst>

            <Dialog 
                aria-labelledby="alert-dialog-title"
                onClose={handleClose} open={open}>

                <h2 style={{margin:"1rem 1rem 0rem 1rem"}}><span style={{color:"#8a28d9"}}>Edit Information</span></h2>

                <div className="dialogEditBoxContainer">
                    <div>
                        <span>Address</span>
                        <input type="text" 
                        className="std-input2"
                        value={editable.address}
                        onChange={(e)=>setEditable({...editable,address:e.target.value})}
                        />
                    </div>
                    <div>
                        <span>Country</span>
                        <input type="text" 
                        className="std-input2"
                        value={editable.country}
                        onChange={(e)=>setEditable({...editable,country:e.target.value})}
                    />
                    </div>
                    <div>
                        <span>Your Company</span>
                        <input type="text" 
                        className="std-input2"
                        value={editable.company_name}
                        onChange={(e)=>setEditable({...editable,company_name:e.target.value})}
                    />
                    </div>
                    <div>
                        <span>Mobile Number</span>
                        <input type="text"
                        className="std-input2"
                        value={editable.mobile_no}
                        onChange={(e)=>setEditable({...editable,mobile_no:e.target.value})}/>
                        </div>
                    <button 
                    className="std-button-sun"
                    onClick={editPersonalDetails}
                    >Edit Details</button>
                </div>
            </Dialog>


          <Dialog onClose={handleClose2} open={open2}>
            
            <h2 style={{margin:"1rem 1rem 0rem 1rem"}}> <span style={{color:"#8a28d9"}}>Reset Password</span></h2>
            <div className="dialogEditBoxContainer">
                <div>
                    <span>Current Password</span>
                    <input type="password" 
                    className="std-input2"
                    value={newPassword.old_password}
                    onChange={(e)=>setNewPassword({...newPassword,old_password:e.target.value})}
                    />
                </div>
                <div>
                    <span>New Password</span>
                    <input type="password" 
                    className="std-input2"
                    value={newPassword.new_password}
                    onChange={(e)=>setNewPassword({...newPassword,new_password:e.target.value})}
                    />
                </div>
                <div>
                    <span>Confirm Password</span>
                    <input type="password" 
                    className="std-input2"
                    value={newPassword.confirm}
                    onChange={(e)=>setNewPassword({...newPassword,confirm:e.target.value})}
                    />
                </div>

                <button 
                className="std-button-sun"
                onClick={resetPassword}
                >Confirm</button>
            </div>
            </Dialog>
            </StyledEngineProvider>
        </div>
    )
}

export default Settings
