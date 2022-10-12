import React, { useEffect, useState, useCallback } from 'react'
import "../../styling/SapurchaseModal.css"
import { useDropzone } from 'react-dropzone'
import { Article, Close, Construction, DragIndicatorOutlined, Edit, FlightLand, FlightTakeoff, Search } from '@mui/icons-material'
import { Grid, List, ListItem, ListItemText, ListSubheader, Typography, IconButton, Chip, Stack, Paper, ListItemSecondaryAction } from '@mui/material'
import EditIcon from '@material-ui/icons/Edit';
import ATrackerUpdate from './ATrackerUpdate';
import { motion } from "framer-motion";
import common from '../../baseUrl';
import axios from 'axios'
import { success } from '../../component/Toast'
import { toast } from 'react-toastify'
import { display } from '@mui/system'
const carImg = "https://www.drivespark.com/car-image/640x480x100/car/x20522189-mercedes_benz_s_class_database.jpg.pagespeed.ic.4DQbbTuiPZ.jpg"
function ApurchaseModal(props) {
    console.log("props purchase details", props.SelectedList);
    const [tID, setID] = useState(props.SelectedList?.[0]?.tracker?.id)
    const [showDialog, setShowDialog] = useState(false)
    const [docs, setDocs] = useState([{ name: 'N/A', url: '#' }])
    const [upDocs, setUpDocs] = useState([]);
    const [trackId, setTrackId] = useState()

    const [isSU, setIsSU] = useState(false)
    useEffect(() => {
        let isSA = localStorage.getItem("SuperHeadAdmin")
        let iSSuper = localStorage.getItem("superuser")
        if (isSA) {
            setIsSU(isSA)
        }
        else if (iSSuper) {

            setIsSU(iSSuper)
        }
        console.log("llllll", iSSuper)

    }, [])
    useEffect(() => {
        setIsSU(localStorage.getItem('SuperHeadAdmin'))
        setIsSU(localStorage.getItem('superuser'))
    }, [])
    //   setIsSU(localStorage.getItem('SuperHeadAdmin'))  
    const [image, setImage] = useState("")
    const handleImageChange = (e) => {
        console.log(e.target.files[0]);
        setImage(e.target.files[0])
    }
    // console.log(trackId);
    const handleUpload = (id) => {
        let formData = new FormData()
        upDocs.forEach(file => {
            formData.append('file_field', file);
        })
        formData.append('id', id);

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
                minHeight: '80px',
                maxHeight: "80px",
                marginBottom: "5x",
                overflowY: "auto",
                display: 'flex',
                width: "40.5rem",
                justifyContent: 'center',
                alignItems: 'center',
                color: '#8a28d9',
                cursor: 'pointer',
                padding: '1px'
            }}>
                <input {...getInputProps()} />
                {upDocs.length > 0 ? renderDocList(upDocs) : label}
            </div>
        )
    }
    const sendTrackingLInk = async (trackId, agent_id) => {
        const url2 = `Tracking/send-tracking-url/`
        const purchaseEdit = await axios({
            method: "post",
            url: `${common.baseUrl}${url2}`,
            headers: {
                Authorization: `Token ${localStorage.getItem("token")}`
            },
            data: {
                client_id: agent_id,
                url: `${common.baseUrl}tracker/${trackId}`
            }

        })
        if (purchaseEdit.status == 200) {
            toast.success("Link Sent Successfully")
        }
    }

    useEffect(async () => {
        try {
            const response = await axios({
                method: "post",
                url: `${common.baseUrl}Documents/PurchaseDocs/`,
                headers: {
                    Authorization: `Token ${localStorage.getItem("token")}`,
                },
                data: {
                    id: tID
                }
            })
            setDocs(response.data)
        } catch (err) {
            toast.error(err.message)
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
            if (response.status == 204) {
                toast.success("Document deleted Successfully")
                window.location.reload()
            }
        } catch (err) {
            toast.error(err.message)
        }
    }

    return (
        <>


            <div onClick={() => props.onClose ? props.onClose() : ""} className={`sapurchaseModal ${props.class ? props.class : ""}`}>
                <div onClick={(e) => e.stopPropagation()} className='sapurchaseModal__body'>
                    <div className='sapurchaseModal__sort__title'>
                        <h2>Tracker</h2>
                    </div>
                    <div className='sapurchaseModal__body__container'>
                        {
                            props.SelectedList?.map(item => {
                                return (
                                    <div className='sapurchaseModal__body__tracker'>
                                        <div className='sapurchaseModal__body__card'>
                                            <div className='sapurchaseModal__body__card__left'>
                                                {/* <img src={carImg} alt="" /> */}
                                                <motion.img
                                                    layoutId={"SPECIFIC_VEHICLE_IMG" + item?.id}
                                                    src={item?.cardetails?.url}
                                                    alt={"car image"}

                                                />
                                            </div>

                                            <div className='sapurchaseModal__body__card__right'>
                                                <div className='sapurchaseModal__body__card__right_details'>
                                                    <h3>Customer Name:</h3>
                                                    <p>{item?.buyer?.name}</p>
                                                </div>
                                                <div className='sapurchaseModal__body__card__right_details'>
                                                    <h3>Car Model:</h3>
                                                    <p>{item?.cardetails?.model}</p>
                                                </div>
                                                <div className='sapurchaseModal__body__card__right_details'>
                                                    <h3>Chassis Number:</h3>
                                                    <p>{item?.cardetails?.chassis}</p>
                                                </div>



                                            </div>
                                        </div>
                                        <div className='sapurchaseModal__body__card__TrackStatus TrackingStatusButton' >
                                            <div className='trackEdit'>
                                                <h2>Tracking Status </h2>
                                                {!item?.tracker?.is_delivered && <EditIcon onClick={() => { setShowDialog(true); setTrackId(item) }} />}
                                            </div>
                                            <div className='sendLinkBUtton'>
                                                {!item?.tracker?.is_delivered && <button onClick={() => sendTrackingLInk(item?.tracker?.id, item?.buyer?.id)} >Send Link</button>}
                                            </div>
                                        </div>
                                        <div className='sapurchaseModal__body__card__tracker'>

                                            <Grid xs={3} sx={{ display: 'flex', justifyContent: 'center' }}>
                                                <Paper
                                                    sx={{
                                                        padding: '1rem',
                                                        boxShadow: '1px 1px 20px rgb(0 0 0 / 49%)',
                                                        borderRadius: '1rem',
                                                        fontSize: '1rem'
                                                    }}>
                                                    <List
                                                        sx={{ width: '150px', height: "150px" }}

                                                    // subheader={<ListSubheader> <Typography sx={{ color: '#8a28d9', fontFamily: '"Montserrat", sans-serif', fontWeight: 'bold', fontSize: "small" }} variant="h6"> Departure <FlightTakeoff  fontSize="small" /> </Typography></ListSubheader>}
                                                    >
                                                        <div style={{ display: "flex", padding: "3px" }}> <h6
                                                            style={{ color: '#8a28d9', fontFamily: '"Montserrat", sans-serif', fontWeight: 'bold', fontSize: "small" }}
                                                        >Departure</h6>
                                                            <FlightTakeoff style={{ color: '#8a28d9', fontFamily: '"Montserrat", sans-serif', fontWeight: 'bold', marginTop: "-6px", marginLeft: "5px" }} />
                                                        </div>
                                                        <div style={{ marginTop: "-5px" }} className='sapurchaseModal__body__card__tracker__text'>
                                                            <p>Vessel: <span style={{ color: "#8a28d9" }}>{item?.tracker?.dept_vessel}</span></p>
                                                            <p>Port of loading : <span style={{ color: "#8a28d9" }}>{item?.tracker?.dept_port}</span></p>
                                                            <p>ETD : <span style={{ color: "#8a28d9" }}>{item?.tracker?.dept_et}</span></p>
                                                        </div>
                                                    </List>
                                                </Paper>
                                            </Grid>
                                            <Grid xs={3} sx={{ display: 'flex', justifyContent: 'center' }}>
                                                <Paper
                                                    sx={{
                                                        padding: '1rem',
                                                        boxShadow: '1px 1px 20px rgb(0 0 0 / 49%)',
                                                        borderRadius: '1rem',
                                                        fontSize: '1rem'
                                                    }}>
                                                    <List
                                                        sx={{ width: '150px', height: "150px" }}
                                                    >
                                                        <div style={{ display: "flex", padding: "3px" }}> <h6
                                                            style={{ color: '#8a28d9', fontFamily: '"Montserrat", sans-serif', fontWeight: 'bold', fontSize: "small" }}
                                                        >Arrival</h6>
                                                            <FlightTakeoff style={{ color: '#8a28d9', fontFamily: '"Montserrat", sans-serif', fontWeight: 'bold', marginTop: "-6px", marginLeft: "5px" }} />
                                                        </div>
                                                        <div style={{ marginTop: "-5px" }} className='sapurchaseModal__body__card__tracker__text'>
                                                            <p>Port of Arrival : <span style={{ color: "#8a28d9" }}>{item?.tracker?.arrival_port}</span></p>
                                                            <p>ETA : <span style={{ color: "#8a28d9" }}>{item?.tracker?.arrival_et}</span></p>
                                                            {/* <p>ETD (Estimated Time of Departure)</p> */}
                                                        </div>
                                                    </List>
                                                </Paper>
                                            </Grid>
                                            <Grid xs={3} sx={{ display: 'flex', justifyContent: 'center' }}>
                                                <Paper
                                                    sx={{
                                                        padding: '1rem',
                                                        boxShadow: '1px 1px 20px rgb(0 0 0 / 49%)',
                                                        borderRadius: '1rem',
                                                        fontSize: '1rem'
                                                    }}>
                                                    <List
                                                        sx={{ width: '150px', height: "150px" }}
                                                    >
                                                        <div style={{ display: "flex", padding: "3px" }}> <h6
                                                            style={{ color: '#8a28d9', fontFamily: '"Montserrat", sans-serif', fontWeight: 'bold', fontSize: "small" }}
                                                        >Inspection Status</h6>
                                                            {/* <Construction style={{ color: '#8a28d9', fontFamily: '"Montserrat", sans-serif', fontWeight: 'bold', marginTop: "-6px", marginLeft: "5px" }} /> */}
                                                        </div>
                                                        <div style={{ marginTop: "-5px" }} className='sapurchaseModal__body__card__tracker__text'>
                                                            <p>Inspection Date: { }</p>
                                                            <p style={{ color: "#8a28d9" }}>{item?.tracker?.result1}</p>
                                                            <p>Re-inspection Date: <span style={{ color: "#8a28d9" }}>{item?.tracker?.re_inspection_date}</span></p>

                                                        </div>
                                                    </List>
                                                </Paper>
                                            </Grid>
                                        </div>
                                        <div className='sapurchaseModal__sort__submit' style={{ marginBottom: "1rem" }}>

                                            <Grid xs={8} sx={{ mb: 2 }} item>

                                                <>
                                                    {!item?.tracker?.is_delivered && <UploadDocs />}
                                                    <List
                                                        sx={{ border: "dashed #8a28d9", width: "40.5rem", textAlign: "center", marginTop: "5px" }}

                                                    // subheader={<ListSubheader > <Typography sx={{ color: '#8a28d9', fontFamily: '"Montserrat", sans-serif', fontWeight: 'bold' }} variant="h6">Documents <Article sx={{ transform: 'translateY(5px)' }} fontSize="small" /> </Typography> </ListSubheader>}
                                                    >
                                                        <div className='DocContainer' style={{ display: "flex" }}>
                                                            {
                                                                docs?.map(doc => {
                                                                    return (
                                                                        <div className='DeleteDOC' >
                                                                            <ListItem key={doc.url}
                                                                                secondaryAction={

                                                                                    <IconButton onClick={() => deleteDoc(doc)} edge="end">
                                                                                        <Close />
                                                                                    </IconButton>
                                                                                }>
                                                                                <ListItemText

                                                                                    primary={<a href={`https://mbs-backend.ga${doc.url}`} target="_blank" style={{ color: '#8a28d9' }}> Download </a>}
                                                                                    secondary={<p style={{ color: 'black' }}> {doc.name.slice(0, 10)} </p>}
                                                                                />
                                                                            </ListItem>
                                                                        </div>
                                                                    )
                                                                })
                                                            }
                                                        </div>
                                                    </List>
                                                    {
                                                        !item?.tracker?.is_delivered && <button
                                                            onClick={() => handleUpload(item.tracker?.id)}
                                                            className="std-button-sun"
                                                            style={{
                                                                width: '100%',
                                                                marginTop: '10px'
                                                            }}> UPLOAD </button>
                                                    }
                                                </>

                                            </Grid>

                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>


                </div>

            </div>




            <>
                {
                    showDialog && < ATrackerUpdate
                        onClose={() => setShowDialog(false)}
                        trackItem={trackId}

                    />
                }
            </>

        </>
    )
}

export default ApurchaseModal