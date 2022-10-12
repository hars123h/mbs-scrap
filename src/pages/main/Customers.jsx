import React,{useEffect,useState} from 'react'
import {motion,AnimatePresence } from "framer-motion"
import { dashboardVariants } from '../../framer'
import axios from "axios"
import EditIcon from '@mui/icons-material/Edit';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import dateFormat from 'dateformat'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import common from '../../baseUrl'
import Heading from '../../component/Heading'
import AddIcon from '@mui/icons-material/Add';
import CustomerAdd from "../../component/Dialogs/CustomerAdd"
import StyledEngineProvider from "@mui/material/StyledEngineProvider";
import currency from 'currency.js';


const Customers = ({customers}) => {

    const [editable,setEditable]=useState({})
    const [open,setOpen]=useState(false)
    document.title="Customers - Agent - MBS Auto Avenue"
    // const [filterBy,setFilterBy]=useState({name:"",address:"",mob_no:"",con_add:"",country:"",wb:0}) 
    // const [filterBar,setFilterBar]=useState(false)

    const deleteParticularCustomer=async(id)=>{
       
        const confirmation=window.prompt("Type "+id+" to delete this particular user");
        if(parseInt(confirmation)===id){
            const result=await axios({
                method:"delete",
                url:`${common.baseUrl}Login/ClientDetails/${id}`,
                headers:{
                    Authorization:`Token ${localStorage.getItem("token")}`
                },
            })
            if(result.status===204){
                window.location.reload()
            }else
            {
                alert("Something went wrong.")
            }
        }
        else{
            console.log("Plan dropped!")
        }
    }

    const handleClickOpen = (id,name,address,mobile_no,consignee_address,country) => {
        setEditable({id:id,name:name,address:address,mobile_no:mobile_no,consignee_address:consignee_address,country:country})
        setOpen(true);
      };
    
    const handleClose=()=>{
        setOpen(false)
    }
    
    const editCustomer=async()=>{
        const result = await axios({
            method:"post",
            url:`${common.baseUrl}Login/ClientDetails/${editable.id}`,
            headers:{
                Authorization:`Token ${localStorage.getItem("token")}`
            },
            data:{
               name:editable.name,
               address:editable.address,
               mobile_no:editable.mobile_no,
               consignee_address:editable.consignee_address,
               country:editable.country
            }
        })
        if(result.status===200){
            window.location.reload()
        }
        else{
            alert("Something went wrong.")
        }
    }
    return (
        <div 
         className="phContainer"
         >
              <Heading title="Customers"/>
              <div className="customerListContainer">
                <div className="header">
                    <h2>Customer List</h2>
                    <div>  
                       <CustomerAdd/>
                    </div>
                </div>
                <div className="customerList"
                    style={{fontWeight:"bold",background:"white"}}
                    // onClick={()=>setFilterBar(!filterBar)}
                >
                           <p>Name</p>
                           <p>Address</p>
                           <p>Mobile Number</p>
                           <p>Consignee Address</p>
                           <p>Country</p>
                           <p>Email</p>
                </div>
                {/* {
                        filterBar&&
                        <AnimatePresence>
                        <motion.div 
                            initial={{opacity:0,height:0}}
                            animate={{opacity:1,height:"auto"}}
                            exit={{opacity:0,height:0}}
                            className="customerList"
                            style={{fontWeight:"bold"}}
                            >
                                    <input 
                                    className="filter-input"
                                    type="text"
                                    placeholder="Name"
                                    value={filterBy.name}
                                    onChange={e=>setFilterBy({...filterBy,name:e.target.value.toLowerCase()})}
                                    />
                                    <input 
                                    type="text"
                                    className="filter-input"
                                    placeholder="Address"
                                    value={filterBy.address}
                                    onChange={e=>setFilterBy({...filterBy,address:e.target.value.toLowerCase()})}
                                    />

                                    <input 
                                    type="text"
                                    className="filter-input"
                                    placeholder="Mobile Number"
                                    value={filterBy.mob_no}
                                    onChange={e=>setFilterBy({...filterBy,mob_no:e.target.value})}
                                    />
                                    <input 
                                    type="text"
                                    className="filter-input" 
                                    placeholder="Consignee Address"
                                    value={filterBy.con_add}
                                    onChange={e=>setFilterBy({...filterBy,con_add:e.target.value.toLowerCase()})}
                                    />
                                    <input 
                                    type="text"
                                    className="filter-input" 
                                    placeholder="Country"
                                    value={filterBy.country}
                                    onChange={e=>setFilterBy({...filterBy,country:e.target.value.toLowerCase()})}
                                    />
                                    <input 
                                    type="number"
                                    className="filter-input" 
                                    placeholder="Wallet Balance"
                                    value={filterBy.wb}
                                    onChange={e=>setFilterBy({...filterBy,wb:e.target.value})}
                                    />
                        </motion.div>
                        </AnimatePresence>
                    }    */}
                     {customers.map((item,key)=>{
                                        return(
                                            <div className="customerList"
                                            key={key}
                                            >
                                                <p>{item.name}</p>
                                                <p>{item.address}</p>
                                                <p>{item.mobile_no}</p>
                                                <p style={{paddingRight:"5px"}}>{item.consignee_address}</p>
                                                <p>{item.country}</p>
                                                <p>{item?.email}</p>
                                                <div className="controls">
                                                    <EditIcon
                                                        style={{marginRight:"0.5rem",cursor:"pointer"}}
                                                        onClick={()=>handleClickOpen(item.id,item.name,item.address,item.mobile_no,item.consignee_address,item.country)}
                                                    />
                                                    <DeleteOutlineOutlinedIcon
                                                        style={{marginRight:"0.5rem",cursor:"pointer"}}
                                                        onClick={()=>deleteParticularCustomer(item.id)}
                                                    />
                                                </div>
                                                
                                                </div>
                                        )
               })}
             </div>
             <StyledEngineProvider injectFirst>
                <Dialog onClose={handleClose} open={open}>
                    <p style={{margin:"1rem 1rem 0 1rem",fontSize:"1.5rem",fontWeight:"bold",fontFamily:"Montserrat"}}>Edit Customer</p>
                    <div className="dialogEditBoxContainer">
                        <div>
                            <span>Name</span>
                            <input type="text" 
                            className="std-input2"
                            value={editable.name}
                            onChange={(e)=>setEditable({...editable,name:e.target.value})}
                            />
                        </div>
                        <div>
                            <span>Address</span>
                            <input type="text" 
                            className="std-input2"
                            value={editable.address}
                            onChange={(e)=>setEditable({...editable,address:e.target.value})}
                        />
                        </div>
                        <div>
                            <span>Mobile Number</span>
                            <input type="text" 
                            className="std-input2"
                            value={editable.mobile_no}
                            onChange={(e)=>setEditable({...editable,mobile_no:e.target.value})}
                        />
                        </div>
                        <div>
                            <span>Consignee Address</span>
                            <input type="text"
                            className="std-input2"
                            value={editable.consignee_address}
                            onChange={(e)=>setEditable({...editable,consignee_address:e.target.value})}/>
                            </div>
                        <div>
                            <span>Country</span>
                            <input type="text"
                            className="std-input2"
                            value={editable.country}
                            onChange={(e)=>setEditable({...editable,country:e.target.value})}/>
                            </div>
                        <button 
                        className="std-button-sun"
                        onClick={editCustomer}
                        >Confirm</button>
                    </div>
                </Dialog>
            </StyledEngineProvider>

        </div>
    )
}

export default Customers
