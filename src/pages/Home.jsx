import React,{useState,useEffect,useRef} from "react";
import {NavLink, Route,Switch,useHistory,Link} from "react-router-dom"
import Navbar from "../component/Navbar"
import '../styling/main.css';
import "../component/makeBidDialog.css"
import Search from  "../component/Search";
import FAQS from "../component/FAQS"
import Services from '../component/Services'
import Model from "../component/Model"
import Footer from "../component/Footer";
import Slide from "react-reveal/Slide"
import cover from "../static/herocontainer.mp4"
import PlayArrowOutlinedIcon from '@material-ui/icons/PlayArrowOutlined';
import CancelIcon from '@mui/icons-material/Cancel';
import PauseOutlinedIcon from '@material-ui/icons/PauseOutlined';
import SearchIcon from '@mui/icons-material/Search';
import {Dialog,DialogTitle,Box} from '@mui/material'
import {motion} from "framer-motion"
import {trendingVehicles} from "../framer";
import StyledEngineProvider from "@mui/material/StyledEngineProvider";
import common from "../baseUrl"
import axios from "axios"
import {error} from "../component/Toast"
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import ReportIcon from '@mui/icons-material/Report';

function Home({activeLink}) {


  
  const history=useHistory();

  const [play,setPlay]=useState(true)
  const [lotNo,setLotNo]=useState("")
  const [onePrice,setOnePrice]=useState([])
  const [showalert,setshowAlert]=useState(true)
  const [nav, setNav] = useState("")
 
  
 
  document.title="Home - MBS"
  const [open, setOpen] = useState(false);

  useEffect(()=>{
    const getOnePriceVehicle=async()=>{
         const response=await axios({
           method:"get",
           url:`${common.baseUrl}Cars/OnePrice/?page_size=8`
         })
         if(response.status===200){
           setOnePrice(response.data.results)
         }else{
           error("Failed to fetch information.")
         }
    }
    getOnePriceVehicle()
  },[])




  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const playpause=()=>{
     const vid=document.getElementsByTagName("video")[0]
     play?vid.pause():vid.play();
     setPlay(!play)

  }

  const searchByLot=async()=>{
    if(lotNo!=null){
      history.push(`/results/lotnumber/${lotNo}`)
    }else
    {
      alert("Please provide a proper lot number")
    }

  }

  const sendDataToParent = (i) => { // the callback. Use a better name
    // console.log("Checking HOME", index);
    // setDrive(index);
    setNav(i)
  };
  // console.log("NaYYv", nav)



  return (
     <div>
       {/* {
         showalert && 
         <p className="alertTextBanking">
         <CancelIcon className="closeicon" onClick={()=>setshowAlert(!showalert)} />  
          BEWARE OF SCAMS ADVISING MONEY TRANSFERS TO FAKE ACCOUNTS!
          <br/>
          <Link to="/banking_information">MBS Bank Account Details <OpenInNewIcon/></Link>
        </p>
       } */}

      <Navbar searchActive= {nav} />

      <div className="heroContainer fixwidth">
           
        <video autoPlay  muted loop>
          <source src={"https://mbs-jp-space.nyc3.digitaloceanspaces.com/frontend/herocontainer.mp4"} type="video/mp4" />
        </video>
        <Search sendDataToParent={ sendDataToParent} />
       
        <div className="textInContainerFlex">
              <div className="textInContainer">
              {/* <h3>Portofino Blue Edition</h3> */}
              <h1>Find your Vehicle</h1>
            </div>
            <button className="buttonInContainer" onClick={playpause}>
              {!play?<PlayArrowOutlinedIcon style={{fontSize:"2rem"}}/>:<PauseOutlinedIcon style={{fontSize:"2rem"}} />}
            </button>
        </div>
      </div>


      <div className="searchby fixwidth">

        {/* <div className="searchbyLinks">
           <NavLink  activeClassName="selectedLink" exact={true} to="/" className="navbarLink">Brands</NavLink>
         </div> */}
         <Switch>
            <Route exact path="/" component={Model} />
         </Switch>
      </div>


      <div className="trendingContainer fixwidth">
        <div className="trendingSectionHeading">
          <div className="title">
            <h1 className="std-heading1">One Price Vehicles</h1>
            {/* <h3 className="std-helping-text1">Every Land Rover is crafted to reflect bold design with genuine capability and composure at heart.</h3> */}
          </div>
        </div>
        <div className="trendingGallery">
            {
              onePrice.map((item,index)=>{
                return(
                <Slide 
                key={index}
                up>
                  <Link to={localStorage.getItem("token") ? `/specific_car/${item.id}`:"/login"}>
                      <div
                      className="trendingItem"
                      >
                          <div  className="trendingMainItem" 
                          style={{
                          background:`linear-gradient(rgba(0,0,0,0.3),rgba(0,0,0,0.3))`,
                          backgroundSize:"cover",
                          backgroundPosition:"Center"}}
                          >
                            <motion.img 
                            layoutId={"TRENDING_VEHICLE_IMG"+index}
                            animate={trendingVehicles.animate}
                            src={item.url} 
                            alt="car image"/>
                            <div>
                                <motion.p
                                className="brand"
                                layoutId={"TRENDING_VEHICLE_P_BRAND"+index}
                                animate={trendingVehicles.animate}
                                >{item.brand}</motion.p>
                                <motion.p className="name">{item.car_name}</motion.p>
                            </div>
                            <p className="pricevaluetd">
                              {"¥ "+item.start_or_one_price}K</p>
                          </div>

                      </div>
                  </Link>
                </Slide>
                )
              })
            }
        
        </div>
        <Box
         sx={{display:"flex",justifyContent:"Center"}}
        >
          <Link 
          to={`/search_results/brand/null/name/null/model/null/min_year/1900/max_year/2100/min_engine/0/max_engine/10000000/odo_min/0/odo_max/100000/bid/false/one_price/true`}
          className="std-button-sun" style={{display:"inline-block",margin:"2rem auto"}}>
            View all
          </Link>
        </Box>
      </div>



      <Services/>



      <div className="fixedButton"  onClick={handleClickOpen}>
        <SearchIcon/>
      </div>


      {
        showalert &&
        <div className="fixedButtonRight">
        <Link to="/banking_information">
        
          <div className="fixedButtonRight">
            <ReportIcon className="reporticon" fontSize="large" />
          </div>
         
        </Link>
        <CancelIcon className="fixedButtonTop"  onClick={() => setshowAlert(!showalert)} />
      </div>
      }




      <StyledEngineProvider injectFirst>
        <Dialog
          open={open}
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
        >
          <div  style={{padding:"3rem",outline:"2px solid #8a28d9",outlineOffset:"-20px"}}>
              <DialogTitle style={{textAlign:"center",fontFamily:"Montserrat"}}>Search By Lot Number</DialogTitle>
                <div className="searchByLotContainer">
                    <input 
                    placeholder="Enter Lot Number"
                    type="text" 
                    value={lotNo} 
                    onChange={e=>setLotNo(e.target.value)}/>
                    <button 
                      onClick={searchByLot}
                      className="std-button-search"
                    >Search</button>
                  </div>
            </div>
        </Dialog>
      </StyledEngineProvider>

      <FAQS/>

      <Footer/>

     </div>
  );
}

export default Home;
