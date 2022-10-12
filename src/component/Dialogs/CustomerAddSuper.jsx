import React, { useState } from 'react';
import common from "../../baseUrl"
import Dialog from '@mui/material/Dialog';
import axios from "axios"
import DialogTitle from '@mui/material/DialogTitle';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import { error, success, warning } from '../Toast';
import StyledEngineProvider from "@mui/material/StyledEngineProvider";


export default function AlertDialog({ agentId, title, Agents, customer }) {
  const [open, setOpen] = React.useState(false);
  // console.log(agentId);
  // console.log(Agents, customer);
  // /Login/ClientRegister/
  // name', 'mobile_no', 'address', 'country', 'consignee_address'
  const [newCustomer, setNewCustomer] = useState({
    name: "", mobile_no: "", address: "", country: "", consignee_address: "", username: "", email: ""
  })

  const addNewCustomer = async () => {

    // /Login/ClientRegister/ (json has same detils as that on agent side, with additional field of agent_id)
    try {

      if (Agents) {
        // console.log("adding agents");
        if (newCustomer.name.length > 1) {
          if (newCustomer.email.length > 11) {
            const result = await axios({
              method: "post",
              url: `${common.baseUrl}Login/AgentRegister/`,
              headers: {
                Authorization: `Token ${localStorage.getItem("token")}`
              },
              data: {
                ...newCustomer, agent_id: agentId
              }
            })
            if (result.status === 200) {
              window.location.reload()
              // success("Your information is updated successfully.")
              // handleClose();
            }
            else {
              error(`Can't add customer. Try again`)
            }
          }
          else {
            warning("Please enter Email")
          }
        }
        else {
          warning("Please enter a name")
        }
      }



      if (newCustomer.name.length > 1) {
        if (newCustomer.email.length > 11) {
          const result = await axios({
            method: "post",
            url: `${common.baseUrl}Login/ClientRegister/`,
            headers: {
              Authorization: `Token ${localStorage.getItem("token")}`
            },
            data: {
              ...newCustomer, agent_id: agentId
            }
          })
          // console.log(result)
          if (result.status === 200) {
            window.location.reload()
            // success("Your information is updated successfully.")
            // handleClose();
          }
          else {
            error(`Can't add customer. Try again`)
          }
        }
        else {
          warning("Please enter Email")
        }
      }
      else {
        warning("Please enter a name")
      }

    } catch (error) {
      // console.log(error)
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
      <AddCircleRoundedIcon onClick={handleClickOpen} style={{ color: "#8a28d9", cursor: "pointer" }} />
      <StyledEngineProvider injectFirst>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <h2 style={{ margin: "1rem 1rem 0rem 1rem" }}><span style={{ color: "#8a28d9" }}>Add {title}</span></h2>

          <div className="dialogEditBoxContainer">
            <div>
            <span>Name <span style={{ color: "red" }}>*</span></span>
              <input type="text"
                className="std-input2"
                value={newCustomer.name}
                onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })}
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
            {
              Agents && <div>
                <span>UserName </span>
                <input type="text"
                  className="std-input2"
                  value={newCustomer.username}
                  onChange={(e) => setNewCustomer({ ...newCustomer, username: e.target.value })}
                />
              </div>
            }
            <div>
              <span>Mobile Number</span>
              <input type="text"
                className="std-input2"
                value={newCustomer.mobile_no}
                onChange={(e) => setNewCustomer({ ...newCustomer, mobile_no: e.target.value })}
              />
            </div>
            <div>
              <span>Consignee Address</span>
              <input type="text"
                className="std-input2"
                value={newCustomer.consignee_address}
                onChange={(e) => setNewCustomer({ ...newCustomer, consignee_address: e.target.value })}
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
            <div>
              <span>Country</span>
              <input type="text"
                className="std-input2"
                value={newCustomer.country}
                onChange={(e) => setNewCustomer({ ...newCustomer, country: e.target.value })} />
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
