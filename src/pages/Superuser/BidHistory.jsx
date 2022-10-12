import React, { useEffect, useState } from 'react'
import axios from "axios"
import { Divider } from '@mui/material'
import { Link, useParams } from 'react-router-dom'
import common from '../../baseUrl'
import SuTop from '../../component/Heading/SuTop'

const BidHistory = ({ agentList, Admin }) => {

    return (
        <>
            <SuTop title="Bid History - All Agents" />
            <div className="agentsList">
                {
                    agentList.map((item, key) => {
                        return (
                            <Link className="agentCard"
                                to={Admin?"/sa/bid_history/" + item.agent_id:"/su/bid_history/" + item.agent_id}
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

export default BidHistory
