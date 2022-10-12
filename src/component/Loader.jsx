import React,{useState} from 'react'
import { Box , CircularProgress } from '@material-ui/core'

const Loader = ({loader}) => {
    return (
        <>
            {
                loader &&  <div style={{padding:"1rem",display:"grid",placeItems:"center"}}><CircularProgress /></div>
            }
        </>
    )
}

export default Loader
