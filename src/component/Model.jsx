import React from 'react'
import Slide from 'react-reveal/Slide';
import {brands} from "../array"
import Tilt from 'react-parallax-tilt'
import {useHistory} from "react-router-dom"
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css"; 
// import "slick-carousel/slick/slick-theme.css";



function Model() {

    const history=useHistory()
    return (
     <div className="searchByMakerContainer ">
        <h1 className="std-heading1" style={{textAlign:"center"}}>Search By Brands</h1>
        <div className="searchByMakerMain">
            {brands.map((brand,key)=>{
                return(
                    <Slide up>
                          <Tilt>
                            <div style={{cursor: 'pointer'}} key={key} className="brandSearch" onClick={()=>history.push(`/search_results/brand/${brand.name.trim().replace(' ', '-')}/name/null/model/null/min_year/1900/max_year/2100/min_engine/0/max_engine/10000000/odo_min/0/odo_max/100000/bid/true/one_price/true`)}>
                                    <img 
                                    className="NAVBARLOGO"
                                    src={brand.img} alt="Particular Brand Image"/>
                                </div>
                         </Tilt>
                    </Slide>
                )
            })}
        </div>
    </div>
    )
}

export default Model
