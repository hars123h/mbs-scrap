import React, { useState, useEffect } from 'react'
import NotificationsIcon from '@mui/icons-material/Notifications';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import common from "../baseUrl"
import axios from "axios"
import { error } from "../component/Toast"
import CloseIcon from '@mui/icons-material/Close';
import ClearIcon from '@material-ui/icons/Clear';
import CheckIcon from '@mui/icons-material/Check';
import { toast } from 'react-toastify';


const Heading = ({ title }) => {

    const [show, setShow] = useState(false)
    const [allNotification, setAllNotification] = useState([])
    const [newNotificationAlert, setNewNotificationAlert] = useState(true)
    // useEffect(()=>{

    const getAllNotification = async () => {
        setShow(!show)
        const response = await axios({
            method: "post",
            url: `${common.baseUrl}Notification/Notifications/ `,
            headers: {
                Authorization: `Token ${localStorage.getItem("token")}`
            }
        })
        if (response.status === 200) {
            setAllNotification(response.data)
            setNewNotificationAlert(false)
        }
        else {
            error("Failed to load Notifications")
        }
    }

    const removeIndividual = async (id, key) => {
        const response = await axios({
            method: "delete",
            url: `${common.baseUrl}Notification/NotificationDetails/${id}`,
            headers: {
                Authorization: `Token ${localStorage.getItem("token")}`
            }
        })
        if (response.status === 204) {
            document.querySelectorAll(".notificationBoxIndividual")[key].style.display = "none";
        }
        else {
            error("Cannot delete")
        }
    }
    const [setcolor, setSetSetcolor] = useState(true)
    const [adminAgent, setAdminAgent] = useState(true)
    const [bidNoti, setBidNoti] = useState([])
    const [trackNoti, SetTrackNoti] = useState([])
    const [taskNoti, SetTaskNoti] = useState([])
    const [AgentNoti, SetAgentNoti] = useState([])
    const [Clientnoti, setClientnoti] = useState([])
    const [AdminNoti, SetAdminNoti] = useState([])
    const [expand, setExpand] = useState()
    const [AllNotification, setNotificaton] = useState()
    const [inNotification, setInNotificaton] = useState()
    const [outNotification, setOutNotificaton] = useState()
    const [incompany, setIncompany] = useState(true)
    useEffect(async () => {
        getNotification()

    }, [])
    const getNotification = async () => {
        let url1 = `${common.baseUrl}Notification/Notifications/`
        const notification = await axios({
            url: url1,
            method: "get",
            headers: {
                Authorization: `Token ${localStorage.getItem("token")}`
            }
        })
        setNotificaton(notification.data)
    }
    // console.log(AllNotification);
    useEffect(() => {
        let TempNOt = AllNotification;

        setInNotificaton(TempNOt?.filter(item => item.category == "in_company"))
        TempNOt = AllNotification;
        setOutNotificaton(TempNOt?.filter(item => item.category == "out_company"))

    }, [AllNotification, incompany])
    useEffect(() => {
        let TempNOt = AllNotification;
        setOutNotificaton(TempNOt?.filter(item => item.category == "out_company"))

    }, [AllNotification, incompany])
    useEffect(() => {
        let InCompany = inNotification
        setBidNoti(InCompany?.filter(item => item?.sub_category == "bidding"))
        InCompany = inNotification
        SetTaskNoti(InCompany?.filter(item => item?.sub_category == "task_manager"))
        InCompany = inNotification
        SetTrackNoti(InCompany?.filter(item => item?.sub_category == "purchase"))
    }, [inNotification, incompany])
    useEffect(() => {
        let OutCompany = outNotification
        setClientnoti(outNotification?.filter(item => item?.sub_category == "client_registration"))
        OutCompany = outNotification
        SetAdminNoti(OutCompany?.filter(item => item?.sub_category == "admin_registration"))
        OutCompany = outNotification
        SetAgentNoti(OutCompany?.filter(item => item?.sub_category == "agent_registration"))
    }, [incompany])

    // console.log("hello notification", AllNotification);
    const handelExpand = (id) => {
        // console.log("show", id);
        setExpand(id)
    }
    const deletNotification = async (id) => {
        // alert("are You sure want to delete Notification")
        let url1 = `${common.baseUrl}Notification/NotificationDetails/${id}`
        const deletenotification = await axios({
            url: url1,
            method: "delete",
            headers: {
                Authorization: `Token ${localStorage.getItem("token")}`
            }
        })
        if (deletenotification.status == 204) {
            // toast.success("Notification Succesfully deleted")
            getNotification()
        }
        else {
            toast.error("Something wrong while deleting")
        }


    }
    return (
        <>
            {
                show &&
                // <div >
                //     <div className="notificationBox">
                //         <div className="heading">
                //             <p>Notifications</p>
                //         </div>
                //         <div className="allNotifications">
                //             <ul style={{ marginTop: "5px" }}>
                //                 {
                //                     AllNotification?.map(item => {
                //                         return (
                //                             <div>
                //                                 <div onClick={() => handelExpand(item.id)} className='BidNoti' >
                //                                     <li  >{`${item?.message.slice(0, 20)}...`}</li>
                //                                     <span onClick={(e) => { e.stopPropagation(); deletNotification(item.id) }}><ClearIcon /></span>
                //                                 </div>
                //                                 {
                //                                     expand == item.id && (
                //                                         <div className='showNoti' >{item?.message}</div>
                //                                     )
                //                                 }
                //                             </div>

                //                         )
                //                     })
                //                 }
                //             </ul>
                //         </div>
                //     </div>
                // </div>
                <div onClick={() => setShow(false)} className='notification'>
                    <div onClick={(e) => e.stopPropagation()} className='notification__mainContaineragent' style={{marginRight:"23rem", top:"4rem"}}>
                        <div className='notification__container'  >
                            <div className="notifcation__headingAgent" >
                                <h4>Notifications</h4>
                            </div>
                            <div className="notification__bodyagent" style={{marginRight:"5rem",width:"100%"}} >
                            <ul  style={{width:"100%", justifyContent:"center", display:"flex", flexDirection:"column"}}>
                                {
                                    AllNotification?.map(item => {
                                        return (
                                            <div >
                                                <div onClick={() => handelExpand(item.id)} className='BidNoti' >
                                                    <li  >{`${item?.message.slice(0, 20)}...`}</li>
                                                    <span onClick={(e) => { e.stopPropagation(); deletNotification(item.id) }}><ClearIcon /></span>
                                                </div>
                                                {
                                                    expand == item.id && (
                                                        <div className='showNoti' >{item?.message}</div>
                                                    )
                                                }
                                            </div>

                                        )
                                    })
                                }
                                
                            </ul>
                            </div>
                        </div>
                    </div>
                </div>
            }
            <div className="dbcNavbar" style={{ padding: "1rem" }}>
                <h1>{title}</h1>
                <div  >
                    <div style={{ display: "flex", alignItems: "Center" }} className='notificationPage'  >
                        <div className="notificationContainer">
                            <button onClick={(e) => { e.stopPropagation(); setShow(!show) }} style={{ marginRight: "1rem", color: "grey", cursor: "pointer" }}>
                                {newNotificationAlert && <span className="redDotsNotification"></span>}
                                {!show ?
                                    <NotificationsNoneOutlinedIcon />
                                    :
                                    <NotificationsIcon />
                                }
                            </button>


                        </div>
                        {/* <div className="avatar">{localStorage.getItem("username")[0]}</div> */}
                        {/* <Avatar src={localStorage.getItem("username")} 
                    +localStorage.getItem("username").split(" ")[1][0].toUpperCase()
                            alt={localStorage.getItem("username").toUpperCase()}
                            sx={{ bgcolor: green[500] }}/> */}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Heading
