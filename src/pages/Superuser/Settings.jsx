import React,{useEffect,useState} from 'react'
import {motion } from "framer-motion"
import {Avatar,Divider} from "@mui/material"
import { dashboardVariants } from '../../framer'
import axios from "axios"
import { useHistory } from 'react-router'
import Dialog from '@mui/material/Dialog';
import common from '../../baseUrl'
import StyledEngineProvider from "@mui/material/StyledEngineProvider";
import SuTop from '../../component/Heading/SuTop'


const Settings = () => {
    const [userData,setUserData]=useState({})
    const [editable,setEditable]=useState({})
    const [newPassword,setNewPassword]=useState({current:"",password:"",confirm:""})
    const [open, setOpen] = useState(false);
    const [open2,setOpen2] = useState(false)
    const history=useHistory()

    useEffect(()=>{
        let url=localStorage.getItem("superuser")==="true"?"Login/HeadAdminDetails/":"Login/AgentDetails/1"
        const agentDetail=async()=>{
           const response=await axios({
               method:"get",
               url:`${common.baseUrl+url}`,
               headers:{
                   Authorization:`Token ${localStorage.getItem("token")}`
               }
           })
        //    console.log(response)
           setUserData({...response.data,...response.data.user})
           setEditable({country:response.data.country,mobile_no:response.data.mobile_no,address:response.data.address,company_name:response.data.company_name})
        }
        agentDetail()
    },[])
    // a14acb1e565f002acd9ef0862b27b4b44428d21e
  
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
   
    // const editPersonalDetails=async()=>{

    //     if(editable.mobile_no.length > 7){
    //         const result=await axios({
    //             method:"post",
    //             url:`${common.baseUrl}Login/AgentDetails/1`,
    //             headers:{
    //                 Authorization:`Token ${localStorage.getItem("token")}`
    //             },
    //             data:editable
    //         })
    //         if(result.status===200)
    //         {
    //             alert("Your informations are updated successfully.")
    //             handleClose();
    //         }
    //         else{
    //             alert("Something went wrong")
    //         }
    //     }
    //     else{
    //         alert("Please give proper mobile Number")
    //     }

    // }


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
                    alert("Password Updated successfully.")
                }
                else{
                    alert("Something went wrong while updating password")
                }
            }
            else{
                alert("Password length has to be more than 8 characters.")
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
           <SuTop title="Settings"/>

           <div className="profileContainer">
               <div className="head">
                    <Avatar src={userData.name} 
                                alt={userData.name}
                                sx={{ width: 100, height: 100,bgcolor:"#8a28d9"  }}
                                />
                    <div>
                        <h1 style={{textTransform:"capitalize"}}>{userData.username}</h1> 
                    </div>
                </div>
                <Divider/>
                <div className="body">
                    <p><span>Superuser id</span> {userData.head_admin_id}</p>
                    {/* <p><span>company name</span> {userData.company_name}</p>
                    <p><span>country</span> {userData.country}</p> */}
                    <p><span>mobile no</span> {userData.mobile_no}</p>
                    {/* <p><span>Address</span> {userData.address}</p> */}
                    <div>
                        <button
                        className="std-button-2"
                        onClick={handleClickOpen2}
                        >
                            Reset Password
                        </button>
                    </div>
                </div>
           </div>
           <StyledEngineProvider injectFirst>
            <Dialog onClose={handleClose2} open={open2}>
            <p style={{margin:"1rem 1rem 0 1rem",fontSize:"1.5rem",fontWeight:"bold",fontFamily:"Montserrat"}}>Reset Password</p>
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
                >Submit</button>
            </div>
            </Dialog>
           </StyledEngineProvider>
        </div>
    )
}

export default Settings
