import React, { useEffect, useState } from 'react';
import common from "../../baseUrl"
import Dialog from '@mui/material/Dialog';
import axios from "axios"
import { withRouter } from 'react-router-dom';
import { Grid, List, ListItem, ListItemText, ListSubheader, Typography, IconButton, Chip, Stack, Paper, ListItemSecondaryAction } from '@mui/material'
import DialogTitle from '@mui/material/DialogTitle';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import { error, success, warning } from '../Toast';
import StyledEngineProvider from "@mui/material/StyledEngineProvider";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

function AlertDialog(props) {
  // console.log(props.match.params.agent_id);
  // console.log("headDetails", props.AdminDetails);
  const HeadId = props.AdminDetails?.head_admin_id
  const [open, setOpen] = React.useState(false);
  const [allSuperadmin, setAllsuperAdmin] = useState()
  const [HeadAdminList, setHeadAdminList] = useState()
  const [HeadAdmin, setHeadAdmin] = useState()
  // console.log(HeadAdminList);
  // /Login/ClientRegister/
  // name', 'mobile_no', 'address', 'country', 'consignee_address'
  let Isu = localStorage.getItem('superuser')
  const LoginAdmin =  JSON.parse(localStorage.getItem('data'))
  // console.log("loginadmin", LoginAdmin);
  const [newCustomer, setNewCustomer] = useState({
    name: "",
    username: "",
    mobile_no: "",
    address: "",
    company_name: "",
    country: "",
    head_admin: Isu?LoginAdmin?.user?.id:parseInt(props.match.params.agent_id),
    email: ""
  })

  const addNewAgent = async () => {
   
    try {
      // /Login/ClientRegister/ (json has same detils as that on agent side, with additional field of agent_id)
      if (newCustomer.name.length > 1) {

        if (props.Agent === true) {
          const result = await axios({
            method: "post",
            url: `${common.baseUrl}Login/AgentRegister/`,
            headers: {
              Authorization: `Token ${localStorage.getItem("token")}`
            },
            data: newCustomer
          })
          // console.log("result",result);
          if (result.status === 200) {
            window.location.reload()
            // success("Your information is updated successfully.")
            // handleClose();
          }
          else {
            // console.log(result)
            error(`Can't add customer. Try again`)
          }
          // console.log(result);
        }
        else {

          const result = await axios({
            method: "post",
            url: `${common.baseUrl}Login/HeadAdminRegister/`,
            headers: {
              Authorization: `Token ${localStorage.getItem("token")}`
            },
            data: newCustomer
          })

          if (result.status === 200) {
            window.location.reload()
            // success("Your information is updated successfully.")
            // handleClose();
          }
        }



      }
      else {
        warning("Please enter a name")
      }
    } catch (error) {
      // console.log(error.stack)
      // console.warn(error.name)
      // console.log(error.message)
    }

    // all headAdmin list 








  }
  useEffect(async () => {

    const url2 = 'Login/AllHeadAdmin/'
    const allAdminsList = await axios({
      method: "get",
      url: `${common.baseUrl}${url2}`
    })
    setHeadAdminList(allAdminsList.data);


  }, [])
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    const getAllSuperAdmin = async () => {
      let url = "Login/AllSuperHeadAdmin/"
      const getallSuperAdmin = await axios({
        url: `http://3.110.249.10:8000/Login/AllSuperHeadAdmin/`,
        method: 'get'
      })
      setAllsuperAdmin(getallSuperAdmin.data)

    }
    getAllSuperAdmin()
  }, [])
  // console.log(allSuperadmin);
  return (
    <div>
      <AddCircleRoundedIcon onClick={handleClickOpen} style={{ color: "#8a28d9", cursor: "pointer" }} />
      <StyledEngineProvider injectFirst>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <h2 style={{ margin: "1rem 1rem 0rem 1rem" }}><span style={{ color: "#8a28d9" }}>Add {props.title ? props.title : "Agents"}</span></h2>

          <div className="dialogEditBoxContainer">
            {
              props.Agent && !props.InnerAdmin &&
              <div>
                <span>Admin <span style={{ color: "red" }}>*</span></span>

                <Grid item >
                  <select
                    style={{ width: "185px" }}
                    className="std-input2"
                    name="shipping_carrier"
                    onChange={(e) => setNewCustomer({ ...newCustomer, head_admin: e.target.value })}

                  >
                    <option hidden> Select Admin </option>
                    {HeadAdminList?.map((item, key) => {
                      return (
                        <option

                          key={key}
                          style={{ padding: "0.5rem" }}
                          value={item.head_admin_id}>
                          {item.name}

                        </option>
                      )
                    })}
                  </select>
                </Grid>

              </div>
            }
            {
              props.InnerAdmin && <div>
                <span>Admin <span style={{ color: "red" }}>*</span></span>
                <input type="text"
                  className="std-input2"
                  defaultValue={Isu?LoginAdmin?.name:props.AdminDetails?.name}

                />
              </div>
            }
            <div>
              <span>Name <span style={{ color: "red" }}>*</span></span>
              <input type="text"
                className="std-input2"
                value={newCustomer.name}
                onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })}
              />
            </div>
            <div>
              <span>Username <span style={{ color: "red" }}>*</span></span>
              <input type="text"
                className="std-input2"
                value={newCustomer.username}
                onChange={(e) => setNewCustomer({ ...newCustomer, username: e.target.value })}
              />
            </div>
            <div>
            <span>Email <span style={{ color: "red" }}>*</span></span>
              <input type="text"
                className="std-input2"
                value={newCustomer.email}
                required
                onChange={(e) => setNewCustomer({ ...newCustomer, email: e.target.value })}
              />
            </div>
            {/* <div>
                    <span>Password</span>
                    <div>
                        <input type="password" 
                             className="std-input-password"
                              // value={newCustomer.mobile_no}
                              // onChange={(e)=>setNewCustomer({...newCustomer,mobile_no:e.target.value})}
                        />
                        <button><VisibilityOffIcon/></button>
                    </div>
                </div> */}
            <div>
              <span>Mobile Number</span>
              <input type="text"
                className="std-input2"
                value={newCustomer.mobile_no}
                onChange={(e) => setNewCustomer({ ...newCustomer, mobile_no: e.target.value })}
              />
            </div>
            
            <div>
              <span>Address</span>
              <input type="text"
                className="std-input2"
                value={newCustomer.address}
                onChange={(e) => setNewCustomer({ ...newCustomer, address: e.target.value })}
              />
            </div>
            {
              !props.Admin && <div>
                <span>Company</span>
                <input type="text"
                  className="std-input2"
                  value={newCustomer.company}
                  onChange={(e) => setNewCustomer({ ...newCustomer, company: e.target.value })}
                />
              </div>
            }
            <div>
              <span>Country</span>
              <input type="text"
                className="std-input2"
                value={newCustomer.country}
                onChange={(e) => setNewCustomer({ ...newCustomer, country: e.target.value })}
              />
            </div>
            <button
              className="std-button-sun"
              onClick={addNewAgent}
            >Register</button>
          </div>
        </Dialog>
      </StyledEngineProvider>

    </div>

  );
}
export default withRouter(AlertDialog)
