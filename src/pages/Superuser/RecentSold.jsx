import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios'
import common from "../../baseUrl"
import { error } from '../../component/Toast'
import { useParams } from 'react-router'
import SuTop from '../../component/Heading/SuTop'
import _ from "lodash"
import ZeroResMessage from '../../component/Heading/ZeroResMessage'
import { Pagination, Stack } from '@mui/material'
import { AddCircleRounded } from '@mui/icons-material'
import AddVehicleDialog from "../../component/Dialogs/AddVehicleDialog"
import { Button, TextField } from '@material-ui/core'

const PurchaseHistory = (props) => {

    const [rp, setRp] = useState([])
    const [data, setData] = useState([])
    const [passing, setPassing] = useState()
    const [fd, setFd] = useState([])
    const [resultCount, setResultCount] = useState(0)
    const [agent, setAgent] = useState("")
    const [addVehicle, setAddVehicle] = useState(false)
    const { id } = useParams()

    useEffect(() => {
        const getAllPh = async () => {
            const response = await axios({
                method: "post",
                headers: {
                    Authorization: `Token ${localStorage.getItem("token")}`
                },
                url: `${common.baseUrl}Funds/ShowReceivables/`,
                data: {
                    agent_id: id
                }
            })
            if (response.status === 200) {
                setRp(response.data.results)
                setData(response.data.results)
                setResultCount(response.data.count)
                !_.isEmpty(response.data.results)
                    &&
                    setAgent(response.data.results[0].buyer.agent.name)
            } else {
                error("Something went wrong!")
            }
        }

        getAllPh()
        const shipmentDetails = async () => {
            const response = await axios({
                method: "post",
                headers: {
                    Authorization: `Token ${localStorage.getItem("token")}`
                },
                url: `${common.baseUrl}Tracking/AllShipmentDetails/`,
                data: {
                    agent_id: id
                }
            })
            if (response.status === 200) {
                setFd(response.data)
                // setRp(response.data)
                // !_.isEmpty(response.data)
                // &&
                // setAgent(response.data[0].buyer.agent.name)
            } else {
                error("Something went wrong!")
            }
        }
        shipmentDetails()
    }, [])


    const nextPage = async (pageNumber) => {

        const response = await axios({
            method: "post",
            headers: {
                Authorization: `Token ${localStorage.getItem("token")}`
            },
            url: `${common.baseUrl}Funds/ShowReceivables/?page=${pageNumber}`,
            data: {
                agent_id: id
            }
        })
        if (response.status === 200) {
            setRp(response.data.results)
            !_.isEmpty(response.data.results)
                &&
                setAgent(response.data.results[0].buyer.agent.name)
        } else {
            error("Something went wrong!")
        }
    }

    const [query, setQuery] = useState('')
    return (
        <div
            className="phContainer"

        >
            <div className="phPurchases" style={{ overflow: 'auto', display: 'flex', flexDirection: 'column' }}>
                <Stack direction="row" alignItems="center" spacing={2} >
                    <SuTop title={!_.isEmpty(agent) && agent + "'s Purchases"} sx={{ flexGrow: 1, border: 'solid' }} />
                    <AddCircleRounded onClick={() => setAddVehicle(true)} style={{ color: "#8a28d9", cursor: "pointer" }} />
                    {/* <input 
                    style={{padding:"0.3rem",marginLeft:"1rem"}}
                    className="std-input2"
                    type="search" placeholder="Search by Lot No."
                    onChange={(e) => {e.target.value === ''? setRp(data): setQuery(rp.filter(car => car.cardetails.lot_no.includes(e.target.value)))}}
                    />
                    <button className="std-button-sun" onClick={() => setRp(rp.filter(car => car.cardetails.lot_no == query))}> Search </button> */}
                </Stack>



                <div className="purchases" >
                    {
                        rp.length == 0
                            ?
                            <ZeroResMessage message="No Results to Show" />
                            :
                            rp.map((item, key) => {
                                return (
                                    <Link to={{
                                        pathname: `/sac/alldetails/${item.id}`,
                                        state: {
                                            aId: id
                                        }

                                    }}
                                        key={key}
                                        className="purchase"



                                    >


                                        <div>
                                            <div className="text">
                                                <p>{item.cardetails.auction_place}</p>
                                                <p><span>Lot No: </span>{item.cardetails.lot_no}</p>
                                                <h3>{item.cardetails.car_name.slice(0, 10)}...</h3>
                                                <p><span>Chassis No: </span>{item.chassis}</p>
                                            </div>
                                            <img
                                                className="img"
                                                src={item.cardetails.url}
                                                alt={"Specific img Purchase History" + key} />
                                        </div>
                                    </Link>
                                )
                            })
                    }
                </div>

                {Math.ceil(resultCount / 16) > 1 ?
                    <Pagination count={Math.ceil(resultCount / 16)} sx={{ mb: 1 }} onChange={(e, pageNumber) => nextPage(pageNumber)} /> :
                    ''
                }
            </div>
            <AddVehicleDialog agentId={id} show={addVehicle} set={setAddVehicle} />
        </div>
    )
}

export default PurchaseHistory
