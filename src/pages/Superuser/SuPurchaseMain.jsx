import React, { useEffect, useState } from 'react'
import axios from "axios"
import { Divider } from '@mui/material'
import { Link, useParams } from 'react-router-dom'
import common from '../../baseUrl'

const SuPurchaseMain = ({ agentList }) => {
    const [allAgents, setAllAgents] = useState()
    const [filterValue, setFilterValue] = useState("")

    useEffect(async () => {


        const url1 = 'Login/AllAgents/'
        const allAgents = await axios({
            method: "post",
            url: `${common.baseUrl}${url1}`,
            headers:{
                Authorization:`Token ${localStorage.getItem('token')}`
            },
            data:{
                all_agents:false,
            }

        })
        setAllAgents(allAgents.data);

    }, [])


    return (
        <>
            <div className="suTop" style={{ marginTop: "2.5rem" }}>
                <h2>Agent Wise Purchases </h2>
                <input
                    className="std-input2"
                    style={{ padding: "0.3rem" }}
                    type="search" placeholder="Search by Name"
                    value={filterValue}
                    onChange={e => setFilterValue(e.target.value)}
                />
            </div>
            <Divider />
            <div className="agentsList">
                {
                    allAgents?.filter(item => item.name.toLowerCase().includes(filterValue.toLowerCase())).map((item, key) => {
                        return (
                            <Link className="agentCard"
                                to={"/su/purchases/purchase/" + item.agent_id}
                                key={key}>
                                <div className="basicIntro">
                                    <b style={{ display: "block" }}> {item.company_name}</b>
                                    <i>{item.name}</i>
                                    <p>{item.user.email}</p>
                                    <p>{item.mobile_no}</p>

                                </div>
                                <div className="moreIntro">
                                    <p> {item.address.length > 50 ? item.address.slice(0, 30) + "..." : item.address}</p>
                                    <i> {item.company_name}</i>
                                    <p> {item.country}</p>
                                </div>
                                <br />
                            </Link>
                        )
                    })
                }
            </div>


        </>
    )
}

export default SuPurchaseMain
