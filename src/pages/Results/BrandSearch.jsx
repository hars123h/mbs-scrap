import React,{useState,useEffect} from 'react'
import { useParams } from 'react-router'
import axios from "axios"

const BrandSearch = () => {

    const {brand}=useParams()
    // useEffect(()=>{
    //     const fetchingResults=async()=>{
    //         const response=await axios.get(`http://127.0.0.1:8000/api/cars/?min_engine_cc=NULL&max_engine_cc=NULL&min_odo_km=NULL&max_odo_km=NULL&make=${brand.toUpperCase()}&car_name=NULL&model=NULL&color=NULL&score=NULL&insp__is_empty=false&year=NULL&search=NULL`)
    //         console.log(response)    
    //     }
    //     fetchingResults()
    // },[])
    return (
        <div>
         <div className="searchContainer">
              <div className="result">
                <p>alfa romeo</p>
                <h1>MiTo Imola Limited Editio</h1>
                <p>955141 1400</p>
                <p>Yellow</p>
              </div>

         </div>    
        </div>
    )
}

export default BrandSearch
