import { Grid } from '@material-ui/core';
import { Typography, Stack, Chip, FormControlLabel, Checkbox } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import StyledEngineProvider from "@mui/material/StyledEngineProvider";
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import common from '../../baseUrl';
import "../makeBidDialog.css";
import { error, success } from '../Toast';
import { useHistory } from 'react-router-dom'
import { Box } from '@mui/system';

export default function MakeBidDialog({ mLeft, trackId, show, set, data }) {


  const [open, setOpen] = useState(false);
  const [details, setDetails] = useState(data.details);
  const [shipments, setShipments] = useState([]);
  const [selectedShipments, setSelectedShipments] = useState([]);
  const [isDelivered, setIsDelivered] = useState(false);
  const [ids, setIds] = useState([]);
  const history = useHistory()

  useEffect(() => {
    setDetails(data.details)
  }, [])

  useEffect(() => {
    delete data.details.id
    setShipments(data.shipments)
    setOpen(show);
  })


  const handleClose = () => {
    setOpen(false);
    set(false);
  };

  const handleChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value })
  }
  const updateStatus = async () => {
    if (trackId.length >= 36) {
      const response = await axios(
        {
          method: "post",
          url: `${common.baseUrl}Tracking/MTrackingDetails/`,
          headers: {
            Authorization: `Token ${localStorage.getItem("token")}`
          },
          data: { ...details, ids: [...ids, trackId], is_delivered: isDelivered }
        }
      )
      if (response.status === 200) {
        success("Your details have been saved successfully")
        handleClose()
        history.go(0);
      }
      else {
        error("Something went wrong. Try again")
      }
    }
    else {
      error("tracker id not find")
    }
  }


  return (
    <>
      <StyledEngineProvider injectFirst>
        <Dialog
          open={open}
          onClose={handleClose}
        >
          <h2 style={{ margin: "1rem 1rem 0rem 1rem" }}><span style={{ color: "#8a28d9",fontFamily: '"Montserrat", sans-serif' }}>Update Tracking Details</span></h2>
          <DialogContent>
            <Grid
              spacing={2}
              container>
              <Grid xs={12} spacing={1} direction="column" container item>
                <Grid item> <Typography variant="h5" sx={{fontFamily: '"Montserrat", sans-serif'}}> Shipments </Typography> </Grid>
                <Grid item>
                  <select
                    className="std-input2"
                    name="shipping_carrier"
                    onChange={(e) => {
                      setSelectedShipments([...selectedShipments, JSON.parse(e.target.value)])
                      setIds([...ids, JSON.parse(e.target.value).id])
                    }}
                  >
                    <option hidden> Select Shipments </option>
                    {shipments.map((item, key) => {
                      return (
                        <option
                          key={key}
                          style={{ padding: "0.5rem" }}
                          value={JSON.stringify(item)}>
                          {item.carName}: {item.chassis ? item.chassis : 'N/A'}
                        </option>
                      )
                    })}
                  </select>
                </Grid>

                <Grid>
                  <Typography sx={{ color: 'red', fontFamily: '"Montserrat", sans-serif', fontSize: '12px', pl: 1}}> *By default this vehicle's tracking details will be updated </Typography>
                </Grid>

                <Grid spacing={1} sx={{ mt: 1, width: '500px', border: 'solid' }} container>

                  {selectedShipments.map((shipment, i) => {
                    return (
                      <Grid key={i} item>
                        <Chip

                          variant="outlined"
                          label={`${shipment.carName}: ${shipment.chassis ? shipment.chassis : 'N/A'}`}
                          onDelete={() => {
                            let index = selectedShipments.indexOf(shipment)
                            let data = selectedShipments.filter((doc, i) => i !== index)
                            setSelectedShipments(data)

                            let index2 = ids.indexOf(shipment.id)
                            let data2 = ids.filter((id, i) => i !== index2)
                            setIds(data2)
                          }}
                        />
                      </Grid>
                    )
                  })}
                </Grid>
              </Grid>

              <Grid xs={12} spacing={1} direction="column" container item>
                <Grid item> <Typography variant="h5" sx={{fontFamily: '"Montserrat", sans-serif'}}>  Carrier </Typography> </Grid>
                <Grid item>
                  <select
                    className="std-input2"
                    name="shipping_carrier"
                    onChange={handleChange}
                  >
                    <option hidden> Select Carrier </option>
                    {[
                      {
                        type: "Hoegh Autoliners AS",
                        value: "Hoegh Autoliners AS"
                      },
                      {
                        type: "Eastern Car Liner Ltd.",
                        value: "Eastern Car Liner Ltd."
                      },
                      {
                        type: "YCS",
                        value: "YCS"
                      },
                      {
                        type: "MOL",
                        value: "MOL"
                      },
                      {
                        type: "NYK",
                        value: "NYK"
                      },
                      {
                        type: "K-Line",
                        value: "K-Line"
                      },
                      {
                        type: "Armacup",
                        value: "Armacup"
                      },
                      {
                        type: "Kyowa Shipping Co. Ltd.",
                        value: "Kyowa Shipping Co. Ltd."
                      },
                      {
                        type: "Others",
                        value: "Others"
                      },
                    ].map((item, key) => {
                      return (
                        <option
                          key={key}
                          style={{ padding: "0.5rem" }}
                          value={item.type}>
                          {item.type}
                        </option>
                      )
                    })}
                  </select>
                </Grid>

                {details.shipping_carrier === 'Others' ?
                  (<Grid item>
                    <input
                      type="text"
                      name="carrier_name"
                      className="std-input2"
                      placeholder="Enter Carrier Name"
                      value={details.carrier_name}
                      onChange={handleChange}
                    />
                  </Grid>) :
                  ''}
              </Grid>
              <Grid xs={6} spacing={1} direction="column" container item>
                <Grid item> <Typography variant="h5" sx={{fontFamily: '"Montserrat", sans-serif'}}> Departure </Typography> </Grid>
                <Grid item>
                  <input
                    type="text"
                    name="dept_vessel"
                    className="std-input2"
                    placeholder="Vessel Name"
                    value={details.dept_vessel}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item>
                  <input
                    type="text"
                    name="dept_port"
                    className="std-input2"
                    placeholder="Port of loading"
                    value={details.dept_port}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item>
                  <input
                    type="text"
                    name="dept_et"
                    className="std-input2"
                    placeholder="ETD (YYYY-MM-DD)"
                    value={details.dept_et}
                    onChange={handleChange}
                  />
                </Grid>

              </Grid>
              <Grid xs={6} spacing={1} direction="column" container item>
                <Grid item> <Typography variant="h5" sx={{fontFamily: '"Montserrat", sans-serif'}}> Arrival </Typography> </Grid>

                <Grid item>
                  <input
                    type="text"
                    name="arrival_port"
                    className="std-input2"
                    placeholder="Port of discharge"
                    value={details.arrival_port}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item>
                  <input
                    type="text"
                    name="arrival_et"
                    className="std-input2"
                    placeholder="ETA (YYYY-MM-DD)"
                    value={details.arrival_et}
                    onChange={handleChange}
                  />
                </Grid>

              </Grid>
              <Grid xs={6} spacing={1} direction="column" container item>
                <Grid item> <Typography variant="h5" sx={{fontFamily: '"Montserrat", sans-serif'}}> Inspection Status </Typography> </Grid>
                <Grid item>
                  <input
                    type="text"
                    name="inspection_date"
                    className="std-input2"
                    placeholder="Inspection Date"
                    value={details.inspection_date}
                    onChange={handleChange}
                  />
                </Grid>

                <Grid item>
                  <select
                    className="std-input2"
                    name="result1"
                    // value={shipmentType}
                    defaultValue="N/A"
                    onChange={handleChange}
                  >
                    <option hidden> Select Status </option>
                    {[{ type: "N/A", value: "N/A" }, { type: "PASS", value: "PASS" }, { type: "FAIL", value: "FAIL" }].map((item, key) => {
                      return (
                        <option
                          key={key}
                          style={{ padding: "0.5rem" }}
                          value={item.type}>
                          {item.type}
                        </option>
                      )
                    })}
                  </select>
                </Grid>

                {details.result1 === 'FAIL' ?
                  (<>
                    <Grid item>
                      <input
                        type="text"
                        name="re_inspection_date"
                        className="std-input2"
                        placeholder="Re-inspection Date"
                        // value={market}
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item>
                      <input
                        type="text"
                        name="result2"
                        className="std-input2"
                        placeholder="Result"
                        // value={market}
                        onChange={handleChange}
                      />
                    </Grid>
                  </>) :
                  ''}
              </Grid>
              <Grid xs={6} spacing={1} direction="column" container item>
                <Grid item> <Typography variant="h5" sx={{fontFamily: '"Montserrat", sans-serif'}}> Enrollment </Typography> </Grid>
                <Grid item>
                  <input
                    type="text"
                    name="remarks"
                    className="std-input2"
                    placeholder="Enrollment"
                    value={details.remarks}
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>

              <Grid xs={12} spacing={1} direction="column" container item>
                <FormControlLabel control={<Checkbox sx={{fontFamily: '"Montserrat", sans-serif'}} onChange={(e) => setIsDelivered(e.target.checked)} />} label="Delivered" />
              </Grid>


            </Grid>
          </DialogContent>
          <DialogActions style={{ display: "flex", justifyContent: "flex-start", padding: "0 1rem 1rem 1rem" }}>
            <button
              style={{ border: "2px solid #8a28d9" }}
              className="std-button-sun"
              onClick={updateStatus}
              autoFocus>
              Submit
            </button>
            <button
              style={{ background: "transparent", color: "#8a28d9", border: "2px solid #8a28d9" }}
              className="std-button-sun" onClick={handleClose}>Close</button>

          </DialogActions>
        </Dialog>
      </StyledEngineProvider>
    </>
  );
}
