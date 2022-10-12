import { Article, Close, Construction, DragIndicatorOutlined, Edit, FlightLand, FlightTakeoff, Search } from '@mui/icons-material'
import { Grid, List, ListItem, ListItemText, ListSubheader, Typography, IconButton, Chip, Stack, Paper, ListItemSecondaryAction } from '@mui/material'
import axios from 'axios'
import { isBoolean, remove } from 'lodash'
import React, { useCallback, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { useParams } from 'react-router-dom'
import common from '../baseUrl'
import MakeBidDialog from '../component/Dialogs/ShipmentStatus'
import Navbar from '../component/Navbar'
import { error, success } from '../component/Toast'
import bg from '../static/logobg.png'
import SapurchaseModal from './Superadmin/SapurchaseModal'
const Tracker = () => {
    const [det, setDet] = useState({})
    const [showDialog, setShowDialog] = useState(false)
    const [docs, setDocs] = useState([{ name: 'N/A', url: '#' }])
    const [isSU, setIsSU] = useState(false)
    const { trackId } = useParams()
    const [upDocs, setUpDocs] = useState([]);
    const [shipments, setShipments] = useState([]);
    useEffect(() => {
        let isSA = localStorage.getItem("SuperHeadAdmin")
        let iSSuper = localStorage.getItem("superuser")
        if (isSA) {
            setIsSU(isSA)
        }
        else if (iSSuper) {

            setIsSU(iSSuper)
        }

    }, [])
    


    const handleUpload = () => {
        let formData = new FormData()
        upDocs.forEach(file => {
            formData.append('file_field', file);
        })
        formData.append('id', trackId);

        // Do something with the files
        axios.put(`${common.baseUrl}Documents/PurchaseDocs/`,
            formData,
            {
                headers: {
                    Authorization: `Token ${localStorage.getItem("token")}`,
                    'content-type': 'multipart/form-data'
                }
            }).then(() => {
                success("Documents uploaded successfully !!")
            }).then(() => {
                window.location.reload()
            })
    }

    const renderDocList = (docs) => {
        const docChips = docs.map((doc, index) => {
            return (
                <Grid key={index} item>
                    <Chip
                        variant="outlined"

                        label={doc.name}
                        onDelete={() => {
                            docs = docs.filter((doc, i) => i !== index)
                            setUpDocs(docs)
                        }} />
                </Grid>
            )
        })

        return (
            <Grid spacing={2} container>

                {docChips}

            </Grid>
        )
    }

    function UploadDocs() {
        let label = 'Drag and Drop';
        const onDrop = useCallback(acceptedFiles => {
            setUpDocs([...upDocs, ...acceptedFiles]);
        }, [])
        const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

        isDragActive ? label = 'Drop Here' : label = 'Upload Documents';

        return (
            <div {...getRootProps()} id="upDoc-area" style={{
                border: 'dashed #8a28d9',
                backgroundColor: 'white',
                minHeight: '200px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                color: '#8a28d9',
                cursor: 'pointer',
                padding: '10px'
            }}>
                <input {...getInputProps()} />
                {upDocs.length > 0 ? renderDocList(upDocs) : label}
            </div>
        )
    }

    document.title = "Track Your Car - MBS"


    // useEffect(async () => {
    //     const res = await axios.get(
    //         `${common.baseUrl}Tracking/TrackingDetails/`,
    //         {
    //             headers: {
    //                 Authorization: `Token ${localStorage.getItem("token")}`
    //             }
    //         }
    //     );

    //     let cars = []
    //     res.data.forEach(data => {
    //         cars.push({ carName: data.funds.cardetails.car_name, chassis: data.funds.chassis, id: data.id })
    //     })
    //     setShipments(cars)
    // }, [])

    useEffect(async () => {
        try {
            const response = await axios({
                method: "get",
                headers: {
                    Authorization: null
                },
                url: `${common.baseUrl}Tracking/TrackingDetails/${trackId}/`,
            })
            setDet(response.data)
        } catch (err) {
            error(err.message)
        }
    }, [])

    useEffect(async () => {
        try {
            const response = await axios({
                method: "post",
                url: `${common.baseUrl}Documents/PurchaseDocs/`,
                data: {
                    id: trackId
                }
            })
            setDocs(response.data)
        } catch (err) {
            error(err.message)
        }
    }, [])

    const deleteDoc = async (doc) => {
        try {
            const response = await axios({
                method: "delete",
                headers: {
                    Authorization: `Token ${localStorage.getItem("token")}`
                },
                url: `${common.baseUrl}Documents/PurchaseDocs/`,
                data: {
                    id: doc.id
                }
            })
            window.location.reload()
        } catch (err) {
            error(err.message)
        }
    }


    return (
        <>
            {
                showDialog && <SapurchaseModal onClose={() => setShowDialog(false)} class='visibilityMOdal' />
            }
            <Navbar />
            <div className="contactContainer" >
                {/* <div className="header">
                    <h1>Tracker</h1>
                    <div>
                    <input type="text"
                        className="std-input2" 
                        value={id}
                        onChange={e=>setId(e.target.value)}
                        placeholder="Enter Your Tracker Id"/>
                    <button 
                    onClick={findTracker}
                    className="std-button-sun">Find</button>
               </div>
                </div> */}

                <div>
                    <div>
                        {/* <div className="markerContainer"> */}
                        {/* <div className="markerFill"
                                style={{ width: det.status === "Documents Dispatched" ? "100%" : det.status === "Vehicle on the Way" ? "85%" : det.status === "Inspection in Progress" ? "65%" : det.status === "Vehicle in the Yard" ? "45%" : "25%" }}
                            ></div>
                            <div className="initiated mark">
                                <p
                                    style={{ fontWeight: "bold", color: "#8a28d9" }}
                                >
                                    Purchased
                                </p>
                            </div>
                            <div className="initiated2 mark">
                                <p
                                    style={{ fontWeight: det.status === "Transportation in Progress" && "bold", color: det.status === "Transportation in Progress" && "#8a28d9" }}
                                >
                                    Transportation in Progress
                                </p>
                            </div>
                            <div className="initiated3 mark">
                                <p
                                    style={{ fontWeight: det.status === "Vehicle in the Yard" && "bold", color: det.status === "Transportation in Progress" && "#8a28d9" }}

                                >
                                    Vehicle in the Yard
                                </p>
                            </div>
                            <div className="initiated4 mark">
                                <p
                                    style={{ fontWeight: det.status === "Inspection in Progress" && "bold", color: det.status === "Transportation in Progress" && "#8a28d9" }}
                                >
                                    Inspection in Progress
                                </p>
                            </div>
                            <div className="initiated5 mark">
                                <p
                                    style={{ fontWeight: det.status === "Vehicle on the Way" && "bold", color: det.status === "Transportation in Progress" && "#8a28d9" }}
                                >
                                    Vehicle on the Way
                                </p>
                            </div>
                            <div className="initiated6 mark">
                                <p
                                    style={{ fontWeight: det.status === "Documents Dispatched" && "bold", color: det.status === "Vehicle in the Yard" && "#8a28d9" }}
                                >
                                    Documents Dispatched
                                </p>
                            </div>
                        </div> */}
                        {/* <div class="markerOtherDetails">
                            <p>Estimated Days Left <span>{det.estimated_days_left}</span></p>
                            <p>Order Placed On <b>{dateFormat(det.created_at, "fullDate")}</b></p>
                            <p>Last Updated On <b>{dateFormat(det.updated_at, "fullDate")}</b></p>
                            <p>Arrived at <b>{det.location}</b></p>
                            <p>Order Id <b>{det.id}</b></p>
                        </div> */}

                        <Typography variant="h3" sx={{ mt: 3, mr: 1, textAlign: 'center', fontFamily: '"Montserrat", sans-serif', fontWeight: 'bold' }}> Shipping Information
                            {isSU ? <IconButton sx={{ color: '#8a28d9', ml: 2, mb: 2 }} onClick={() => { setShowDialog(true) }}> <Edit fontSize="large" /> </IconButton> : ''}
                        </Typography>
                        <Typography variant="h5" sx={{ mt: 2, mb: 2, mr: 1, textAlign: 'center', fontFamily: '"Montserrat", sans-serif', fontWeight: 'bold' }}>
                            Carrier: <b style={{ color: '#8a28d9' }}> {det.shipping_carrier} </b>
                        </Typography>

                        <Grid
                            spacing={2}
                            justifyContent="center"
                            container>

                            <Grid xs={12} sx={{ display: 'flex', justifyContent: 'center' }} item>
                                {/* <List
                                // subheader={<ListSubheader >Departure</ListSubheader>}
                                >
                                    <ListItem >
                                        <ListItemText

                                            primary={<b style={{ color: '#8a28d9' }}> {det.shipping_carrier} </b>}
                                            secondary={<p style={{color: 'black'}}> Carrier </p>}
                                        />
                                    </ListItem>
                                </List> */}


                            </Grid>

                            <Grid xs={3} sx={{ display: 'flex', justifyContent: 'center' }} item>
                                <Paper elevation={2}
                                    sx={{
                                        padding: '1rem',
                                        boxShadow: '1px 1px 20px rgb(0 0 0 / 49%)',
                                        borderRadius: '1rem',
                                        fontSize: '1rem'
                                    }}>
                                    <List
                                        sx={{ width: '300px' }}

                                        subheader={<ListSubheader> <Typography sx={{ color: '#8a28d9', fontFamily: '"Montserrat", sans-serif', fontWeight: 'bold' }} variant="h4"> Departure <FlightTakeoff sx={{ transform: 'translateY(5px)' }} fontSize="large" /> </Typography></ListSubheader>}
                                    >
                                        <ListItem >
                                            <ListItemText
                                                secondary={<p style={{ color: 'black' }}> Vessel </p>}
                                                primary={<b style={{ color: '#8a28d9' }}> {det.dept_vessel} </b>}

                                            />
                                        </ListItem>
                                        <ListItem >
                                            <ListItemText
                                                secondary={<p style={{ color: 'black' }}> Port of loading </p>}
                                                primary={<b style={{ color: '#8a28d9' }}> {det.dept_port} </b>}

                                            />
                                        </ListItem>
                                        <ListItem >
                                            <ListItemText

                                                secondary={<p style={{ color: 'black' }}> ETD (Estimated Time of Departure) </p>}
                                                primary={<b style={{ color: '#8a28d9' }}> {det.dept_et} </b>}
                                            />
                                        </ListItem>
                                    </List>
                                </Paper>
                            </Grid>

                            <Grid xs={3} sx={{ display: 'flex', justifyContent: 'center' }} item>
                                <Paper elevation={2}
                                    sx={{
                                        padding: '1rem',
                                        boxShadow: '1px 1px 20px rgb(0 0 0 / 49%)',
                                        borderRadius: '1rem',
                                        fontSize: '1rem'
                                    }}>
                                    <List
                                        sx={{ width: '300px' }}

                                        subheader={<ListSubheader > <Typography sx={{ color: '#8a28d9', fontFamily: '"Montserrat", sans-serif', fontWeight: 'bold' }} variant="h4"> Arrival <FlightLand sx={{ transform: 'translateY(5px)' }} fontSize="large" /> </Typography> </ListSubheader>}
                                    >
                                        <ListItem >
                                            <ListItemText

                                                secondary={<p style={{ color: 'black' }}> Port of Arrival </p>}
                                                primary={<b style={{ color: '#8a28d9' }}> {det.arrival_port} </b>}
                                            />
                                        </ListItem>
                                        <ListItem >
                                            <ListItemText

                                                primary={<b style={{ color: '#8a28d9' }}> {det.arrival_et} </b>}
                                                secondary={<p style={{ color: 'black' }}> ETA (Estimated Time of Arrival)  </p>}
                                            />
                                        </ListItem>
                                    </List>
                                </Paper>
                            </Grid>

                            <Grid xs={3} sx={{ display: 'flex', justifyContent: 'center' }} item>
                                <Paper elevation={2}
                                    sx={{
                                        padding: '1rem',
                                        maxHeight: '400px',
                                        boxShadow: '1px 1px 20px rgb(0 0 0 / 49%)',
                                        borderRadius: '1rem',
                                        fontSize: '1rem',
                                        overflowY: 'auto'
                                    }}>
                                    <List
                                        sx={{ width: '300px' }}

                                        subheader={<ListSubheader > <Typography sx={{ color: '#8a28d9', fontFamily: '"Montserrat", sans-serif', fontWeight: 'bold' }} variant="h4">Documents <Article sx={{ transform: 'translateY(5px)' }} fontSize="large" /> </Typography> </ListSubheader>}
                                    >
                                        {
                                            docs.map(doc => {
                                                return (
                                                    <ListItem key={doc.url}
                                                        secondaryAction={
                                                            isSU ?
                                                                <IconButton onClick={() => deleteDoc(doc)} edge="end">
                                                                    <Close />
                                                                </IconButton> :
                                                                ''
                                                        }>
                                                        <ListItemText

                                                            primary={<a href={`https://mbs-backend.ga${doc.url}`} target="_blank" style={{ color: '#8a28d9' }}> Download </a>}
                                                            secondary={<p style={{ color: 'black' }}> {doc.name.slice(0, 10)} </p>}
                                                        />
                                                    </ListItem>
                                                )
                                            })
                                        }
                                    </List>
                                </Paper>
                            </Grid>

                            <Grid xs={3} sx={{ display: 'flex', justifyContent: 'center' }} item>
                                <Paper elevation={2}
                                    sx={{
                                        padding: '1rem',
                                        boxShadow: '1px 1px 20px rgb(0 0 0 / 49%)',
                                        borderRadius: '1rem',
                                        fontSize: '1rem'
                                    }}>
                                    <List
                                        sx={{ width: '300px' }}

                                        subheader={<ListSubheader > <Typography sx={{ color: '#8a28d9', fontFamily: '"Montserrat", sans-serif', fontWeight: 'bold' }} variant="h4"> Inspection Status <Construction sx={{ transform: 'translateY(5px)' }} fontSize="large" /> </Typography> </ListSubheader>}
                                    >
                                        <ListItem >
                                            <ListItemText


                                                secondary={<p style={{ color: 'black' }}> Inspection Date </p>}
                                                primary={<b style={{ color: '#8a28d9' }}> {det.inspection_date} </b>}
                                            />
                                        </ListItem>
                                        <ListItem >
                                            <ListItemText

                                                primary={<b style={{ color: '#8a28d9' }}> {det.result1} </b>}
                                                secondary={<p style={{ color: 'black' }}> Result </p>}
                                            />
                                        </ListItem>
                                        <ListItem >
                                            <ListItemText

                                                primary={<b style={{ color: '#8a28d9' }}> {det.re_inspection_date} </b>}
                                                secondary={<p style={{ color: 'black' }}> Re-inspection Date </p>}
                                            />
                                        </ListItem>
                                        <ListItem >
                                            <ListItemText

                                                primary={<b style={{ color: '#8a28d9' }}> {det.result2} </b>}
                                                secondary={<p style={{ color: 'black' }}>    </p>}
                                            />
                                        </ListItem>
                                    </List>
                                </Paper>
                            </Grid>
{/* 
                            <Grid xs={12} sx={{ display: 'flex', justifyContent: 'center' }} item>
                                <List
                                    subheader={<ListSubheader sx={{ backgroundColor: 'transparent' }} > <Typography sx={{ color: '#8a28d9', fontFamily: '"Montserrat", sans-serif', fontWeight: 'bold', mt: 2, bgColor: 'transparent' }} variant="h4"> Enrollment </Typography> </ListSubheader>}
                                >
                                    <ListItem >
                                        <ListItemText
                                            sx={{ textAlign: 'center' }}

                                            primary={<b style={{ color: '#8a28d9' }}> {det.remarks} </b>}
                                        />
                                    </ListItem>
                                </List>
                            </Grid> */}

                            <Grid xs={8} sx={{ mb: 2 }} item>
                                {isSU ?
                                    (<>
                                        <UploadDocs />
                                        <button
                                            onClick={handleUpload}
                                            className="std-button-sun"
                                            style={{
                                                width: '100%',
                                                marginTop: '10px'
                                            }}> UPLOAD </button>
                                    </>) :
                                    null
                                }
                            </Grid>

                        </Grid>


                    </div>

                </div>

            </div>

            <MakeBidDialog
                show={showDialog}
                set={setShowDialog}
                data={{ details: { ...det }, shipments: shipments }}
                mLeft={1}

                trackId={trackId}
            />
        </>
    )
}

export default Tracker
