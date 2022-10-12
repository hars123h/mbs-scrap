import React,{useState,useEffect} from 'react'
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import ArrowDropUpOutlinedIcon from '@material-ui/icons/ArrowDropUpOutlined';
import ArrowDropDownOutlinedIcon from '@material-ui/icons/ArrowDropDownOutlined';
import {Tooltip,FormControlLabel} from "@material-ui/core"
import {useHistory} from "react-router-dom"
import { brands,rangeEngine,rangeOdo,rangeOdo2, year1, year2 } from '../option';
import common from '../baseUrl';
import axios from "axios"
import Checkbox from '@mui/material/Checkbox';

function Search({sendDataToParent }) {
    const [expand,setExpand]=useState(false)
    const [brand,setBrand]=useState(null)
    const [models,setModels]=useState([])
    const [dropdownList2,setDropDownList2]=useState([])
    const [name,setName]=useState(null)
    const [model,setModel]=useState(null)
    const [year, setYear] = useState({ min: 1900, max: 2100 })
    const [odo,setOdo]=useState({min:"0",max:"100000000"})
    const [engine,setEngine]=useState({min:0,max:10000000})
    const [oneprice,setOnePrice]=useState(true)
    const [bid,setBid]=useState(true)
    // const [searchActive, setSearchActive] = useState("")


    const history=useHistory()

    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };


    useEffect(()=>{
        const gettingValuesForAMC=async()=>{
            const response=await axios.get(`${common.baseUrl}Cars/CarNames/?make=AMC`)
            setModels(response.data)
        }
        gettingValuesForAMC()
    },[])

    const showMore=()=>{
        setExpand(!expand)
        var amt=expand ? "90px"  : "180px"
        var mb=expand ? "9rem" : "calc(9rem + 90px)" 
        document.getElementById("smi").style.height=amt;
        document.querySelector(".heroContainer").style.marginBottom=mb;
    }
    

    const onSubmit=(e)=>{
        
        sendDataToParent("hello");
        // console.log("Navbar Issue", searchActive)
        history.push(`/search_results/brand/${brand}/name/${name}/model/${model}/min_year/${year.min}/max_year/${year.max}/min_engine/${engine.min}/max_engine/${engine.max}/odo_min/${odo.min/1000}/odo_max/${odo.max/1000}/bid/${bid}/one_price/${oneprice}`)
    }

 


    // console.log(model)
    const onChangeBrand=async(e)=>{
        setBrand(e.target.value)
        const response=await axios.get(`${common.baseUrl}Cars/CarNames/?make=${e.target.value.toUpperCase()}`)

        if(response.status===200)
         setModels(response.data)
    }
    const onChangeMake=async(e)=>{
        setName(e.target.value)
        const response=await axios.get(`${common.baseUrl}Cars/CarModels/?car_name=${e.target.value}`)
        // console.log(response.data)
        if(response.status===200)
         setDropDownList2(response.data)
    }
    const handleBidToggling=()=>{
       if(oneprice===false && bid===true){
          setOnePrice(true);
          setBid(false)
       }else if(oneprice===true){
           setBid(!bid)
       }
    }
    const handleOnePriceToggling=()=>{
        if(bid===false && oneprice===true){
           setOnePrice(false);
           setBid(true)
        }else if(bid===true){
            setOnePrice(!oneprice)
        }
     }


    return (
        <div className="searchContainer">
            <div className="searchMain">
                <div className="searchMainInner" id="smi">
                <div className="searchInput">
                        <b>Brand</b>
                        <div>
                            <select
                                onChange={(e) => onChangeBrand(e)}
                                name="cars" id="cars" value={brand}>

                                <option disable selected hidden>Brand</option>

                                {brands.slice(1,).map((item, key) => {
                                    return (
                                        <option value={item.brand} key={key}>{item.brand}</option>
                                    )
                                })}
                            </select>
                        </div>
                    </div>
                    <div className="searchInput">
                        <b>Model</b>
                        <div>
                            <select name="cars" id="cars"
                                onChange={onChangeMake}
                                value={name} >
                                <option disable selected hidden>Select</option>
                                {models.map((item, key) => {
                                    return (
                                        <option value={item.car_name} key={key}>{item.car_name} ({item.count})</option>
                                    )
                                })}
                            </select>

                        </div>
                    </div>
                    <div className="searchInput">
                        <b>Chassis</b>
                        <div>
                            <select name="cars" id="cars" value={model}
                                onChange={e => setModel(e.target.value)}>
                                <option value={null} selected>Select</option>
                                {dropdownList2.map((item, key) => {
                                    return (
                                        <option value={item.model} key={key}>{item.model}</option>
                                    )
                                })}

                            </select>

                        </div>
                    </div>
                    <div className="searchInput">
                        <b>Year</b>
                        <div style={{ border: "none" }}>
                            <select
                                style={{ borderBottom: "0.1px solid #c4c4c4" }}
                                name="cars" id="cars" value={year.min}
                                onChange={e => setYear({ ...year, min: e.target.value })}>
                                <option value="0" selected>From</option>
                                {year1.map((item, key) => {
                                    return (
                                        <option value={item}>{item}</option>
                                    )
                                })}

                            </select>
                            ~
                            <select
                                style={{ borderBottom: "0.1px solid #c4c4c4" }}
                                name="cars" id="cars" value={year.max}
                                onChange={e => setYear({ ...year, max: e.target.value })}>
                                <option value={null} selected>To</option>
                                {year2.map((item, key) => {
                                    return (
                                        <option value={item}>{item}</option>
                                    )
                                })}
                            </select>
                        </div>
                        {/* <div>
                            <select name="cars" id="cars" value={year} onChange={e => setYear(e.target.value)}>
                                {year1.map((item, key) => {
                                    return (
                                        <option value={item} key={key}>{item}km</option>
                                    )
                                })}
                            </select>
                        </div> */}
                    </div>
                    <div className="searchInput">

                        <b>Engine (cc)</b>
                        <div>
                            <select name="cars" id="cars" value={model}
                                onChange={e => { setEngine({ min: e.target.value.split("$")[0], max: e.target.value.split("$")[1] })}}>
                                <option value={"null$null"}>Any</option>
                                {rangeEngine.map((item, key) => {
                                    return (
                                        <option value={item.min + "$" + item.max} key={key}>{item.min === 0 ? item.max + " or less" : item.min === 4501 ? "Over 4501" : item.min + " - " + item.max}</option>
                                    )
                                })}

                            </select>

                        </div>
                    </div>
                    <div className="searchInput">
                        <b>Mileage</b>
                        <div style={{ border: "none" }}>
                            <select
                                style={{ borderBottom: "0.1px solid #c4c4c4" }}
                                name="cars" id="cars" value={odo.min}
                                onChange={e => setOdo({ ...odo, min: e.target.value })}>
                                <option value="0" selected>From</option>
                                {rangeOdo.map((item, key) => {
                                    return (
                                        <option value={item} key={key}>{item}km</option>
                                    )
                                })}

                            </select>
                            ~
                            <select
                                style={{ borderBottom: "0.1px solid #c4c4c4" }}
                                name="cars" id="cars" value={odo.max}
                                onChange={e => setOdo({ ...odo, max: e.target.value })}>
                                <option value={null} selected>To</option>
                                {rangeOdo2.map((item, key) => {
                                    return (
                                        <option value={item} key={key}>{item}km</option>
                                    )
                                })}
                            </select>
                            {/* <input type="number"
                            value={odo.min}
                            onChange={e=>setOdo({...odo,min:e.target.value})}
                            placeholder="Minimum" min="0" />
                            <input type="number"
                            value={odo.max}
                            onChange={e=>setOdo({...odo,max:e.target.value})}
                            placeholder="Maximum" min="0" /> */}
                        </div>
                    </div>
                </div>
                           

                <div className="searchControls">
                    <div onClick={handleBidToggling} className={!bid?"onePriceControls":"onePriceControls onePriceControlsActive"}>
                      <p>Bid</p>
                    </div>
                    <div onClick={handleOnePriceToggling} className={!oneprice?"onePriceControls":"onePriceControls onePriceControlsActive"}>
                      <p>One Price</p>
                    </div>
                    <button 
                    onClick={onSubmit}
                    className="std-button-search">
                    <SearchOutlinedIcon style={{color:"white"}}/>
                    </button>
                </div>
                <div className="showMoreLessButton" style={{cursor: 'pointer'}}>
                    <Tooltip 
                    placement="top" 
                    title={!expand?"Show More":"Show Less"} 
                    arrow>
                    {!expand 
                        ?
                        <ArrowDropDownOutlinedIcon onClick={showMore}/>
                        :
                        <ArrowDropUpOutlinedIcon onClick={showMore}/>
                    }
                    </Tooltip>
                </div>
            </div>


   
        </div>
    )
}

export default Search