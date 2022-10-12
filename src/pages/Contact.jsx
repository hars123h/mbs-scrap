import React,{useState} from 'react'
import Navbar from "../component/Navbar"
import SendIcon from '@mui/icons-material/Send';
import {success,error} from "../component/Toast"
import axios from "axios"
const Contact = () => {
 
    const [formObj,setFormObj]=useState({name:"",_replyto:"",phone:"",message:""})

    const sendContactMail=async()=>{
        const response=await axios({
            method:"post",
            url:"https://formspree.io/f/mvolpwzq",
            data:{
                ...formObj
            }
        })
        if(response.status===200){
            setFormObj({name:"",_replyto:"",message:""})
            success("Your mail is sent. We will contact you as soon as possible.")
        }else{
            error("Oops. Something went wrong")
        }
    }

    return (
     <>
        <Navbar/>
        <div className="contactContainer">
            <div className="contactMain">
                <div className="contactImg">
                     <img src="https://i.pinimg.com/originals/5d/2d/95/5d2d955df2895ca18dec554b0e716042.jpg" alt="Contact Image Address"/>
                </div>
                <div className="contactForm">
                     <h1>Get In Touch</h1>
                     <div className="form">
                         <input 
                           type="text"
                           className="std-input2"
                           placeholder="Name"
                           name="name"
                           value={formObj.name}
                           onChange={e=>setFormObj({...formObj,name:e.target.value})}
                          />
                         <input 
                           type="text"
                           className="std-input2"
                           name="_replyto"
                           placeholder="Email"
                           value={formObj._replyto}
                           onChange={e=>setFormObj({...formObj,_replyto:e.target.value})}
                          />
                           <input 
                           type="text"
                           className="std-input2"
                           name="phone"
                           placeholder="Phone Number"
                           value={formObj.phone}
                           onChange={e=>setFormObj({...formObj,phone:e.target.value})}
                          />
                         <textarea 
                           type="text"
                           className="std-input2"
                           name="message"
                           placeholder="Your Message"
                           value={formObj.message}
                           onChange={e=>setFormObj({...formObj,message:e.target.value})}
                          >
                          </textarea>
                          <button 
                          onClick={sendContactMail}
                          className="std-button-sun"><span >Send</span><SendIcon/></button>
                     </div>
                </div>
            </div>
        </div>
    </>
    )
}

export default Contact
