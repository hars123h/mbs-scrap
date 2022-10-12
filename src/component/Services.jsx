import React,{useState} from 'react'
import {Box,Tooltip} from "@material-ui/core"
import {services} from "../array"
import {AnimateSharedLayout, motion} from "framer-motion"
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import GavelOutlinedIcon from '@mui/icons-material/GavelOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import DescriptionIcon from '@mui/icons-material/Description';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';

function Services() {

    const [selected, setSelected] = useState(0);
    return (
        <>
               <div className="ourServicesContainer fixwidth">
            <Box 
             display="flex"
             justifyContent="center"
            >
                <div className="oscSectionHeading">
                    <h1 className="std-heading1">Our Services</h1>
                    {/* <h3 className="std-helping-text1">{msg.ocs.subText1}<br/>{msg.ocs.subText3}<br/><br/>{msg.ocs.subText2}</h3> */}
                </div>
            </Box>

            <AnimateSharedLayout>
            <div className="services">
              {services.map((service,key)=>{
                  return(
                        <div 
                            // layout
                            // onClick={()=>setSelected(key)}
                            // style={{gridArea:selected===key?'a0':`a${key===0?selected:key}`}}
                            key={key} 
                            className="service"
                            // className={selected===key?'service activeService':" service"}>
                            >
                                {key==0&&<ManageAccountsOutlinedIcon/>}
                                {key==2&&<GavelOutlinedIcon/>}
                                {key==1&&<SearchOutlinedIcon/>}
                                {key==3&&<LocalShippingOutlinedIcon/>}
                                {key==4&&<DescriptionIcon/>}
                                {key==5&&<LocalAtmIcon/>}
                                <h3 className="std-helping-text1">{service.msg}
                                </h3>
                                    <p 
                                    // style={{gridArea:selected===key?'a0':`a${key===0?selected:key}`}}
                                    >{service.msginner}</p>
                            </div>
                  )
              })}
            </div>
            </AnimateSharedLayout>
        </div>
        {/* <div className="ourServicesContainer fixwidth">
            <Box 
             display="flex"
             justifyContent="center"
            >
                <div className="oscSectionHeading">
                    <h1 className="std-heading1">Our Services</h1>
                </div>
            </Box>

            <AnimateSharedLayout>
            <div className="services">
              {services.map((service,key)=>{
                  return(
                        <motion.div 
                            layout
                            onClick={()=>setSelected(key)}
                            style={{gridArea:selected===key?'a0':`a${key===0?selected:key}`}}
                            key={key} 
                            className={selected===key?'service activeService':" service"}>
                                {key==0&&<ManageAccountsOutlinedIcon/>}
                                {key==1&&<GavelOutlinedIcon/>}
                                {key==2&&<SearchOutlinedIcon/>}
                                {key==3&&<LocalShippingOutlinedIcon/>}
                                {key==4&&<DescriptionIcon/>}

                                <h3 className="std-helping-text1">{service.msg}
                                </h3>
                                    <p 
                                    style={{gridArea:selected===key?'a0':`a${key===0?selected:key}`}}
                                    >{selected===key?service.msginner:service.msginner.slice(0,50)+"..." }</p>
                            </motion.div>
                  )
              })}
            </div>
            </AnimateSharedLayout>
        </div> */}
        </>
    )
}

export default Services
