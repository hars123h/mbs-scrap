import axios from "axios";
import React, { useState, useEffect } from "react";
import Navbar from "../../component/Navbar";
import { useParams, Link, useHistory } from "react-router-dom";
import { success, error } from "../../component/Toast";
import dateFormat from "dateformat";
import DashboardCustomizeIcon from "@mui/icons-material/DashboardCustomize";
import { Menu, Button, MenuItem, Stack, Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import MakeBidDialog from "../../component/MakeBidDialog";
import PlaceOrderOnePrice from "../../component/Dialogs/PlaceOrderOnePrice";
import common from "../../baseUrl";
import { motion } from "framer-motion";
import currency from "currency.js";
import { Grid } from "@material-ui/core";
import { OpenInNew } from "@mui/icons-material";
// import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";
import logo from "../../static/Rectangle 32.png"
import moment from "moment";




const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const images = [
  {
    original: 'https://picsum.photos/id/1018/1000/600/',
    thumbnail: 'https://picsum.photos/id/1018/250/150/',
    thumbnailAlt: 'https://picsum.photos/id/1019/250/150/'
  },
  {
    original: 'https://picsum.photos/id/1015/1000/600/',
    thumbnail: 'https://picsum.photos/id/1015/250/150/',
    thumbnailAlt: 'https://picsum.photos/id/1019/250/150/'

  },
  {
    original: 'https://picsum.photos/id/1019/1000/600/',
    thumbnail: 'https://picsum.photos/id/1019/250/150/',
    thumbnailAlt: 'https://picsum.photos/id/1019/250/150/'

  },
  {
    original: 'https://picsuphotos/id/1019/1000/600/',
    thumbnail: '/image/errr.png',
    thumbnailAlt: 'https://picsum.photos/id/1019/250/150/'

  },
];


const SpecificCar = () => {
  const [cardetails, setCarDetails] = useState({});
  const [cardetailsDate, setCarDetailsDate] = useState({});
  const [highestBid, setHighestBid] = useState();
  
  const [allBids, setAllBid] = useState([]);
  const [isSU, setIsSU] = useState(false);
  const [carImages, setCarImages] = useState([])
  const [sampleArray, setSampleArray] = useState([])
  const [sheetImage, setSheetImage] = useState()
  const [newArr, setNewArr] = useState()


  const history = useHistory();


  const [imgOpen, imgSetOpen] = useState(false);
  const imageHandleOpen = () => imgSetOpen(true);
  const imageHandleClose = () => imgSetOpen(false);



  const { id } = useParams();

  // console.log(cardetails);
  // console.log("AUCTION Images", sheetImage)
  console.log("SAMPLE ARRAY", sampleArray)


  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    setIsSU(
      !window.localStorage.getItem("superuser") ||
        window.localStorage.getItem("superuser") === "false"
        ? false
        : true
    );
  });
  console.log("carrrrr", cardetails);
  useEffect(async () => {
    const result = await axios({
      method: "get",
      url: `${common.baseUrl}Cars/Car/${id}`,
      headers: {
        Authorization: `Token ${localStorage.getItem("token")}`,
      },
    });
    // console.log("token", localStorage.getItem("token"))

    if (result.status === 200) {
      // setHighestBid({ ...result.data.biddetail[0] })
      setCarDetails(result.data);
      setCarDetailsDate(result.data.auction_date)
      // console.log("CAR IMAGES", result.data.images)
      setCarImages(result.data.images)

      setSampleArray(result.data.images.map((fr, i) => ({ "original": fr, "thumbnail": fr })))
      setSheetImage([{ "original": result.data.auction_sheet, "thumbnail": result.data.auction_sheet }])





      setAllBid(
        result.data.one_price
          ? [result.data]
          : result.data.biddetail
            ? result.data.biddetail
            : []
      );
    } else {
      error("Page failed to load.Try Again");
    }

    axios({
      method: "get",
      url: `${common.baseUrl}Cars/HighestBid/${id}`,
      headers: {
        Authorization: `Token ${localStorage.getItem("token")}`,
      },
    }).then((res) => {
      setHighestBid(res.data.highest_bid);
    });



  }, []);
  console.log("date", cardetailsDate);




  const errorImage = (event) => {
    <img src="/image/error.png" alt="" />
  }

  const addCarToSpecificBasket = async (id, bucket) => {
    const response = await axios({
      method: "post",
      url: `${common.baseUrl}Wishlist/AddToWishlist/`,
      headers: {
        Authorization: `Token ${localStorage.getItem("token")}`,
      },
      data: {
        car_id: id,
        bucket: bucket,
      },
    });
    if (response.status === 200) {
      success(`Successfully added to ${bucket} basket`);
      handleClose();
    } else {
      error("Something went wrong while adding to basket.");
    }
  };

  document.title = cardetails.car_name + " - Search";



  return (
    <div>
      <Navbar />
      <div className="spcContainer">
        <Breadcrumbs aria-label="breadcrumb" style={{ marginBottom: "2rem" }}>
          <Link style={{ color: "grey" }} to="/">
            Home
          </Link>
          <p
            style={{ cursor: "pointer", color: "grey" }}
            onClick={() => history.goBack()}
          >
            Search Results
          </p>
          <Typography color="text.primary">{cardetails.car_name}</Typography>
        </Breadcrumbs>
        {/* <ImageGallery items={images} /> */}


        <div className="spcHeader">
          {/* <div>
        <motion.img onClick={imageHandleOpen}
            layoutId={"SPECIFIC_VEHICLE_IMG" + id}
            src={cardetails.url}
            alt="specific_Car_img"
            style={{height: '100px'}}
          />
          <img onClick={imageHandleOpen}
            layoutId={"SPECIFIC_VEHICLE_IMG" + id}
            src={cardetails.auction_sheet}
            alt="specific_Car_img"
            style={{height: '100px'}}
          />
        </div> */}

          {/* <Button onClick={imageHandleOpen}>Open modal</Button> */}
          {/* <Modal
        open={imgOpen}
        onClose={imageHandleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <img
            layoutId={"SPECIFIC_VEHICLE_IMG" + id}
            src={cardetails.auction_sheet}
            alt="specific_Car_img"
            style={{height: '500px'}}
          />
        </Box>
      </Modal> */}


          <div style={{ width: '600px' }}>

            <ImageGallery items={sampleArray}
              thumbnailClass="tnail"
              onErrorImageURL={logo}
            />


          </div>

          <div className="spchtext">
            <div className="spchthead">
              <p>
                {cardetails.make} / {cardetails.model}{" "}
              </p>
              <h1>{cardetails.car_name}</h1>
            </div>

            <div>
              <Grid spacing={2} container>
                <Grid xs={6} item>
                  <div>
                    <b>Auction House</b>
                  </div>
                  <div>{cardetails.auction_place} </div>
                </Grid>

                <Grid xs={6} item>
                  <div>
                    {" "}
                    <b> Car Grade</b>
                  </div>
                  <div>{cardetails.grade}</div>
                </Grid>
                <Grid xs={6} item>
                  <div>
                    {" "}
                    <b> Lot Number</b>
                  </div>
                  <div>{cardetails.lot_no}</div>
                </Grid>
                <Grid xs={6} item>
                  <div>
                    <b style={{ color: "#8a28d9" }}> Score</b>
                  </div>
                  <div>{cardetails.score}</div>
                </Grid>
                <Grid xs={6} item>
                  <div>
                    <b style={{ color: "#8a28d9" }}>Engine</b>
                  </div>
                  <div>{cardetails.engine_cc}</div>
                </Grid>
                <Grid xs={6} item>
                  <div>
                    {" "}
                    <b> AC</b>
                  </div>
                  <div>{cardetails.ac}</div>
                </Grid>
                <Grid xs={6} item>
                  <div>
                    <b>TM</b>{" "}
                  </div>
                  <div>{cardetails.tm}</div>
                </Grid>
                <Grid xs={6} item>
                  <div>
                    <b>Odometer</b>
                  </div>
                  <div>{cardetails.odo * 1000}km</div>
                </Grid>
                <Grid xs={6} item>
                  <div>
                    {" "}
                    <b> Year</b>
                  </div>
                  <div>{cardetails.yr}</div>
                </Grid>
                <Grid xs={6} item>
                  <div>
                    <b>Start or One Price</b>
                  </div>
                  <div>
                    {currency(cardetails.start_or_one_price * 1000, {
                      symbol: "¥",
                      precision: 0,
                    }).format()}{" "}
                  </div>
                </Grid>

                <Grid xs={6} item>
                  <div>
                    <b>Color</b>
                  </div>
                  <div>{cardetails.color} </div>
                </Grid>

                {cardetails.one_price === false && (
                  <>
                    <Grid xs={6} item>
                      <div>
                        <b>Auction Date</b>
                      </div>
                      <div>
                        {dateFormat(cardetails.auction_date, "fullDate")}{" "}
                      </div>
                    </Grid>
                    <Grid xs={6} item>
                      <div>
                        <b>Minimum Bid Amount</b>
                      </div>
                      <div>
                        {highestBid > 0
                          ? currency(highestBid, {
                            symbol: "¥",
                            precision: 0,
                          }).format()
                          : "No bids placed"}{" "}
                      </div>
                    </Grid>
                  </>
                )}
              </Grid>
            </div>

            {isSU ? (
              <Button

                className="controlsToBasketButton"
                sx={{ color: "#8a28d9" }}
                id="demo-positioned-button"
                aria-controls="demo-positioned-menu"
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={() =>
                  window.open(
                    cardetails.asnet_url
                      ? cardetails.asnet_url
                      : "https://www.asnet2.com/asnet/auth/login/",
                    "_blank"
                  )
                }
              >
                <OpenInNew />
              </Button>
            ) : (
              <Stack
                //spacing={2}
                direction={{ xs: "column", sm: "column", md: "column" }}
                spacing={{ xs: 2, sm: 4, md: 6 }}
              >
                <Button

                  className="controlsToBasketButton"
                  sx={{ color: "#8a28d9" }}
                  id="demo-positioned-button"
                  aria-controls="demo-positioned-menu"
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleClick}
                >
                  <DashboardCustomizeIcon />
                </Button>
                <Menu
                  id="demo-positioned-menu"
                  aria-labelledby="demo-positioned-button"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                >
                  <MenuItem
                    onClick={() => addCarToSpecificBasket(cardetails.id, "A")}
                  >
                    Move to Fav. List A
                  </MenuItem>
                  <MenuItem
                    onClick={() => addCarToSpecificBasket(cardetails.id, "B")}
                  >
                    Move to Fav. List B
                  </MenuItem>
                  <MenuItem
                    onClick={() => addCarToSpecificBasket(cardetails.id, "C")}
                  >
                    Move to Fav. List C
                  </MenuItem>
                  <MenuItem
                    onClick={() => addCarToSpecificBasket(cardetails.id, "D")}
                  >
                    Move to Fav. List D
                  </MenuItem>
                </Menu>
                <Button
                  className="controlsToBasketButton"
                  sx={{ color: "#8a28d9", ml: 2 }}
                  id="demo-positioned-button"
                  aria-controls="demo-positioned-menu"
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={() => window.open(cardetails.asnet_url, "_blank")}
                >
                  <OpenInNew />
                </Button>
              </Stack>
            )}

            <div className="spchtfooter">
              {/* <p className="std-button-2">
                             {cardetails.deadline.length!==0&&cardetails.deadline}
                         </p> */}
              {cardetails.one_price ? (
                <PlaceOrderOnePrice
                  AuctionDate={cardetailsDate}
                  make={cardetails.make + "/" + cardetails.model}
                  carName={cardetails.car_name}
                  lotNo={cardetails.lot_no}
                  carId={cardetails.id}
                  allBids={allBids}
                  onePrice={cardetails.start_or_one_price}
                  isSold={cardetails.keep}
                />
              ) : (
                <MakeBidDialog
                  highestBidTillNow={
                    highestBid
                      ? highestBid
                      : cardetails.start_or_one_price * 1000
                  }
                  AuctionDate={cardetailsDate}
                  make={cardetails.make + "/" + cardetails.model}
                  carName={cardetails.car_name}
                  lotNo={cardetails.lot_no}
                  carId={cardetails.id}
                  allBids={allBids}
                  isSold={cardetails.keep}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpecificCar;
