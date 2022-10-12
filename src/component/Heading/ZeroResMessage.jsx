import React from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useHistory } from 'react-router-dom';

const ZeroResMessage = ({message="Zero Results"}) => {
    const history=useHistory()

    return (
        <div className="zeroresContainer" >
            <div>
                <div className="backButton1" onClick={()=>history.goBack()}> 
                        <ArrowBackIcon/>
                        <span>Back</span>
                    </div>
                    <h1>{message}</h1>
            </div>
        </div>
    )
}

export default ZeroResMessage
