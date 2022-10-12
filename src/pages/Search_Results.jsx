import { useEffect, useState } from "react";
// import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { CircularProgress } from "@material-ui/core";
import { Pagination } from "@mui/material";
import dateFormat from "dateformat";
import Navbar from "../component/Navbar";
import { motion } from "framer-motion";
import variants from "../framer";
import { ResetTvOutlined } from "@mui/icons-material";
import { success, error } from "../component/Toast";
import common from "../baseUrl";
import _ from "lodash";
import Search from "../component/Search";
import SearchIcon from '@mui/icons-material/Search';
import StyledEngineProvider from "@mui/material/StyledEngineProvider";
import { Dialog, DialogTitle, Box } from '@mui/material'
import { NavLink, useParams, Route, Switch, useHistory, Link } from "react-router-dom"





const Search_Results = () => {
  const {
    brand,
    name,
    model,
    min_year,
    max_year,
    min_engine,
    max_engine,
    odo_min,
    odo_max,
    bid,
    oneprice,
  } = useParams();
  const history = useHistory();

  const [loader, setLoader] = useState(true);
  const [cars, setCars] = useState([]);
  const [filterValue, setFilterValue] = useState("");
  const [page, setPage] = useState(1);
  const [resultCount, setResultCount] = useState(0);
  const [dateoneprice, setDateonePrice] = useState(false);
  const [open, setOpen] = useState(false);
  const [lotNo, setLotNo] = useState("")
  const [nav, setNav] = useState("")




  document.title = "Search Results";

  useEffect(async () => {
    try {
      let suburl = "";
      if (_.isEqual(bid, "false") && _.isEqual(oneprice, "true")) {
        suburl = "&one_price=true";
        setDateonePrice(true);
      } else if (_.isEqual(bid, "true") && _.isEqual(oneprice, "false")) {
        suburl = "&one_price=false";
      }
      const response = await axios({
        method: "get",
        url: `${common.baseUrl}Cars/CarsList/?make=${brand === "null" ? "" : brand.toUpperCase()
          }&model=${model === "null" ? "" : model}&car_name=${name === "null" ? "" : name
          }&min_yr=${min_year}&max_yr=${max_year}&max_engine_cc=${max_engine}&min_engine_cc=${min_engine}&max_odo_km=${odo_max}&min_odo_km=${odo_min}${suburl}&page=${page}&page_size=20`,
        // headers: {
        //   "Content-type": "application/json",
        // },
      });
     
      if (response.status === 200) {
        setResultCount(response.data.count);
        setCars(response.data.results);
      }
      setLoader(false);
    } catch (err) {
      error(err.message);
    }
  }, [page]);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const searchByLot = async () => {
    if (lotNo == "") {
      alert("Please provide a proper lot number")
    } else {
      history.push(`/results/lotnumber/${lotNo}`)
    }

  }

  const sendDataToParent = (i) => { // the callback. Use a better name
    // setDrive(index);
    setNav(i)
  };

  const filteredCar = cars.filter((item) =>
    item.car_name.toLowerCase().includes(filterValue.toLowerCase())
  );

  return (
    <>


      <motion.div variants={variants} initial="in" animate="animate" exit="exit">
        <Navbar
          searchActive="activeLink"
        />

        <div className="heroContainer bugSearch fxwidth">

          <Search sendDataToParent={sendDataToParent} />
        </div>


        <div className="searchCarContainers">
          <div className="fixSearch">
            <SearchIcon onClick={handleClickOpen} />
          </div>

          <div className="searchtitle">
            <div>
              <Link style={{ color: "black" }} to="/">
                Home
              </Link>
              <h1>Search Results({resultCount})</h1>
            </div>

            <input
              className="std-input2"
              type="search"
              placeholder="Filter by Name"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
            />
          </div>
          {/* <div className="fixedButton">
            <SearchIcon onClick={handleClickOpen} />
          </div> */}
          {/* <Divider/> */}
          {loader ? (
            <center>
              <CircularProgress style={{ margin: "5rem" }} />
            </center>
          ) : filteredCar.length === 0 ? (
            <h1 style={{ textAlign: "center", color: "#eee" }}>Zero Results</h1>
          ) : (
            <div style={{ margin: "0.5rem 0.3rem 1rem 0.3rem" }}>
              <div className="searchCar">
                <b>Auction House</b>
                <b> Auction Date</b>

                <b> Make </b>
                <b> Model</b>

                <b> Grade</b>

                {/* <b> Image</b> */}
              </div>
              {filteredCar.map((car, key) => {
                return (
                  <div
                    onClick={() =>
                      localStorage.getItem("token")
                        ? (window.location.href = `/specific_car/${car.id}`)
                        : (window.location.href = `/login?carid=${car.id}`)
                    }
                    key={key}
                    className="searchCar"
                  >
                    <div>
                      <b>{car.auction_place}</b>
                      <p style={{ fontSize: "1.1rem" }}>{car.lot_no}</p>

                    </div>
                    <p>
                      {car.auction_date !== null ? (
                        dateFormat(car.auction_date, "mmmm dS, yyyy")
                      ) : (
                        <span
                          style={{
                            background: "#8a28d9",
                            //fontWeight: "bold",
                            color: "white",
                            padding: "1rem",
                            borderRadius: "0.3rem",
                          }}
                        >
                          One Price
                        </span>
                      )}
                    </p>
                    <div>

                      <p>{car.car_name}</p>
                    </div>
                    <div>
                      <p>{car.model}</p>
                    </div>
                    <div>
                      <p>{car.grade}</p>
                    </div>

                    <motion.img
                      layoutId={"SPECIFIC_VEHICLE_IMG" + car.id}
                      src={car.url}
                      alt={"car image" + key}

                    />
                  </div>
                );
              })}
            </div>
          )}
          <Pagination
            count={Math.ceil(resultCount / 20)}
            onChange={(e, value) => {
              setPage(value);
            }}
          />
        </div>
      </motion.div>

      <StyledEngineProvider injectFirst>
        <Dialog
          open={open}
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
        >
          <div style={{ padding: "3rem", outline: "2px solid #8a28d9", outlineOffset: "-20px" }}>
            <DialogTitle style={{ textAlign: "center", fontFamily: "Montserrat" }}>Search By Lot Number</DialogTitle>
            <div className="searchByLotContainer">
              <input
                placeholder="Enter Lot Number"
                type="text"
                value={lotNo}
                onChange={e => setLotNo(e.target.value)} />
              <button
                onClick={searchByLot}
                className="std-button-search"
              >Search</button>
            </div>
          </div>
        </Dialog>
      </StyledEngineProvider>
    </>

  );
};

export default Search_Results;