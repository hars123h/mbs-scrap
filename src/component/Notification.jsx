import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'
import common from '../baseUrl'
import "../styling/Notification.css"
import ClearIcon from '@material-ui/icons/Clear';
import NotificatonSupport from './NotificatonSupport'
import { error, success } from './Toast'
import { toast } from 'react-toastify'

function Notification(props) {
    const [setcolor, setSetSetcolor] = useState(true)
    const [refreshNoti, setrefreshnoti] = useState(false)
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
    useEffect(() => {

        getNotification()


    }, [refreshNoti,incompany,adminAgent])
    // console.log(AllNotification);
    useEffect(() => {
        let TempNOt = AllNotification;

        setInNotificaton(TempNOt?.filter(item => item.category == "in_company"))
        TempNOt = AllNotification;
        setOutNotificaton(TempNOt?.filter(item => item.category == "out_company"))

    }, [AllNotification, incompany, refreshNoti])
    useEffect(() => {
        let TempNOt = AllNotification;
        setOutNotificaton(TempNOt?.filter(item => item.category == "out_company"))

    }, [AllNotification, incompany, refreshNoti])
    useEffect(() => {
        let InCompany = inNotification
        setBidNoti(InCompany?.filter(item => item?.sub_category == "bidding"))
        InCompany = inNotification
        SetTaskNoti(InCompany?.filter(item => item?.sub_category == "task_manager"))
        InCompany = inNotification
        SetTrackNoti(InCompany?.filter(item => item?.sub_category == "purchase"))
    },[inNotification, incompany])
    useEffect(() => {
        let OutCompany = outNotification
        setClientnoti(outNotification?.filter(item => item?.sub_category == "client_registration"))
        OutCompany = outNotification
        SetAdminNoti(OutCompany?.filter(item => item?.sub_category == "admin_registration"))
        OutCompany = outNotification
        SetAgentNoti(OutCompany?.filter(item => item?.sub_category == "agent_registration"))
    }, [AllNotification,incompany, refreshNoti])

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
            // success("Notification Succesfully deleted")
            setrefreshnoti(true)
            getNotification()
        }
        else {
            toast.error("Something wrong while deleting")
        }


    }
    return (
        <div onClick={() => props.onClose ? props.onClose() : ""} className='notification'>
            <div onClick={(e) => e.stopPropagation()} className='notification__mainContainer'>
                <div className='notification__container'>
                    <div className="notifcation__heading">
                        <h3 onClick={() => { setSetSetcolor(true); setAdminAgent(false); setIncompany(true) }} className={setcolor ? 'notifcation__heading__activ' : 'notifcation__heading__inactiv'}> In-Company </h3>
                        <div className='notification__virticle'></div>
                        <h3 onClick={() => { setSetSetcolor(false); setAdminAgent(true); setIncompany(false)}} className={setcolor ? 'notifcation__heading__inactiv' : 'notifcation__heading__activ'}>Out-Company</h3>
                    </div>
                    <div className="notification__body">
                        {incompany ?
                            <div className='notification__All'>
                                <div>
                                    <h4>1. Bidding</h4>
                                    <ul style={{ marginTop: "5px" }}>
                                        {
                                            bidNoti?.map(item => {
                                                return (
                                                    <div>
                                                        <div onClick={() => handelExpand(item.id)} className='BidNoti' >
                                                            <li  >{`${item?.message.slice(0, 30)}...`}</li>
                                                            <span onClick={(E) => {E.stopPropagation(); deletNotification(item.id)}}><ClearIcon /></span>
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
                                    <h4>2. Tracking</h4>
                                    <ul style={{ marginTop: "5px" }}>
                                        {
                                            trackNoti?.map(item => {
                                                return (
                                                    <div>
                                                        <div onClick={() => handelExpand(item.id)} className='BidNoti' >
                                                            <li  >{`${item?.message.slice(0, 25)}...`}</li>
                                                            <span onClick={(e) =>{ e.stopPropagation();deletNotification(item.id)}}><ClearIcon /></span>
                                                        </div>
                                                        {
                                                            expand == item?.id && (
                                                                <div className='showNoti' >{item?.message}</div>
                                                            )
                                                        }
                                                    </div>

                                                )
                                            })
                                        }
                                    </ul>
                                    <h4>3. Task Manager</h4>
                                    <ul style={{ marginTop: "5px" }}>
                                        {
                                            taskNoti?.map(item => {
                                                return (
                                                    <div>
                                                        <div onClick={() => handelExpand(item.id)} className='BidNoti' >
                                                            <li  >{`${item?.message.slice(0, 30)}...`}</li>
                                                            <span onClick={(e) =>  {e.stopPropagation(); deletNotification(item.id)}}><ClearIcon /></span>
                                                        </div>
                                                        {
                                                            expand == item?.id && (
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
                            : <div className='notification__All'>
                                <div>
                                    <h4>1. Agent Registration</h4>
                                    <ul style={{ marginTop: "5px" }}>
                                        {
                                            AgentNoti?.map(item => {
                                                return (
                                                    <div>
                                                        <div onClick={() => handelExpand(item.id)} className='BidNoti' >
                                                            <li  >{`${item?.message.slice(0, 30)}...`}</li>
                                                            <span onClick={(e) =>  {e.stopPropagation(); deletNotification(item.id)}}><ClearIcon /></span>
                                                        </div>
                                                        {
                                                            expand == item?.id && (
                                                                <div className='showNoti' >{item?.message}</div>
                                                            )
                                                        }
                                                    </div>

                                                )
                                            })
                                        }
                                    </ul>
                                    <h4>2. Admin Registration</h4>
                                    <ul style={{ marginTop: "5px" }}>
                                        {
                                            AdminNoti?.map(item => {
                                                return (
                                                    <div>
                                                        <div onClick={() => handelExpand(item.id)} className='BidNoti' >
                                                            <li  >{`${item?.message.slice(0, 30)}...`}</li>
                                                            <span onClick={(e) =>  {e.stopPropagation(); deletNotification(item.id)}}><ClearIcon /></span>
                                                        </div>
                                                        {
                                                            expand == item?.id && (
                                                                <div className='showNoti' >{item?.message}</div>
                                                            )
                                                        }
                                                    </div>

                                                )
                                            })
                                        }
                                    </ul>
                                    <h4>3. Client Registration</h4>
                                    <ul style={{ marginTop: "5px" }}>
                                        {
                                            Clientnoti?.map(item => {
                                                return (
                                                    <div>
                                                        <div onClick={() => handelExpand(item.id)} className='BidNoti' >
                                                            <li  >{`${item?.message.slice(0, 30)}...`}</li>
                                                            <span onClick={(e) =>  {e.stopPropagation(); deletNotification(item.id)}}><ClearIcon /></span>
                                                        </div>
                                                        {
                                                            expand == item?.id && (
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

                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Notification