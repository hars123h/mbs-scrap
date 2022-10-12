import { AutoComplete, DropDownList } from '@progress/kendo-react-dropdowns'
import axios from 'axios'
import { get } from 'jquery'
import { set } from 'lodash'
import moment from 'moment'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import common from '../../baseUrl'


import "../../styling/SaTrackerUpdate.css"
const data = [
    {
        shipment: "Hoegh Autoliners AS"
    },
    {
        shipment: "Eastern Car Liner Ltd."
    },
    {
        shipment: "YCS"
    },
    {
        shipment: "MOL"
    },
    {
        shipment: "NYK"
    },
    {
        shipment: "K-Line"
    },
    {
        shipment: "Armacup"
    },
    {
        shipment: "Kyowa Shipping Co. Ltd."
    },
    {
        shipment: "Others"
    }
]
const defaultCarrier = {
    shipment: "Select Carrier"
}
const status = [
    {
        status: "FAIL"
    },
    {
        status: "PASS"
    },
    {
        status: "N/A"
    }

]
const defaultStatus = {
    status: "Select Status.."
}
function ATrackerUpdate(props) {
    const [update, setUpdate] = useState()
    const [seresult2, setResult2] = useState()
    const [seresult1, setResult1] = useState()
    const [Status, setStatus] = useState()
    const [re_inspect, setREinspect] = useState()
    const [carier, setCarrier] = useState()
    // {
    //     is_delivered: false,
    //     shipping_status: "",
    //     shipping_carrier: null,
    //     dept_vessel: null,
    //     dept_port: null,
    //     dept_et: null,
    //     arrival_vessel: null,
    //     arrival_port: null,
    //     arrival_et: null,
    //     yard_destination: null,
    //     remarks: null,
    //     inspection_status: "",
    //     inspection_date: null,
    //     result1: null,
    //     re_inspection_date: null,
    //     result2: null,
    //     enrollment: null
    // }
    const [incpectstatus, setIncpectstatus] = useState()
    useEffect(async () => {
        const TrackId = props.trackItem?.tracker?.id
        const getTracker = await axios({
            method: "get",
            headers:
            {
                Authorization: `Token ${localStorage.getItem("token")}`
            },
            url: `${common.baseUrl}Tracking/TrackingDetails/${TrackId}`
        })
        setUpdate(getTracker.data)

        setStatus(getTracker.data?.inspection_status)
        if (update?.shipping_carrier?.length >= 1) {
            defaultCarrier.shipment = update?.shipping_carrier
        }
    }, [])
    console.log(update?.shipping_carrier);
    useEffect(() => {

    }, [seresult1])
    const submitUpdate = async () => {
        // if (seresult1 == "N/A") {
        //     setUpdate({ ...update, inspection_status: seresult1 })
        // }
        // else if (seresult1 == "PASS") {
        //     setUpdate({ ...update, inspection_status: seresult1 })
        // }
        // else if (seresult1 == "FAIL") {
            
        // }
        setUpdate({ ...update, inspection_status: Status })

        const TrackId = props.trackItem?.tracker?.id
        const response = await axios({
            method: "patch",
            headers:
            {
                Authorization: `Token ${localStorage.getItem("token")}`
            },
            url: `${common.baseUrl}Tracking/TrackingDetails/${TrackId}/`,
            data: update

        })

        if (response.status == 200) {
            toast.success("Tracking Successfully updated")
            window.location.reload()
            
        }
    }
    console.log("track update info", update);
    const handleChange = (e) => {
        setResult1(e.target.value);
        setUpdate({ ...update, result1: e.target.value })
       
    }
    useEffect(()=>{
        if(seresult1 == "PASS" || seresult2 == "PASS")
        {
            setStatus("PASS")
            setUpdate({...update, inspection_status:"PASS"})
        }
        else if(seresult1 == "FAIL")
        {
            setStatus("FAIL")
            setUpdate({...update, inspection_status:"FAIL"})
        }
        else
        {
            setStatus("N/A")
            setUpdate({...update, inspection_status:"N/A"})
        }
    },[seresult1, seresult2])
    return (
        <div className='TrackUpdateModal' onClick={() => props.onClose ? props.onClose() : ""} >
            <div className='TrackUpdateModal__body'
                onClick={(e) => e.stopPropagation()}
            >
                <div className='TrackUpdateModal__body__title'>
                    <h2><span style={{ fontFamily: '"Montserrat", sans-serif' }}>Update Tracking Details</span></h2>
                </div>
                <div className='TrackUpdateModal__body__Contents'>
                    <div className='TrackUpdateModal__body__Contents__shipment'>
                        <p >Carrier</p>
                        <select
                            className="std-input2"
                            name="shipping_carrier"
                            value={update?.shipping_carrier}
                            onChange={(e) => { setCarrier(e.target.value); setUpdate({ ...update, shipping_carrier: e.target.value }) }}
                        >
                            <option hidden> Select Carrier </option>
                            {[
                                {
                                    type: "Hoegh Autoliners AS",
                                    value: "Hoegh Autoliners AS"
                                },
                                {
                                    type: "Eastern Car Liner Ltd.",
                                    value: "Eastern Car Liner Ltd."
                                },
                                {
                                    type: "YCS",
                                    value: "YCS"
                                },
                                {
                                    type: "MOL",
                                    value: "MOL"
                                },
                                {
                                    type: "NYK",
                                    value: "NYK"
                                },
                                {
                                    type: "K-Line",
                                    value: "K-Line"
                                },
                                {
                                    type: "Armacup",
                                    value: "Armacup"
                                },
                                {
                                    type: "Kyowa Shipping Co. Ltd.",
                                    value: "Kyowa Shipping Co. Ltd."
                                },
                                {
                                    type: "Others",
                                    value: "Others"
                                },
                            ].map((item, key) => {
                                return (
                                    <option
                                        key={key}
                                        style={{ padding: "0.5rem" }}
                                        value={item.type}>
                                        {item.type}
                                    </option>
                                )
                            })}
                        </select>
                        {carier == "Others" &&
                            <div className='TrackUpdateModal__body__Contents__shipment'>

                                <input style={{ width: "300px", height: "40px", borderRadius: "10px", marginTop: "20px", border: "1px solid grey", paddingLeft: "10px" }} type="text" placeholder='Type name' value={update?.shipping_carrier} onChange={(e) => { setUpdate({ ...update, shipping_carrier: e.target.value }) }} />
                            </div>
                        }
                    </div>
                    <div className='TrackUpdateModal__body__Contents__grid'>
                        <div className='TrackUpdateModal__body__Contents__shipment'>
                            <p >Departure</p>
                            <input type="text" placeholder='Vessel Name' value={update?.dept_vessel} onChange={(e) => setUpdate({ ...update, dept_vessel: e.target.value })} />
                        </div>
                        <div className='TrackUpdateModal__body__Contents__shipment'>
                            <p >Arrival</p>
                            <input type="text" placeholder='Port of Discharge' value={update?.arrival_port} onChange={(e) => setUpdate({ ...update, arrival_port: e.target.value })} />
                        </div>
                    </div>
                    <div className='TrackUpdateModal__body__Contents__grid'>
                        <div className='TrackUpdateModal__body__Contents__shipment'>

                            <input type="text" placeholder='Port of Loading' value={update?.dept_port} onChange={(e) => setUpdate({ ...update, dept_port: e.target.value })} />
                        </div>
                        <div className='TrackUpdateModal__body__Contents__shipment'>

                            <input type="date" placeholder='ETA (YYYY-MM-DD)' value={update?.arrival_et} onChange={(e) => setUpdate({ ...update, arrival_et: moment(e.target.value).format('YYYY-MM-DD') })} />
                        </div>
                    </div>
                    <div className='TrackUpdateModal__body__Contents__grid'>
                        <div className='TrackUpdateModal__body__Contents__shipment'>

                            <input type="date" placeholder='ETD (YYYY-MM-DD)' value={update?.dept_et} onChange={(e) => setUpdate({ ...update, dept_et: moment(e.target.value).format('YYYY-MM-DD') })} />
                        </div>

                    </div>
                    <div className='TrackUpdateModal__body__Contents__grid'>
                        <div className='TrackUpdateModal__body__Contents__shipment'>
                            <p >Inspection Status</p>
                            <input type="date" placeholder='Inspection Date(YYYY-MM-DD)' value={update?.inspection_date} onChange={(e) => setUpdate({ ...update, inspection_date: moment(e.target.value).format('YYYY-MM-DD') })} />
                        </div>
                        {/* <div className='TrackUpdateModal__body__Contents__shipment'>
                            <p >Enrollment</p>
                            <input type="text" placeholder='Enrollment' onChange={(e) => setUpdate({ ...update, dept_port: e.target.value })} />
                        </div> */}

                    </div>
                    <div className='TrackUpdateModal__body__Contents__grid'>

                        <div className='TrackUpdateModal__body__Contents__shipment'>

                            {/* <AutoComplete
                                style={{ width: "150px", height: "40px", borderRadius: "10px" }}
                                // defaultItem={defaultStatus}
                                data={status}
                                defaultValue="N/A"
                                textField="status"
                                suggest
                                onChange={(e) => { setResult1(e.target.value); setUpdate({ ...update, result1: e.target.value }) }}
                            /> */}
                            <select
                                style={{ width: "15.8rem" }}
                                className="std-input2"
                                name="shipping_carrier"
                                value={update?.result1}

                                onChange={handleChange}                  >
                                <option hidden> {update?.result1}</option>
                                {[
                                    {

                                        status: "N/A"
                                    },
                                    {

                                        status: "FAIL"
                                    },
                                    {

                                        status: "PASS"
                                    }
                                ].map((item, key) => {
                                    return (
                                        <option
                                            key={key}
                                            style={{ padding: "0.5rem" }}
                                            value={item.status}>
                                            {item.status}
                                        </option>
                                    )
                                })}
                            </select>
                        </div>

                    </div>
                    {
                        seresult1 === "FAIL" && <div className='TrackUpdateModal__body__Contents__grid__reinspect'>
                            <div className='TrackUpdateModal__body__Contents__shipment'>

                                <input type="date" placeholder='Re-inspection Date (YYYY-MM-DD)' value={update?.re_inspection_date} onChange={(e) => setUpdate({ ...update, re_inspection_date: moment(e.target.value).format('YYYY-MM-DD') })} />
                            </div>
                            {/* <AutoComplete
                                style={{ width: "150px", height: "40px", borderRadius: "10px", marginBottom: "20px" }}
                                // defaultItem={defaultStatus}
                                data={status}
                                defaultValue={update?.result}
                                textField="status"
                                suggest
                                onChange={(e) => { setResult2(e.target.value); setUpdate({ ...update, result2: e.target.value.status }) }}
                            /> */}
                            <select
                                style={{ width: "15.8rem", marginBottom: "20px" }}
                                className="std-input2"
                                name="shipping_carrier"
                                value={update?.result2}

                                onChange={(e) => { setResult2(e.target.value); setUpdate({ ...update, result2: e.target.value }) }}                  >
                                <option hidden> {update?.result2}</option>
                                {[
                                    {

                                        status: "N/A"
                                    },
                                    {

                                        status: "FAIL"
                                    },
                                    {

                                        status: "PASS"
                                    }
                                ].map((item, key) => {
                                    return (
                                        <option
                                            key={key}
                                            style={{ padding: "0.5rem" }}
                                            value={item.status}>
                                            {item.status}
                                        </option>
                                    )
                                })}
                            </select>
                        </div>
                    }
                    <div className='TrackUpdateModal__body__Contents__grid'>
                        <div className='TrackUpdateModal__body__Contents__shipment'>

                            <input type="text" disabled placeholder='Inspection Status' value={Status} />
                        </div>

                    </div>
                    <div className='TrackUpdateModal__body__Contents__checkGrid'>

                        <div className='TrackUpdateModal__body__Contents__shipment__checkbox'>
                            <input type="checkbox" value={update?.is_delivered} onChange={(e) => setUpdate({ ...update, is_delivered: e.target.checked })} />
                            <p >Delivered</p>
                        </div>

                    </div>
                    <div className='TrackUpdateModal__body__Contents__buttons'>

                        <button
                            style={{ border: "2px solid #8a28d9" }}
                            className="std-button-sun"

                            autoFocus
                            onClick={submitUpdate}
                        >
                            Submit
                        </button>
                        <button
                            style={{ background: "transparent", color: "#8a28d9", border: "2px solid #8a28d9" }}
                            className="std-button-sun" onClick={() => props.onClose ? props.onClose() : ""}>Close</button>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default ATrackerUpdate