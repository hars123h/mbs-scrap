import React,{useRef} from 'react'
import {Avatar,Menu,MenuItem} from '@mui/material';
import {fl1} from "../../array"
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { dashboardVariants } from '../../framer';
import {motion} from "framer-motion"
import dateFormat from "dateformat"
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';
import Heading from '../../component/Heading';
import common from '../../baseUrl';
import {Link} from "react-router-dom"
import LooksOneIcon from '@mui/icons-material/LooksOne';

import NavigateNextOutlinedIcon from '@material-ui/icons/NavigateNextOutlined';
import NavigateBeforeOutlinedIcon from '@material-ui/icons/NavigateBeforeOutlined';

import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

function Dashboard({favList}) {

    document.title="Fav. List - Agent - MBS Auto Auction"
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
  
    // console.log(favList)
    const FLA= favList.filter((item)=>item.bucket==="A")
    const FLB= favList.filter((item)=>item.bucket==="B")
    const FLC= favList.filter((item)=>item.bucket==="C")
    const FLD= favList.filter((item)=>item.bucket==="D")


    const moveToAnotherBucket=async(id,newBucket)=>{
        const result=await axios({
            method:"post",
            url:`${common.baseUrl}Wishlist/AddToWishlist/`,
            headers:{
                Authorization:`Token ${localStorage.getItem("token")}`
            },
            data:{
                car_id:id,
                bucket:newBucket
            }
        })
        if(result.status===200)
        {
            window.location.reload()
        }
    }

    const removeCarFromBasket=async(id)=>{
        const result= await axios({
            method:"delete",
            url:`${common.baseUrl}Wishlist/AddToWishlist/`,
            headers:{
                Authorization:`Token ${localStorage.getItem('token')}`
            },
            data:{
                car_id:id
            }
        })
        if(result.status===204){
            window.location.reload()
        }else
        {
            console.log(result)
        }
    }

    const customSlider=useRef();
    const customSlider2=useRef();
    const customSlider3=useRef();
    const customSlider4=useRef();

    const settings = {
        lazyLoad:true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1
      };
    
    return (
        <div 
         className="dashboardCont"
        >
            <Heading title="Your Favourite List"/>
            <div className="dbcMain">
                <div style={{margin:"4rem"}}>
                  {/* Favourites,current bids, all bids, todays bid,purchase history, reminder,  */}
                </div>
                <div className="dbcsecond">
                    <div className="heading">
                        <h2><span></span>Favourite List A</h2>
                        
                        <div className="controlsOfFavList"  style={{display:FLA.length<=4&&"none"}} >
                                    <button
                                        onClick={() => customSlider.current.slickPrev()}>
                                        <NavigateBeforeOutlinedIcon/>
                                    </button>
                                    <button onClick={() => customSlider.current.slickNext()}
                                    >
                                        <NavigateNextOutlinedIcon/>
                                    </button>
                        </div>
                    </div>
                    <div className="fonelist">
                        {FLA.length===0 ? 
                            <>
                             <p>Empty List</p>
                            </>
                            :
                            <Slider 
                                ref={slider => (customSlider.current = slider)}
                                {...settings}
                            >
                                {
                                FLA.map((item,key)=>{
                                    return(
                                    <div className="fcar fone" key={key}>
                                        <div>
                                            <div  className="cardDots">
                                                {["B","C","D"].map((x,key)=>{
                                                    return <button key={key} onClick={()=>moveToAnotherBucket(item.cardetails.id,x)}>{x}</button>
                                                })}
                                                <button onClick={()=>removeCarFromBasket(item.cardetails.id)}>✖</button>
                                            </div>
                                            <img src={item.cardetails.url} alt={key}/>
                                            <Link to={`/specific_car/${item.cardetails.id}`}>
                                            <div className="cardBody">
                                                <p><b>{item.cardetails.car_name}</b><br/></p>
                                                <h1>Lot Number {item.cardetails.lot_no}</h1>                                         
                                            </div>    
                                            </Link>
                                        </div>
                                    </div>
                                    )
                                })
                                }
                            </Slider>                     
                           }
                    </div>
                    <div className="heading">
                        <h2><span style={{background:"yellow"}}></span>Favourite List B</h2>
                        
                        <div className="controlsOfFavList"  style={{display:FLB.length<=4&&"none"}}>
                                    <button onClick={() => customSlider2.current.slickPrev()}>
                                        <NavigateBeforeOutlinedIcon/>
                                    </button>
                                    <button onClick={() => customSlider2.current.slickNext()}
                                    >
                                        <NavigateNextOutlinedIcon/>
                                    </button>
                        </div>
                    </div>
                    {/* <h2><span style={{background:"yellow"}}></span>Favourite List B</h2> */}
                    <div className="fonelist">
                        {FLB.length===0 ? 
                            <p>Empty</p> 
                            :
                            <Slider 
                            ref={slider => (customSlider2.current = slider)}
                            {...settings}
                             >
                             {
                                FLB.map((item,key)=>{
                                    return(
                                    <div className="fcar fone" key={key}>
                                        <div>
                                            <div  className="cardDots">
                                                {["A","C","D"].map((x,key)=>{
                                                    return <button key={key} onClick={()=>moveToAnotherBucket(item.cardetails.id,x)}>{x}</button>
                                                })}
                                                <button onClick={()=>removeCarFromBasket(item.cardetails.id)}>✖</button>
                                            </div>
                                            <img src={item.cardetails.url} alt={key}/>
                                            <Link to={`/specific_car/${item.cardetails.id}`}>
                                            <div className="cardBody">
                                                <p><b>{item.cardetails.car_name}</b><br/></p>
                                                <h1>Lot Number {item.cardetails.lot_no}</h1>                                         
                                            </div>    
                                            </Link>
                                        </div>
                                    </div>
                                    )
                                })
                                }
                            </Slider>                           }
                    </div>
                    <div className="heading">
                        <h2><span style={{background:"#39FF14"}}></span>Favourite List C</h2>
                        
                        <div className="controlsOfFavList"   style={{display:FLC.length<=4&&"none"}} >
                                    <button onClick={() => customSlider3.current.slickPrev()}>
                                        <NavigateBeforeOutlinedIcon/>
                                    </button>
                                    <button onClick={() => customSlider3.current.slickNext()}
                                    >
                                        <NavigateNextOutlinedIcon/>
                                    </button>
                        </div>
                    </div>
                    <div className="fonelist">
                        {FLC.length===0 ? 
                            <p>Empty</p> 
                            :
                            <Slider 
                            ref={slider => (customSlider3.current = slider)}
                            {...settings}
                             >
                             {
                                FLC.map((item,key)=>{
                                    return(
                                    <div className="fcar fone" key={key}>
                                        <div>
                                            <div  className="cardDots">
                                                {["A","B","D"].map((x,key)=>{
                                                    return <button key={key} onClick={()=>moveToAnotherBucket(item.cardetails.id,x)}>{x}</button>
                                                })}
                                                <button onClick={()=>removeCarFromBasket(item.cardetails.id)}>✖</button>
                                            </div>
                                            <img src={item.cardetails.url} alt={key}/>
                                            <Link to={`/specific_car/${item.cardetails.id}`}>
                                            <div className="cardBody">
                                                <p><b>{item.cardetails.car_name}</b><br/></p>
                                                <h1>Lot Number {item.cardetails.lot_no}</h1>                                         
                                            </div>    
                                            </Link>
                                        </div>
                                    </div>
                                    )
                                })
                                }
                            </Slider>                  
                         }
                    </div>
                    <div className="heading">
                        <h2><span style={{background:"#00CCFF"}}></span>Favourite List D</h2>
                        
                        <div className="controlsOfFavList"   style={{display:FLD.length<=4&&"none"}}>
                                    <button onClick={() => customSlider4.current.slickPrev()}>
                                        <NavigateBeforeOutlinedIcon/>
                                    </button>
                                    <button onClick={() => customSlider4.current.slickNext()}
                                    >
                                        <NavigateNextOutlinedIcon/>
                                    </button>
                        </div>
                    </div>
                    <div className="fonelist">
                        {FLD.length===0 ? 
                            <p>Empty</p> 
                            :
                            <Slider 
                            ref={slider => (customSlider4.current = slider)}
                                {...settings}
                             >
                             {
                                FLD.map((item,key)=>{
                                    return(
                                    <div className="fcar fone" key={key}>
                                        <div>
                                            <div  className="cardDots">
                                                {["A","B","C"].map((x,key)=>{
                                                    return <button key={key} onClick={()=>moveToAnotherBucket(item.cardetails.id,x)}>{x}</button>
                                                })}
                                                <button onClick={()=>removeCarFromBasket(item.cardetails.id)}>✖</button>
                                            </div>
                                            <img src={item.cardetails.url} alt={key}/>
                                            <Link to={`/specific_car/${item.cardetails.id}`}>
                                                <div className="cardBody">
                                                    <p><b>{item.cardetails.car_name}</b><br/></p>
                                                    <h1>Lot Number {item.cardetails.lot_no}</h1>                                         
                                                </div>    
                                            </Link>
                                        </div>
                                    </div>
                                    )
                                })
                                }
                            </Slider>                  
                         }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard