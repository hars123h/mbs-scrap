import React,{useEffect,useState} from 'react'
import axios from "axios"
import { Divider } from '@mui/material'
import { Link,useParams } from 'react-router-dom'
import common from '../../baseUrl'

const BidHistory = ({agentList}) => {


    // const [agentList,setAgentList]=useState([])
    // useEffect(()=>{
    //    const getAllAgents=async()=>{
    //       const response=await axios({
    //           method:"post",
    //           url:`${common.baseUrl}Login/AllAgents/`,
    //           headers:{
    //               Authorization:`Token ${localStorage.getItem("token")}`
    //           },
    //           data:{
    //               all_agents:true,
    //           }
    //       })
    //       console.log(response)
    //       setAgentList(response.data)

    //    }
    //    getAllAgents()
    // },[])



    return (
        <>
            <div className="suSectionHeading">
                <h2>Bid History - All Agents </h2>
            </div>
            <Divider/>
            <div className="agentsList">
                {
                    agentList.map((item,key)=>{
                        return(
                            <Link className="agentCard"
                            to={"/su/bid_history/"+item.agent_id}
                            key={key}>
                                <div className="basicIntro">
                                    <b>{item.user.username}</b>
                                    <p>{item.user.email}</p>
                                    <p>{item.mobile_no}</p>

                                </div>
                                <div className="moreIntro">
                                    <p> {item.address.length>50?item.address.slice(0,30)+"...":item.address}</p>
                                    <i> {item.company_name}</i>
                                    <p> {item.country}</p> 
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

export default BidHistory   
