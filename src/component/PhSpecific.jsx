import { Grid } from '@material-ui/core';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import axios from "axios";
import { motion } from "framer-motion";
import React, { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Link, useHistory, useParams } from 'react-router-dom';
import common from "../baseUrl";
import { useLocation } from 'react-router-dom'
import UploadInfoWon from "../component/Dialogs/UploadInfoWon";
import { purchaseHistoryspecificVariants } from '../framer';
import { error } from './Toast';

const PhSpecific = () => {

    const [det, setDet] = useState({})
    const [clientId, setClientId] = useState("")
    const [prevId, setPrevId] = useState("");
    const [btnText, setBtnText] = useState("Change")

    const [client, setClient] = useState(prevId)

    const [clients, setAllClients] = useState([])

    const [cNo, setCNo] = useState("");
    const [trackId, setTrackId] = useState("")
    const [isSU, setIsSU] = useState(false)
    const { id } = useParams()
    const history = useHistory()
    // console.log("AgentList", agentList)
    console.log("aLL cLIENTS", clients)

    const onDrop = useCallback((acceptedFiles) => {
        acceptedFiles.forEach((file) => {
            const reader = new FileReader()

            reader.onabort = () => console.log('file reading was aborted')
            reader.onerror = () => console.log('file reading has failed')
            reader.onload = () => {
                // Do whatever you want with the file contents
                const binaryStr = reader.result
                console.log(binaryStr)
                console.log(reader)
            }
            reader.readAsArrayBuffer(file)
        })

    }, [])
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

    const location = useLocation()
    const { aId } = location.state
    // console.log("From", aId)
    console.log("Previous id", prevId)
    console.log("Clients id ", client)
    console.log("Purchase id ", id)





    useEffect(() => {
        setIsSU(window.localStorage.getItem('superuser') === 'false' ? false : true)
        const getAllPh = async () => {
            try {
                const response = await axios({
                    method: "post",
                    url: `${common.baseUrl}Funds/PurchaseDetails/`,
                    headers: {
                        Authorization: `Token ${localStorage.getItem("token")}`
                    },
                    data: {
                        id: id,
                    }
                })
                console.log(response)
                if (response.status === 200) {
                    setClientId(response.data.buyer.id)
                    setCNo(response.data.chassis)
                    setDet({ ...response.data, ...response.data.cardetails, ...response.data.buyer, FUNDID: response.data.id })
                    setTrackId(response.data.tracker.id)
                    setPrevId(response.data.buyer.id)
                    console.log("det", det)
                } else {
                    error("Something went wrong!")

                }
            }
            catch (error) {
                console.log(error.response.data)
            }
        }
        getAllPh()
    }, [])

    useEffect(async () => {

        const result = await axios({
            method: "post",
            url: `${common.baseUrl}Login/AllClients/`,
            headers: {
                Authorization: `Token ${localStorage.getItem("token")}`
            },
            data: {
                agent_id: aId
            }
        })

        if (result.status === 200) {
            setAllClients(result.data)
        } else {
            error("Something went wrong while fetching information!")
        }


    }, [])

    const changeClient = (e) => {
        e.preventDefault();
        setBtnText("Changing")
        axios({
            method: 'POST',
            url: `${common.baseUrl}Utils/ChangeCarOwner/`,
            headers: {
                Authorization: `Token ${localStorage.getItem("token")}`
            },
            data: {
                prev_id: prevId,
                new_id:client,
                purchase_id: id

            }
        })
            .then(response => {
                console.log('Customer Changed', response.data);
                // setIsRider(true)
                // setRiderBtn("Rider Added ")
                setBtnText("Changed")

            })
            .catch(error => {
                console.log('Customer Changed failed ', error.response.data);
                setBtnText("Failed")


            });

    }


    return (
        <motion.div
            variants={purchaseHistoryspecificVariants}
            in="in"
            exit="exit"
            animate="animate"
            className="phSpecificContainer">
            <div className="phHeading">
                <div className="backButton1" onClick={() => history.goBack()}>
                    <ArrowBackIcon />
                    <span>Back</span>
                </div>
            </div>
            <div className="phsbody">
                <div className="title">
                    <p> Chassis ID: {det.model}</p>
                    <h1>{det.car_name}</h1>
                    <div>

                        <Grid
                            spacing={2}
                            container>

                            <Grid xs={6} item>
                                <div> <b> Due Amount</b></div>
                                <div>{det.cnf_price - det.amount_paid}</div>
                            </Grid>
                            <Grid xs={6} item>
                                <div> <b> Downpayment Required</b></div>
                                <div>{det.down_payment}</div>
                            </Grid>
                            <Grid xs={6} item>
                                <div><b style={{ color: '#8a28d9' }}>C&F Price</b></div>
                                <div>{det.cnf_price}</div>
                            </Grid>
                            <Grid xs={6} item>
                                <div><b style={{ color: '#8a28d9' }}> Chassis No.</b></div>
                                <div>{cNo}</div>
                            </Grid>
                            <Grid xs={6} item>
                                <div><b>Purchase Price</b> </div>
                                <div>{det.purchase_price}</div>
                            </Grid>
                            <Grid xs={6} item>
                            <div style={{display: 'flex'}} className="">
                            <div style={{marginRight:"10px"}}> <b> Customer</b></div>
                                <div>{det.name}</div> 
                            </div>
                               
                                <form>
                                    <select name="cars" id="cars"  onChange={(e) => setClient(e.target.value)} value={client}
                                    >
                                        <option value="" >Change The Customer</option>

                                        {clients.length === 0 ? <h1 style={{ color: "#eee" }}>No clients</h1> :
                                            clients.map((item, key) => {
                                                return (
                                                    <option value={item.id} >{item.name}  </option>
                                                )

                                            })
                                        }
                                    </select>

                                    <br />  <br />

                                    <button className='std-button-sun' style={{ padding: '10px 15px'}} onClick={changeClient}>{btnText} </button>
                                </form>





                                {/*                               
                                {
                                    agentList.length === 0 ? <h1 style={{ color: "#eee" }}>No clients</h1> : 
                                    agentList.map((item, key) => {
                                        return (
                                <option value={item.name}>{item.name} </option>

                                        )
                                    })
                                } */}


                                {/* {rangeEngine.map((item, key) => {
                                    return (
                                        <option value={item.min} key={key}>{item.min}</option>
                                    )
                                })} */}

                           

                            {/* <div>{det.name}</div> */}
                        </Grid>
                        <Grid xs={6} item>
                            <div> <b> Action House</b></div>
                            <div>{det.auction_place}</div>
                        </Grid>
                        <Grid xs={6} item>
                            <div><b>Lot Number</b></div>
                            <div>{det.lot_no}</div>
                        </Grid>
                        <Grid xs={6} item>
                            <div><b>Engine</b></div>
                            <div>{det.engine_cc}cc </div>
                        </Grid>
                        <Grid xs={6} item>
                            <div><b>Score</b></div>
                            <div>{det.score}</div>
                        </Grid>
                        <Grid xs={6} item>
                            <div><b>TM</b> </div>
                            <div>{det.tm}</div>
                        </Grid>
                        <Grid xs={6} item>
                            <div><b>AC</b></div>
                            <div>{det.ac}</div>
                        </Grid>
                        <Grid xs={6} item>
                            <div><b>Year</b></div>
                            <div>{det.yr}</div>
                        </Grid>
                        <Grid xs={6} item>
                            <div><b>Odometer Reading</b></div>
                            <div>{det.odo * 1000}km</div>
                        </Grid>
                        <Grid xs={6} item>
                            <div><b>Color</b></div>
                            <div>{det.color}</div>
                        </Grid>
                        <Grid xs={6} item>
                            <div><b>Description</b></div>
                            <div>{det.description}</div>
                        </Grid>
                    </Grid>

                    {isSU ? <UploadInfoWon id={id} purchasePrice={det.purchase_price} description={det.description} chassis={det.chassis} /> : ''}
                    <Link
                        style={{ marginTop: "4rem", display: "inline-block", color: "#8a28d9" }}
                        to={"/tracker/" + trackId}>
                        Track Your Order
                    </Link>

                </div>
            </div>
            <div className="img">

                <motion.img
                    layoutId={"PURCHASE_HISTORY_SPECIFIC_IMG" + id}
                    src={det.url}
                    alt="IMAGE OF SPECIFIC CAR" />
            </div>
        </div>
        </motion.div >
    )
}

export default PhSpecific
