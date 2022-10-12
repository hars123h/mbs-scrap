import axios from 'axios'
import React,{useEffect,useState} from 'react'
import { useParams,useHistory,NavLink,Link } from 'react-router-dom'
import Navbar from '../../component/Navbar'
import dateFormat from 'dateformat'
import common from '../../baseUrl';
import Search from "../../component/Search";


const ByLotNumber = () => {
    const [results,setResults]=useState([])

    const history=useHistory()
    const {lotNumber}=useParams()
    const [lotNo,setLotNo]=useState(lotNumber);
  const [nav, setNav] = useState("")


    useEffect(()=>{
        const bylotNumber=async()=>{
            const response=await axios.get(`${common.baseUrl}Cars/LotNo/?lot_no=${lotNumber.toUpperCase()}`)
            setResults(response.data)
        }
        bylotNumber()
    },[])
    const sendDataToParent = (i) => { // the callback. Use a better name
        // console.log("Checking HOME", index);
        // setDrive(index);
        setNav(i)
      };

    return (
        <div>
            <Navbar/>
            <div className="heroContainer bugSearch fxwidth">

          <Search sendDataToParent={ sendDataToParent} />
        </div>
            <div className="searchByLotNoContainer">
                <div className="sblnpart1">
                    <div>
                      <Link style={{color:"black"}} to="/">Home</Link>
                      <h1>Search Results({results.length})</h1>
                    </div>
                    <div className="searchOnResultsLotNo">
                            <input 
                            placeholder="Lot Number"
                            type="text" 
                            value={lotNo} 
                            onChange={e=>setLotNo(e.target.value)}/>
                            <button 
                            className="std-button-search"
                            onClick={()=>history.push("/results/lotnumber/"+lotNo)}
                            >Search</button>
                    </div>
                </div>
               <div>
                        <div className="searchCar">
                            <b> Make </b>
                            <b> Color</b>
                            <b> Engine CC</b>
                            <b> Model</b>
                            <b> Auction Date</b>
                        </div>
                        {results.map((car,key)=>{
                            return(
                                <div key={key}
                                onClick={()=>localStorage.getItem("token") ? window.location.href=`/specific_car/${car.id}`:window.location.href="/login"}
                                className="searchCar">
                                    <div>
                                        <p>{car.make}</p>
                                        <b>{car.car_name}</b>
                                    </div>
                                    <p>{car.color}</p>
                                    <div> 
                                        <b>{car.engine_cc}</b>
                                    </div>
                                    <p>{car.model}</p>
                                    <p>{car.auction_date!==null?dateFormat(car.auction_date,"mmmm dS, yyyy"):<span style={{background:"#8a28d9",fontWeight:"bold",color:"white",padding:"0.5rem",borderRadius:"0.3rem"}}>One Price</span>}</p>
                                    <img src={car.url} alt={"car image"+key}/>
                                </div>
                            )
                        })}

               </div>
              



            </div>
        </div>
    )
}

export default ByLotNumber



// api/login/ post request, aur email, and password