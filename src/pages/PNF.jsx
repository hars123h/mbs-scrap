import React from 'react'
import Button from "@mui/material/Button"

const PNF = () => {
    return (
        <div className="pnfcontainer">
         <div className="pnfmain">
            <h1>404</h1>   
            <p>Page Not Found</p>
            <div style={{margin:"1rem auto",textAlign:"Center"}}>
                <Button
                onClick={()=>window.location.href="/"}
                style={{color:"black"}}>Home </Button>
                <Button 
                onClick={()=>window.location.href="/contact"}
                style={{color:"black",marginLeft:"1rem"}} variant="outlined">Contact Us</Button>
            </div>
         </div>
         
        </div>
    )
}

export default PNF
