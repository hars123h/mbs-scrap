import { Divider } from '@mui/material';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import "../../styling/saAgents.css"
import AddAgentSuper from "../../component/Dialogs/AddAgentSuper"

function SaAgentsList(props) {
 
    const [filterValue, setFilterValue] = useState("")
    const handleSearchAgetns = () => {
        return (props.allAgents?.filter((item) => {
            return (
                filterValue ? item.name?.toLowerCase().includes(filterValue) || item.company_name.toLowerCase().includes(filterValue) : item
            )
        })
        );
    };
    return (

        <div>
            <div className="saSectionHeading">
                <h2>Management - All Agents </h2>
                <div className="flexRow">
                    <AddAgentSuper title ='Agents' Agent ={true} InnerAdmin = {false} />
                    <input
                        style={{ padding: "0.3rem", marginLeft: "1rem" }}
                        className="std-input2"
                        type="search" placeholder="Search by Name"
                        value={filterValue}
                        onChange={e => setFilterValue(e.target.value)}
                    />
                </div>

            </div>
            <Divider />
            <div className="saAgentsList">
                {
                    handleSearchAgetns()?.map((item, key) => {
                        return (
                            <Link className="saagentCard"
                                to={"/sa/agent/" + item.agent_id}
                                key={key}>
                                <div className='saagentCard__top'>
                                    <h3>{item.company_name}</h3>
                                    <i>{item.name}</i>
                                </div>
                                <div className='saagentCard__moreInfo'>
                                    <p> {item.address.length > 50 ? item.address.slice(0, 30) + "..." : item.address}</p>
                                    <p> {item.country}</p>
                                    <p>{item.mobile_no}</p>
                                    <div>
                                    </div>

                                </div>


                            </Link>
                        )
                    })
                }
            </div>
        </div>


    )
}

export default SaAgentsList