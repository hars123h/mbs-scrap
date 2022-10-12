import React,{useEffect,useState} from 'react'
import axios from "axios"
import { Divider } from '@mui/material'
import { Link,useParams } from 'react-router-dom'
import common from '../../baseUrl'
import Heading from '../../component/Heading'
import AddAgentSuper from "../../component/Dialogs/AddAgentSuper"

const Agents = ({agentList}) => {

    const [filterValue,setFilterValue]=useState("")

    document.title="Management - MBS Auto Avenue"
   

    return (
        <>
            <div className="suSectionHeading" style={{marginTop:"3rem"}}>
                <h2>Management - All Agents </h2>
                <div className="flexRow">
                    <AddAgentSuper Agent InnerAdmin/>
                    <input 
                    style={{padding:"0.3rem",marginLeft:"1rem"}}
                    className="std-input2"
                    type="search" placeholder="Search by Name"
                    value={filterValue}
                    onChange={e=>setFilterValue(e.target.value)}
                    />
                </div>

            </div>
            <Divider/>
            <div className="agentsList">
                {
                    agentList?.filter(item=>item.user?.username.toLowerCase().includes(filterValue.toLowerCase())).map((item,key)=>{
                        return(
                            <Link className="agentCard"
                            to={"/su/agent/"+item.agent_id}
                            key={key}>
                                <div className="basicIntro">
                                    <b style={{display:"block"}}> {item.company_name}</b>
                                    <i>{item.name}</i>
                                    <p>{item.user.email}</p>
                                </div>
                                <div className="moreIntro">
                                    <p> {item.address.length>50?item.address.slice(0,30)+"...":item.address}</p>
                                    <p> {item.country}</p> 
                                    <p>{item.mobile_no}</p>
                                </div>
                                <br/>
                            </Link>
                        )
                    })
                }
            </div>
        </>
    )
}

export default Agents
