import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { success, error, warning } from '../../component/Toast'
import { Divider, Dialog, DialogActions, DialogContent } from '@mui/material'
import AddAgentSuper from "../../component/Dialogs/AddAgentSuper"
import dateFormat from 'dateformat'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import EditIcon from '@mui/icons-material/Edit'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import common from '../../baseUrl'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CustomerAddSuper from "../../component/Dialogs/CustomerAddSuper"
import StyledEngineProvider from "@mui/material/StyledEngineProvider";
import AddWallet from "../../component/Dialogs/AddWallet"
import currency from 'currency.js'
import { Grid } from '@material-ui/core'
import { DeleteOutlineOutlined } from '@mui/icons-material'
import { DropDownList } from '@progress/kendo-react-dropdowns'
const style = {
    selectAdmin: {
        border: "1px solid #8a28d9",
        display: "flex",
        justifyContent: "space-between",
        with: "100%",
        padding: "5px",
        borderRadius: "10px"

    },
    select: {
        flex: "1"
    }
}
const SaAdmins = () => {
    const { agent_id } = useParams()
    const [allAgents, setallAgents] = useState([])
    const [FilterAgent, SetFilterAgent] = useState([])
    const [AdminList, setAdminList] = useState({})
    const [AdminDetails, setAdminDetails] = useState({})
    const [open, setOpen] = useState(false);
    const [AgentId, setAgentId] = useState();
    const [allAdmins, setAllAdmins] = useState();
    const [admin, setAdmin] = useState();
    const [ShowAdminMmodel, setShowAdminMmodel] = useState(false);
    const [editable, setEditable] = useState({})
    const [editable2, setEditable2] = useState({})

    const history = useHistory()


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setShowAdminMmodel(false)
    };
    const [open2, setOpen2] = useState(false);

    const handleClickOpen2 = (Agent) => {
        setEditable2(Agent)
        setOpen2(true);
        setAgentId(Agent.agent_id)
    };

    const handleClose2 = () => {
        setOpen2(false);

    };
    useEffect(async () => {

        const url2 = 'Login/AllHeadAdmin/'
        const allAdminsList = await axios({
            method: "get",
            url: `${common.baseUrl}${url2}`
        })
        setAllAdmins(allAdminsList.data);


    }, [])
    useEffect(async () => {

        try {
            const response = await axios({
                method: "get",
                url: `${common.baseUrl}Login/HeadAdminDetails/${agent_id}`,
                headers: {
                    Authorization: `Token ${localStorage.getItem("token")}`
                }
            })

            setAdminList({ ...response.data, ...response.data.user })
            setAdminDetails(response.data)

            setEditable({ country: response.data.country, address: response.data.address, mobile_no: response.data.mobile_no, company: response.data.company_name, email: response.data?.email })


            const result = await axios({
                method: "get",
                url: `${common.baseUrl}Login/AllAgents/`,
                headers: {
                    Authorization: `Token ${localStorage.getItem("token")}`
                },
                data: {
                    agent_id: agent_id
                }
            })

            if (result.status === 200) {
                setallAgents(result.data)

            } else {
                error("Something went wrong while fetching information!")
            }
        } catch (err) {
            error("Something went wrong while fetching information!")
        }

    }, [])
    
    useEffect(() => {
        const filterAgent = allAgents.filter(item => item.head_admin === AdminList.head_admin_id)
        SetFilterAgent(filterAgent)
    }, [allAgents])
    const deleteParticularCustomer = async (id) => {



        const confirmation = window.prompt("Type " + id + " to delete this particular user");
        if (parseInt(confirmation) === id) {

            const result = await axios({
                method: "delete",
                url: `${common.baseUrl}Login/AgentDetails/${id}`,
                headers: {
                    Authorization: `Token ${localStorage.getItem("token")}`
                },
            })
            if (result.status === 204) {
                window.location.reload()
            } else {
                alert("Something went wrong.")
            }
        }
        else {
            console.log("Plan dropped!")
        }
    }


    // An API error 404
    const handleEditAgent = async () => {
        const response = await axios({
            method: "post",
            url: `${common.baseUrl}Login/AgentDetails/${AgentId}`,
            headers: {
                Authorization: `Token ${localStorage.getItem("token")}`
            },
            data: {
                mobile_no: editable2.mobile_no,
                company_name: editable2.company,
                address: editable2.address,
                country: editable2.country,
                email: editable2.email
            }
        })
        if (response.status === 200) {
            success("Details updated successfully")
            handleClose()
            window.location.reload()
        }
        else {
            error("Something went wrong while updating agent information")
        }
    }
    const handleEditHeadAdmin = async () => {
        const response = await axios({
            method: "post",
            url: `${common.baseUrl}Login/HeadAdminDetails/${agent_id}`,
            headers: {
                Authorization: `Token ${localStorage.getItem("token")}`
            },
            data: {
                mobile_no: editable.mobile_no,
                company_name: editable.company,
                address: editable.address,
                country: editable.country,
                email: editable.email
            }
        })
        if (response.status === 200) {
            success("Details updated successfully")
            handleClose()
            window.location.reload()
        }
        else {
            error("Something went wrong while updating agent information")
        }
    }
    const deleteAdmin = async () => {
        if (admin.length>0){
            const response = await axios({
                method: "post",
                url: `${common.baseUrl}Login/DeleteHeadAdmin/${AdminList.head_admin_id}`,
                headers: {
                    Authorization: `Token ${localStorage.getItem("token")}`
                },
                data: {
                    head_admin_id: admin
                }
            })
            if (response.status === 200) {
                success("HeadAdmin Deleted successfully")
                history.replace("/sa/agentsAdmins")
            }
            else {
                error("Something went wrong while deleting this agent")
            }

        }
        else {
            warning("Your entry doesnt match with agent identification")
        }
    }


    return (
        <div>

            {
                ShowAdminMmodel && <StyledEngineProvider injectFirst>
                    <Dialog
                        open={ShowAdminMmodel}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <h2 style={{ margin: "1rem 1rem 0rem 1rem" }}><span style={{ color: "#8a28d9" }}>Select Admin</span></h2>
                        <p style={{
                            color: "red",
                            fontSize: "10px",
                            padding: "2px 10px"

                        }}>This is for transfering all Agents of this Admin to selected Admin</p>

                        <DialogContent
                            style={{ height: "10rem" }}

                        >

                       

                            <div style={style.selectAdmin}>
                                <select name="" id="" style={style.select}
                                    onChange={(e) => setAdmin(e.target.value)}
                                >
                                    <option value="">Select admin...</option>
                                    {
                                        allAdmins?.map(item => {
                                            return (
                                                <option key={item.head_admin_id} value={item.head_admin_id}>{ item.head_admin_id !== AdminDetails.head_admin_id&&item?.name}</option>
                                            )
                                        })
                                    }

                                </select>
                                <KeyboardArrowDownIcon style={{ color: "#8a28d9" }} />
                            </div>
                        </DialogContent>
                        <DialogActions style={{ display: "flex", justifyContent: "flex-start", padding: "0 1rem 1rem 1rem" }}>
                            <button className="std-button-sun" style={{ border: "2px solid #8a28d9" }} onClick={deleteAdmin} autoFocus>
                                Submit
                            </button>
                            <button className="std-button-sun" style={{ border: "2px solid #8a28d9", background: "transparent", color: "#8a28d9" }} onClick={handleClose}>Cancel</button>
                        </DialogActions>
                    </Dialog>
                </StyledEngineProvider>
            }
            <div className="suSectionHeading">
                <h2>{AdminList.username}</h2>
            </div>
            <Divider />
            <div className="allClients">
                <div className="head">
                    <p
                        style={{ cursor: "pointer", display: "flex", alignItems: "center" }}
                        onClick={() => history.goBack()}>
                        <ArrowBackIcon style={{ color: "grey" }} />Back
                    </p>
                    <div className="controls1">
                        <button
                            onClick={handleClickOpen}
                            className="std-button-sun"><EditIcon /></button>
                        <button
                            className="std-button-2"
                            style={{ color: "Red", borderColor: "red" }}
                            onClick={() => setShowAdminMmodel(true)}>
                            <DeleteOutlineIcon />
                        </button>
                    </div>
                </div>

                <div className="agentCard">

                    <h2 style={{ marginBottom: "2rem" }}>Information</h2>
                    <Grid
                        spacing={2}
                        direction="column"
                        container>

                        <Grid item style={{ borderBottom: 'solid black 1px', display: 'flex', gap: 10, flexDirection: 'column' }}>
                            <div><b>Admin Name</b></div>
                            <div>{AdminList.name}</div>
                        </Grid>


                        <Grid item style={{ borderBottom: 'solid black 1px', display: 'flex', gap: 10, flexDirection: 'column' }}>
                            <div><b>Address</b></div>
                            <div>{AdminList.address}</div>
                        </Grid>

                        <Grid item style={{ borderBottom: 'solid black 1px', display: 'flex', gap: 10, flexDirection: 'column' }}>
                            <div><b>Mobile Number</b></div>
                            <div>{AdminList.mobile_no}</div>
                        </Grid>

                        <Grid item style={{ borderBottom: 'solid black 1px', display: 'flex', gap: 10, flexDirection: 'column' }}>
                            <div><b>Email Address</b></div>
                            <div>{AdminList?.email}</div>
                        </Grid>

                        <Grid item style={{ borderBottom: 'solid black 1px', display: 'flex', gap: 10, flexDirection: 'column' }}>
                            <div><b>Username</b></div>
                            <div>{AdminList.username}</div>
                        </Grid>

                    </Grid>
                    <br />
                </div>
                <div className="managementActions2">
                    <h2>Agents</h2>
                    {/* <CustomerAddSuper agentId={AdminList.head_admin_id} title = "Agents" Agents /> */}
                    <AddAgentSuper title='Agents' Agent={true} AdminDetails={AdminDetails} InnerAdmin />
                </div>

                <div className="client">
                    <b>Name</b>
                    <b>Country</b>
                    <b>Addresss</b>
                    <b>Mobile Number</b>
                    <b>Total Receivable ($)</b>
                </div>
                {allAgents.length === 0 ? <h1 style={{ color: "#eee" }}>No Agents</h1> :
                    FilterAgent?.map((item, key) => {

                        return (
                            <div className="client" key={key}>
                                <p>{item.name}</p>
                                <p>{item.country}</p>
                                {item?.address?.length<20?<p>{item?.address}</p>:<p>{`${item?.address?.slice(0, 20)}...`}</p>}
                                <p>{item.mobile_no}</p>
                                <p>{currency(item.wallet?.amount, { precision: 0 }).format()}</p>
                                <div className="actions">
                                    <button
                                        onClick={() => handleClickOpen2(item)}
                                    >
                                        <EditIcon />
                                    </button>
                                    <AddWallet client_id={item.id} />
                                    <DeleteOutlineOutlined
                                        style={{ marginTop: '5px', marginRight: '5px' }}
                                        onClick={() => deleteParticularCustomer(item.agent_id)}
                                    />
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            <div>

                <StyledEngineProvider injectFirst>
                    <Dialog
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <h2 style={{ margin: "1rem 1rem 0rem 1rem" }}><span style={{ color: "#8a28d9" }}>Edit Admin</span></h2>

                        <DialogContent>
                           
                            <div className="editDialogDivSingle">
                                <p>Address</p>
                                <input
                                    type="text"
                                    className="std-input2"
                                    placeholder="Address"
                                    value={editable.address}
                                    onChange={e => setEditable({ ...editable, address: e.target.value })}
                                />
                            </div>
                            <div className="editDialogDivSingle"    >
                                <p>Mobile Number</p>
                                <input
                                    type="number"
                                    className="std-input2"
                                    placeholder="Mobile Number"
                                    value={editable.mobile_no}
                                    onChange={e => setEditable({ ...editable, mobile_no: e.target.value })}

                                />
                            </div>
                            <div className="editDialogDivSingle"    >
                                <p>Email</p>
                                <input
                                    type="text"
                                    className="std-input2"
                                    placeholder="Email"
                                    value={editable.email}
                                    onChange={e => setEditable({ ...editable, email: e.target.value })}

                                />
                            </div>
                        </DialogContent>
                        <DialogActions style={{ display: "flex", justifyContent: "flex-start", padding: "0 1rem 1rem 1rem" }}>
                            <button className="std-button-sun" style={{ border: "2px solid #8a28d9" }} onClick={handleEditHeadAdmin} autoFocus>
                                Submit
                            </button>
                            <button className="std-button-sun" style={{ border: "2px solid #8a28d9", background: "transparent", color: "#8a28d9" }} onClick={handleClose}>Cancel</button>
                        </DialogActions>
                    </Dialog>
                    {/* customer edit box */}
                    <Dialog
                        open={open2}
                        onClose={handleClose2}
                        aria-labelledby="alert-dialog-title2"
                        aria-describedby="alert-dialog-description2"
                    >
                        <h2 style={{ margin: "1rem 1rem 0rem 1rem" }}><span style={{ color: "#8a28d9" }}>Edit Agents</span></h2>

                        <DialogContent>
                            <div className="editDialogDivSingle">
                                <p>Name</p>

                                <input
                                    type="text"
                                    className="std-input2"
                                    placeholder="Name"
                                    value={editable2.name}
                                    onChange={e => setEditable2({ ...editable2, name: e.target.value })}
                                />
                            </div>
                            <div className="editDialogDivSingle">
                                <p>Email</p>

                                <input
                                    type="text"
                                    className="std-input2"
                                    placeholder="Email"
                                    value={editable2.email}
                                    onChange={e => setEditable2({ ...editable2, email: e.target.value })}
                                />
                            </div>
                            <div className="editDialogDivSingle">
                                <p>Country</p>
                                <input
                                    type="text"
                                    className="std-input2"
                                    placeholder="Country"
                                    value={editable2.country}
                                    onChange={e => setEditable2({ ...editable2, country: e.target.value })}

                                />
                            </div>
                            {/* >{item.name}</p>
                                 <p>{item.country}</p>
                                 <p>{item.consignee_address}</p>
                                 <p>{item.mobile_no}</  */}
                            <div className="editDialogDivSingle">
                                <p>Address</p>
                                <input
                                    type="text"
                                    className="std-input2"
                                    placeholder="Consignee Address"
                                    value={editable2.address}
                                    onChange={e => setEditable2({ ...editable2, address: e.target.value })}

                                />
                            </div>
                            <div className="editDialogDivSingle"    >
                                <p>Mobile Number</p>
                                <input
                                    type="text"
                                    className="std-input2"
                                    placeholder="Mobile Number"
                                    value={editable2.mobile_no}
                                    onChange={e => setEditable2({ ...editable2, mobile_no: e.target.value })}

                                />
                            </div>

                            
                        </DialogContent>
                        <DialogActions style={{ display: "flex", justifyContent: "flex-start", padding: "0 1rem 1rem 1rem" }}>
                            <button className="std-button-sun" style={{ border: "2px solid #8a28d9" }} onClick={handleEditAgent} autoFocus>
                                Submit
                            </button>
                            <button className="std-button-sun" style={{ border: "2px solid #8a28d9", background: "transparent", color: "#8a28d9" }} onClick={handleClose2}>Cancel</button>
                        </DialogActions>
                    </Dialog>
                </StyledEngineProvider>
            </div>
        </div>
    )
}

export default SaAdmins
