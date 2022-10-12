import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { success, error, warning } from '../../component/Toast'
import { Divider, Dialog, DialogActions, DialogContent } from '@mui/material'
import dateFormat from 'dateformat'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
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

const SaAgent = () => {
    const { agent_id } = useParams()
    const [allClients, setAllClients] = useState([])
    const [agentList, setAgentList] = useState({})
    const [open, setOpen] = useState(false);
    // const [filetClient, SetFilterCliet] = useState(false);
    const [editable, setEditable] = useState({})
    const [editable2, setEditable2] = useState({})
    const [ClientInfoModel, setClientInfoModel] = useState(false)
    const [ClientInfo, setClientInfo] = useState()

    const history = useHistory()


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const [open2, setOpen2] = useState(false);

    const handleClickOpen2 = (client) => {
        setEditable2(client)
        setOpen2(true);
    };

    const handleClose2 = () => {
        setOpen2(false);
    };

    useEffect(async () => {

        try {
            const response = await axios({
                method: "get",
                url: `${common.baseUrl}Login/AgentDetails/${agent_id}`,
                headers: {
                    Authorization: `Token ${localStorage.getItem("token")}`
                }
            })
            setAgentList({ ...response.data, ...response.data.user })
            setEditable({ country: response.data.country, address: response.data.address, mobile_no: response.data.mobile_no, company: response.data.company_name, email: response.data.email })



            const result = await axios({
                method: "post",
                url: `${common.baseUrl}Login/AllClients/`,
                headers: {
                    Authorization: `Token ${localStorage.getItem("token")}`
                },
                data: {
                    agent_id: parseInt(agent_id)
                }
            })
            if (result.status === 200) {
                setAllClients(result.data)
            } else {
                error("Something went wrong while fetching information!")
            }
        } catch (err) {
            error("Something went wrong while fetching information!")
        }

    }, [])
    useEffect(() => {
        const filterClients = allClients.filter(item => item.client_id === agentList.client_id)
        setAllClients(filterClients)
    }, [])
    const deleteParticularCustomer = async (id) => {

        const confirmation = window.prompt("Type " + id + " to delete this particular user");
        if (parseInt(confirmation) === id) {
            const result = await axios({
                method: "delete",
                url: `${common.baseUrl}Login/ClientDetails/${id}`,
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
            url: `${common.baseUrl}Login/AgentDetails/${agent_id}`,
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

    const deleteAgent = async () => {
        const verification = window.prompt(`Type ${agentList.agent_id} to delete ${agentList.username} agent`)
        if (verification == agentList.agent_id) {
            const response = await axios({
                method: "delete",
                url: `${common.baseUrl}Login/AgentDetails/${agent_id}`,
                headers: {
                    Authorization: `Token ${localStorage.getItem("token")}`
                }
            })
            if (response.status === 204) {
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

    const handleCustomerEdit = async () => {
        const result = await axios({
            method: "post",
            url: `${common.baseUrl}Login/ClientDetails/${editable2.id}`,
            headers: {
                Authorization: `Token ${localStorage.getItem("token")}`
            },
            data: {
                name: editable2.name,
                address: editable2.address,
                mobile_no: editable2.mobile_no,
                consignee_address: editable2.consignee_address,
                country: editable2.country,
                email: editable2.email
            }
        })
        if (result.status === 200) {
            window.location.reload()
        }
        else {
            alert("Something went wrong.")
        }
    }
    const handleClinetInfo = (data) => {
        setClientInfo(data)
        setClientInfoModel(true)
    }
    return (
        <div>
            {
                ClientInfoModel &&
                <div className='clientInfo' onClick={(e) => { e.stopPropagation(); setClientInfoModel(false) }}>
                    <div className='clientInfoBody' onClick={(e) => e.stopPropagation()}>
                        <h2 className='titleINfo'>Information</h2>
                        <div className='clientInfoBody__content'>
                            <div className="agentCard">

                            
                                <Grid
                                    spacing={2}
                                    direction="column"
                                    container>


                                    <Grid item style={{ borderBottom: 'solid black 1px', display: 'flex', gap: 10, flexDirection: 'column' }}>
                                        <div><b>Name</b></div>
                                        <div>{ClientInfo?.name}</div>
                                    </Grid>


                                    <Grid item style={{ borderBottom: 'solid black 1px', display: 'flex', gap: 10, flexDirection: 'column' }}>
                                        <div><b>Consignee Address</b></div>
                                        <div>{ClientInfo?.consignee_address}</div>
                                    </Grid>

                                    <Grid item style={{ borderBottom: 'solid black 1px', display: 'flex', gap: 10, flexDirection: 'column' }}>
                                        <div><b>Mobile Number</b></div>
                                        <div>{ClientInfo.mobile_no}</div>
                                    </Grid>

                                    <Grid item style={{ borderBottom: 'solid black 1px', display: 'flex', gap: 10, flexDirection: 'column' }}>
                                        <div><b>Email Address</b></div>
                                        <div>{ClientInfo?.email}</div>
                                    </Grid>

                                    <Grid item style={{ borderBottom: 'solid black 1px', display: 'flex', gap: 10, flexDirection: 'column' }}>
                                        <div><b>Country</b></div>
                                        <div>{ClientInfo?.country}</div>
                                    </Grid>

                                </Grid>
                                <br />
                            </div>
                        </div>
                    </div>
                </div>
            }
            <div className="suSectionHeading">
                <h2>{agentList.username}</h2>
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
                            onClick={deleteAgent}>
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
                            <div><b>Company</b></div>
                            <div>{agentList.company_name}</div>
                        </Grid>


                        <Grid item style={{ borderBottom: 'solid black 1px', display: 'flex', gap: 10, flexDirection: 'column' }}>
                            <div><b>Agent Name</b></div>
                            <div>{agentList.name}</div>
                        </Grid>


                        <Grid item style={{ borderBottom: 'solid black 1px', display: 'flex', gap: 10, flexDirection: 'column' }}>
                            <div><b>Address</b></div>
                            <div>{agentList.address}</div>
                        </Grid>

                        <Grid item style={{ borderBottom: 'solid black 1px', display: 'flex', gap: 10, flexDirection: 'column' }}>
                            <div><b>Mobile Number</b></div>
                            <div>{agentList.mobile_no}</div>
                        </Grid>

                        <Grid item style={{ borderBottom: 'solid black 1px', display: 'flex', gap: 10, flexDirection: 'column' }}>
                            <div><b>Email Address</b></div>
                            <div>{agentList.email}</div>
                        </Grid>

                        <Grid item style={{ borderBottom: 'solid black 1px', display: 'flex', gap: 10, flexDirection: 'column' }}>
                            <div><b>Username</b></div>
                            <div>{agentList.username}</div>
                        </Grid>

                    </Grid>
                    <br />
                </div>
                <div className="managementActions2">
                    <h2>Customers</h2>
                    <CustomerAddSuper agentId={agentList.agent_id} title="Customers" customer />
                </div>

                <div className="client">
                    <b>Name</b>
                    <b>Country</b>
                    <b>Consignee Addresss</b>
                    <b>Mobile Number</b>
                    <b>Email</b>
                </div>
                {allClients.length === 0 ? <h1 style={{ color: "#eee" }}>No clients</h1> :
                    allClients.map((item, key) => {

                        return (
                            <div className="client" key={key}>
                                <p onClick={() => handleClinetInfo(item)} className='InfoClient'><InfoOutlinedIcon /></p>
                                <p>{item.name}</p>
                                <p>{item.country}</p>
                                {item?.consignee_address?.length < 20 ? <p className='consinee__address'>{item?.consignee_address}</p> : <p className='consinee__address'>{`${item?.consignee_address?.slice(0, 20)}...`}</p>}

                                <p>{item.mobile_no}</p>
                                <p>{item?.email}</p>
                                <div className="actions">
                                    <button
                                        onClick={() => handleClickOpen2(item)}
                                    >
                                        <EditIcon />
                                    </button>
                                    <AddWallet client_id={item.id} />
                                    <DeleteOutlineOutlined
                                        style={{ marginTop: '5px', marginRight: '5px' }}
                                        onClick={() => deleteParticularCustomer(item.id)}
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
                        <h2 style={{ margin: "1rem 1rem 0rem 1rem" }}><span style={{ color: "#8a28d9" }}>Edit Agent</span></h2>

                        <DialogContent>
                            {/* <div className="editDialogDivSingle">
                                <p>Country</p>
                                <input
                                    type="text"
                                    className="std-input2"
                                    placeholder="Country"
                                    value={editable.country}
                                    onChange={e => setEditable({ ...editable, country: e.target.value })}
                                />
                            </div> */}
                            <div className="editDialogDivSingle">
                                <p>Consignee Addresss</p>
                                <input
                                    type="text"
                                    className="std-input2"
                                    placeholder="Address"
                                    value={editable.address}
                                    onChange={e => setEditable({ ...editable, address: e.target.value })}
                                />
                            </div>
                            <div className="editDialogDivSingle">
                                <p>Company</p>
                                <input
                                    type="text"
                                    className="std-input2"
                                    placeholder="Company"
                                    value={editable.company}
                                    onChange={e => setEditable({ ...editable, company: e.target.value })}

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
                            <button className="std-button-sun" style={{ border: "2px solid #8a28d9" }} onClick={handleEditAgent} autoFocus>
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
                        <h2 style={{ margin: "1rem 1rem 0rem 1rem" }}><span style={{ color: "#8a28d9" }}>Edit Customer</span></h2>

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
                                <p>Consignee Address</p>
                                <input
                                    type="text"
                                    className="std-input2"
                                    placeholder="Consignee Address"
                                    value={editable2.consignee_address}
                                    onChange={e => setEditable2({ ...editable2, consignee_address: e.target.value })}

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

                            {/* <div className="editDialogDivSingle"    >
                                <p>Email</p>
                                <input
                                    type="text"
                                    className="std-input2"
                                    placeholder="Email"
                                    value={editable2.email}
                                    onChange={e => setEditable2({ ...editable2, email: e.target.value })}

                                />
                            </div> */}
                        </DialogContent>
                        <DialogActions style={{ display: "flex", justifyContent: "flex-start", padding: "0 1rem 1rem 1rem" }}>
                            <button className="std-button-sun" style={{ border: "2px solid #8a28d9" }} onClick={handleCustomerEdit} autoFocus>
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

export default SaAgent
