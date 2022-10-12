import { Divider } from '@mui/material'
import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { Link } from "react-router-dom"
import AddAgentSuper from "../../component/Dialogs/AddAgentSuper"
import Agents from '../Superuser/Agents'
import SaAgentsList from './SaAgentsList'
import common from '../../baseUrl'

const agents = [
  {
    agent_id: 43,
    name: "ravin",
    address: "japan",
    country: "japan",
    mobile_no: 4934739434739,
    company_name: "MBS Auto",
    user: [
      {
        username: "dfdfd",
        email: "pravin@gmail.com"
      }
    ]
  },
  {
    agent_id: 4,
    name: "pravin",
    address: "japan",
    country: "japan",
    mobile_no: 4934739434739,
    company_name: "MBS Auto",
    user: [
      {
        username: "dfdfd",
        email: "pravin@gmail.com"
      }
    ]
  }

]
function SaAgentsAdmins() {
  const[allAdmins, setAllAdmins] = useState()
  const[allAgents, setAllAgents] = useState()
  const [setBg, setSetBg] = useState(true)
  const [filterValue, setFilterValue] = useState("")
  const [adminAgent, setAdminAgent] = useState(true)


useEffect(async()=>{
      
       
          const url1 = 'Login/AllAgents/'
          const allAgents = await axios({
                    method:"get",
                    url:`${common.baseUrl}${url1}`,
                    data: {
                      all_agents: true,
                    }
                    
          })
          setAllAgents(allAgents.data);
        
      
          const url2 = 'Login/AllHeadAdmin/'
          const allAdminsList = await axios({
                    method:"get",
                    url:`${common.baseUrl}${url2}`
          })
          setAllAdmins(allAdminsList.data);
        
       
},[])


  const handleSearchAgetns = () => {
    return (allAdmins?.filter((item) => {
      return (
        filterValue ? item?.name.toLowerCase().includes(filterValue) || item.name.toLowerCase().includes(filterValue) : item
      )
    })
    );
  };
  return (
    <div className='saagent'>
      <div className="saagent__button">
        <button onClick={() =>{ setSetBg(true);setAdminAgent(true)}} className={setBg ? 'std-button-search' : 'std-button-2'}
        >Admin</button>
        <button onClick={() => {setSetBg(false); setAdminAgent(false)}} className={setBg ? 'std-button-2' : 'std-button-search'}>Agents</button>
      </div>
      {
        adminAgent ?
          <div>
            <div className="suSectionHeading">
              <h2>Management - All Admins </h2>
              <div className="flexRow">
                <AddAgentSuper title = 'Admins' Admin={true}/>
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
            <div className="agentsList">
              {
                handleSearchAgetns()?.map((item, key) => {
                  return (
                    <Link className="agentCard"
                      to={"/sa/admin/" + item.head_admin_id}
                      key={key}>
                      <div className="basicIntro">
                        <b style={{ display: "block" }}> {item.company_name}</b>
                        <i>{item.name}</i>
                        <p>{item.user.email}</p>
                      </div>
                      <div className="moreIntro">
                        <p> {item.address?.length > 50 ? item.address.slice(0, 30) + "..." : item.address}</p>
                        <p> {item.country}</p>
                        <p>{item.mobile_no}</p>
                      </div>
                      <br />
                    </Link>
                  )
                })
              }
            </div>
          </div>:
          <>
          <h2>

              <SaAgentsList allAgents = {allAgents}/>
          </h2>
          </>
     }
    </div>
  )
}

export default SaAgentsAdmins